$(function(){
    if (login()) {
        // location.href = "index.html"
    }

    var token = getCookie('token');

    // 获取收货地址





    // 获取订单列表
    var getOrderList = api.getOrderList(api.getUser(token).id,'paying');





    // 发票信息的切换
    $('.invoiceInfo input[name="info"]').click(function(){
        var index = $(this).val();
        if(index == 0){
            $('.invoiceType').hide();
            $('.invoiceType').eq(0).show();
        }else if(index == 1){
            $('.invoiceType').hide();
            $('.invoiceType').eq(1).show();
        }else if(index == 2){
            $('.invoiceType').hide();
            $('.invoiceType').eq(2).show();
        }

    });

    // 计算总价
    var allPrice = 0;
    $('.totalPrice').each(function(){
        allPrice += parseFloat($(this).find('em').html());
        $('.Clearing .all em').html(allPrice.toFixed(2));
    })


    // 提交订单
    $('.submitOrder').click(function(){
        // 普通发票
        if($('.invoiceInfo input[name="info"]:checked').val() === 'normal'){
            var orderData = {
                price:parseFloat($('.Clearing .all em').html()),
                pay_type:'pay_type',
                order_type:'goods',
                address_id:$('.shipping input[name="addr"]:checked').val(),
                message:$('.message textarea').val(),
                order_items:[
                    {
                        sku_id:'sku_id',
                        quantity:'quantity'
                    }
                ],
                billing_type:'normal',
                normal_invoice_type:$('.invoiceType input[name="type1"]:checked').val(),
            }
        }else{
            // 增值税发票
        }





    })

});