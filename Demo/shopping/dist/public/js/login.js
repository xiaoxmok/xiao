$(function(){
    if(login()){
        location.href = "index.html"
    }

    $('.loging').click(function(){
        var account,password,phone,email,loginData;
        $('.error').html('');

        var value = $('#select').children('option:selected').val();

        password= $('.password').val();
        if(!CheckPwd(password)){
            $('.error').html('密码不合法，输入5-15位数！');
            return;
        }
        //password = $.md5(value+'shop'+password);
        //console.log(password);

        if(value === 'phone'){
            account = $('.account').val();
            if(!CheckMobile(account)){
                $('.error').html('账号格式不正确！');
                return;
            }
            loginData = {
                verify_type:value,
                phone:account,
                password:password

            }

        }else if(value === 'email'){
            account = $('.account').val();
            if(!CheckEmail(account)){
                $('.error').html('邮箱格式不正确！');
                return;
            }
            loginData = {
                verify_type:value,
                email:account,
                password:password

            }
        }

        $.ajax({
            type:'POST',
            url:url+'/api/v1/user/login',
            dataType:'json',
            data:loginData,
            success:function(data){
                console.log(data);
                if(data.code === 200){
                    // cookie记录token
                    getCookie("token", data.data.token, {
                        expires: 30,
                        path: '/'
                    });

                    // cookie记录用户名
                    /*getCookie("username", data.userinfo.name, {
                        expires: 30,
                        path: '/'
                    });*/

                    // cookie记录学校
                    /*getCookie("school", data.userinfo.school.name, {
                        expires: 30,
                        path: '/'
                    });*/

                    // cookie记录城市
                    /*getCookie("address", data.userinfo.school.city_id, {
                        expires: 30,
                        path: '/'
                    });*/

                    // cookie记录语言
                    /*getCookie("address", data.userinfo.lang, {
                        expires: 30,
                        path: '/'
                    });*/

                    //$('.welcome').html('Dear '+data.userinfo.name+',欢迎访问'+data.userinfo.school.name+'专属页面。');

                    $('.error').html('登录成功，2秒后进入首页。');

                    setTimeout(function () {
                        location.href = "index.html"
                    }, 2000);

                }else{
                    $('.error').html('登录失败');
                }
            },
            error:function(xhr,status,error){

            }
        })

        //console.log("value",value);


    });

});