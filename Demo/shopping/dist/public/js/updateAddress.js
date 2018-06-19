$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    var urlInfo = GetRequest();

    // 获取地址信息
    var getAddressId = api.getAddressId(urlInfo.id);

    $('#name').val(getAddressId.reciever_name);
    $('#address').val(getAddressId.address);
    $('#phone').val(getAddressId.reciever_phone);
    $('#country_code').val(getAddressId.country_code);
    if(getAddressId.is_default === 'y'){
        $('#defalut').prop("checked", true);
    }else{
        $('#defalut').prop("checked", false);
    }


    // 更新地址
    $('.submit').click(function(){
        var name, phone, address,country_code, defalut = 1;

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

        var addreesData = {
            token: token,
            id:urlInfo.id,
            reciever_name: name,
            country_code: country_code,
            reciever_phone: phone,
            address: address,
            is_default: defalut
        };

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/address/update',
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