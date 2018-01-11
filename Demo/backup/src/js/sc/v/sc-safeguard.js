/**
 *
 * @authors 谭子良
 * @date    2014-05-21 13:53:24
 * @version 1.0.0
 */

define(function (require, exports, module) {

	var $ = require('jquery');
	require('plugin/jquery.tab')($);
	require('plugin/jquery.inputFocus')($);

	$(function() {

		// 头部右侧搜索
		$('.search-area').tab({
					titleActive: 'current', 	        // 标题激活样式
					cntActive: 	'current' 		        // 内容激活样式
		});

		$('.search-area').find(".text").inputFocus();    //进入焦点时

		//导航样果
		$("#navlist").find("li").hover(function() {
				$(this).addClass("hover");
		}, function() {
				$(this).removeClass("hover");
		});

		//导航显示子区块
		$("#navlist").find("li").click(function() {
				var n = $(this).index();
				$(this).parent().children().removeClass();
				$(this).addClass("current");
				$("#rel-navlist").children().hide();
				$("#rel-navlist").children().eq(n).show();
		});

		//跳转至详情介绍
		$("#indePage").find(".item:not(:last)").click(function() {
				var n = $(this).index() + 1;
				$("#navlist li").removeClass();
				$("#navlist li").eq(n).addClass("current");
				$("#rel-navlist").children().hide();
				$("#rel-navlist").children().eq(n).show();
				$(document).scrollTop(350);
		});

		//鼠标划过改变样式及跳转
		$("#indePage").find(".item:not(:last)").hover(function() {
				$(this).addClass("hover");
		}, function() {
				$(this).removeClass("hover");
		});
	});
			
});