System.config({
  "defaultJSExtensions": true,
  "baseURL": ".",
  "map": {
    "app": "compiled"
  },
  "paths": {
    "phaser": "node_modules/phaser/build/custom/phaser-arcade-physics",
    "lodash": "node_modules/lodash/index",
    "es6-module-loader": "node_modules/es6-module-loader/dist/es6-module-loader.js",
    "systemjs": "node_modules/systemjs/dist/system.js",
    "system-polyfills": "node_modules/systemjs/dist/system-polyfills.js"
  },
  "meta": {
    "phaser": {
      "format": "cjs"
    }
  }
});
