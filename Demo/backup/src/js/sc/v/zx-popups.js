/**
 * 店铺装修-弹窗
 * @authors 	Inman Shaw
 * @date    	2014-06-18 15:30:05
 * @version 	1.0.0
 */

define(function (require, exports, module) {
	var $ = require('jquery');
	require('plugin/jquery.tab')($);
	require('plugin/jquery.popup')($);
	require('plugin/jquery.drag')($);

	$(function(){

		$('.tabs').tab();
		// $('.j-drag').drag();
		
		// 展开 收缩
		$('body').on('click','.group .lnk-flex', function(){
			var $target = $(this).closest('.group');
			if($target.hasClass('expand')) $target.removeClass('expand');
			else $target.addClass('expand');

			$(this).closest('.popup').css('height','auto');
		});

		// 调整弹层高度
		$('body').on('click','.popup .tab-title',function(){
			resetPopHeight($(this).closest('.popup'));
		});


		// 店铺招牌
		$('body').on('click','#popSignBoard input[name=sb]',function(){
			if($(this).data().type === 3){
				$('#popSignBoard').find('.default').hide();
				$('#popSignBoard').find('.custom').show();
			}else{
				$('#popSignBoard').find('.custom').hide();
				$('#popSignBoard').find('.default').show();
			}
		});

		// 导航
		$('.j-fake').fakeMask();
		

		// 添加自定义页面
		$('body').on('click','#lnk-addCustomPage',function(){
			$('#addPageList').addClass('hide');
			$('#addPageDetails').removeClass('hide');
			resetPopHeight('#popNav-add');
		});

		// 添加自定义页面详情
		$('body').on('click', '#lnk-return-addCustomPage', function(){
			$('#addPageDetails').addClass('hide');
			$('#addPageList').removeClass('hide');
			resetPopHeight('#popNav-add');
		});

		// 添加链接
		$('body').on('click','#lnk-addCustomPage2',function(){
			$('#addCusLinkList').addClass('hide');
			$('#addCusLinkDetails').removeClass('hide');
			resetPopHeight('#popNav-add');
		});

		// 添加链接详情
		$('body').on('click', '#lnk-return-addCustomPage2', function(){
			$('#addCusLinkDetails').addClass('hide');
			$('#addCusLinkList').removeClass('hide');
			resetPopHeight('#popNav-add');
		});

		// 商品推荐
		$('body').on('click','#popRecommend input[name=rdoRecom]',function(){
			if($(this).data().type === 2){
				$('#popRecommend').find('.default').addClass('hide');
				$('#popRecommend').find('.custom').removeClass('hide');
			}else{
				$('#popRecommend').find('.custom').addClass('hide');
				$('#popRecommend').find('.default').removeClass('hide');
			}
			resetPopHeight('#popRecommend');
		});


	});

	function resetPopHeight(pop){
		var $pop = $(pop);
		$pop.css('height','auto');
		var h = $pop.outerHeight();
		$pop.css('margin-top', -(h/2) +'px');
	}

	/*
		@name: 	fakeMask
		@desc: 	仿真蒙层交互
		@html: 	<div class="j-fake">
					<textarea class="j-fake-rel" name="" id="" cols="30" rows="10"></textarea>
					<div class="j-fake-mask">
						在此输入CSS代码，即可实现对导航样式的自定义
					</div>
				</div>
		@p.s.	css自定义
	 */
	(function($) {
		"use strict";
		$.fn.fakeMask = function(options) {
			return this.each(function(){
				$(document).on('click','.j-fake-mask',function(){
					var t = $(this);
					var p = t.closest('.j-fake');
					var r = p.find('.j-fake-rel');
					t.hide();
					r.focus();
				});
				$(document).on('blur','.j-fake-rel',function(){
					var t = $(this);
					var p = t.closest('.j-fake');
					var m = p.find('.j-fake-mask');
					if($.trim(t.val()) === '') m.show();
				});
			});
		};
	})(jQuery);

});