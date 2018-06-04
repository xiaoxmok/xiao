import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload';       //热更新的包
import plumber from 'gulp-plumber';             //数据流包
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import {log, colors} from 'gulp-util';
import args from './util/args';
import filter from 'gulp-filter';

gulp.task('scripts', () => {
    var jsFilter = filter(['!*lib/*'],{restore:true});
    var condition = function(f){
        console.log(f.path);
        console.log(f.path.indexOf('lib'));
        if(f.path.indexOf('lib') < 0){
            //console.log(f.path);
            //console.log(f.path.indexOf('/lib/'));
            //console.log(f.path.endswith('.min.js'));
            return false;
        }
        return true;
    };

    return gulp.src(['src/**/*.js'])
        .pipe(plumber({
            errorHandler: function () {

            }
        }))
        .pipe(named())
        //将处理后的js文件写入指定文件中
        //.pipe(uglify({mangle: true,compress: {properties: true}, output: {'quote_keys': true}}))
        .pipe(gulp.dest('dist'))
        //重命名xxx.min.js
        .pipe(rename({
            extname: '.min.js'
        }))
        //压缩
        //.pipe(jsFilter)
        //.pipe(gulpif(condition,uglify({mangle: true,compress: {properties: true}, output: {'quote_keys': true}})))
        .pipe(uglify({mangle: true,compress: {properties: true}, output: {'quote_keys': true}}))
        //保存文件，存在两个文件，一个压缩，一个未压缩
        .pipe(gulp.dest('dist'))
        // 文件热更新
        .pipe(gulpif(args.watch, livereload()))
});
