var gulp = require('gulp');
var sftp = require('gulp-sftp');

gulp.task('staging', function () {
    return gulp.src(['.tmp/**/*', '!.tmp/index.html'])
        .pipe(sftp({
            host: 'accom.ablist.win',
            auth: 'keyMain',
            remotePath: '/root/log/public/'
        }));
});

gulp.task('staging:components', function () {
    return gulp.src(['.tmp/generated-scripts/templates.js', '.tmp/generated-scripts/components.js'])
        .pipe(sftp({
            host: 'accom.ablist.win',
            auth: 'keyMain',
            remotePath: '/root/log/public/generated-scripts/'
        }));
});

gulp.task('staging:styles', function () {
    return gulp.src(['.tmp/generated-styles/*'])
        .pipe(sftp({
            host: 'accom.ablist.win',
            auth: 'keyMain',
            remotePath: '/root/log/public/generated-styles/'
        }));
});
