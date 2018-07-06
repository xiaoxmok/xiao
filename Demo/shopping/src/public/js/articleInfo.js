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
    //console.log(name);
    var alias;
    if(name === 'aboutUs'){
        alias = 'about';
    }else if(name === 'eduSoftware'){
        alias = 'soft';
    }else if(name === 'solution'){
        alias = 'solution';
    }else if(name === 'information'){
        alias = 'news';
    }


    // 获取分类
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/category/get?alias='+alias+'&lang=' + i18nLanguage,
        dataType: 'json',
        success: function (data) {
            if (data.code === 200) {

                //$('.nav .left ul').append(all);
                var category = data.data.children;
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
                var html = '<li>\n' +
                    '                    <a href="./articleDetails.html?id='+item.id+'">\n' +
                    '                        <div class="img">\n' +
                    '                            <img src="' + item.poster_info.url + '" alt="">\n' +
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