$(function(){
    if (!login()) {
        location.href = "index.html"
    }

    var token = getCookie('token');

    // 获取收货地址





    // 获取订单列表
    var getOrderList = api.getOrderList(api.getUser(token).id,'paying');




    // 发票信息的切换
    $('.invoiceInfo input[name="info"]').click(function(){
        var index = $(this).val();
        //console.log(index);
        if(index === 'normal'){
            $('.invoiceType').hide();
            $('.invoiceType').eq(0).show();
        }else if(index === 'vat'){
            $('.invoiceType').hide();
            $('.invoiceType').eq(1).show();
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
        var orderData;
        // 普通发票
        if($('.invoiceInfo input[name="info"]:checked').val() === 'normal'){
            orderData = {
                token:token,
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
                normal_title:$('#normal_title').val(),
                normal_tax_no:$('#normal_tax_no').val(),
                normal_content:$('.invoiceType input[name="content1"]:checked').val()
            }
        }else{
            // 增值税发票
            orderData = {
                token:token,
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
                billing_type:'vat',
                vat_invoice_type:'company',
                vat_tax_no:$('#vat_tax_no').val(),
                vat_content:'detail',
                vat_company:$('#vat_company').val(),
                vat_address:$('#vat_address').val(),
                vat_phone:$('#vat_phone').val(),
                vat_bank:$('#vat_bank').val(),
                vat_bank_no:$('#vat_bank_no').val(),
                receiver_name:$('#receiver_name').val(),
                receiver_phone:$('#receiver_phone').val(),
                receiver_province:$('#receiver_phone').val(),
                receiver_city:$('#receiver_phone').val(),
                receiver_area:$('#receiver_phone').val(),
                receiver_address:$('#receiver_address').val(),
            }
        }
        //console.log(orderData);
        $.ajax({
            type:'POST',
            url:url+'/api/v1/order/create',
            dataType:'json',
            data:orderData,
            success:function(data){
                if(data.code === 200){
                    setTimeout(function () {
                        location.href = "bank.html"
                    }, 2000);
                }
                location.href = "payment.html"
            },
            error:function(){}
        })




    })

});