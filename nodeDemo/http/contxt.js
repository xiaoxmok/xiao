/**
 * Created by xiaoxm on 2017/3/1.
 */
//对象 this指向函数拥有者，同时只能在函数内部使用。
var pet={
    words:"美好的世界……",
    speak:function(){
        console.log(this.words);
        console.log(this === pet);
    }
};
pet.speak();

//---------------------------------

function pet1(words){
    this.words=words;
    console.log(this.words);
    console.log(this === global);
}
pet1("你好，世界");

//================================

function pet2(words){
    this.words=words;
    this.speak=function(){
        console.log(this.words);
        console.log(this);
    }
}

var cat = new pet2("miao");
cat.speak();

