$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    var getUrl = GetRequest();
    console.log(getUrl);

    api.getOrderInfo(getUrl.orderNo,getOrder);

    function getOrder(getOrderInfo){
        $('#order_no').html(getOrderInfo.order_no);
        $('#price').html(getOrderInfo.price);

        var status,pay_type;
        if(isEnglish()){
            status = {
                waitingForPay: "Waiting for payment",
                paying: "Waiting for payment",
                paid: "Paid",
                waitingForInstall: "Waiting for Install",
                installing: "Installation in Progress",
                installed: "Installed",
                dispatching: "Delivering",
                dispatched: "Shipped to Destination",
                waitingForSign: "Waiting For Sign",
                signed: "Delivered",
                canceled: "Canceled",
                returning: "Returning",
                waitingForExchange: "Waiting for Exchanging",
                returned: "Returned",
                exchanging: "Exchanging",
                exchanged: "Exchanged",
                waitingForReturn: "returnHandled"
            };

            pay_type = {
                wechat:"wechat",
                alipay:"alipay",
                unionpay:"unionpay"
            };
        }else{
            status = {
                waitingForPay: "待支付",
                paying: "待支付",
                paid: "已支付",
                waitingForInstall: "待安装",
                installing: "安装中",
                installed: "已安装",
                dispatching: "配送中",
                dispatched: "已配送",
                waitingForSign: "待签收",
                signed: "已签收",
                canceled: "已取消",
                returning: "退货中",
                refuseForReturn: "退货完成",
                waitingForExchange: "待换货",
                returned: "已退货",
                exchanging: "换货中",
                exchanged: "已换货",
                waitingForReturn: "待退货",
                refuseForExchange: "拒绝换货"
            };

            pay_type = {
                wechat:"微信",
                alipay:"支付宝",
                unionpay:"银联"
            }
        }

        var getPay_type;
        if(getUrl.pay_type){
            getPay_type = getUrl.pay_type;
        }else{
            getPay_type = getOrderInfo.pay_type;
        }

        $('#pay_type').html(pay_type[getPay_type]);
        $('#status').html(status[getOrderInfo.status]);

        var agent = 'pc';
        if(isPhone()){
            agent = 'phone';
        }

        var payData = {
            order_no:getUrl.orderNo,
            price:0.01,
            pay_type:getPay_type,
            agent:agent,
            token:token
        }

        if(getPay_type === 'unionpay'){
            $('.unionpay').show();

            $('.unionpay .submit').click(function(){
                payData.company = $('#company').val();
                $.ajax({
                    type: 'POST',
                    url: url + '/api/v1/order/pay',
                    dataType: 'json',
                    data:payData,
                    success: function (data) {
                        if(data.code === 200){
                            $('.unionpay .success').show();
                            setTimeout(function () {
                                location.href = "center.html"
                            }, 2000);
                        }
                    },
                    error: function () {
                    }
                });
            })

        }else if(getPay_type === 'alipay' || agent === 'phone'){
            $('.alipayPc').show();

            $('.payImmediately').attr('href','./alipay.html?orderNo='+getUrl.orderNo+'&pay_type='+getPay_type);
            $('.payImmediately').click(function(){
                $('.zhezhao').show();
                $('.alipay').show();

            });

            $('.cls ').click(function () {
                $('.zhezhao').hide();
                $('.alipay').hide();
            });
            /*$('body').append('<a href="./alipay.html?orderNo='+getUrl.orderNo+'" target="_blank" id="openWin"></a>');
            document.getElementById("openWin").click();*/

            //window.open("alipay.html?orderNo="+getUrl.orderNo,'_blank',);

            $('.a1').click(function(){
                api.getOrderInfo(getUrl.orderNo,function(orderInfo){
                    if(orderInfo.status === 'paid'){
                        //$('.success').show();
                        location.href = "center.html"
                    }else{
                        $('.error').html('未支付成功！');
                    }
                });
            });

            $('.a2').click(function(){
                location.href = "commonProblem.html"
            })

        }else{

            // 微信pc
            if(agent === 'pc'){
                $.ajax({
                    type: 'POST',
                    url: url + '/api/v1/order/pay',
                    dataType: 'json',
                    data:payData,
                    success: function (data) {
                        if(data.code === 200){
                            $('.qrCode').show();
                            $('.qrCode img').attr('src',data.data.url);

                            $('.wechat').click(function(){
                                api.getOrderInfo(getUrl.orderNo,function(orderInfo){
                                    if(orderInfo.status === 'paid'){
                                        $('.qrCode .success').show();
                                        setTimeout(function () {
                                            location.href = "center.html"
                                        }, 2000);
                                    }
                                });
                            })
                        }
                    },
                    error: function () {
                    }
                });
            }
        }
    }
});