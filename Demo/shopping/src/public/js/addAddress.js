$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    $('.submit').click(function () {
        var name, phone, address,country_code, defalut = 1,is_from_school;

        name = $('#name').val();
        if (name.length <= 0) {
            if(isEnglish()){
                $('.error').html('Recipient information required');
            }else{
                $('.error').html('收件人不为能空');
            }
            return;
        }

        address = $('#address').val();
        if (address.length <= 0) {
            if(isEnglish()){
                $('.error').html('Address required');
            }else{
                $('.error').html('地址不为能空');
            }
            return;
        }

        phone = $('#phone').val();
        if (!CheckMobile(phone)) {
            if(isEnglish()){
                $('.error').html('Phone number format is incorrect');
            }else{
                $('.error').html('手机号格式不正确');
            }
            return;
        }
        country_code = $('#country_code').val();
        if (!CheckNum(country_code)) {
            if(isEnglish()){
                $('.error').html('Area code is incorrectly formatted');
            }else{
                $('.error').html('区号格式不正确');
            }
            return;
        }

        if ($('#defalut').is(':checked')) {
            defalut = 'y';
        } else {
            defalut = 'n';
        }
        if ($('#is_from_school').is(':checked')) {
            is_from_school = 'y';
        } else {
            is_from_school = 'n';
        }

        var addreesData = {
            token: token,
            user_id: api.getUser(token).id,
            reciever_name: name,
            country_code: country_code,
            reciever_phone: phone,
            address: address,
            is_default: defalut,
            is_from_school:is_from_school
        };

        // 添加收货地址
        $.ajax({
            type: 'POST',
            url: url + '/api/v1/address/create',
            dataType: 'json',
            data: addreesData,
            success: function (data) {
                if (data.code === 200) {
                    if(isEnglish()){
                        $('.error').html('Submitted successfully');
                    }else{
                        $('.error').html('提交成功');
                    }
                    setTimeout(function () {
                        location.href = "addressManagement.html"
                    }, 1000);
                } else {

                }
            },
            error: function (xhr, status, error) {

            }
        })

    });


})