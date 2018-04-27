import gulp from 'gulp';
import gulpif from 'gulp-if'
import livereload from 'gulp-livereload';
var fileinclude  = require('gulp-file-include');
import args from './util/args'

gulp.task('img', () => {
    return gulp.src('src/public/img/*.*')
        .pipe(gulp.dest('dist/public/img'))
        .pipe(gulpif(args.watch, livereload()))
})