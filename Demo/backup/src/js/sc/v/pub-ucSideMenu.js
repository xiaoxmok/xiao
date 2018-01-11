/**
 * 会员中心 买家中心 左侧导航菜单
 * @authors 谭子良
 * @date    2014-07-10 17:00:00
 * @version 1.0.0
 */

define(function(require, exports, module) {
 
	// 通过 require 引入依赖
	var $ = require('jquery');

	function sMenu(){
		var _thisWrap = $(".uc-mod-sideMenu").find(".group h2");
		_thisWrap.find("i").click(function(){
			var bool = $(this).hasClass("in");
			if(!bool){
				$(this).addClass("in").parents(".group").find("ul").slideUp();
			}else{
				$(this).removeClass("in").parents(".group").find("ul").slideDown();
			}
		});
		
		$(".uc-mod-sideMenu .userMenu li").hover(function(){
			$(this).addClass("over");
			},function(){
			$(this).removeClass("over");
		});
		
	}
	exports.sMenu=sMenu;	

});
