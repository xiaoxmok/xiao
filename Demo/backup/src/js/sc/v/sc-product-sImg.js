/**
 * 模块标题说明
 * @authors 谭子良
 * @date    2014-06-27 15:22:40
 * @version 1.0.0
 */

define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.tab')($);
    require('plugin/jquery.inputFocus')($);
    require('plugin/jquery.hoverCss')($);

    $(function() {

        // 头部右侧搜索
        $('.search-area').tab({
            titleActive: 'current', // 标题激活样式
            cntActive: 'current' // 内容激活样式
        });

        $('.search-area').find(".text").inputFocus(); //进入焦点时

        //所有产品分类展示
        require.async('sc/v/pub-showProCates', function(showProCates) {
            showProCates.showProCates();
        });

        //为列表产品添加鼠标移上去的效果
        $(".sc-mod-smallPhotoProList ul > li").hoverCss();


    });

});