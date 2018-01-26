/**
 * Created by xiaoxm on 2017/5/7.
 */
//js实现继承的方法
/**
 * 原型链接继承
 * @constructor
 */

console.log("+++++++++++++++++原型链接继承+++++++++++++++++");
function Super() {
    this.propery = true;
    this.color = ["red","green","3"]
}

Super.prototype.getSuperValue = function () {
    return this.propery;
};

Super.prototype.say = function () {
    console.log("hello!");
};


function Sub() {
    this.SubPropery = false;
}
//继承Super();
Sub.prototype = new Super();

Sub.prototype.getSubValue = function () {
    return this.SubPropery;
};

//重写父类方法
Sub.prototype.say = function () {
    console.log("china!");
};


var instance = new Sub();

console.log(instance.getSubValue());
console.log(instance.getSuperValue());

instance.color.push("black");
console.log(instance.color);

var instance2 = new Sub();          //原型链方式，在处理数组时会出现此问题。
console.log(instance2.color);


/**
 *
 * @param name
 * @constructor
 */
console.log("+++++++++++++++++借用构造函数的方式+++++++++++++++++");
function A(name) {
    this.name = name;
}

function B() {
    A.call(this, "张三");
    this.age = 22;
}

var B_b = new B();


console.log(B_b.name);
console.log(B_b.age);


/**
 *
 * @param name
 * @constructor
 */
console.log("+++++++++++++++++组合继承，原型链和构造函数的组合+++++++++++++++++");
function C(name) {
    this.name = name;
    this.color = ["red", "blue", "green"];
}

C.prototype.say = function () {
    console.log(this.name);
};

function D(name, age) {
    C.call(this, name);
    this.age = age;
}

D.prototype = new C();
D.prototype.constructor = D;

D.prototype.sayAge = function () {
    console.log(this.age);
};


var D_d = new D("张三", 22);

D_d.color.push("black");
D_d.sayAge();
D_d.say();
console.log(D_d.color);

var D_d2 = new D("王五", 23);

D_d2.sayAge();
D_d2.say();
console.log(D_d2.color);    //这种方式，可以解决原型链中 关于数组的问题。



