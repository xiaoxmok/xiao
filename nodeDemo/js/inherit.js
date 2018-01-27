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
    this.color = ["red", "green", "3"]
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

//问题，方法都得要在构造函数中定义，因此函数的复用无从谈起，


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
    C.call(this, name);             //第一次调用父类
    this.age = age;
}

D.prototype = new C();              //第二次调用父类
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
console.log(D_d2.color);
//这种方式，可以解决原型链中 关于数组的问题。同样引出的问题时，两次调用父类，则子类创建了两次父类的name/color属性，
// 第一次在子类的D.prototype中得到name/color，第二次在创建D.prototype的对象中得到name/color，但会覆盖前一次得到的属性。


console.log("+++++++++++++++++原型式继承+++++++++++++++++");
function object(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
}

var person = {
    name: 'san',
    friends: ["Shelby", "Court", "Van"]
};

var another = object(person);
another.name = 'Greg';
another.friends.push("Rob");

var yetAnother = object(person);
yetAnother.name = 'Linda';
yetAnother.friends.push("Barbie");

console.log(person.friends);            //此方法创建多个实例时，数组情况下，会出问题。会覆盖原型对象上的同名属性。


console.log("+++++++++++++++++寄生式继承+++++++++++++++++");


console.log("+++++++++++++++++寄生组合式继承+++++++++++++++++");
function inheritPrototype(subType, superType) {         //较于原型链组合式继承区别于，不用第二次调用父类，则不会创建不必要的、多余的属性。
    var prototype = Object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function SuperType(name){
    this.name = name;
    this.colors = ["red","green","blue"];
}
SuperType.prototype.sayName=function(){
    console.log(this.name);
};

function SubType(name,age){
    SuperType.call(this,name);
    this.age=age;
}

inheritPrototype(SubType,SuperType);

SubType.prototype.sayAge=function(){
    console.log(this.age);
};

var sub = new SubType("san","33");
sub.sayAge();
sub.sayName();
sub.colors.push("block");
console.log(sub.colors);

var sub2 = new SubType();
console.log(sub2.colors);
