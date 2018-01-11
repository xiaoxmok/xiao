/**
 * input 输入框获得焦点时，将默认value清空，当失去焦点时，将value 还原
 * @authors 谭子良
 * @date    2014-06-24 15:14:47
 * @version 1.0.0
 */

// html:
// <div class="search-area">
// ……
// <input class="text" name="" value="输入商品关键词" type="text">


define(function($) {
 
	return function($) {  

		;(function($, window, undefined) {
			"use strict";
			$.fn.hoverCss = function(options) {

				// 默认参数
				var defaults = {
					class:"hover"			// 进入焦点时input样式
				};
				var opts = $.extend(defaults, options);

				// 方法

				// 初始化
				var init = function(o){

					$(o).hover(function(){
						$(this).addClass(opts.class);
					},function(){
						$(this).removeClass(opts.class);
					});

				};

				// 绑定对象进行初始化
				return this.each(function(){
					var o = $(this);
					init(o);
				});

			};
		})(jQuery);

	}

});