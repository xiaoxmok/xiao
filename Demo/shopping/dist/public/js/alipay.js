$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    var getUrl = GetRequest();
    //console.log(getUrl);

    var agent = 'pc';
    if(isPhone()){
        agent = 'phone';
    }

    var payData;
    api.getOrderInfo(getUrl.orderNo,function(getOrderInfo){
        payData = {
            order_no:getUrl.orderNo,
            price:0.01,
            pay_type:getOrderInfo.pay_type,
            agent:agent,
            token:token
        }
    });

    $.ajax({
        type: 'POST',
        url: url + '/api/v1/order/pay',
        dataType: 'json',
        data:payData,
        success: function (data) {
            if(data.code === 200){
                $('.alipayPc').html(data.data["raw-html"]);

            }
        },
        error: function () {
        }
    });


})