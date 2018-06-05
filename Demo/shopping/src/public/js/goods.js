$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    var urlInfo = GetRequest();

    // 获取商品信息
    var getGoods = api.getGoods(urlInfo.id,i18nLanguage);
    $('#name').html(getGoods.name);
    $('#summary').html(getGoods.summary);

    // 加载SKU列表
    var getSkuList = api.getSkuList(getGoods.id,i18nLanguage);
    var getSkuListData = getSkuList.data;
    var getSkuListExtra = getSkuList.extra.param;

    function showSku(i){
        // 加载商品图片
        var imgArr = getSkuListData[i].img_infos;
        $('.swiper-wrapper').html('');
        $('.product .small').html('');
        imgArr.forEach(function(item,index){
            var html = '<div class="swiper-slide"><img src="'+item.url+'" alt=""></div>';
            $('.swiper-wrapper').append(html);

            var small = '<a href="javascript:;"><img src="'+item.url+'" alt=""></a>'
            $('.product .small').append(small);
        });

        // 加载sku商品信息

        $('#price').html(getSkuListData[i].price);
        $('#school_price').html(getSkuListData[i].school_price);



    };
    showSku(0);
    $('.series').html('');
    getSkuListData.forEach(function(item,index){
        var html;
        if(index === 0){
            html = '<a href="javascript:;" data-name="'+item.id+'" class="active">'+item.sku_no+'</a>';
        }else{
            html = '<a href="javascript:;" data-name="'+item.id+'">'+item.sku_no+'</a>';
        }
        $('.series').append(html);
    })

    /*getSkuListExtra.forEach(function(item,index){
        console.log(item,index);
    })*/

    for(var i in getSkuListExtra){
        console.log(i,getSkuListExtra[i]);
        var html = '<tr>\n' +
            '                        <td class="td1">'+getSkuListExtra[i].name+'：</td>\n' +
            '                        <td class="td2 color">\n' +
            '                            <a href="javascript:;" class="active" id="k1"></a>\n' +
            '                        </td>\n' +
            '                    </tr>';


    }

})