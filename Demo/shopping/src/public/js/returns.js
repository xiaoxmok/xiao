$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    //在input file内容改变的时候触发事件
    $('.file').change(function(){
        if(URL.createObjectURL($(this)[0].files[0])){
            $(this).parent().find('.imgshow').attr("src",URL.createObjectURL($(this)[0].files[0]));
        }
    })

    $('#price').keyup(function(){
        $(this).val($(this).val().replace(/[^\d.]/g,''));
        if(Number($(this).val()) > 12888){
            $('.error').html('金额大了');
        }else{
            $('.error').html('');
        }
    });

    var token = getCookie('token');

    $('.submit').click(function(){

        var goods = $('#goods').children('option:selected').val();
        var type = $('#type').children('option:selected').val();
        var reason = $('#reason').children('option:selected').val();
        var price = $('#price').val();
        var description = $('#description').val();

        var phone = $('#phone').val();
        if(!CheckMobile(phone)){
            $('.error').html('联系电话格式不正确');
            return;
        }




        $.ajax({
            type:'GET',
            url:'/public/json/returns.json?goods='+goods+'&type='+type+'&reason='+reason+'&price='+price+'&description='+description+'&phone='+phone,
            dataType:'json',
            beforeSend:function(request){
                var time = new Date().getTime();
                var secure_token = $.md5(token + 'shop' + time);

                request.setRequestHeader("token", token);
                request.setRequestHeader("time", time);
                request.setRequestHeader("secure_token", secure_token);
            },
            success:function(data){
                if(data.success === '0'){
                    if(type==0){
                        location.href = "returnsNumber.html"
                    }else if(type==1){
                        location.href = "exchangeGoodsNum.html"
                    }

                }else{

                }
            },
            error:function(xhr,status,error){

            }
        });


    });



})