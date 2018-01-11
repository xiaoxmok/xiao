/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-07-29 15:13:19
 * @version $Id$
 */

define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.moreTip')($);

    $(function() {

        //页面顶部商品与商铺搜索
        require.async('sc/v/pub-ucTopSearch',function(o) {
            o.setTab();
        });
        
        //页面左侧导航菜单分组展开与收起
        require.async('sc/v/pub-ucSideMenu',function(o) {
            o.sMenu();
        });
        
        //当前左侧菜单导航定位
        $(".uc-mod-sideMenu").find("ul").eq(0).find("li").eq(1).addClass("current").append("<span></span>");
        

    });

});