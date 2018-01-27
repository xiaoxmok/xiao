/**
 * Created by xiaoxm on 2017/4/29.
 */
//对象的练习


function Foo() {

}
Foo.prototype.name = "ksk ksk";
Foo.prototype.age = 24;
Foo.prototype.say = function(){
    console.log(this.name);
};
/*Foo.prototype={
    //name:"开外挂",
    age:24,
    sayHello:function(){
        console.log(this.name);
    }
};*/
var p1 = new Foo();
var p2 = new Foo();

//p1.sayHello();
p1.say();

console.log(p1.constructor);

console.log(p1.sayHello === p2.sayHello);

console.log(Object.getPrototypeOf(Array));
console.log(Foo.prototype.isPrototypeOf(p1));