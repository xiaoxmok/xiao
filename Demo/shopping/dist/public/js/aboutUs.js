$(function(){

    /*
    about：关于我们
    soft：教育软件推荐
    solution：解决方案
    news：咨询中心
    */

    // nav切换
    $('.nav .left li').click(function () {
        $('.nav .left li').removeClass('active');
        $(this).addClass('active');

        var category_id = $(this).attr('data-name');
        var html = '<li>Loading...</li>'
        $('.goods .content ul').html(html);
    })


    // 获取分类
    $.ajax({
        type:'GET',
        url:url+'/api/v1/category/get?alias=about',
        dataType:'json',
        success:function(data){
            if(data.code === 200){
                if(isEnglish()){
                    all ='<li class="active">All</li>';
                }else{
                    all ='<li class="active">全部</li>';
                }
                $('.nav .left ul').append(all);
                var category = data.data;
                category.forEach(function(item,index){
                    if(item.parent_id === 0){
                        var html = '<li data-name="'+item.id+'">'+item.name+'</li>'
                        $('.nav .left ul').append(html);
                    }
                })
            }
        },
        error:function(){}
    })

});