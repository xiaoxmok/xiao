/**
 * Created by xiaoxm on 2017/4/26.
 */
/*(function(x){
    console.log(x);
})(3);*/

/*
for(var i=0;i<2;i++){
    setTimeout(function(){
       console.log(i);
    },0);
}

var j=0;
var k=j;
k=j++;
console.log(k);*/

function fun(m,n){
    console.log(n);
    return {
        fun:function(k){
            return fun(k,m);
        }
    }
}
var a=fun(0);
a.fun(1);
a.fun(2);
a.fun(3);

var b=fun(0).fun(1).fun(3);

var c=fun(0).fun(2);
c.fun(2);
c.fun(3);





