$(function () {
    if (!login()) {
        location.href = "index.html"
    }

    var token = getCookie('token');

    // 获取验证码
    $('.code').click(function () {

        $('.error').html('');
        var account, verifyData;
        var value = $('#select').children('option:selected').val();

        if (value === 'phone') {
            account = $('.account').val();
            if (!CheckMobile(account)) {
                $('.error').html('账号格式不正确！');
                return;
            }
            verifyData = {
                verify_type: value,
                phone: account
            };

        } else if (value === 'email') {
            account = $('.account').val();
            if (!CheckEmail(account)) {
                $('.error').html('邮箱格式不正确！');
                return;
            }
            verifyData = {
                verify_type: value,
                email: account
            };
        }


        /*获取验证码倒记时*/
        var time = 60;
        var time1;

        function timeOut() {
            time--;
            $('.timeOut').html(time);
            //console.log(time);
            if (time < 0) {
                clearInterval(time1);
                $('.code').show();
                $('.countDown').hide();
                time = 10;
            }
        }

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/user/send-verify-code',
            dataType: 'json',
            data: verifyData,
            success: function (data) {
                if (data.code === 200) {
                    console.log('获取验证码成功！');
                    $('.timeOut').html(time);
                    time1 = setInterval(timeOut, 1000);
                    $('.code').hide();
                    $('.countDown').show();


                } else {
                    $('.error').html(data.msg);
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr, status, error);
            }
        });

    });


    // 重置密码
    $('.reset').click(function () {
        var account, password, valid_code,confirmation, resetData;
        $('.error').html('');

        var value = $('#select').children('option:selected').val();

        valid_code = $('.valid_code').val();
        if (!CheckCode(valid_code)) {
            $('.error').html('验证码格式不正确。');
            return;
        }

        password = $('.password').val();
        if (!CheckPwd(password)) {
            $('.error').html('密码不合法，输入5-15位数！');
            return;
        }

        confirmation = $('.confirmation').val();
        if (confirmation !== password) {
            $('.error').html('确认密码错误。');
            return;
        }


        if (value === 'phone') {
            account = $('.account').val();
            if (!CheckMobile(account)) {
                $('.error').html('账号格式不正确！');
                return;
            }
            resetData = {
                token:token,
                verify_type: value,
                phone: account,
                verify_code: valid_code,
                password: password,
                password_confirmation: confirmation
            }

        } else if (value === 'email') {
            account = $('.account').val();
            if (!CheckEmail(account)) {
                $('.error').html('邮箱格式不正确！');
                return;
            }
            resetData = {
                token:token,
                verify_type: value,
                email: account,
                verify_code: valid_code,
                password: password,
                password_confirmation: confirmation
            }
        }

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/user/reset-password',
            dataType: 'json',
            data: resetData,
            success: function (data) {
                //console.log(data.code,typeof data.code);
                if (data.code === 200) {
                    // console.log('注册成功。');
                    $('.error').html('重置密码成功，请重新登录。');
                    setTimeout(function () {
                        delAllCookie();
                        location.href = "login.html"
                    }, 2000);
                } else {
                    $('.error').html(data.msg);
                }
            },
            error: function (xhr, status, error) {

            }
        })

    });

})