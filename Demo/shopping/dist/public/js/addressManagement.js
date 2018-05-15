$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    $.ajax({
        type: 'GET',
        //url:'/web/addresses',
        url: '/public/json/address.json',
        dataType: 'json',
        beforeSend: function (request) {
            var time = new Date().getTime();
            var secure_token = $.md5(token + 'shop' + time);

            request.setRequestHeader("token", token);
            request.setRequestHeader("time", time);
            request.setRequestHeader("secure_token", secure_token);
        },
        success: function (data) {
            if (data.success === '0') {
                var arr = data.data;
                arr.forEach(function (item, index) {
                    var setDefault
                    if (item.default === '0') {
                        setDefault = '<a href="javascript:;" class="defalut">默认地址</a>';
                    } else {
                        setDefault = '<a href="javascript:;" class="setDefalut">设置默认</a>';
                    }

                    var html = '<li>\n' +
                        '                <div class="text">\n' +
                        '                    <span>' + item.name + '</span>\n' +
                        '                    <span>' + item.address + '</span>\n' +
                        '                    <span>' + item.phone + '</span>\n' +
                        '                </div>\n' +
                        '                <div class="operate">\n' +
                        setDefault +
                        '                    <a href="javascript:;" class="edit">编辑</a>\n' +
                        '                    <a href="javascript:;" class="delete">删除</a>\n' +
                        '                </div>\n' +
                        '            </li>';

                    $('.management ul').append(html);
                })
            }
        },
        error: function (xhr, status, error) {

        }
    });


})