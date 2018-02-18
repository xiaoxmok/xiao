//变量的解构赋值
var [a, b, c] = [1, 2, 3];


var [foo = true] = [];
console.log(foo);

function f() {
    console.log("aaaa!");
}

let [x = f()] = [1];

console.log(x,a,b,c);