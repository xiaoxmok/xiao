

$(function () {

    if(login()){
        var getUser = api.getUser(getCookie('token'));
        var getSchool = api.getSchool(getUser.school_info.id,i18nLanguage);

        // cookie记录学校
        getCookie("school", getSchool.name, {
            expires: 30,
            path: '/'
        });

        if(isEnglish()){
            $('.welcome').html('Dear '+getCookie('username')+' , Welcome to '+getCookie('school')+' page.');
        }else{
            $('.welcome').html('Dear '+getCookie('username')+'，欢迎访问'+getCookie('school')+'专属页面。');
        }
    }

    // 获取banner
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/banner/index',
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            if (data.code == 200) {
                var imgArr = data.data;
                $('.swiper-wrapper').html('');
                imgArr.forEach(function (item, index) {
                    var html = '<div class="swiper-slide">\n' +
                        '                <a href="' + item.link + '"><img src="' + item.img_info.url + '" alt=""></a>\n' +
                        '            </div>'
                    $('.swiper-wrapper').append(html);
                    //console.log(item.img_info.url);
                })
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
                })
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        }

    })

    // 获取商品分类
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/category/index?type=goods'+ '&lang=' + i18nLanguage,
        //url: url + '/api/v1/goods-category/index?id=' +''+ '&lang=' + i18nLanguage,
        dataType: 'json',
        async: false,
        success: function (data) {
            //console.log(data);
            var all;
            if (data.code === 200) {
                if(isEnglish()){
                    all ='<li class="all active" data-name="0">All</li>';
                }else{
                    all ='<li class="all active" data-name="0">全部</li>';
                }
                $('.nav .left ul').append(all);
                var category = data.data;
                category.forEach(function(item,index){
                    if(item.parent_id === 0){
                        var category_id=[];
                        category_id.push(item.id);
                        var categoryArr=item.children;
                        categoryArr.forEach(function(item,index){
                            category_id.push(item.id);
                        })

                        var html = '<li class="mac" data-name="'+category_id.join(',')+'">'+item.name+'</li>'
                        $('.nav .left ul').append(html);
                    }
                })
            } else {
            }
        },
        error: function () {

        }
    });


    // 获取商品列表
    var html = '<li>Loading...</li>'
    $('.goods .content ul').html(html);
    api.getGoodsList(0, 1, 20, '%2Bsale', i18nLanguage,redraw);

    //console.log(getAllGoods);

    function redraw(arr) {
        $('.goods .content ul').html('');
        var goodsArr = arr.data;
        var extra = arr.extra;

        goodsArr.forEach(function (item, index) {
            var loginPrice;
            if(isEnglish()){
                if (login()) {
                    loginPrice = '<p class="price"><span>School Special Offer：</span><em>￥' + toPrice(item.school_price) + '</em></p>'
                } else {
                    loginPrice = '<p class="price"><span>Education Special Offer：</span><em>￥' + toPrice(item.education_price) + '</em></p>'
                }
                var html = '<li>\n' +
                    '                    <a href="./product.html?id=' + item.id + '">\n' +
                    '                        <img src="' + item.img_infos[0].url + '" alt="">\n' +
                    '                        <div class="con">\n' +
                    '                            <p class="Title">' + item.name + '</p>\n' +
                    '                            <p class="description">' + item.summary + '</p>\n' +
                    '                            <p class="price"><span>MSRP：</span><del>￥' + toPrice(item.price) + '</del></p>\n' +
                    loginPrice +
                    '                        </div>\n' +
                    '                    </a>\n' +
                    '                </li>';
            }else{
                if (login()) {
                    loginPrice = '<p class="price"><span>学校优惠价：</span><em>￥' + toPrice(item.school_price) + '</em></p>'
                } else {
                    loginPrice = '<p class="price"><span>教育优惠价：</span><em>￥' + toPrice(item.education_price) + '</em></p>'
                }
                var html = '<li>\n' +
                    '                    <a href="./product.html?id=' + item.id + '">\n' +
                    '                        <img src="' + item.img_infos[0].url + '" alt="">\n' +
                    '                        <div class="con">\n' +
                    '                            <p class="Title">' + item.name + '</p>\n' +
                    '                            <p class="description">' + item.summary + '</p>\n' +
                    '                            <p class="price"><span>常规价格：</span><del>￥' + toPrice(item.price) + '</del></p>\n' +
                    loginPrice +
                    '                        </div>\n' +
                    '                    </a>\n' +
                    '                </li>';
            }

            $('.goods .content ul').append(html);
        });

        $('.goods .page #page').val(extra.page + '/' + extra.last_page)
    }

    // 全部
    //redraw(getAllGoods);


    // nav切换
    $('.nav .left li').click(function () {
        $('.nav .left li').removeClass('active');
        $(this).addClass('active');
        var category_id = $(this).attr('data-name');
        var html = '<li>Loading...</li>'
        $('.goods .content ul').html(html);

        api.getGoodsList(category_id, 1, 20, '%2Bsale', i18nLanguage,redraw)

    })


    // 排序 销量
    $('.nav .right .sales').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');
        var sort;
        if ($(this).hasClass('active')) {
            sort = '-sale';
            $(this).removeClass('active');
        } else {
            sort = '%2Bsale';
            $('.nav .right li').removeClass('active');
            $(this).addClass('active');
        }
        // console.log(category_id);
        api.getGoodsList(category_id, 1, 20, sort, i18nLanguage,redraw)
    });

    // 排序 价格
    $('.nav .right .price').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');
        var sort;
        if ($(this).hasClass('active')) {
            sort = '-price';
            $(this).removeClass('active');
        } else {
            sort = '%2Bprice';
            $('.nav .right li').removeClass('active');
            $(this).addClass('active');
        }
        // console.log(category_id);
        api.getGoodsList(category_id, 1, 20, sort, i18nLanguage,redraw)
    })

    // 排序 上架时间
    $('.nav .right .addedTime').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');
        var sort;
        if ($(this).hasClass('active')) {
            sort = '-created_at';
            $(this).removeClass('active');
        } else {
            sort = '%2Bcreated_at';
            $('.nav .right li').removeClass('active');
            $(this).addClass('active');
        }
        // console.log(category_id);
        api.getGoodsList(category_id, 1, 20, sort, i18nLanguage,redraw)
    })


    //翻页 首页
    $('.goods .page #first').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');

        api.getGoodsList(category_id, 1, 20, '%2Bprice', i18nLanguage,redraw)
    });

    //翻页 尾页
    $('.goods .page #last').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');
        var page = $('.goods .page #page').val();
        var pageArr = page.split('/');

        api.getGoodsList(category_id, pageArr[1], 20, '%2Bprice', i18nLanguage,redraw)
    });

    //翻页 上一页
    $('.goods .page #left').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');
        var page = $('.goods .page #page').val();
        var pageArr = page.split('/');
        if (pageArr[0] === '1') {
            api.getGoodsList(category_id, 1, 20, '%2Bprice', i18nLanguage,redraw)
        } else {
            api.getGoodsList(category_id, pageArr[0] - 1, 20, '%2Bprice', i18nLanguage,redraw)
        }
    });

    //翻页 下一页
    $('.goods .page #right').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');
        var page = $('.goods .page #page').val();
        var pageArr = page.split('/');
        if (pageArr[0] + 1 > pageArr[1]) {
            api.getGoodsList(category_id, pageArr[1], 20, '%2Bprice', i18nLanguage,redraw)
        } else {
            api.getGoodsList(category_id, pageArr[0] + 1, 20, '%2Bprice', i18nLanguage,redraw)
        }
    })
});