/**
 * 商场 招商 开店流程 店铺类型描述 公用js
 * @authors 	Inman Shaw
 * @date    	2014-06-05 17:01:50
 * @version 	1.0.0
 */

define(function (require, exports, module) {

	var $ = require('jquery');
	require('plugin/jquery.tab')($);

	$(function(){
		$('.tabs').tab({
			title: 			'.ui-mv-item',
			cnt: 			'.tab-cnt',
			titleActive: 	'ui-mv-active',
			cntActive: 		'tab-cnt-active'
		});
	})

});