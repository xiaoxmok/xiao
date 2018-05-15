import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser', (cb) => {
    if (!args.watch) return cb();
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/**/*.html', ['pages']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch('src/**/*.json', ['json']);
    gulp.watch('src/public/img/*.*', ['img']);
})