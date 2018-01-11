
define(function(require) {

    var $ = require('jquery');

    $(function(){
    	 //头部导航选中
        $('.mod-nav').find('nav>a').eq(3).addClass('active').siblings().removeClass('active');

        // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(2).find('dd').eq(0).find('a').toggleClass('active');

        $('.btn-submit').on('click', function(){
           
            // 获取按钮所在表单
            var form  = $(this).closest("form.add-form");
            // 表单提交
            
            form.submit();

        });
        
    });

});