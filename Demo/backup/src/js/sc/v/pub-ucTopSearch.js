/**
 * 会员中心 买家中心 顶部搜索
 * @authors 谭子良
 * @date    2014-07-10 17:00:00
 * @version 1.0.0
 */

define(function(require, exports, module) {
 
	// 通过 require 引入依赖
	var $ = require('jquery');

	function setTab(){
		var _thisWrap = $(".pub-header-ucenter .search-area-options").find("ul");
		_thisWrap.hover(function(){
			$(this).addClass("over").find("li").show();
		},function(){
			$(this).removeClass("over").find("li").hide().eq(0).show();
		});
		_thisWrap.find("li").click(function(){
			var index = $(this).index();
			//console.log(index);
			if(index>0){
				$(this).parent("ul").children().hide();
				$(this).show();
				$(this).parent("ul").append($(this).parent("ul").children("li").eq(0));
				_thisWrap.find("input").val($(this).text());
			}
		})
		_thisWrap.find("li").hover(function(){
				var index = $(this).index();
				if(index>0){
					$(this).addClass("over");
				}
			},function(){
				$(this).removeClass("over");
		});
	}
	exports.setTab=setTab;	

});
