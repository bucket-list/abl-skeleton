var gulp = require('gulp');
var gutil = require('gulp-util');
var server = require( 'gulp-develop-server' );
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('dev', ['clean'], function () {
  runSequence(['syncStart', 'server:start', 'server:restart']);
});

// Start browserSync
gulp.task('syncStart', function () {
  gutil.env.production = false;
  gulp.start('browser-sync');
});

// Reload server and reload browserSync
gulp.task('syncRestart', function () {
  server.restart();
  browserSync.reload();
});

// run server
gulp.task( 'server:start', function() {
    server.listen( { path: 'test/server.js' } );
});

// Watch server file restart server on file changed.
gulp.task( 'server:restart', function() {
    gulp.watch( [ 'test/server.js' ], function() {
      runSequence(['syncRestart']);
    });
});

gulp.task('browser-sync', ['html', 'scripts', 'styles', 'watch'], function (callback) {
  browserSync.init({
    server: {
      baseDir: ['.tmp'],

      // TODO: new browser-sync supports rewrite
      middleware: [historyApiFallback()],
      routes: {
        '/node_modules': 'node_modules',
        '/images': 'src/images',
        '/fonts': 'src/fonts'
      }
    }
  }, callback);
});

module.exports = browserSync;
