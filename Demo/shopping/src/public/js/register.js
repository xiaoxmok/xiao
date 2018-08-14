$(function () {
    if (login()) {
        location.href = "index.html"
    }

    var token = getCookie('token');

    // 获取学校信息
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/school/index?city=' + '' + '&lang=' + i18nLanguage,
        dataType: 'json',
        success: function (data) {
            //console.log("data", data);
            if (data.code === 200) {
                for (var i = 0; i < data.data.length; i++) {
                    var html = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                    $('#schoolSearch').append(html);


                }

            } else {
                var html = '<option value="error">' + data.msg + '</option>';
                $('#schoolSearch').append(html);
                $('.error').html(data.msg);
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        }
    });

    // 获取校区
    $("#schoolSearch").bind('change', function () {
        schoolRegion();
    });
    schoolRegion();

    function schoolRegion() {
        var school_id = $('#schoolSearch').children('option:selected').val();
        if (school_id == null) {
            school_id = 1;
        }
        $('#schoolRegion').html('');

        $.ajax({
            type: 'GET',
            url: url + '/api/v1/school-region/index?school_id=' + school_id + '&lang=' + i18nLanguage,
            dataType: 'json',
            success: function (data) {
                //console.log("data", data);
                if (data.code === 200) {
                    for (var i = 0; i < data.data.length; i++) {
                        var html = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                        $('#schoolRegion').append(html);
                    }

                } else {
                    var html = '<option value="error">' + data.msg + '</option>';
                    $('#schoolRegion').append(html);
                    $('.error').html(data.msg);
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr, status, error);
            }
        });
    }

    // 获取图片验证码
    var getCaptcha = api.getCaptcha();
    $('#Captcha').attr('src', 'http://byod.1o24.com/api/v1/system/get-captcha');
    $('#Captcha').click(function () {
        //$('#Captcha').attr('src','');
        $('#Captcha').attr('src', 'http://byod.1o24.com/api/v1/system/get-captcha?t=' + Math.random());
    });

    // 获取手机验证码
    $('.code').click(function () {

        $('.error').html('');
        var account, verifyData;
        var value = $('#select').children('option:selected').val();

        if (value === 'phone') {
            account = $('.account').val();
            if (!CheckMobile(account)) {
                if (isEnglish()) {
                    $('.error').html('Account format is incorrect.');
                } else {
                    $('.error').html('账号格式不正确.');
                }
                return;
            }
            verifyData = {
                verify_type: value,
                phone: account
            };

        } else if (value === 'email') {
            account = $('.account').val();
            if (!CheckEmail(account)) {
                if (isEnglish()) {
                    $('.error').html('E-mail format is incorrect.');
                } else {
                    $('.error').html('邮箱格式不正确。');
                }
                return;
            }
            verifyData = {
                verify_type: value,
                email: account
            };
        }
        var captcha = $('.Captcha_code').val();
        if (captcha.length === 0) {
            if (isEnglish()) {
                $('.error').html('Graphic verification code cannot be empty');
            } else {
                $('.error').html('图形验证码不能为空');
            }
            return;
        }
        verifyData.captcha = captcha;


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
                    //console.log('获取验证码成功！');
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

    // 注册
    $('.register').click(function () {
        var account, password, valid_code, school_id, registeData, loginData;
        $('.error').html('');

        var value = $('#select').children('option:selected').val();

        valid_code = $('.valid_code').val();
        if (!CheckCode(valid_code)) {
            if (isEnglish()) {
                $('.error').html('The verification code is not in the correct format.');
            } else {
                $('.error').html('验证码格式不正确。');
            }
            return;
        }

        password = $('.password').val();
        if (!CheckPwd(password)) {
            if (isEnglish()) {
                $('.error').html('The password is illegal');
            } else {
                $('.error').html('密码不合法，输入5-15位数！');
            }
            return;
        }

        school_id = $('#schoolSearch').children('option:selected').val();

        if (value === 'phone') {
            account = $('.account').val();
            if (!CheckMobile(account)) {
                if (isEnglish()) {
                    $('.error').html('Account format is incorrect.');
                } else {
                    $('.error').html('账号格式不正确.');
                }
                return;
            }
            registeData = {
                verify_type: value,
                phone: account,
                verify_code: valid_code,
                password: password,
                school_id: school_id
            }

            loginData = {
                verify_type: value,
                phone: account,
                password: password
            }

        } else if (value === 'email') {
            account = $('.account').val();
            if (!CheckEmail(account)) {
                if (isEnglish()) {
                    $('.error').html('E-mail format is incorrect.');
                } else {
                    $('.error').html('邮箱格式不正确。');
                }
                return;
            }
            registeData = {
                verify_type: value,
                email: account,
                verify_code: valid_code,
                password: password,
                school_id: school_id
            }

            loginData = {
                verify_type: value,
                email: account,
                password: password
            }
        }

        registeData.school_region_id = $('#schoolRegion').children('option:selected').val();

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/user/register',
            dataType: 'json',
            data: registeData,
            success: function (data) {
                //console.log(data.code,typeof data.code);
                if (data.code === 200) {
                    // console.log('注册成功。');
                    if (isEnglish()) {
                        $('.error').html('Registration is successful, Automatic login.');
                    } else {
                        $('.error').html('注册成功，自动登录中。');
                    }
                    setTimeout(function () {
                        $.ajax({
                            type: 'POST',
                            url: url + '/api/v1/user/login',
                            dataType: 'json',
                            data: loginData,
                            success: function (data) {
                                //console.log(data);
                                if (data.code === 200) {

                                    var getUser = api.getUser(data.data.token);

                                    //console.log(getUser,getUser.name,);

                                    // cookie记录token
                                    getCookie("token", data.data.token, {
                                        expires: 1,
                                        path: '/'
                                    });

                                    if (getUser.name == null) {
                                        getUser.name = ''
                                    }

                                    // cookie记录用户名
                                    getCookie("username", getUser.name, {
                                        expires: 30,
                                        path: '/'
                                    });

                                    // cookie记录用户名ID
                                    getCookie("userId", getUser.id, {
                                        expires: 30,
                                        path: '/'
                                    });

                                    // cookie记录token
                                    getCookie("account", account, {
                                        expires: 1,
                                        path: '/'
                                    });

                                    var getSchool = api.getSchool(getUser.school_info.id, i18nLanguage);

                                    if (getSchool.name == null) {
                                        getSchool.name = ''
                                    }
                                    // cookie记录学校
                                    getCookie("school", getSchool.name, {
                                        expires: 30,
                                        path: '/'
                                    });

                                    // cookie记录学校ID
                                    getCookie("schoolId", getSchool.id, {
                                        expires: 30,
                                        path: '/'
                                    });


                                    // 如果用户首次登录，添加学校默认地址；
                                    var addreesData = {}

                                    if(value === 'phone'){
                                        addreesData = {
                                            token: data.data.token,
                                            user_id: getUser.id,
                                            reciever_name: account,
                                            //country_code: '086',
                                            reciever_phone: getUser.phone,
                                            address: getUser.school_info.name + ' ' + getUser.school_region_info.name,
                                            is_default: 'y',
                                            is_from_school: 'y'
                                        };
                                    }else{
                                        addreesData = {
                                            token: data.data.token,
                                            user_id: getUser.id,
                                            reciever_name: account,
                                            //country_code: '086',
                                            address: getUser.school_info.name + ' ' + getUser.school_region_info.name,
                                            is_default: 'y',
                                            is_from_school: 'y'
                                        };
                                    }

                                    // 添加收货地址
                                    $.ajax({
                                        type: 'POST',
                                        url: url + '/api/v1/address/create',
                                        dataType: 'json',
                                        data: addreesData,
                                        success: function (data) {
                                        },
                                        error: function (xhr, status, error) {
                                        }
                                    })

                                    var userName = getCookie('username');
                                    if (getCookie('username').length <= 0) {

                                        // 验证是否手机或邮箱
                                        var accountName;
                                        var str = getCookie('account');

                                        if (CheckMobile(str)) {
                                            accountName = str.slice(0, 3) + '****' + str.slice(-4)
                                        } else {
                                            accountName = str.split('@')[0].slice(0, -4) + '****@' + str.split('@')[1];
                                        }


                                        if (isEnglish()) {
                                            $('.welcome').html('Dear ' + accountName + ', Welcome to ' + getCookie('school') + ' page.');
                                        } else {
                                            $('.welcome').html('Dear ' + accountName + ', 欢迎访问' + getCookie('school') + '专属页面。');
                                        }
                                    } else {
                                        if (isEnglish()) {
                                            $('.welcome').html('Dear ' + userName + ', Welcome to ' + getCookie('school') + ' page.');
                                        } else {
                                            $('.welcome').html('Dear ' + userName + ', 欢迎访问' + getCookie('school') + '专属页面。');
                                        }
                                    }

                                    // 临时购物车存在商品，将批量加入本账户。
                                    if (getCookie("localCart")) {
                                        // $('.error').html('临时购物车存在商品，将批量加入本账户。');
                                        var itemArr = [];

                                        if (getCookie("localCart")) {
                                            var str = getCookie("localCart");
                                            var localCartArr = str.split(',');

                                            localCartArr.forEach(function (item, index) {
                                                var item = {
                                                    "sku_id": item.split('-')[0],
                                                    "quantity": item.split('-')[1]
                                                }
                                                itemArr.push(item);
                                            })

                                        }

                                        $.ajax({
                                            type: 'POST',
                                            url: url + '/api/v1/cart/batch-create',
                                            dataType: 'json',
                                            data: {
                                                token: data.data.token,
                                                user_id: getUser.id,
                                                items: JSON.stringify(itemArr)
                                            },
                                            success: function (data) {
                                                if (data.code === 200) {
                                                    //console.log('success:'+data);
                                                    //alert(JSON.stringify(data))
                                                }
                                            },
                                            error: function () {
                                            }
                                        })
                                    }

                                    setTimeout(function () {
                                        location.href = "index.html"
                                        // window.history.go(-1);
                                    }, 2000);
                                } else {
                                    $('.error').html(data.msg);
                                }
                            },
                            error: function (xhr, status, error) {

                            }
                        })

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