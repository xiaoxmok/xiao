$(function () {

    /*
    about：关于我们
    soft：教育软件推荐
    solution：解决方案
    news：咨询中心
    */

    var pathname = window.location.pathname;
    var urlArr = pathname.split('/');
    var name = urlArr[2].slice(0, -5);
    var category_id;
    var parent_id
    //console.log(name);
    var alias;
    if(name === 'aboutUs'){
        alias = 'about';
        category_id = 137;
        parent_id = 123;
    }else if(name === 'eduSoftware'){
        alias = 'soft';
        category_id = 135;
        parent_id = 120;
    }else if(name === 'solution'){
        alias = 'solution';
        category_id = 134;
        parent_id = 122;
    }else if(name === 'information'){
        alias = 'news';
        category_id = 136;
        parent_id = 118;
    }

    // 获取banner
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/banner/index?category_id='+category_id,
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

    // 获取分类
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/category/index?type=article&lang=' + i18nLanguage+'&parent_id='+parent_id,
        dataType: 'json',
        success: function (data) {
            if (data.code === 200) {

                //$('.nav .left ul').append(all);
                var category = data.data;
                var allId = [];
                var html = '';
                category.forEach(function (item, index) {
                    allId.push(item.id);
                    html += '<li data-name="' + item.id + '">' + item.name + '</li>';
                })
                if (isEnglish()) {
                    all = '<li data-name="' + allId.join(',') + '" class="active">All</li>';
                } else {
                    all = '<li data-name="' + allId.join(',') + '" class="active">全部</li>';
                }
                $('.nav .left ul').append(all + html);

                api.getArticleList(allId.join(','), 1, 20, i18nLanguage, redraw);



            }
        },
        error: function () {
        }
    });

    function redraw(data) {
        $('.goods .content ul').html('');
        var dataArr = data.data;
        if (dataArr.length > 0) {
            dataArr.forEach(function (item, index) {
                var url;
                if(item.poster_info !== null){
                    url = item.poster_info.url;
                }else{
                    url = ''
                }


                var html = '<li>\n' +
                    '                    <a href="./articleDetails.html?id='+item.id+'">\n' +
                    '                        <div class="img">\n' +
                    '                            <img src="' + url + '" alt="">\n' +
                    '                        </div>\n' +
                    '                        <div class="con">\n' +
                    '                            <p class="Title">' + item.title + '</p>\n' +
                    '                            <p class="description">' + item.summary + '</p>\n' +
                    '                        </div>\n' +
                    '                    </a>\n' +
                    '                </li>';

                $('.goods .content ul').append(html);
            })
        } else {
            if (isEnglish()) {
                $('.goods .content ul').html('No data');
            } else {
                $('.goods .content ul').html('无数据');
            }
        }

        $('.goods .page #page').val(data.extra.page + '/' + data.extra.last_page)
    }


    // nav切换
    $('.nav .left ul').on('click', 'li', function () {
        $('.nav .left li').removeClass('active');
        $(this).addClass('active');

        var category_id = $(this).attr('data-name');
        var html = '<li>Loading...</li>'
        $('.goods .content ul').html(html);
        api.getArticleList(category_id, 1, 20, i18nLanguage, redraw);
    })


    //翻页 首页
    $('.goods .page #first').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');

        api.getArticleList(category_id, 1, 20, i18nLanguage, redraw)
    });

    //翻页 尾页
    $('.goods .page #last').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');
        var page = $('.goods .page #page').val();
        var pageArr = page.split('/');

        api.getArticleList(category_id, pageArr[1], 20, i18nLanguage, redraw)
    });

    //翻页 上一页
    $('.goods .page #left').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');
        var page = $('.goods .page #page').val();
        var pageArr = page.split('/');
        if (pageArr[0] === '1') {
            api.getArticleList(category_id, 1, 20, i18nLanguage, redraw)
        } else {
            api.getArticleList(category_id, pageArr[0] - 1, 20, i18nLanguage, redraw)
        }
    });

    //翻页 下一页
    $('.goods .page #right').click(function () {
        var category_id = $('.nav .left .active').attr('data-name');
        var page = $('.goods .page #page').val();
        var pageArr = page.split('/');
        if (pageArr[0] + 1 > pageArr[1]) {
            api.getArticleList(category_id, pageArr[1], 20, i18nLanguage, redraw)
        } else {
            api.getArticleList(category_id, pageArr[0] + 1, 20, i18nLanguage, redraw)
        }
    })


});