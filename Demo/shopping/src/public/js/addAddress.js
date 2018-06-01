$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    $('.submit').click(function () {
        var name, phone, address, defalut = 1;

        name = $('#name').val();
        if (name.length <= 0) {
            $('.error').html('收件人不为能空');
            return;
        }

        address = $('#address').val();
        if (address.length <= 0) {
            $('.error').html('地址不为能空');
            return;
        }

        phone = $('#phone').val();
        if (!CheckMobile(phone)) {
            $('.error').html('手机号格式不正确');
            return;
        }

        if ($('#defalut').is(':checked')) {
            defalut = 'y';
        } else {
            defalut = 'n';
        }

        var addreesData = {
            token: token,
            user_id: api.getUser(token).id,
            reciever_name: name,
            country_code: '',
            reciever_phone: phone,
            address: address,
            is_default: defalut
        };

        // 添加收货地址
        $.ajax({
            type: 'POST',
            url: url + '/api/v1/address/create',
            dataType: 'json',
            data: addreesData,
            success: function (data) {
                if (data.success === '0') {
                    $('.error').html('提交成功');
                    setTimeout(function () {
                        //location.href = "addressManagement.html"
                    }, 1000);
                } else {

                }
            },
            error: function (xhr, status, error) {

            }
        })

    });


})