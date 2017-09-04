/**
 * Created by xiaoxm on 2017/3/1.
 */
//事件模块

var EventEmitter = require('events').EventEmitter;

var life= new EventEmitter;

//设置life事件最大监听，默认监听数据为10，超出则会出现内存泄漏
life.setMaxListeners(11);

function water(who){
    console.log("给"+who+"倒水1");
};
life.on("girl",water);

life.on("girl",function(who){
    console.log("给"+who+"倒水2");
});
life.on("girl",function(who){
    console.log("给"+who+"倒水3");
});
life.on("girl",function(who){
    console.log("给"+who+"倒水4");
});
life.on("girl",function(who){
    console.log("给"+who+"倒水5");
});
life.on("girl",function(who){
    console.log("给"+who+"倒水6");
});
life.on("girl",function(who){
    console.log("给"+who+"倒水7");
});
life.on("girl",function(who){
    console.log("给"+who+"倒水8");
});
life.on("girl",function(who){
    console.log("给"+who+"倒水9");
});
life.on("girl",function(who){
    console.log("给"+who+"倒水10");
});
life.on("girl",function(who){
    console.log("给"+who+"倒水11");
});

life.on("boy",function(who){
    console.log("给"+who+"买衣服");
});
life.on("boy",function(who){
    console.log("给"+who+"交工资");
});

//life.emit("girl","汉子");
//life.emit("boy","妹子");

//移除事件监听
life.removeListener("girl",water);      //单个删除
life.removeAllListeners('girl');              //删除所有

//判断事件是否被监听,监听为:true,否则为：false;
var hasListener1=life.emit("girl","汉子");
var hasListener2=life.emit("boy","妹子");
var hasListener3=life.emit("girl1","汉子");

//查看当前监听数
console.log(life.listeners('girl').length);
console.log(EventEmitter.listenerCount(life,"boy"));

console.log(hasListener1);
console.log(hasListener2);
console.log(hasListener3);
