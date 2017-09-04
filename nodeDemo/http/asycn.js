/**
 * Created by xiaoxm on 2017/3/1.
 */
//同步、单线程


var c = 0;
function printIt(){
    console.log(c);
};

function plus(callback){
    setTimeout(function(){
        c +=1;
        callback();
    },1000);

};

plus(printIt);
//printIt();
