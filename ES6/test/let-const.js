"use strict"

for (let i = 0; i < 10; i++) {
    //console.log(i);           //只在区域内有效
}

//console.log(i);


var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}

a[4]()


//console.log(foo);
console.log(fun);

var fun = '11';
//let foo = '22';       //不存在变量提升

// 封闭作用域
let tmp = 'aaa';
if (true) {
    //tmp = 'abc';        // ReferenceError
    let tmp
}
console.log(typeof a);
if (true) {
    //tmp = 'abc';          //// ReferenceError
    //console.log(tmp);         // ReferenceError
    //typeof tmp;         // ReferenceError

    let tmp;
    console.log(tmp);           // undefined

    tmp = 123;
    console.log(tmp);           // 123
}


function foo(arg) {         // 不允许重复声明变量和参数
    var a = '11';
    let a = '22';
    let b
    let b = 3;
    let arg;
}

//foo();

const b = [];
b.push('hello');
console.log(b);


