import gulp from 'gulp';
import gulpif from 'gulp-if'
import livereload from 'gulp-livereload';
var fileinclude  = require('gulp-file-include');
import args from './util/args'

gulp.task('pages', () => {
    return gulp.src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gulpif(args.watch, livereload()))
})