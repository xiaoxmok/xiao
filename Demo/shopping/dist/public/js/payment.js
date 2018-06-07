$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    var getUrl = GetRequest();
    console.log(getUrl);

    var getOrderInfo = api.getOrderInfo(getUrl.orderNo);
    $('#order_no').html(getOrderInfo.order_no);
    $('#price').html(getOrderInfo.price);

    var status = {
        waitingForPay:"待支付",
        paying:"支付中",
        paid:"已支付",
        waitingForInstall:"待安装",
        installing:"安装中",
        installed:"已安装",
        dispatching:"配送中",
        dispatched:"已配送",
        waitingForSign:"待签收",
        signed:"已签收",
        canceled:"已取消",
        returned:"已退货",
        exchanged:"已换货"
    };
    var pay_type = {
        wechat:"微信",
        alipay:"支付宝",
        unionpay:"银联"
    }


    $('#pay_type').html(pay_type[getOrderInfo.pay_type]);
    $('#status').html(status[getOrderInfo.status]);

    var agent = 'pc';
    if(isPhone()){
        agent = 'phone';
    }

    var payData = {
        order_no:getUrl.orderNo,
        price:0.01,
        pay_type:getOrderInfo.pay_type,
        agent:agent,
        token:token
    }

    $.ajax({
        type: 'POST',
        url: url + '/api/v1/order/pay',
        dataType: 'json',
        data:payData,
        success: function (data) {
            if(data.code === 200){
                if(getOrderInfo.pay_type === 'alipay'){
                    $('.alipayPc').html(data.data["raw-html"]);
                }else{
                    $('.qrCode img').attr('src',data.data.url);
                }

                var time = setInterval(function(){
                    var orderInfo = api.getOrderInfo(getUrl.orderNo);
                    if(orderInfo.status === 'paid'){
                        clearInterval(time);
                        $('.success').show();
                        setTimeout(function () {
                            //location.href = "center.html"
                        }, 2000);
                    }
                },3000)
            }
        },
        error: function () {
        }
    });


});