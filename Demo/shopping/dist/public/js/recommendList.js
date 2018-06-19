$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 学校推荐
    var recommendForSchool = api.getRecommendGoodsForSchool(getCookie('schoolId'),0, 1, 20, '%2Bsale', i18nLanguage);

    // 学生推荐
    var recommendForUser = api.getRecommendGoodsForUser(getCookie('schoolId'),0, 1, 20, '%2Bsale', i18nLanguage);
    //console.log(recommendForSchool)


    function redraw(arr) {
        $('.goods .content ul').html('');
        var goodsArr = arr.data;
        var extra = arr.extra;

        goodsArr.forEach(function (item, index) {
            var loginPrice;
            var html;
            if(isEnglish()){
                if (login()) {
                    loginPrice = '<p class="price"><span>School Special Offer：</span><em>￥' + item.school_price + '</em></p>'
                } else {
                    loginPrice = '<p class="price"><span>Education Special Offer：</span><em>￥' + item.education_price + '</em></p>'
                }
                html = '<li>\n' +
                    '                    <a href="./product.html?id=' + item.id + '">\n' +
                    '                        <img src="' + item.img_infos[0].url + '" alt="">\n' +
                    '                        <div class="con">\n' +
                    '                            <p class="Title">' + item.name + '</p>\n' +
                    '                            <p class="description">' + item.summary + '</p>\n' +
                    '                            <p class="price"><span>MSRP：</span><del>￥' + item.price + '</del></p>\n' +
                    loginPrice +
                    '                        </div>\n' +
                    '                    </a>\n' +
                    '                </li>';
            }else{
                if (login()) {
                    loginPrice = '<p class="price"><span>学校优惠价：</span><em>￥' + item.school_price + '</em></p>'
                } else {
                    loginPrice = '<p class="price"><span>教育优惠价：</span><em>￥' + item.education_price + '</em></p>'
                }
                html = '<li>\n' +
                    '                    <a href="./product.html?id=' + item.id + '">\n' +
                    '                        <img src="' + item.img_infos[0].url + '" alt="">\n' +
                    '                        <div class="con">\n' +
                    '                            <p class="Title">' + item.name + '</p>\n' +
                    '                            <p class="description">' + item.summary + '</p>\n' +
                    '                            <p class="price"><span>常规价格：</span><del>￥' + item.price + '</del></p>\n' +
                    loginPrice +
                    '                        </div>\n' +
                    '                    </a>\n' +
                    '                </li>';
            }

            $('.goods .content ul').append(html);
        });

        //$('.goods .page #page').val(extra.page + '/' + extra.total)
    }
    redraw(recommendForSchool);
});