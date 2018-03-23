// 怎么判断两个对象相等？
// 非标准答案

var obj = {
    a: 1,
    b: 2
};

var obj1 = {
    a: 1,
    b: 2
};
var obj2 = {
    a: 1,
    b: 2
};
// 转换为字符串来判断。
console.log(JSON.stringify(obj)===JSON.stringify(obj1))
console.log(JSON.stringify(obj)===JSON.stringify(obj2))
console.log(JSON.stringify(obj),JSON.stringify(obj2))
