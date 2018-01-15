/*============================安全的类型检测===================================*/
//检测是否为数组
function isArray (value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}
//检测是否为函数
function isFunction (value) {
    return Object.prototype.toString.call(value) == "[object Function]";
}
//检测是否为正则表达式
function isRegExp (value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
}
/*===============================实现数组分块================================*/
function arrayChunk (array,process,context,delay) {
	if(delay) {
		interval = delay;
	} else {
		interval = 100;
	}
	setTimeout(function () {
		var item = array.shift();//取出下一个条目
		process.call(context,item);//处理下一个条目

		if (array.length > 0) {//若还有条目，则设置另一个定时器
			setTimeout(arguments.callee,interval);
		}
	},interval);
}
/*========================函数节流=============================*/
function throttle (method,context,delay) {
	clearTimeout(method.tId);
	method.tId = setTimeout(function () {
		method.call(context);
	},delay)
}
//用闭包实现函数节流
function throttle2 (fn,delay) {
	var timer = null;
	return function () {
		var context = this;
		var args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context,args);
		},delay);
	};
}