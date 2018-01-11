/**
 *
 * @authors 谭子良
 * @date    2014-05-21 13:53:24
 * @version 1.0.0
 */

define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.tab')();
    require('plugin/jquery.inputFocus')();
    require('plugin/jquery.sideFixed')();

    $(function() {

        //所有产品分类展示
        require.async('sc/v/pub-showProCates', function(showProCates) {
            showProCates.showProCates();
        });

        // 头部右侧搜索
        $('.search-area').tab({
            titleActive: 'current', // 标题激活样式
            cntActive: 'current' // 内容激活样式
        });

        $('.search-area').find(".text").inputFocus(); //进入焦点时

        $('.sc-mod-sideNav').sideFixed({
            positionType: 8,
            positionValue: [60, 300, 1000, 494]
        }); //右侧固定导航


    });

});