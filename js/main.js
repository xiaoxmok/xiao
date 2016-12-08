

$(document).ready(function(){
	//alert('加载成功');
	//$('p').click(function(){			//click单击
	$('p').dblclick(function(){			//dblclick 双击
		$(this).hide();	
	})
	//$("p").mouseenter(function(){		//mouseenter鼠标移入
	/*$("p").mouseleave(function(){		//mouseleave鼠标移出
		$(this).hide();			
	})
*/
	$('#but1').click(function(){
		$('.p1').hide();
		$('.p2').text("更新成功");
		alert("删除成功");
	});
	
});