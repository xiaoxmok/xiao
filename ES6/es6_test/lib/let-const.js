"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

for (var i = 0; i < 10; i++) {}
//console.log(i);           //只在区域内有效


//console.log(i);


var a = [];

var _loop = function _loop(_i) {
    a[_i] = function () {
        console.log(_i);
    };
};

for (var _i = 0; _i < 10; _i++) {
    _loop(_i);
}

a[4]();

//console.log(foo);
console.log(fun);

var fun = '11';
//let foo = '22';       //不存在变量提升

// 封闭作用域
var tmp = 'aaa';
if (true) {
    //tmp = 'abc';        // ReferenceError
    var _tmp = void 0;
}
console.log(typeof a === 'undefined' ? 'undefined' : _typeof(a));
if (true) {
    //tmp = 'abc';          //// ReferenceError
    //console.log(tmp);         // ReferenceError
    //typeof tmp;         // ReferenceError

    var _tmp2 = void 0;
    console.log(_tmp2); // undefined

    _tmp2 = 123;
    console.log(_tmp2); // 123
}

function foo(arg) {
    // 不允许重复声明变量和参数
    var a = '11';
    // let a = '22';
    //let b
    var b = 3;
    // let arg;
}

//foo();

var b = [];
b.push('hello');
console.log(b);