$(function () {
    if (login()) {
        location.href = "index.html"
    }

    $('.loging').click(function () {
        var account, password, phone, email, loginData;
        $('.error').html('');

        var value = $('#select').children('option:selected').val();

        password = $('.password').val();
        if (!CheckPwd(password)) {
            if(isEnglish()){
                $('.error').html('The password is illegal');
            }else{
                $('.error').html('密码不合法，输入5-15位数！');
            }
            return;
        }
        //password = $.md5(value+'shop'+password);
        //console.log(password);

        if (value === 'phone') {
            account = $('.account').val();
            if (!CheckMobile(account)) {
                if(isEnglish()){
                    $('.error').html('Account format is incorrect.');
                }else{
                    $('.error').html('账号格式不正确.');
                }
                return;
            }
            loginData = {
                verify_type: value,
                phone: account,
                password: password

            }

        } else if (value === 'email') {
            account = $('.account').val();
            if (!CheckEmail(account)) {
                if(isEnglish()){
                    $('.error').html('E-mail format is incorrect.');
                }else{
                    $('.error').html('邮箱格式不正确。');
                }
                return;
            }
            loginData = {
                verify_type: value,
                email: account,
                password: password

            }
        }

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
                    // cookie记录token
                    getCookie("account", account, {
                        expires: 1,
                        path: '/'
                    });

                    if(getUser.name == null){
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

                    var getSchool = api.getSchool(getUser.school_info.id,i18nLanguage);

                    if(getSchool.name == null){
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
                    if(getUser.name == null){
                        /*$('.error').html('首次登录，请完善资料');

                        setTimeout(function () {
                            location.href = "prefectData.html"
                        }, 2000);
                        return;*/

                        var addreesData = {
                            token: token,
                            user_id: getUser.id,
                            reciever_name: getUser.name,
                            //country_code: '086',
                            reciever_phone: getUser.phone,
                            address: getUser.school_region_info.address,
                            is_default: 'y',
                            is_from_school:'y'
                        };

                        // 添加收货地址
                        $.ajax({
                            type: 'POST',
                            url: url + '/api/v1/address/create',
                            dataType: 'json',
                            data: addreesData,
                            success: function (data) {
                                /*if (data.code === 200) {
                                    if(isEnglish()){
                                        $('.error').html('Submitted successfully');
                                    }else{
                                        $('.error').html('提交成功');
                                    }
                                    setTimeout(function () {
                                        location.href = "addressManagement.html"
                                    }, 1000);
                                } else {

                                }*/
                            },
                            error: function (xhr, status, error) {

                            }
                        })

                    }

                    var userName = getCookie('username');
                    if(getCookie('username').length <= 0){
                        userName = '';
                        if(isEnglish()){
                            $('.welcome').html('Dear '+getCookie('account')+', Welcome to '+getCookie('school')+' page.');
                            $('.error').html('The login is successful, and the home page is entered after 2 seconds.');
                        }else{
                            $('.welcome').html('Dear '+getCookie('account')+', 欢迎访问'+getCookie('school')+'专属页面。');
                            $('.error').html('登录成功，2秒后进入首页。');
                        }
                    }else{
                        if(isEnglish()){
                            $('.welcome').html('Dear '+userName+', Welcome to '+getCookie('school')+' page.');
                            $('.error').html('The login is successful, and the home page is entered after 2 seconds.');
                        }else{
                            $('.welcome').html('Dear '+userName+', 欢迎访问'+getCookie('school')+'专属页面。');
                            $('.error').html('登录成功，2秒后进入首页。');
                        }
                    }

                    /*if(isEnglish()){
                        $('.welcome').html('Dear '+getUser.name+' , Welcome to '+getSchool.name+' page.');

                        $('.error').html('The login is successful, and the home page is entered after 2 seconds.');
                    }else{
                        $('.welcome').html('Dear '+getUser.name+'，欢迎访问'+getSchool.name+'专属页面。');

                        $('.error').html('登录成功，2秒后进入首页。');
                    }*/

                    if(getCookie("localCart")){
                        $('.error').html('临时购物车存在商品，将批量加入本账户。');
                    }

                    setTimeout(function () {
                        //location.href = "index.html"

                        //window.location.go(-1);
                        window.history.go(-1);
                    }, 2000);

                } else {
                    $('.error').html(data.msg);
                }
            },
            error: function (xhr, status, error) {

            }
        })

        //console.log("value",value);


    });

});