window.onload=function(){

	window.onscroll=function(){
		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		var menu = document.getElementById("menu");
		var a = menu.getElementsByTagName("a");
		var main = document.getElementById("main");
		//var items = getClassName(main,"item");			//另一种写法
		var items = main.getElementsByTagName("div");
		

		var currentId = '';
		for(var i=0;i<items.length;i++){
			var itemTop = items[i].offsetTop - 300;
			//console.log("scrollTop:"+scrollTop);
			//console.log(items[i]+":"+itemTop);

			if(scrollTop > itemTop){
				currentId = items[i].id;
			}else{
				break;
			}
		};
		if(currentId){
			for(var j=0;j<a.length;j++){
				var href = a[j].href.split("#");
				if(href[href.length-1]!=currentId){
					a[j].removeAttribute("class");
				}else{
					a[j].setAttribute("class","current");
				}
			}
		}
	}
}

function getClassName(obj,cls){							//根据className获取元素
	var obj = obj.getElementsByTagName("*");
	var elemnt = [];
	for(var i=0;i<obj.length;i++){
		if(obj[i].className == cls){
			elemnt.push(element[i]);
		}
	}
	return elemnt;

}
