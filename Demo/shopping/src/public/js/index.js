$(function(){

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
                        '                <img src="'+item.img_info.url+'" alt="">\n' +
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