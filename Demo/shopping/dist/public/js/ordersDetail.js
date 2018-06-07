$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 获取url参数
    var hash = GetRequest();
    var getOrderInfo = api.getOrderInfo(hash.id);

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

    $('.confirm table').html('');
    $('.orderStatus em').html(status[getOrderInfo.status]);
    $('.logisticsStatus em').html(getOrderInfo.express_info);
    $('.addressee em').html(getOrderInfo.address_info);
    $('.message em').html(getOrderInfo.message);

    $('.invoiceType em').html(getOrderInfo.invoiceType);
    $('.invoiceTitle em').html(getOrderInfo.invoiceTitle);
    $('.invoiceContent em').html(getOrderInfo.invoiceContent);
    $('.taxId em').html(getOrderInfo.taxId);

    $('.orderNumber em').html(getOrderInfo.order_no);
    $('.orderTime em').html(getOrderInfo.time);
    $('.deliveryMethod em').html(getOrderInfo.deliveryMethod);
    $('.trackingNumber em').html(getOrderInfo.express_id);

    var goodsArr = getOrderInfo.goods;
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

});