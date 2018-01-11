/**
 * jquery.imgUploadPreview
 * @authors 	Inman Shaw
 * @date    	2014-06-06 17:30:16
 * @version 	1.0.0
 */
 /* html:
<div class="upload-wrap">
	<a href="javascript:;" class="ui-btn-upload">
    	<span class="ui-btn ui-btn-s3 ui-btn-upload-view">上传图片</span>
    	<input type="file"  id="pIDimg1" name="pIDimg1" class="ui-btn-upload-trigger">
    </a>
</div>
'<ul class="upload-preview">'+
	'<li>'+
    	'<div class="img-preview">'+
    		'<img class="img-preview-img" src="'+src+'" alt="">'+
    		'<p class="img-preview-mask"></p>'+
    		'<p class="img-preview-btn">'+
    			'<a href="javascript:;" class="ui-btn ui-btn-s3 btn-upload-again">重新上传</a>'+
    		'</p>'+
    	'</div>'+
    	'<a href="javascript:;" class="upload-preview-delete">删除</a>'+
	'</li>'+
'</ul>';
*/

define(function() {
 
	return function($) {   

		;(function($, window, undefined) {
			"use strict";
			$.fn.imgUploadPreview = function(options) {
				var defaults = {
					uploadWrap: '.upload-wrap', 	// 上传区域块
					previewBtnTxt: '重新上传',
					src: 	'',						// 图片地址
					hideUploadBtn: true,			// 生成预览时，是否删除原来的上传按钮
					callback: 	function(){} 		// 回调函数
				};
				var opts = $.extend(defaults, options);
				return this.each(function(){
					var $this = $(this), 								// file button
						$btnWrap = $this.parent('a'), 					// .ui-btn-upload
						$uploadWrap = $this.closest(opts.uploadWrap), 	// upload & preview area
						$btnWrapClone = $btnWrap.clone();				// .ui-btn-upload clone

					// 清空		
					$btnWrapClone.find('input').val('');

					// 原来按钮
					if($btnWrap.parent().hasClass(opts.uploadWrap.replace('.',''))){
						var html = '';

						// 有预览层
						if($uploadWrap.find('.upload-preview').length>0){
							html = '<li>'+
							        	'<div class="img-preview">'+
							        		'<img class="img-preview-img" src="'+opts.src+'" alt="">'+
							        		'<p class="img-preview-mask"></p>'+
							        		'<p class="img-preview-btn"></p>'+
							        	'</div>'+
							        	'<a href="javascript:;" class="upload-preview-delete">删除</a>'+
						        	'</li>';
						    $uploadWrap.find('.upload-preview').prepend(html);
					    }
						// 无预览层
						else{
							html = '<ul class="upload-preview">'+
							        	'<li>'+
								        	'<div class="img-preview">'+
								        		'<img class="img-preview-img" src="'+opts.src+'" alt="">'+
								        		'<p class="img-preview-mask"></p>'+
								        		'<p class="img-preview-btn"></p>'+
								        	'</div>'+
								        	'<a href="javascript:;" class="upload-preview-delete">删除</a>'+
							        	'</li>'+
							        '</ul>';

						    if(opts.hideUploadBtn){ // 覆盖原来上传按钮
								$btnWrap.replaceWith(html);
							}else{
								$btnWrap.after(html);
							}
						}
						// 插入 上传按钮
						$btnWrapClone.find('span').text(opts.previewBtnTxt);
						$uploadWrap.find('.upload-preview').find('li').first().find('.img-preview-btn').html($btnWrapClone);
					}
					// 预览层的按钮
					else{
						$uploadWrap.find('.img-preview-img').attr('src', opts.src);
					}

					if(opts.callback) opts.callback;
					
				});
			};
		})(jQuery, window);

	}
 
return $.noConflict(); });