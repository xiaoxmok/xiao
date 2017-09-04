/**
 * Created by xiaoxm on 2017/5/8.
 */

/*(function foo(){
    var a=3;
    console.log(a);
})();
console.log(a);*/

function module(id){
    var something="cool";
    var another=[1,2,4,3];
    function doSomething(){
        console.log(id);
    }
    function doAnother(){
        console.log(another.join("-"));
    }
    return{
        s:doSomething,
        a:doAnother
    };
}

var foo=module(33);
foo.s();
foo.a();


//================================
var fun =(function cool(id){
    function change(){
        publicAPI.fun1=fun2;
    }
    function fun1(){
        console.log(id);
    }
    function fun2(){
        console.log(id.toUpperCase());
    }
    var publicAPI={
        change:change,
        fun1:fun1
    };
    return publicAPI;
})('hello');

fun.fun1();
fun.change();
fun.fun1();
