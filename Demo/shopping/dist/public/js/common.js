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
                date.setTime(date.getTime() + (options.expires * 60 * 60 * 1000));
                //console.log(date.getTime());
                //console.log(options.expires * 60 * 60 * 1000);
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

//删除cookies
function delAllCookie(){
    var myDate=new Date();
    myDate.setTime(-1000);//设置时间
    var data=document.cookie;
    var dataArray=data.split("; ");
    for(var i=0;i<dataArray.length;i++){
        var varName=dataArray[i].split("=");
        document.cookie=varName[0]+"=''; expires="+myDate.toUTCString()+';path=/';
    }

}
function delCookie(name) {                   //删除一个cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toUTCString()+';path=/';
}

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
    // 默认城市 sz表示上海，sh表示深圳
    var address = 'sz';

    /*
      首先获取用户浏览器设备之前选择过的城市
       */
    if (getCookie("city")) {
        address = getCookie("city");
        if (i18nLanguage === 'zh') {
            if (address === 'sz') {
                $('.address a').html('深圳');
            } else {
                $('.address a').html('上海');
            }
        } else {
            if (address === 'sz') {
                $('.address a').html('shenzhen');
            } else {
                $('.address a').html('shanghai');
            }
        }
        //console.log('address:',address)
    } else {
        getCookie("city", address, {
            expires: 30,
            path: '/'
        });
    }

    $(document).bind('click',function(){
        $('.media-header .nav').slideUp();
        $('.address ul').slideUp();
        $('.service ul').slideUp();
        $('.logined ul').slideUp();
        //e.stopPropagation();
    });
    $('.logined a').click(function (e) {
        e.stopPropagation(e);
        if ($('.logined ul').is(":hidden")) {
            $('.logined ul').slideDown();
        } else {
            $('.logined ul').slideUp();
        }
    });

    $('.address a').click(function (e) {
        e.stopPropagation(e);
        if ($(this).parent().find('ul').is(":hidden")) {
            $(this).parent().find('ul').slideDown();
        } else {
            $(this).parent().find('ul').slideUp();
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
        getCookie("city", dataName, {
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


var urlL = '';
//var url = 'xiao/Demo/shopping/dist/';
var url = 'http://byod.1o24.com';


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
    // 退出登录
    $('.signOut').click(function(){
        var signOutData = {
            token:token,
        }
        delAllCookie();
        $.ajax({
            type:'POST',
            url:url+'/api/v1/user/logout',
            dataType:'json',
            data:signOutData,
            success:function(data){
                if(data.code === 200){
                    delAllCookie();
                    setTimeout(function () {
                        location.href = "index.html"
                    }, 1000);
                }
            },
            error:function(xhr,status,error){

            }
        })

    });


    if(login()){


        $('.login').hide();
        $('.loging').hide();
        $('.mlogined').show();
        if(!isMobile){
            $('.logined').show();
        }else{
            $('.logined').hide();
        }

        var token = getCookie("token");
        api.getCartList(getCookie('userId'), i18nLanguage,function(getCartList){
            $('.cart .count').html(getCartList.length);
        });


        var userName = getCookie('username');
        if(getCookie('username') == null){
            userName = '';
        }

        $('.welcome').html('Dear '+getCookie('username')+',欢迎访问'+getCookie('school')+'专属页面。');
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

//验证数字
function CheckNum(Str) {
    if(Str.search("^[0-9]*$")!=0){
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

//isEqual：判断两个对象是否键值对应相等
function isEqual(a,b){
    //如果a和b本来就全等
    if(a===b){
        //判断是否为0和-0
        return a !== 0 || 1/a ===1/b;
    }
    //判断是否为null和undefined
    if(a==null||b==null){
        return a===b;
    }
    //接下来判断a和b的数据类型
    var classNameA=toString.call(a),
        classNameB=toString.call(b);
    //如果数据类型不相等，则返回false
    if(classNameA !== classNameB){
        return false;
    }
    //如果数据类型相等，再根据不同数据类型分别判断
    switch(classNameA){
        case '[object RegExp]':
        case '[object String]':
            //进行字符串转换比较
            return '' + a ==='' + b;
        case '[object Number]':
            //进行数字转换比较,判断是否为NaN
            if(+a !== +a){
                return +b !== +b;
            }
            //判断是否为0或-0
            return +a === 0?1/ +a === 1/b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }
    //如果是对象类型
    if(classNameA == '[object Object]'){
        //获取a和b的属性长度
        var propsA = Object.getOwnPropertyNames(a),
            propsB = Object.getOwnPropertyNames(b);
        if(propsA.length != propsB.length){
            return false;
        }
        for(var i=0;i<propsA.length;i++){
            var propName=propsA[i];
            //如果对应属性对应值不相等，则返回false
            if(a[propName] !== b[propName]){
                return false;
            }
        }
        return true;
    }
    //如果是数组类型
    if(classNameA == '[object Array]'){
        if(a.toString() == b.toString()){
            return true;
        }
        return false;
    }
}


// 判断数组是否存在某个值
Array.prototype.in_array = function (element) {

    for (var i = 0; i < this.length; i++) {

        if (this[i] == element) {

            return true;

        }

    } return false;

}


// 判断是否手机登录
function isPhone(){
    var ua = navigator.userAgent.toLocaleLowerCase();
    var isMobile = /iPhone|iPad|iPod|android|Windows Phone/ig.test(ua);
    if(isMobile){
        return true;
    }
    return false;
}

// 获取存在对象的值
function getObjVal(obj,str){
    for(var i in obj){
        if(i === str){
            return obj[i];
        }
    }
    return null;
}