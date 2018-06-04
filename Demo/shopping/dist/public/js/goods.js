$(function(){
    if (!login()) {
        // location.href = "index.html"
    }

    var token = getCookie('token');

    var urlInfo = GetRequest();

    // 获取商品信息
    var getGoods = api.getGoods(urlInfo.id,i18nLanguage);
    // console.log(getGoods);


    // 加载商品图片
    var imgArr = getGoods.img_infos;
    $('.swiper-wrapper').html('');
    $('.product .small').html('');
    imgArr.forEach(function(item,index){

        var html = '<div class="swiper-slide"><img src="'+item.url+'" alt=""></div>';

        $('.swiper-wrapper').append(html);

        var small = '<a href="javascript:;"><img src="'+item.url+'" alt=""></a>'

        $('.product .small').append(small);
    });

    // 加载商品信息
    $('#name').html(getGoods.name);
    $('#summary').html(getGoods.summary);
    $('#price').html(getGoods.price);
    $('#school_price').html(getGoods.school_price);

})