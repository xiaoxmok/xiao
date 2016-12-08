$(document).ready(function(){
	$('button').bind("click", clickHandler);		//bind(事件，需要绑定的事件) 事件绑定
	$('button').bind("click", clickHandler1);
	$('button').unbind("clcik");					//unbind(事件，需要解除的事件) 解除绑定

	/*$('button').on("click", clickHandler);		//on(事件，需要绑定的事件) 事件绑定
	$('button').on("click", clickHandler1);
	$('button').off("clcik", clickHandler1);					//off(事件，需要解除的事件) 解除绑定*/
});

function clickHandler(e){
	console.log("恭喜发财")
}

function clickHandler1(){
	console.log("恭喜发财1111")
}