$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    $('.submit').click(function(){
        var name,phone,address,defalut = 1;

        name = $('#name').val();
        if(name.length <= 0){
            $('.error').html('收件人不为能空');
            return;
        }

        address = $('#address').val();
        if(address.length <= 0){
            $('.error').html('地址不为能空');
            return;
        }

        phone = $('#phone').val();
        if(!CheckMobile(phone)){
            $('.error').html('手机号格式不正确');
            return;
        }

        if($('#defalut').is(':checked')) {
            defalut = 0;
        }else{
            defalut = 1;
        }

        $.ajax({
            type:'GET',
            //url:'/web/address/add?name='+name+'&phone='+phone+'&address='+address+'&defalut='+defalut,
            url:'/'+url+'public/json/address-add.json?name='+name+'&phone='+phone+'&address='+address+'&defalut='+defalut,
            dataType:'json',
            beforeSend:function(request){
                var time = new Date().getTime();
                var secure_token = $.md5(token + 'shop' + time);

                request.setRequestHeader("token",token);
                request.setRequestHeader("time",time);
                request.setRequestHeader("secure_token",secure_token);
            },
            success:function(data){
                if(data.success === '0'){
                    $('.error').html('提交成功');
                    setTimeout(function () {
                        location.href = "addressManagement.html"
                    }, 1000);
                }else{

                }
            },
            error:function(xhr,status,error){

            }
        })

    });


})