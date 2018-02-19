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

gulp.task('scripts', () => {
    return gulp.src(['app/js/index.js'])
        .pipe(plumber({
            errorHandler: function () {

            }
        }))
        .pipe(named())
        //通过webpack解析ES6的js文件
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader'
                }]
            }
            //错误的处理
        }), null, (err, stats) => {
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunk: false
            }))
        })
        //将处理后的js文件写入指定文件中
        .pipe(gulp.dest('server/public/js'))
        //重命名xxx.min.js
        .pipe(rename({
            basename: 'index',
            extname: '.min.js'
        }))
        //压缩
        .pipe(uglify({compress: {properties: false}, output: {'quote_keys': true}}))
        //保存文件，存在两个文件，一个压缩，一个未压缩
        .pipe(gulp.dest('server/public/js'))
        // 文件热更新
        .pipe(gulpif(args.watch, livereload()))
});
