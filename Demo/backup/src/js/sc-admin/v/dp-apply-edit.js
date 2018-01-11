/**
 * 商场官方后台-编辑申请信息
 * @authors Inman Shaw
 * @date    2014-07-17 09:55:07
 * @version 1.0.0
 */
define(function(require, exports, module) {

    var $ = require('jquery');
    /*
        图片上传后的操作(显示预览)
        @id:    上传控件ID
        @src:   预览图片地址
    */
    require('plugin/jquery.imgUploadPreview.js')($);
    require('plugin/jquery.popup.js')($);

    function afterImgUpload(id, src) {
        $(id).imgUploadPreview({
            src: src
        });
    }
    $(function(){
        //头部导航选中
        $('.mod-nav').find('nav>a').eq(1).addClass('active').siblings().removeClass('active');
        
        // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(0).find('dd').eq(0).find('a').toggleClass('active');

        // 审核弹层 切换效果
        $('#popShenhe').find('.rdo-sh').on('click', function(){
            var $this = $(this),
                sub = $('#popShenhe').find('.sub-form');
            if($this.hasClass('show-sub')){
                sub.slideDown(200);
            }else{
                sub.slideUp(200);
            }
        });
    });

    /*
     *  图片上传后的操作(显示预览)
     *  @id:    上传控件ID
     *  @src:   预览图片地址
     */
    exports.afterImgUpload = afterImgUpload;

});
