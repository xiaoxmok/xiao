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