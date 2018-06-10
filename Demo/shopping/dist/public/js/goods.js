$(function () {


    // start
    var token = getCookie('token');

    var urlInfo = GetRequest();

    // 获取商品信息
    var getGoods = api.getGoods(urlInfo.id, i18nLanguage);
    $('#name').html(getGoods.name);
    $('#summary').html(getGoods.summary);

    // 加载SKU列表
    var getSkuList = api.getSkuList(getGoods.id, i18nLanguage);
    var getSkuListData = getSkuList.data;
    var getSkuListExtra = getSkuList.extra.param;

    $('.introduce').html(getGoods.introduce);


    function showSku(i) {
        // 加载商品图片
        var imgArr = getSkuListData[i].img_infos;
        $('.swiper-wrapper').html('');
        $('.product .small').html('');
        imgArr.forEach(function (item, index) {
            var html = '<div class="swiper-slide"><img src="' + item.url + '" alt=""></div>';
            $('.swiper-wrapper').append(html);

            var small = '<a href="javascript:;" class="link"  data-name="'+index+'"><img src="' + item.url + '" alt=""></a>'
            $('.product .small').append(small);
        });

        // 加载sku商品信息

        $('#price').html(getSkuListData[i].price);
        $('#school_price').html(getSkuListData[i].school_price);

        var mySwiper = new Swiper('.swiper-container', {
            speed: 1000,
            autoplay: {
                delay: 3000,//1秒切换一次
            },
            loop: true,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
        });

        $('.small').on('click','.link',function(){
            var i = parseInt($(this).attr('data-name'))+1;
            // $('.swiper-pagination span').eq(i).trigger('click');
            mySwiper.slideTo(i, 1000, false);
        })

    };

    // 默认显示sku_id的第一条数据;
    showSku(0);
    var sku_id = getSkuListData[0].id;

    var order_items = [{
        sku_id: sku_id,
        quantity: $('#quantity').val()
    }]

    // 显示param值，颜色、尺寸、形状、规格等
    for (var i in getSkuListExtra) {
        //console.log(i,getSkuListExtra[i]);
        if (getSkuListExtra[i].value !== undefined) {
            var valueArr = getSkuListExtra[i].value;
            var param
            valueArr.forEach(function (item, index) {
                if (index === 0) {
                    param = '<a href="javascript:;" data-name="' + i + '" class="active">' + item + '</a>';
                } else {
                    param += '<a href="javascript:;" data-name="' + i + '">' + item + '</a>';
                }
            });
            // console.log(value);
            var html = '<tr>\n' +
                '                        <td class="td1">' + getSkuListExtra[i].name + '：</td>\n' +
                '                        <td class="td2 ' + i + '">\n' +
                param +
                '                        </td>\n' +
                '                    </tr>';

            $('.param').append(html);
        }
    }
    ;

    // sku param值的切换,并且获得sku_id

    $('.param .td2').on('click', 'a', function () {
        $(this).parent().find('a').removeClass('active');
        $(this).addClass('active');

        /*var index = $('.param tr .td2').index('.td2');
        console.log('index',index);*/
        var param_value = {};
        var i = 0;

        for (var i in getSkuListExtra) {
            //console.log(i,getSkuListExtra[i]);
            if (getSkuListExtra[i].value !== undefined) {
                param_value[i] = $('.' + i).find('.active').html();
            }
        }
        ;

        getSkuListData.forEach(function (item, index) {
            if (isEqual(item.param_value, param_value)) {
                sku_id = item.id;
                i = index;
            }
        });
        showSku(i);

        order_items = [{
            sku_id: sku_id,
            quantity: $('#quantity').val()
        }]
        //console.log(param_value);
        //console.log(sku_id);
    });

    // 加入购物车
    $('.add').click(function () {
        if (!login()) {
            $('.zhezhao').show();
            $('.tan2 .con p').html('请登录。。。');
            $('.tan2').show();
            setTimeout(function () {
                //location.href = "cart.html"
                $('.zhezhao').hide();
                $('.tan2').hide();
                location.href = "login.html"
            }, 1000);
        }else{
            var quantity = $('#quantity').val();
            var flag = true;
            api.getCartList(getCookie('userId'), i18nLanguage,function(getCartList){
                getCartList.forEach(function (item, index) {
                    if (item.sku_id === sku_id) {
                        flag = false;
                    }
                });

                if (flag) {
                    console.log('quantity', quantity);
                    var createCart = api.getCartCreate(getCookie('userId'), sku_id, quantity);
                    if (createCart.code === 200) {
                        $('.zhezhao').show();
                        $('.tan2 .con p').html('加入购物车成功');
                        $('.tan2').show();
                        //优化 做成异步的方式
                        api.getCartList(getCookie('userId'), i18nLanguage,function(getCartList){
                            $('.cart .count').html(getCartList.length);
                        });
                        setTimeout(function () {
                            //location.href = "cart.html"
                            $('.zhezhao').hide();
                            $('.tan2').hide();
                        }, 1000);
                    }
                } else {
                    $('.zhezhao').show();
                    $('.tan2 .con p').html('该商品已经加入购物，请去购物车下单');
                    $('.tan2').show();
                    setTimeout(function () {
                        //location.href = "cart.html"
                        $('.zhezhao').hide();
                        $('.tan2').hide();
                    }, 1000);
                }
            });


        }
    });


    // 立即购买
    $('.buy').click(function () {
        //console.log(order_items);
        //location.href = "submitOrder.html?order_items="+JSON.stringify(order_items);

        if (!login()) {
            $('.zhezhao').show();
            $('.tan2 .con p').html('请登录。。。');
            $('.tan2').show();
            setTimeout(function () {
                //location.href = "cart.html"
                $('.zhezhao').hide();
                $('.tan2').hide();
                location.href = "login.html"
            }, 1000);
        }else{
            var param = ''
            order_items.forEach(function(item,index){
                if(index === 0){
                    param += 'goods'+index+'='+item.sku_id+'_'+item.quantity
                }else{
                    param += '&goods'+index+'='+item.sku_id+'_'+item.quantity
                }
            });
            location.href = "submitOrder.html?"+param;
        }
    });

    // 加入收藏
    $('.collect').click(function () {

    });

    // 页面的操作

    $('.contact ').click(function () {
        $('.zhezhao').show();
        $('.tan1').show();
    });
    $('.cls ').click(function () {
        $('.zhezhao').hide();
        $('.tan1').hide();
    });


    var value = $('.btnNum .text').val();
    //console.log(value);
    $('.btnNum .less').click(function () {
        if (value > 1) {
            value--;
            $('.btnNum .text').attr('value', value);
        }
        order_items = [{
            sku_id: sku_id,
            quantity: $('#quantity').val()
        }]
    });
    $('.btnNum .plus').click(function () {
        value++;
        $('.btnNum .text').attr('value', value);
        order_items = [{
            sku_id: sku_id,
            quantity: $('#quantity').val()
        }]
    });

    $('.productNav li').click(function () {
        var index = $(this).index();

        $('.productDetail').hide().eq(index).show();
        $('.productNav li').removeClass('active');
        $(this).addClass('active');
    })
})