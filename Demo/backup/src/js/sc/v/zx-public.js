/**
 * 店铺装修 公共js
 * @authors 	Inman Shaw
 * @date    	2014-06-09 12:02:50
 * @version 	1.0.0
 */
define(function (require, exports, module) {

	var $ = require('jquery');
	require('plugin/jquery.tab')($);
	require('plugin/jquery.popup')($);

	$(function(){

		// playground tabs 嵌套
		if($('.tabs').length > 0) $('.tabs').tab();
		if($('.inner-tabs').length > 0) $('.inner-tabs').tab({
			type: 			'mouseover',
			title: 			'.inner-tab-title',
			cnt: 			'.inner-tab-cnt',
			titleActive: 	'inner-tab-title-active',
			cntActive: 		'tab-cnt-active'
		});

		// settings hover
		$('.lnk-settings').hover(function(){
			$(this).addClass('lnk-settings-hover');
		},function(){
			$(this).removeClass('lnk-settings-hover');
		});
	});

	// 备份
	$('body').on('click','.lnk-backup',function(){
		if($('#popBackup').length<=0){
			$.ajax({
				url: "zx-pop-backup.html",
				type: 'GET',
				cache: false,
				dataType:'html',
				success: function(ret){
					$('body').append(ret);
					$('#popBackup').popup();
				}
			});
		}else{
			$('#popBackup').popup();
		}
	});

	// test 
	$('body').on('click','.btn-preview',function(){
		if($('#popAddMod').length<=0){
			$.ajax({
				url: "zx-pop-addMod.html",
				type: 'GET',
				cache: false,
				dataType:'html',
				success: function(ret){
					$('body').append(ret);
					$('#popAddMod').popup();
				}
			});
		}else{
			$('#popAddMod').popup();
		}
	});

	

});
