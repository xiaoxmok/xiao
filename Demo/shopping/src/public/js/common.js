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
    i18nLanguage = "0";
    getCookie("userLanguage", i18nLanguage, {
        expires: 30,
        path: '/'
    });
}

/*城市选择*/
$(function () {
    // 默认城市 0表示上海，1表示深圳
    var address = '1';

    /*
      首先获取用户浏览器设备之前选择过的城市
       */
    if (getCookie("address")) {
        address = getCookie("address");
        if (i18nLanguage === '0') {
            if (address === '1') {
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
            $(this).find('span').html("-")
        }else{
            $(this).parent().find('.text').slideUp();
            $(this).find('span').html("+")
        };
    });
});


/*判断是否登录*/
function login(){
    if(getCookie("token")){
        return true;
    }else{
        return false;
    }
}

// 判断是否移动端
var ua = navigator.userAgent.toLocaleLowerCase();
var isMobile = /iPhone|iPad|iPod|android|Windows Phone/ig.test(ua);

$(function(){
    if(login()){


        $('.login').hide();
        if(!isMobile){
            $('.logined').show();
        }
        var username = getCookie("username");
        var school = getCookie("school");

        $('.welcome').html('Dear '+username+',欢迎访问'+school+'专属页面。');
    }else{
        $('.login').hide();
        $('.loging').show();
        $('.welcome').html("Dear ,请先登录。");
    }
});



//验证手机号码
function CheckMobile(Str) {
    if(Str.search("^1(3|5|8)\\d{9}$")!=0){
        return false;
    }
    return true;
}

//验证验证码
function CheckCode(Str) {
    if(Str.search("^\\d{4}$")!=0){
        return false;
    }
    return true;
}

//是否Email格式
function CheckEmail(EmailText) {

    var re=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return re.test(EmailText);
}

//密码合法性
function CheckPwd(Pwd){
    var filter=/^\s*[.A-Za-z0-9_-]{5,15}\s*$/;
    if(!filter.test(Pwd)) return false;
    return true;
}

//js获取url？号后面的参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}