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

// CSS:
// input { color:#999;}
// input.focus { color: #f30;}

// JS:
// $('.search-area').find(".text").inputFocus();    //焦点样式为 .focus
// $('.search-area').find(".text").inputFocus({focus:"focusCss"});    // 焦点样式为 .focusCss


define(function($) {
 
	return function($) {  

		;(function($, window, undefined) {
			"use strict";
			$.fn.inputFocus = function(options) {
				var defaults = {
					"focus":"focus"			// 进入焦点时input样式
				};
				var opts = $.extend(defaults, options);
				// 方法
				// 初始化
				var init = function(o){

					var normal_Val = $(o).val(); //取得input的value值
					$(o).on("focus",function(){
						$(o).addClass(opts.focus);
						var current_Val = $(o).val();
						if(current_Val==normal_Val){
							$(o).val("");
						}
					});		//加入焦点样式

					$(o).on("blur",function(){
						$(o).removeClass(opts.focus);
						var current_Val = $(o).val();
						if(current_Val==""){
							$(o).val(normal_Val);
						}
					});		//去掉焦点样式

				};
				return this.each(function(){
					var o = $(this);
					init(o);
				});
			};
		})(jQuery);

	}

});