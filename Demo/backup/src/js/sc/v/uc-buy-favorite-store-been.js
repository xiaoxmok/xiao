/**
 * 模块标题说明
 * @authors 谭子良
 * @date    2014-06-27 15:22:05
 * @version 1.0.0
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
		$(".uc-mod-sideMenu").find("ul").eq(0).find("li").eq(2).addClass("current").append("<span></span>");
		
        // 显示店铺评分动态
        $(".uc-favorite-store").find(".info").hover(function(){
            $(this).find(".infoTip").show();
        },function(){
            $(this).find(".infoTip").hide();
        })


    });

});