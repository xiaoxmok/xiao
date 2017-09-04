/**
 * Created by xiaoxiangmin on 2017/7/5.
 */

//斐波那契数列函数
//0,1,1,2,3,5,8,13……
function fib(num){
    if(num === 0) return 0;
    if(num === 1) return 1;
    return fib(num - 2) + fib(num -1);
}
//console.log(fib(2));




//n的阶乘
function factorial(num){
    if(num === 1) return 1;
    return factorial(num-1)*num;

    /*0099
    900
    9900
    999*/
}
//console.log(factorial.toString());


var v= 1;
function f(){
    v= 2;
    //console.log(v);
}
//f();

var o ={p1:'22',p2:'3424'};

var a = [2,3232,323]

/*console.log(Object.keys(o).length);
console.log(Object.getOwnPropertyNames(a).length);
console.log(o.valueOf());
console.log(o.toString());

console.log(Object.prototype.toString.call(a));
console.log(typeof a);
console.log(a instanceof Array);
console.log(Array.isArray(o));
console.log(Array.isArray(Object.keys(o)));*/

var b =a.map(function (n){
    return n+1;
});
//console.log(b);

b.forEach(function(n,i,arr){
    //console.log(n+"--"+i+"--"+arr);
    //n：数值；i:序列；arr：b的全部值；
});


