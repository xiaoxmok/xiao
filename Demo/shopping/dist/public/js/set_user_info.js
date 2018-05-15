$(function(){
    if(!login()){
        location.href = "login.html"
    }

    var token = getCookie('token');

    var defalutAddress = getCookie('school');
    $('.defalutAddress span').html(defalutAddress);

    // 获取个人信息
    $.ajax({
        type:'GET',
        //url:'/web/get_user_info',
        url:'/public/json/get_user_info.json',
        dataType:'json',
        beforeSend: function (request) {
            var time = new Date().getTime();
            var secure_token = $.md5(token+'shop'+time);

            request.setRequestHeader("token", token);
            request.setRequestHeader("time", time);
            request.setRequestHeader("secure_token", secure_token);
        },
        success:function(data){
            if(data.success === '0'){
                $('.sex[value="'+data.data.sex+'"]').attr('checked','true');
                $('.role[value="'+data.data.role+'"]').attr('checked','true');
                $('.name').val(data.data.name);
                $('.no').val(data.data.no);
                $('.defalutAddress span').html(data.data.address);

            }else{
                $('.error').html(data.detail);
            }
        },
        error:function(xhr,status,error){

        }
    });


    // 更新个人信息
    $('.submit').click(function(){
        var sex,role,name,no;

        sex = $('.sex[name="sex"]:checked').val();
        role = $('.role[name="role"]:checked').val();
        name = $('.name').val();
        no = $('.no').val();

        $.ajax({
            type:'GET',
            //url:'/web/set_user_info?sex='+sex+'&role='+role+'&name='+name+'&no='+no,
            url:'/public/json/set_user_info.json?sex='+sex+'&role='+role+'&name='+name+'&no='+no,
            dataType:'json',
            beforeSend: function (request) {
                var time = new Date().getTime();
                var secure_token = $.md5(token+'shop'+time);

                request.setRequestHeader("token", token);
                request.setRequestHeader("time", time);
                request.setRequestHeader("secure_token", secure_token);
            },
            success:function(data){
                if(data.success === '0'){
                    $('.error').html('修改成功。');
                    $('.name').val('');
                    $('.no').val('');
                    setTimeout(function () {
                        // location.href = "center.html"
                    }, 1000);
                }else{
                    $('.error').html(data.detail);
                }
            },
            error:function(xhr,status,error){

            }
        });
    });
});