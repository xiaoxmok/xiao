/**
 * input 当前位置弹窗小提示
 * @authors 谭子良
 * @date    2014-06-24 15:14:47
 * @version 1.0.0
 */

// html:
//<div class="mod-more">
//	<div class="moreText">更多</div>
//	<div class="moreTip">
//		网通宝交易号：20130824110782567500<br>
//		下单时间：2014-03-09  14：56
//		<span class="sTriangle"></span>
//	</div>
//</div>

// CSS:
// pub-moreTip.css

// JS:
// $('.mod-more').tipShow({width:'240'});


define(function() {
 
	return function() {  

		;(function($, window, undefined) {
			"use strict";
			$.fn.tipShow = function(options) {
				var defaults = {
					width:240,		// 默认小弹窗宽度
					moreText:".moreText",  // 默认显示文字 用以定位弹窗位置
					moreTip:".moreTip",  // 弹窗class名称
					x:-10,	//偏移值
					y:25	//偏移值
				};
				var opts = $.extend(defaults, options);
				// 方法
				
				// 初始化
				var init = function(o){
					$(o).hover(function(){
						$(this).addClass("over");
						var offset = $(this).find(opts.moreText).offset();
						$(this).find(opts.moreTip).css({width:opts.width,left:offset.left+opts.x,top:offset.top+opts.y});
					},function(){
						$(this).removeClass("over");
					});
				};
				return this.each(function(){
					var o = $(this);
					init(o);
				});
			};
		})(jQuery);

	}

});