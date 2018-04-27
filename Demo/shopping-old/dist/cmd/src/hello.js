/**
 * 业务模块
 */

define(function (require, exports, module) {
    // 1.变量定义区
    var moduleName = 'hello module';
    var version = '1.0.0';

    var $ = require('../lib/jquery-3.1.0');

    // 2.函数定义区
    var getObj = function(id){
        return document.getElementById(id+"");
    };
    exports.console = function(a){
        console.log(a);
    };

    exports.initEvent = function(){
        var myObj = getObj('div01');
        myObj.onmouseover = function(){
            //myObj.style = 'border:3px solid blue;';
            $('.div01').css({'border':'3px solid blue'});
        };
        myObj.onmouseout = function(){
            //myObj.style = 'border:1px solid red;';
            $('.div01').css({'border':'1px solid red'});
        };

        var myObj2 = getObj('div02')
        myObj2.onmouseover = function(){
            //myObj.className = 'div02 alignRight';
            $('.div02').addClass('alignRight');
        };
        myObj2.onmouseout = function(){
            //myObj.className = 'div02';
            $('.div02').removeClass('alignRight');
        };
    }

    // 3.暴露本模块的API给外部模块使用
    module.exports = exports;

    // 4.启动时，当加载完后自动执行的某个方法
    // exports.initEvent();
})