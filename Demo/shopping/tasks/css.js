import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import concat from 'gulp-concat'
import args from './util/args';
import csso from 'gulp-csso';
import minifyCss from 'gulp-minify-css';        // 压缩处理成一行

gulp.task('css', () => {
    return gulp.src('src/**/*.css')
        //.pipe(csso())                 // 多个文件时，csso压缩有问题，需要使用minify
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'))
        .pipe(gulpif(args.watch,livereload()))
})