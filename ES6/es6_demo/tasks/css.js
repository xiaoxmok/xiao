import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';
import csso from 'gulp-csso';

gulp.task('css', () => {
    return gulp.src('app/**/*.css')
        //.pipe(csso())
        .pipe(gulp.dest('server/public'))
        .pipe(gulpif(args.watch,livereload()))
})