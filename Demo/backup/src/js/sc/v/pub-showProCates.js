/**
 * 页面导航 产品分类
 * @authors 谭子良
 * @date    2014-06-25 10:23:19
 * @version 1.0.0
 */

define(function(require, exports, module) {
 
	// 通过 require 引入依赖
	var $ = require('jquery');

	function showProCates(){
		$(".pub-nav-proCates").hover(function(){
			$(this).find(".pub-nav-proCatesCont").show(function(){
				$(this).find(".proItem").hover(function(){		
					var index = $(this).index();
					var len = $(this).parent().children().length;
					if(index>0){
						$(this).prev().addClass("proLast");
						$(this).find(".proItem-show-inlet").css({"top":index*46});
						$(this).removeClass("proLast").addClass("hover").siblings().removeClass("hover");
					}else{
						$(this).find(".proItem-show-inlet").css({"top":index*46});
						$(this).removeClass("proLast").addClass("hover").siblings().removeClass("hover");
					}
					//console.info(len);
				},function(){
					var index = $(this).index();
					var len = $(this).parent().children().length;
					if((index+1)==len){
						$(this).addClass("proLast");
					}else{
						$(this).removeClass("proLast");
						//console.info(index);
					}
					$(this).prev().removeClass("proLast");
				});
			});
		},function(){
			$(this).find(".pub-nav-proCatesCont").hide();
			$(this).find(".proItem").removeClass("hover");
		});
	}
	exports.showProCates=showProCates;	

});
