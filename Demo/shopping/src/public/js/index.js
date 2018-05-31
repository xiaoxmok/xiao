$(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        speed:1000,
        autoplay:{
            delay: 3000,//1秒切换一次
        },
        loop: true,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    })


    $.ajax({
        type:'GET',
        url:url+'/api/v1/banner/index',
        dataType:'json',
        success:function(data){
            console.log(data);
            if(data.code == 200){
                var imgArr = data.data;
                $('.swiper-wrapper').html('');
                imgArr.forEach(function(item,index){
                    var html = '<div class="swiper-slide">\n' +
                        '                <a href="'+item.link+'"><img src="'+item.img_info.url+'" alt=""></a>\n' +
                        '            </div>'
                    $('.swiper-wrapper').append(html);
                    console.log(item.img_info.url);
                })

            }
        },
        error:function(xhr,status,error){
            console.log(xhr,status,error);
        }

    })

})