/**
 * Created by xiaoxm on 2017/5/13.
 */

var MyModules=(function Manager(){
    var modules=[];

    function define(name,deps,impl){
        //经测试for部分可有可无
        for(var i=0;i<deps.length;i++){
            deps[i]=modules[deps[i]];

        }
        modules[name]=impl.apply(impl,deps);
        //console.log("2"+modules[name]);

    }
    function get(name){
        return modules[name];
    }
    return {
        define:define,
        get:get
    };
})();

MyModules.define("bar",[],function(){
    function hello(who){
        return "Let me introduce: "+who;
    }
    return {
        hello:hello
    };
});

MyModules.define("foo",["bar"],function(){
    var hungry="english";
    function awesome(){
        console.log(bar.hello(hungry).toUpperCase());
    }
    return {
        awesome:awesome
    };
});



var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(bar.hello("china"));
foo.awesome();
