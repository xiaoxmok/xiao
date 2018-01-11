/**
 * 商场官方后台-系统管理-编辑配置信息
 * @authors Inman Shaw
 * @date    2014-07-16 17:54:53
 * @version 1.0.0
 */
define(function(require, exports, module) {

	var $ = require('jquery');

    var EditorOptions = {
        width: '50.7%',
        height: '300px'
    };

    $(function(){
    	//头部导航选中
        $('.mod-nav').find('nav>a').eq(3).addClass('active').siblings().removeClass('active');

        // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(0).find('dd').eq(0).find('a').toggleClass('active');

    })
    exports.EditorOptions = EditorOptions;

});
