/**
 * drag plugin
 * @authors 	Inman Shaw
 * @date    	2014-06-23 14:09:42
 * @version 	1.0.0
 */
define(function() {
 
	return function($) {  

		;(function($, window, undefined) {
			"use strict";
			$.fn.drag = function(options) {
				var defaults = {
					container: 	'.j-drag', 				// 要拖拽的块
					trigger: 	'.j-drag-trigger', 		// 触发拖拽的元素
					initStatus: '',
					beforeDrag:null, 					// 拖拽前回调
					afterDrag :null 					// 拖拽后回调
				};
				var opts = $.extend(defaults, options);
				var o,
					$doc = $(document),
					px,py;
				// 获取窗口大小
				var getWinWidth = function(o, idx){
					var obj = {};
			        //获取窗口宽度
			        if (window.innerWidth)
			            obj.width = window.innerWidth;
			        else if ((document.body) && (document.body.clientWidth))
			            obj.width = document.body.clientWidth;
			        //获取窗口高度
			        if (window.innerHeight)
			            obj.height = window.innerHeight;
			        else if ((document.body) && (document.body.clientHeight))
			            obj.height = document.body.clientHeight;

			        //通过深入Document内部对body进行检测，获取窗口大小
			        if (document.documentElement && document.documentElement.clientHeight &&
			            document.documentElement.clientWidth) {
			            obj.height = document.documentElement.clientHeight;
			            obj.width = document.documentElement.clientWidth;
			        }
			        return obj;
				};
				// 释放
				var release = function(){
					$doc.on('mouseup', function() {
			            $(opts.trigger).css("cursor", "default");
			            o.attr('style', opts.initStatus);
			            $doc.off("mousemove");
			        });
				};
				// mousedown
				var down = function(){
					o.on('mousedown',opts.trigger, function(e){
						opts.initStatus = o.attr('style');
						o.attr('style','position:relative;margin:0;z-index:3000');
			        	$(this).css("cursor", "move");

			        	px = e.pageX;
			        	py = e.pageY;
			        });
				};
				// mousemove
				var move = function(){
					var offset = o.offset(),
		            	x = px - offset.left,
		            	y = py - offset.top,
		            	win = getWinWidth(),
		            	r = win.width - o.outerWidth(),
		            	b = win.height - o.outerHeight();
					$doc.on("mousemove", o, function(ev) {
		                var _x = ev.pageX - x; // X轴方向移动的值
		                var _y = ev.pageY - y; // Y轴方向移动的值
		                // 左、上边界
		                if (_x <= 0) _x = 0;
		                if (_y <= 0) _y = 0;
		                // 右、下边界
		                if(_x >= r) _x = r;
		                if(_y >= b) _y = b;

		                o.css({
		                    left: _x + "px",
		                    top: _y + "px"
		                });
		            });
				};	
				// 初始化
				var init = function(){
					down();
					move();
			        release(o);
				};
				return this.each(function(){
					o = $(this);
					init();
				});
			};
		})(jQuery,window);

	}
 
return $.noConflict(); });