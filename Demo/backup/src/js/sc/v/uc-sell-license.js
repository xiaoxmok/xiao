/**
 * 
 * @authors jiangzhiqiang
 * @date    2014-08-21 17:36:22
 * @version $Id$
 */

define(function(require, exports, module) {

    var $ = require('jquery');

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
		$(".uc-mod-sideMenu").find("ul").eq(4).find("li").eq(5).addClass("current").append("<span></span>");

        // 头部导航选中 卖家中心 
        var current_li = $(".uc-head-nav").find("li").eq(1);
        current_li.find("a").addClass("current");
        current_li.siblings().find("a").removeClass("current");

    });

});
