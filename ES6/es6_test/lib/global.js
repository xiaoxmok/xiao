'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fun1 = function fun1() {
    var a = typeof window !== 'undefined' ? window : (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof require === 'function' && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' ? global : this;
    console.log(a);
};

var getGlobal = function getGlobal() {
    if (typeof self !== 'undefined') {
        console.log("self");
        return self;
    }
    if (typeof window !== 'undefined') {
        console.log("window");
        return window;
    }
    if (typeof global !== 'undefined') {
        console.log("global");
        return global;
    }
    throw new Error('unable to locate global object.');
};

getGlobal();
fun1();