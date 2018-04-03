// 如何用js判断一个数组
{
    // 1.instanceof方法
    var arr = []
    var a = 33
    console.log(arr instanceof Array);
    console.log(a instanceof Array);
}
{
    // 2.constructor方法
    var arr = [];
    console.log(arr.constructor === Array);
}
{
    // 3.object.prototype.toString.call()
    var arr = [];
    console.log(Object.prototype.toString.call(arr) === '[object Array]')

    // 4.封装一个返回数据类型的方法
    var isType = function(obj){
        return Object.prototype.toString.call(obj).slice(8,-1);
    }
    console.log(isType(arr)) // Array
}
{
    // 5.ES6的isArray()
    var arr = []
    console.log(Array.isArray(arr))  // true

    var b = new Date()
    console.log(Array.isArray(b))    // false
}