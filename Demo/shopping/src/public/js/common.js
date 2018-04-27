/*城市选择*/
$(function(){
    // 默认城市
    var address = 'shenzhen';

    /*
      首先获取用户浏览器设备之前选择过的城市
       */
    if (getCookie("address")) {
        address = getCookie("address");
        //console.log('address:',address)
    }else{
        getCookie("address",address,{
            expires: 30,
            path:'/'
        });
    }

    $('.address a').attr('data-name',address);

    execI18n();

    $('.address a').click(function(){
        if($('.address ul').is(":hidden")){
            $('.address ul').slideDown();
        }else{
            $('.address ul').slideUp();
        }
    });

    $('.address li').click(function(){
        var dataName = $(this).attr('data-name');
        var value = $(this).html();
        // console.log(value);
        getCookie("address",dataName,{
            expires: 30,
            path:'/'
        });
        $('.address a').attr('data-name',dataName);
        $('.address a').html(value);
        $('.address ul').hide();

    });
});