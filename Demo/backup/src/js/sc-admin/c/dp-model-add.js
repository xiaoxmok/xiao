
define(function(require) {

    var $ = require('jquery');

    require('plugin/jquery.picker')($);
    require('plugin/jquery.picker.date')($);
    require('plugin/jquery.picker.lang')($);


    $(function(){
    	 //头部导航选中
        $('.mod-nav').find('nav>a').eq(1).addClass('active').siblings().removeClass('active');

        // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(1).find('dd').eq(1).find('a').toggleClass('active');

        

        // 日期控件
        $('.timepicker').each(function(){
            $(this).pickadate({
                format: 'yyyy-mm-dd'
            });  
        })

        $('.btn-submit').on('click', function(){
           
            // 获取按钮所在表单
            var form  = $(this).closest("form.add-form");
            // 表单提交
            
            form.submit();

        });
        
    });

});