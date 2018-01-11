/**
 * 商场官方后台-系统管理-服务协议管理
 * @authors Inman Shaw
 * @date    2014-07-15 14:06:33
 * @version 1.0.0
 */
define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.popup')($);

    $(function() {
        //头部导航选中
        $('.mod-nav').find('nav>a').eq(2).addClass('active').siblings().removeClass('active');
        
        // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(1).find('dd').eq(0).find('a').toggleClass('active');

      
        // 修改
        $('.lnk-edit').on('click',function(){
            var $pop = $('#popEdit');
            $pop.popup({
                "esc": true
            });
        });

        
    });


});
