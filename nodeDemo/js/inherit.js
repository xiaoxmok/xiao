/**
 * Created by xiaoxm on 2017/5/7.
 */
//js实现继承的方法


var object={
    sleep:function(){

    },
    fond:function(){

    }
};

function animal(name){
    this.name= name || 'animal';
    var sleep=function(){
        console.log(this.name+"睡觉");
    }
}

animal.prototype.eat=function(food){
    console.log(this.name+" 吃 "+food);
};


//原型链继承
function Cat(){}

Cat.prototype = new animal();
Cat.prototype.name="猫";

var cat = new Cat();

//animal.sleep();
console.log(cat.name);
console.log(cat.eat('鱼'));
console.log(cat.sleep());
//console.log(cat instanceof animal);
//console.log(cat instanceof Cat);