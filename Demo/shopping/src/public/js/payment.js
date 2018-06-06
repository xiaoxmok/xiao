$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    var getUrl = GetRequest();
    console.log(getUrl.orderNo);

    var getOrderInfo = api.getOrderInfo(getUrl.orderNo);


    $.ajax({
        type: 'POST',
        url: url + '/api/v1/order/pay',
        dataType: 'json',
        data:{
            order_no:getUrl.orderNo,
            price:0.01,
            token:token
        },
        async: false,
        success: function (data) {
            console.log(data);

        },
        error: function () {
        }
    });


});