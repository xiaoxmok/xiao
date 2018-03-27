var a = require('./a')

console.log(a.x)
console.log(a.addX(6))
console.log(a.addY(6))


// commonjs 是同步操作的，必需加载完所有模块才执行以下操作，不适用于浏览器开发，但适用于服务器端开发。