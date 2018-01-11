
define(function(require) {

    var $ = require('jquery'),
        FE = require('sc-admin/v/xt-column');

    $(function(){

        // 确认批量删除
        $('#popDeleteConfirm').find('.btn-sure').on('click',function(){
            var inputArr = FE.getSelectArr(); // 已选择的元素dom对象 数组

            // todo
            console.log(inputArr);

            var ids = [];

            $.each(inputArr, function(){

                var id =  $(this).attr('id');
                if(id !=='') ids.push(id);

            });

            console.log(ids);

        });

        // 保存
        $('.btn-save').on('click',function(){
            // 结构未定..table? ul?
            // 组成json 
            // $.ajax({})
            return;
        })
        
    });

});