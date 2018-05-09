/**
 * cookie操作
 */
var getCookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var s = [cookie, expires, path, domain, secure].join('');
        var secure = options.secure ? '; secure' : '';
        var c = [name, '=', encodeURIComponent(value)].join('');
        var cookie = [c, expires, path, domain, secure].join('')
        document.cookie = cookie;
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage;

if (getCookie("userLanguage")) {
    i18nLanguage = getCookie("userLanguage");
    //console.log('i18nLanguage:',i18nLanguage)
} else {
    i18nLanguage = "zh";
    getCookie("userLanguage", i18nLanguage, {
        expires: 30,
        path: '/'
    });
}

/*城市选择*/
$(function () {
    // 默认城市
    var address = 'shenzhen';

    /*
      首先获取用户浏览器设备之前选择过的城市
       */
    if (getCookie("address")) {
        address = getCookie("address");
        if (i18nLanguage === 'zh') {
            if (address === 'shenzhen') {
                $('.address a').html('深圳');
            } else {
                $('.address a').html('上海');
            }
        } else {
            $('.address a').html(address);
        }
        //console.log('address:',address)
    } else {
        getCookie("address", address, {
            expires: 30,
            path: '/'
        });
    }

    $(document).bind('click',function(){
        $('.media-header .nav').slideUp();
        $('.address ul').slideUp();
        $('.service ul').slideUp();
        //e.stopPropagation();
    });

    $('.address a').click(function (e) {
        e.stopPropagation(e);
        if ($('.address ul').is(":hidden")) {
            $('.address ul').slideDown();
        } else {
            $('.address ul').slideUp();
        }
    });
    $('.service a').click(function (e) {
        e.stopPropagation(e);
        if ($('.service ul').is(":hidden")) {
            $('.service ul').slideDown();
        } else {
            $('.service ul').slideUp();
        }
    });

    $('.address li').click(function () {
        var value = $(this).html();
        var dataName = $(this).attr('data-name');
        // console.log(value);
        getCookie("address", dataName, {
            expires: 30,
            path: '/'
        });
        $('.address a').html(value);
        $('.address ul').hide();

    });

    // 移动端
    $('.media-header .icon').click(function (e) {
        e.stopPropagation();
        if ($('.media-header .nav').is(":hidden")) {
            $('.media-header .nav').slideDown();
        } else {
            $('.media-header .nav').slideUp();
        }
    });

});


/*常见问题*/
$(function(){
    $('.problem .title').click(function(){
        if($(this).parent().find('.text').is(":hidden")){
            $(this).parent().find('.text').slideDown();
        }else{
            $(this).parent().find('.text').slideUp();
        };
    });
});