var gulp = require('gulp');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

var runTimestamp = Math.round(Date.now() / 1000);

gulp.task('icons', ['load-env'], function (callback) {
  gulp
    .src([
      'src/icons/*.svg',
      'src/icons/*.png',
      'src/icons/*.ico',
      '!src/icons/_*.svg'
    ])
    .pipe(gulp.dest('.tmp/icons'))
    .once('end', callback);
});
