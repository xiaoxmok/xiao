/**
 * jquery tab plugin
 * @authors 	Inman Shaw
 * @date    	2014-05-23 09:05:32
 * @version 	1.0.0
 */
 /* 	demo:
	<div class="tabs">
		<ul>
			<li class="tab-title"><a href="javascript:;">111</a></li>
			<li class="tab-title"><a href="javascript:;">222</a></li>
			<li class="tab-title"><a href="javascript:;">333</a></li>
		</ul>
		<div class="tab-cnt">1</div>
		<div class="tab-cnt">2</div>
		<div class="tab-cnt">3</div>
	</div>
	$(function(){
		// 1
		$('.tabs').tab();
		// 2
		$('.tabs').tab({
			beforeChange:function(o){
				// do something
			},
			afterChange:function(o){
				// do something
			}
		}); 
	});
*/
define(function($) {
 
	return function($) {  

		;(function($, window, undefined) {
			"use strict";
			$.fn.tab = function(options) {
				var defaults = {
					type: 		'click', 				// 触发方式
					title: 		'.tab-title', 			// tab标题class
					cnt: 		'.tab-cnt', 			// tab内容class
					titleActive: 'tab-title-active', 	// 标题激活样式
					cntActive: 	'tab-cnt-active', 		// 内容激活样式
					active: 		1, 					// 默认激活项（从1开始）
					beforeChange:null, 					// 触发前函数
					afterChange :null 					// 触发后函数
				};
				var opts = $.extend(defaults, options);
				// 切换方法
				var switchTab = function(o, idx){
					o.find(opts.title).removeClass(opts.titleActive).eq(idx).addClass(opts.titleActive);
					o.find(opts.cnt).removeClass(opts.cntActive).eq(idx).addClass(opts.cntActive);
					if(opts.afterChange) opts.afterChange(o);
				};
				// 初始化
				var init = function(o){
					o.find(opts.title).on(opts.type,function(){
						var idx = o.find(opts.title).index(this);
						if(opts.beforeChange) opts.beforeChange(o);
						switchTab(o, idx);
					});
				};
				return this.each(function(){
					var o = $(this);
					switchTab(o, opts.active - 1);
					init(o);
				});
			};
		})(jQuery);

	}

});