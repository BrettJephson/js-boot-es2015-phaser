# Src

The `src` folder contains es2015/es6 code that has not been through the transpiler.

Run `gulp` from the command line to transpile this code. The gulpfile's `options.destination` variable defines where transpiled code can be found. The dev environment will run this code but the dist folder will contain a bundled version for minimal http requests.
