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
		
		//我的网通宝，与我的优惠劵展提示
		$(".myWT").hover(function(){
			$(this).attr("class","myWT-over");
			},function(){
			$(this).attr("class","myWT");
		});
		$(".myYH").hover(function(){
			$(this).attr("class","myYH-over");
			$(".myWT").addClass("borRT");
			},function(){
			$(this).attr("class","myYH");
			$(".myWT").removeClass("borRT");
		});
		
		//为首页右侧的价格显示做判断
		$(".shopCartList .price").each(function(){
			var long = false;
			$(this).find("em").each(function(){
				if($(this).text().length > 6){
					long = true;
					return false;
				}
			});
			if(long==true){
				$(this).addClass("long");
			}
			
		});

    });

});