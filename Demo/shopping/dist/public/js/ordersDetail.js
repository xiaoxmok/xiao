$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 获取url参数
    var hash = GetRequest();

    $('.confirm table').html('');

    $.ajax({
        type:'GET',
        //url:'/web/orders/:'+hash.id,
        url:'/'+url+'public/json/order-id.json?id='+hash.id,
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
                $('.orderStatus em').html(data.data.orderStatus);
                $('.logisticsStatus em').html(data.data.logisticsStatus);
                $('.addressee em').html(data.data.name+','+data.data.phone+','+data.data.address);

                $('.invoiceType em').html(data.data.invoiceType);
                $('.invoiceTitle em').html(data.data.invoiceTitle);
                $('.invoiceContent em').html(data.data.invoiceContent);
                $('.taxId em').html(data.data.taxId);

                $('.orderNumber em').html(data.data.no);
                $('.orderTime em').html(data.data.orderTime);
                $('.deliveryMethod em').html(data.data.deliveryMethod);
                $('.trackingNumber em').html(data.data.trackingNumber);

                var goodsArr = data.data.goods;
                goodsArr.forEach(function(item,index){
                    var html = '<tr>\n' +
                        '                    <td>\n' +
                        '                        <div class="img"><img src="'+item.pic+'" alt=""></div>\n' +
                        '                        <div class="con">\n' +
                        '                            <p class="title">'+item.desc+'</p>\n' +
                        '                            <span class="price">￥<em>'+item.price+'</em></span>\n' +
                        '                            <span class="amountM">X'+item.num+'</span>\n' +
                        '                        </div>\n' +
                        '                    </td>\n' +
                        '                    <td class="td3">\n' +
                        '                        X'+item.num+'\n' +
                        '                    </td>\n' +
                        '                    <td>￥'+item.total_price+'</td>\n' +
                        '                </tr>';

                    $('.confirm table').append(html);
                });

            }else{

            }
        },
        error:function(xhr,status,error){

        }
    });

});