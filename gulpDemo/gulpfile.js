/**
 * Created by xiaoxiangmin on 2017/12/26.
 */

var gulp = require('gulp');                             //引入gulp
var rev = require('gulp-rev');                          //给每个文件添加版本号，版本号是根据每个文件修改后算出来的哈希码
var revReplace = require('gulp-rev-replace');           //更新页面的引用
var useref = require('gulp-useref');                    //通过在页面添加特定的注释，进行全并css及js文件
var filter = require('gulp-filter');                    //过滤器，筛选 和 恢复。
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');


gulp.task('default',function(){

});

