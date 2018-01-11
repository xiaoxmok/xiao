/**
 * select 	原生伪包装 rel: form-select.css
 * @authors 谭子良
 * @date    2014-05-27 13:49:01
 * @version 1.0.0
 */



// CSS STYLE:
// form.select.css
// .selectedShowSpan { }
// .selectedShowSpan.over , .selectedShowSpan:hover {}
// .selectedShowOpts {}
// .selectedShowOpts ul {}
// .selectedShowOpts li {}
// .selectedShowOpts li.hover , .selectedShowOpts li.selected{}



define(function() {
 
	return function() {  

		;(function($, window, undefined) {
			"use strict";
			$.fn.selectPluging = function(options) {
				//默认参数
				var defaults = {
					"width":"100px",
					"minWidth":"100px",						// CSS样式指定宽度
					"selectedShowSpan":"selectedShowSpan",	// 选中的文本存放容器 class样式
					"selectedShowOpts":"selectedShowOpts"	// 伪装列表容器 class样式
				};
				var opts = $.extend(defaults, options);
				// 方法
				var setTempID = function(){
					var d = new Date();
					var nRandom = (Math.random() * 1000000).toFixed(0);
					return Math.floor(d.getTime() + nRandom) ;
				}
				// 初始化
				var init = function(o,s){
					var tempID = setTempID();
					o.hide(); //隐藏select控件
					//在自己后面插入伪装容器
					var _sVal = o.find("option:selected").text();
					var _sTr = '<span id="sid_'+ tempID +'" class="' + opts.selectedShowSpan + '" style="width:' + opts.width + ';min-width:'+opts.minWidth+';">'+_sVal+'</span>';
					o.after(_sTr);				//插入伪装容品
					var _sSpan = $("#sid_"+tempID);
					//select change时
					o.on("change",function(){
						var _value = $(this).find("option:selected").text();
						if(_value){
							_sSpan.html(_value);
						}else{
							_value = $(this).find("option").eq(0).text();
							_sSpan.html(_value);
						}
					})
					//绑定点击事件，弹出伪装select列表
					_sSpan.click(function(){

						$(this).addClass("over");
						//组装 options list 弹出层
						var _ops = o.find("option");
						var _opsUl = '<div id="id_' + tempID + '" class="'+ opts.selectedShowOpts +'"><ul>' ;
						for(var k=0; k < _ops.length; k++){
							var _li = '<li>'+_ops[k].text+'</li>';
							_opsUl += _li ;
						}
						_opsUl += "</ul></div>";

						//设置伪装select列表的位置
						var _offset = $(this).offset();
						var _paddingL = parseInt( $(this).css("padding-left"));
						var _paddingR = parseInt( $(this).css("padding-right"));
						var _paddingT = parseInt( $(this).css("padding-top"));
						var _paddingB = parseInt( $(this).css("padding-bottom"));
						var _width = $(this).width() + _paddingL + _paddingR;
						var _height = $(this).height() + _paddingT + _paddingB + 1;

						//显示伪装select列表
						$("body").append(_opsUl);
						var _tempUL = $("#id_" + tempID );
						_tempUL.css({width:_width, top: _offset.top + _height, left: _offset.left}).show();
						var _h = o.attr("h")?o.attr("h"):0; 	//定义选中项的滚动高度
						_tempUL.find("ul").scrollTop(_h);		//定位上次选中位置
						var _selectedIndex = s.selectedIndex;		//当前选中索引
						_tempUL.find("li").eq(_selectedIndex).addClass("selected");
						_tempUL.mousedown(function(){ return false ;});	
						_tempUL.find("li:not(.selected)").mouseover(function(){$(this).siblings(":not(.selected)").removeClass();$(this).addClass("hover");}).mouseout(function(){$(this).removeClass();});
						
						//伪装列表被选中时
						_tempUL.find("ul").scroll(function(){
							var scroll_height = $(this).scrollTop();
							o.attr("h",scroll_height);
						});

						_tempUL.find("li").click(function(){
							//为selected添加标记
							var TempVal = _sSpan.text();
							var NewVal = $(this).text();
							if(NewVal!=TempVal){
								var _index = $(this).parent("ul").find("li").index(this);
								s.value = s.options[_index].value;
								s.options[_index].selected = true;
								o.trigger('change');
								_sSpan.text($(this).text());
								_sSpan.removeClass("over");
								$(this).siblings().removeClass();
								_tempUL.remove();
							}else{
								_sSpan.removeClass("over");
								_tempUL.remove();
							}
						});

						//在外面单击隐藏
						$(document).mousedown(function(){
							_tempUL.remove();
							_sSpan.removeClass("over"); 
						});
						$(window).resize(function(){
							_tempUL.remove();
							_sSpan.removeClass("over"); 
						});

					});

				};

				//绑定JQ循环
				return this.each(function(){
					var o = $(this);
					init(o,this);
				});

			};
		})(jQuery);

	}

});