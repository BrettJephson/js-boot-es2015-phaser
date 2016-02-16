require('babel-core/register');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var jshint = require('gulp-jshint');
var colors = require('colors');
var clean = require('gulp-rimraf');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var notify = require('gulp-notify');
var changed = require('gulp-changed');
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

var browserSync = require('browser-sync').create();
var args = require('process').argv;

const options = {
  openParam: (args.indexOf('--open') > -1),
  source: 'src/**/*.js',
  test: 'test',
  destination: 'compiled',
  distributable: 'dist'
};

colors.setTheme({
  error: 'red'
});

function lint(src, errorHandler) {
  return gulp.src(src)
    .pipe(plumber({
      errorHandler: errorHandler
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}

function transpile(src, isWatch) {
  return src
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(options.destination))
    .pipe(browserSync.stream({ once: !isWatch }))
    .pipe(notify({ message: 'Source transpiled', onLast: true }));
}

function watch(src, tasks) {
  return gulp.watch(src, tasks);
}

gulp.task('lint', function() {
  return lint(options.source);
});

gulp.task('lint4ci', function() {
  return lint(options.source, function() {
      console.error("JSHint failed".error);
      process.exit(1);
    })
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
  return gulp.src(options.destination, { read: false }).pipe(clean());
});

gulp.task('transpile', ['clean'], function() {
  return transpile(gulp.src(options.source), false);
});

gulp.task('transpile-watch', function() {
  var stream = gulp.src(options.source)
    .pipe(changed(options.destination));

  return transpile(stream, true);
});


gulp.task('serve', function() {
  browserSync.use({
    plugin: function() {},
    hooks: {
      'client:js': require('fs').readFileSync('./build/reloader.js', 'utf-8')
    }
  });

  browserSync.init({
    server: {
      baseDir: "./"
    },
    open: options.openParam
  });

  return gulp.watch(['index.html', 'game-config.json'])
    .on('change', browserSync.reload)
    .on('error', function(error) {
      console.error(error);
    });
});

gulp.task('test', function(done) {
  jasmine.onComplete(function(passed) {
    if(passed) {
      console.log('All specs have passed');
      done();
    }
    else {
      console.log('At least one spec has failed');
      process.exit(1);
    }
  });
  jasmine.loadConfigFile('test/jasmine.json');
  jasmine.execute();
});

gulp.task('healthcheck', gulpSequence('lint4ci', 'test'));

gulp.task('default', ['transpile', 'serve'], function() {
  return watch(options.source, ['transpile-watch']);
});
