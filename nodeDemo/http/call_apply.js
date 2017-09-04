/**
 * Created by xiaoxm on 2017/3/1.
 */
//call,apply

/*
call方法:
    语法：call([thisObj[,arg1[, arg2[,   [,.argN]]]]])
定义：调用一个对象的一个方法，以另一个对象替换当前对象。
说明：
call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。
如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。

apply方法：
语法：apply([thisObj[,argArray]])
定义：应用某一对象的一个方法，用另一个对象替换当前对象。
说明：
如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。
如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。
*/


var pet={
    words:"世界很美好",
    speak:function(say){
        console.log(say+" "+this.words);
    }
};

pet.speak("speak");

var dog={
    words:"世界很美，正好你有空！"
};

pet.speak.call(dog,"speak");
pet.speak.apply(dog,['speak']);



//==================实现继承=====
function pet1(words){
    this.words=words;
    this.speak=function(){
        console.log(this.words);
    }
}

function dog1(words){
    //pet1.call(this,words);
    pet1.apply(this,arguments);

};

var dog1=new dog1("世界很美，正好你有空。");
dog1.speak();