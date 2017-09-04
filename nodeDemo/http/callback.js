/**
 * Created by xiaoxm on 2017/3/1.
 */
//事件回调

function lean(something){
    console.log(something);
}

function we(callback,something){
    something += " is cool";
    callback(something);
}

//实名调用函数
we(lean,"node");

//匿名调用函数
we(function(something){
    console.log(something);
},"jack");