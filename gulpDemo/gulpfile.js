/**
 * Created by xiaoxiangmin on 2017/12/26.
 */

//npm包管理 https://www.npmjs.com/package

var gulp = require('gulp');                             //引入gulp
var rev = require('gulp-rev');                          //给每个文件添加版本号，版本号是根据每个文件修改后算出来的哈希码
var revReplace = require('gulp-rev-replace');           //更新页面的引用
var useref = require('gulp-useref');                    //通过在页面添加特定的注释，进行全并css及js文件
var filter = require('gulp-filter');                    //过滤器，筛选 和 恢复。
var uglify = require('gulp-uglify');                    //压缩js代码
var csso = require('gulp-csso');                        //压缩css代码


gulp.task('default',function(){
    var jsFilter = filter('**/*.js',{restore:true});
    var cssFilter = filter('**/*.css',{restore:true});
    var indexHtmlFilter = filter(['**/*','!**/portfolio.html','!**/jquery-2.2.2.min.js','!**/echarts.common.min.js'],{restore:true});     //'!**/portfolio.html' 排除某个文件，加版本号时需要排除首页



    return gulp.src('src/portfolio.html')
        .pipe(useref())                             //分析页面注释标志，进行合并文件，并将html、js、css等文件放到通道往下走
        .pipe(jsFilter)                             //筛选js文件
        .pipe(uglify())                             //压缩js文件
        .pipe(jsFilter.restore)                     //恢复筛选，然后接着把所有文件扔回通道
        .pipe(cssFilter)                            //筛选css文件
        .pipe(csso())                               //压缩css文件
        .pipe(cssFilter.restore)                    //恢复筛选，然后接着把所有文件扔回通道
        .pipe(indexHtmlFilter)                      //筛选需要加版本号的文件
        .pipe(rev())                                //添加版本号
        .pipe(indexHtmlFilter.restore)              //恢复筛选，然后接着把所有文件扔回通道
        .pipe(revReplace())                         //更新页面js、css引用
        .pipe(gulp.dest('dist'))

});

gulp.task('he',function(){
    var jsFilter = filter('**/*.js',{restore:true});
    var cssFilter = filter('**/*.css',{restore:true});
    var indexHtmlFilter = filter(['**/*','!**/portfolio.html','!**/jquery-2.2.2.min.js','!**/echarts.common.min.js'],{restore:true});     //'!**/portfolio.html' 排除某个文件，加版本号时需要排除首页



    return gulp.src('src/portfolio.html')
        .pipe(useref())                             //分析页面注释标志，进行合并文件，并将html、js、css等文件放到通道往下走
        .pipe(gulp.dest('de'))

});


//gulp-watch 自动监听文件修改并打包
//gulp-postcss 自动增加css样式的前缀
//gulp-concat 将多个文件合并成一个文件