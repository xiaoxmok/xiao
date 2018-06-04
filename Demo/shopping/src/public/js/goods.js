$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    var urlInfo = GetRequest();

    // 获取商品信息
    var getGoods = api.getGoods(urlInfo.id,i18nLanguage);
    // console.log(getGoods);

    // 加载SKU列表
    var getSkuList = api.getSkuList(getGoods.id,i18nLanguage);


    function showSku(i){
        // 加载商品图片
        var imgArr = getSkuList[i].img_infos;
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
        $('#price').html(getSkuList[i].price);
        $('#school_price').html(getSkuList[i].school_price);



    };
    showSku(0);
    $('.series').html('');
    getSkuList.forEach(function(item,index){
        var html;
        if(index === 0){
            html = '<a href="javascript:;" data-name="'+item.id+'" class="active">'+item.sku_no+'</a>';
        }else{
            html = '<a href="javascript:;" data-name="'+item.id+'">'+item.sku_no+'</a>';
        }
        $('.series').append(html);
    })

})