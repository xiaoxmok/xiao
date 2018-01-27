/**
 * Created by xiaoxiangmin on 2018/1/22.
 */

function Foo(name){
    this.name = name;
}

Foo.prototype={
    a:function(){}
};



Object.defineProperty(Foo.prototype,"constructor",{
    value:Foo,
    writable:true,
    enumerable:false,
    configurable:true
});

var a = new Foo("a");
var b = new Foo();

console.log(b instanceof Foo);
console.log(a.constructor === Foo);
console.log(a.constructor === Object);
console.log(Object.prototype.toString.call(a) === '[object Object]');

console.log(Foo.prototype.isPrototypeOf(a));
console.log(Object.getPrototypeOf(a));
console.log(Object.getPrototypeOf(Foo));
console.log(Object.getPrototypeOf(a) === Foo.prototype);


console.log(a.__proto__ === Foo.prototype);
console.log(a.__proto__);


var fun = {
    something:function(){
        console.log("this is testing!")
    }
};
var bar = Object.create(fun);
//var bar = fun;
bar.something();
console.log(Object.getPrototypeOf(bar));
//console.log(fun.prototype.isPrototypeOf(bar));
console.log(Object.getPrototypeOf(bar) === fun.prototype);