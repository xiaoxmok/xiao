/**
 * Created by xiaoxiangmin on 2018/1/5.
 */

var myObject = {};

Object.defineProperty(myObject, "a", {
    value: 2,
    enumerable: true
});

Object.defineProperty(myObject, "b", {
    value: 3,
    enumerable: false
});

 console.log(myObject.b);
 console.log("b" in myObject);
 console.log(myObject.hasOwnProperty("b"));
 console.log(myObject.propertyIsEnumerable("b"));
 console.log(Object.getOwnPropertyNames(myObject));
 console.log(Object.keys(myObject));

for (var key in myObject) {
    console.log(key,myObject[key]);
}


console.log("+++++++++++++++++++++++");
var arr = [1,2,3,4,5,4,3,2,1];

var a = arr.some(function (elem, i, arr) {
    return elem >= 3;
});

console.log(a);

var b = arr.every(function (elem, index, arr) {
    return elem >=3;
});

console.log(b);

var c = arr.map(function(n){
    return n+3;
});
console.log(c);

var d = arr.map(function(elem,index,arr){
    return elem*2;
});
console.log(d);

var out=[];
var e = arr.forEach(function(n,i,arr){
   //console.log(i+":"+n);
   this.push(n+1)
},out);
console.log(out);

var f = arr.filter(function(elem,i,arr){
    return elem >=4;
});
console.log(f);
var g = ['a', 'b', 'c'];

var h= g.slice(1); // ["a", "b", "c"]
console.log(g);
console.log(h);