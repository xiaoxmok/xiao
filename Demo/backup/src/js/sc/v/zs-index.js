/**
 * zs-index.js 商场 招商 首页
 * @authors 	Inman Shaw
 * @date    	2014-06-04 14:20:55
 * @version 	1.0.0
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    $(function() {

        // 开店类型选择（悬浮、点击）
        $('.shop-types').find('.item-wrap').find('dl').hover(function() {
            $('.shop-types').find('.item-wrap').find('dl').removeClass('hover');
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });

    });
});