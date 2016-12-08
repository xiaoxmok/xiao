//********************************基本************************************//

function person(name){					//构造一个person类
	this.name=name;
}
person.prototype.say=function(name){		//添加一个方法
	alert("你好中国！="+this.name);
}


function student(name){
	this.name=name;
}

student.prototype=new person();		//继承person类

var superSay = student.prototype.say;

student.prototype.say=function(){		//复写父类的一个方法
	superSay.call(this);				//如果想调用父类的say,就用这种方法
	alert("studnet say hello!="+this.name)
}


var s = new student("china");				//实例化student类
//s.say();


//*******************************封装**********************************//

(function(){						//封装，，格式(function(){……}())
	function p(){

	}
	p.prototype.hi=function(){
		alert("p--say hi!");
	}
	window.p = p;							//通过window让外部调用;
}());

(function(){
	function s(){

	}
	s.prototype=new p();
	var superP=s.prototype.hi;
	s.prototype.hi=function(){
		superP.call(this);
		alert("s--say hi!");
	}
	window.s=s;
}());
var s1 =new s();
//s1.hi();



//*******************************************************************//

(function(){
	function son(name){
		var _this={};
		_this.name=name					//创建一个空对象;
		_this.sayHello=function(){
			alert("son say hello "+_this.name);
		}
		return _this;
	};
	window.son=son;						//必需要赋为窗口，不然处部无法调用;
})();									//不同的写法
	
function father(name){
	var _this=son(name);
	var superSon = _this.sayHello;
	_this.sayHello=function(){
		superSon.call(_this);
		alert("father say hello! "+_this.name);
	}
	return _this;
}

var f = new father("张三");
f.sayHello();






(function(){

	var a = "你好中国！"
	//alert(a);
})();










