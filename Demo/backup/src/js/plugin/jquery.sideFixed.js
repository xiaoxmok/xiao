/**
 * input 页面固定在某一位置
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

// 参数对象说明
// 定位方式：positionTyper：1
// 1：左上对齐
// 2：右上对齐
// 3：右下对齐
// 4：左下对齐
// 5:上固定加内容左侧偏移
// 6 上固定加内容右偏移
// 7 上固定加内容左侧偏移，永远距底部一定固定值
// 8 上固定加内容右偏移，永远距底部一定固定值

// 定位数值：positionValue:[0,0,120] = [x,y] | [x,y,conterWidth,Offset,marginBottom]  
// x-水平方向左或右的值，y-垂直上或下的值 , Offset 偏移值 ， marginBottom 滚动到页面底部保持多少间距

// 网页显示第一屏高度内不显示 isHidenFirstScreen：false | true ；


//IE6防止打摆子 先在body上加上
// body {
//         background-image: url("http://my.wt.com/images/IconS/IconS_1256.png");
//         for IE6 防抖，也可以用一张图片URL，是否存在这文件无所谓
//         background-attachment: fixed;
//         /* 这句是关键之一：一定要fixed,不能用scroll */
// }

/* for IE6 
_left: expression(document.body.offsetWidth-this.offsetWidth-40);
_top: expression(documentElement.scrollTop + documentElement.clientHeight-this.offsetHeight-20);
_position: absolute;
for IE6 */


define(function() {
	return function() {  
		;(function($, window, undefined) {
			"use strict";
			$.fn.sideFixed = function(options) {
				var defaults = {
					positionType:1,	
					positionValue:[0,0,1000,0],	//left or right , top or bottom ,cont width , 保持与页面底部距离
					isHidenFirstScreen:false	//是否在第一屏时显示 默认不需要
				};
				var opts = $.extend(defaults, options);

				// IE 系列判断 并执行下面函数
				var ie6 = false;
				if(navigator.userAgent.indexOf("MSIE 6.0") > 0){ ie6 = true ; }
				var startY = 0 , percent = 0;
				// IE下滚动
				var ie6_Fixed = function(o){
					$(o).css({"position":"absolute",left:opts.positionValue[0] ,"top":opts.positionValue[1] + $(window).scrollTop()});
					$(document).scroll(function(){
						$(o).css({"top":opts.positionValue[1] + $(window).scrollTop()});
					});
				}

				// 方法
				var scrollAtutoFooter = function (o,x){
					var thisHeight = $(o).height();
					var winWidth = $(window).width();
					var winHeight = $(window).height();
					var bodyHeight = $(document.body).height();
					var bodyscrollTop = $(window).scrollTop();
					var baseHeight = bodyHeight - bodyscrollTop - winHeight;
					if (baseHeight < opts.positionValue[3]){
						$(o).css({"position":"absolute",x:((winWidth-opts.positionValue[2])/2) - opts.positionValue[0] ,"top":bodyHeight-thisHeight-opts.positionValue[3]});
					}else{
						$(o).css({"position":"fixed",x:((winWidth-opts.positionValue[2])/2) - opts.positionValue[0] ,"top":opts.positionValue[1]});
					}
				}

				// 初始化
				var init = function(o){
					var winWidth = $(window).width();
					var winHeight = $(window).height();
					var bodyHeight = $(document.body).height();
					var bodyscrollTop = $(window).scrollTop();
					//如果是IE6
					if(ie6){
						ie6_Fixed(o);
					}else{
						switch(opts.positionType){
							case 1:
								$(o).css({"left":opts.positionValue[0],"top":opts.positionValue[1]});
								break;
							case 2:
								$(o).css({"right":opts.positionValue[0],"top":opts.positionValue[1]});
								break;
							case 3:
								$(o).css({"right":opts.positionValue[0],"bottom":opts.positionValue[1]});
								break;
							case 4:
								$(o).css({"left":opts.positionValue[0],"bottom":opts.positionValue[1]});
								break;
							case 5:
								$(o).css({"left":((winWidth-opts.positionValue[2])/2) - opts.positionValue[0] ,"top":opts.positionValue[1]});
								break;
							case 6:
								$(o).css({"right":((winWidth-opts.positionValue[2])/2) - opts.positionValue[0] ,"top":opts.positionValue[1]});
								break;
							case 7:
								$(o).css({"left":((winWidth-opts.positionValue[2])/2) - opts.positionValue[0] ,"top":opts.positionValue[1]});
								$(document).scroll(function(){
									scrollAtutoFooter(o,"left");
								});
								$(window).resize(function(){
									scrollAtutoFooter(o,"left");
								})
								break;
							case 8:
								$(o).css({"right":((winWidth-opts.positionValue[2])/2) - opts.positionValue[0] ,"top":opts.positionValue[1]});
								$(document).scroll(function(){
									scrollAtutoFooter(o,"right");
								});
								$(window).resize(function(){
									scrollAtutoFooter(o,"right");
								})
								break;
							default: ;
						}
					}

				};
				//递归初始化
				return this.each(function(){
					var o = $(this);
					init(o);
				});
			};
		})(jQuery,window);
	}
});