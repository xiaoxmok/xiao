$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 获取个人信息
    //var getUser = api.getUser(token);

    // 获取地址列表
    function searchAddress() {
        $('.management ul').html('');
        var getAddressList = api.getAddressList(getCookie('userId'));
        getAddressList.forEach(function (item, index) {
            var setDefault
            if(isEnglish()){
                if (item.is_default === 'y') {
                    setDefault = '<a href="javascript:;" class="defalut">Default Address</a>';
                } else {
                    setDefault = '<a href="javascript:;" data-name="' + item.id + '" class="setDefalut">Set as default</a>';
                }
            }else{
                if (item.is_default === 'y') {
                    setDefault = '<a href="javascript:;" class="defalut">默认地址</a>';
                } else {
                    setDefault = '<a href="javascript:;" data-name="' + item.id + '" class="setDefalut">设置默认</a>';
                }
            }


            var html;
            if(isEnglish()){
                html = '<li>\n' +
                    '                <div class="text">\n' +
                    '                    <span>' + item.reciever_name + '</span>\n' +
                    '                    <span>' + item.address + '</span>\n' +
                    '                    <span>' + item.country_code+'-'+item.reciever_phone + '</span>\n' +
                    '                </div>\n' +
                    '                <div class="operate">\n' +
                    setDefault +
                    '                    <a href="./updateAddress.html?id=' + item.id + '" class="edit">Edit</a>\n' +
                    '                    <a href="javascript:;" class="delete" data-name="'+item.id+'">Delete</a>\n' +
                    '                </div>\n' +
                    '            </li>';
            }else{
                html = '<li>\n' +
                    '                <div class="text">\n' +
                    '                    <span>' + item.reciever_name + '</span>\n' +
                    '                    <span>' + item.address + '</span>\n' +
                    '                    <span>' + item.country_code+'-'+item.reciever_phone + '</span>\n' +
                    '                </div>\n' +
                    '                <div class="operate">\n' +
                    setDefault +
                    '                    <a href="./updateAddress.html?id=' + item.id + '" class="edit">编辑</a>\n' +
                    '                    <a href="javascript:;" class="delete" data-name="'+item.id+'">删除</a>\n' +
                    '                </div>\n' +
                    '            </li>';
            }

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
        if(api.getAddressDelete(id).code === 200){
            searchAddress();
        }

    })

})