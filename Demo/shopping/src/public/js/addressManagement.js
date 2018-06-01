$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 获取地址列表
    function searchAddress() {
        $('.management ul').html('');
        var getAddressList = api.getAddressList(getUser.id);
        var arr = getAddressList.address;
        arr.forEach(function (item, index) {
            var setDefault
            if (item.default === 'y') {
                setDefault = '<a href="javascript:;" class="defalut">默认地址</a>';
            } else {
                setDefault = '<a href="javascript:;" data-name="' + item.id + '" class="setDefalut">设置默认</a>';
            }

            var html = '<li>\n' +
                '                <div class="text">\n' +
                '                    <span>' + item.name + '</span>\n' +
                '                    <span>' + item.address + '</span>\n' +
                '                    <span>' + item.phone + '</span>\n' +
                '                </div>\n' +
                '                <div class="operate">\n' +
                setDefault +
                '                    <a href="./updateAddress.html?id=' + item.id + '" class="edit">编辑</a>\n' +
                '                    <a href="javascript:;" class="delete">删除</a>\n' +
                '                </div>\n' +
                '            </li>';

            $('.management ul').append(html);
        })
    }

    searchAddress();



    // 设置默认
    $('.management').on('click', '.setDefalut', function () {
        var id = $(this).attr('data-name');

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/address/update',
            dataType: 'json',
            data: {
                token: token,
                id: $(this).attr('data-name'),
                is_default: 'y'
            },
            success: function (data) {
                if (data.code === 200) {
                    // 重新渲染列表
                    //location.reload();
                    searchAddress();
                } else {

                }
            },
            error: function (xhr, status, error) {

            }
        })

    })

    // 删除地址
    $('.management').on('click', '.delete', function () {
        var id = $(this).attr('data-name');
        api.getAddressDelete(id);
        searchAddress();
    })

})