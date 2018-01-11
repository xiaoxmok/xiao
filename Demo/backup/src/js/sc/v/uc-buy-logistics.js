/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-07-28 17:43:28
 * @version $Id$
 */

define(function (require, exports, module) {

	var $ = require('jquery');
	require('plugin/jquery.tab')($);
	require('plugin/jquery.inputFocus')($);
	require('plugin/jquery.moreTip')($);

	$(function() {

		// 头部右侧搜索
		$('.search-area').tab({
			titleActive: 'current', 	        // 标题激活样式
			cntActive: 	'current' 		        // 内容激活样式
		});
		
		//搜索输入框得到焦点，与失去焦点
		$('.search-area').find(".text").inputFocus();    //进入焦点时
		

	});
			
});