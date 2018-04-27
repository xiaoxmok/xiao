// 主模块

define(function (require, exports, module) {
    // 1.就是定义区
    var moduleName = 'main module';
    var version = '1.0.0';

    // 2.加载模块
    var workjs = require('hello');

    // 3.函数定义区
    exports.loadTip = function (refConId) {
        var tipMsg = 'module is load finish';
        if (undefined === refConId || null === refConId || "" === refConId + "") {
            console.log(tipMsg);
        } else {
            document.getElementById(refConId + "").innerHTML = tipMsg;
        }
    };

    exports.initEvent = function(){
        workjs.initEvent();
        exports.loadTip();
    }

    // 4.暴露给外部模块使用
    module.exports = exports;

    // 5.启动时加载完后自动执行的方法
    exports.initEvent();
})