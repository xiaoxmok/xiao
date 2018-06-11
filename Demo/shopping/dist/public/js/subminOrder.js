$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 获取收货地址
    var getAddressList = api.getAddressList(getCookie('userId'));
    getAddressList.forEach(function(item,index){
        var html
        if (item.is_default === 'y') {
            html = '<p><input type="radio" name="addr" id="addr1" value="'+item.id+'" checked><label for="addr1"><span>'+item.reciever_name+'</span><span>'+item.address+'</span><span>'+item.reciever_phone+'</span>(默认)<span></span></label></p>';
        } else {
            html = '<p><input type="radio" name="addr" id="addr2" value="'+item.id+'"><label for="addr2"><span>'+item.reciever_name+'</span><span>'+item.address+'</span><span>'+item.reciever_phone+'</span></label></p>';
        }

        $('.shipping .con').append(html);
    })


    // 获取订单列表
    //var getOrderList = api.getOrderList(api.getUser(token).id,'paying');
    var getUrl = GetRequest();
    //console.log(getUrl);
    //var order_items = JSON.parse(getUrl.order_items);
    var order_items = [];
    for(var i in getUrl){
        var value = getUrl[i].split('_');
        var list = {
            sku_id:value[0],
            quantity:value[1]
        }
        order_items.push(list)
    }
    //console.log(order_items);

    $('.confirm table ul').html('');
    order_items.forEach(function(item,index){
        var getSkuInfo = api.getSkuInfo(item.sku_id,i18nLanguage);
        var price = (getSkuInfo.school_price * item.quantity).toFixed(2);
        var html = '<tr>\n' +
            '                    <td>\n' +
            '                        <div class="img"><img src="'+getSkuInfo.img_infos[0].url+'" alt=""></div>\n' +
            '                        <div class="con">\n' +
            '                            <p class="title">'+getSkuInfo.goods_name+'</p>\n' +
            '                            <span class="price">￥<em>'+getSkuInfo.school_price+'</em></span>\n' +
            '                            <span class="amountM">X'+item.quantity+'</span>\n' +
            '                        </div>\n' +
            '                    </td>\n' +
            '                    <td class="td3">\n' +
            '                        X'+item.quantity+'\n' +
            '                    </td>\n' +
            '                    <td class="totalPrice">￥<em>'+price+'</em></td>\n' +
            '                </tr>';

        $('.confirm table').append(html);

    });



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
    });
    $('.Clearing .amount em').html(order_items.length);


    // 提交订单
    $('.submitOrder').click(function(){
        var orderData;

        // 普通发票
        if($('.invoiceInfo input[name="info"]:checked').val() === 'normal'){
            orderData = {
                token:token,
                price:parseFloat($('.Clearing .all em').html()),
                pay_type:$('.payInfo input[name="payInfo"]:checked').val(),
                order_type:'goods',
                address_id:$('.shipping input[name="addr"]:checked').val(),
                message:$('.message textarea').val(),
                order_items:JSON.stringify(order_items),
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
                pay_type:$('.payInfo input[name="payInfo"]:checked').val(),
                order_type:'goods',
                address_id:$('.shipping input[name="addr"]:checked').val(),
                message:$('.message textarea').val(),
                order_items:JSON.stringify(order_items),
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
                receiver_province:$('#receiver_province option:selected').val(),
                receiver_city:$('#receiver_city option:selected').val(),
                receiver_area:$('#receiver_area option:selected').val(),
                receiver_address:$('#receiver_address').val(),
            }
        }
        console.log(orderData);
        if(orderData.address_id == null){
            $('.error').html('请选择地址。');

        }else{
            $('.error').html('');
            $.ajax({
                type:'POST',
                url:url+'/api/v1/order/create',
                dataType:'json',
                data:orderData,
                success:function(data){
                    if(data.code === 200){
                        location.href = "payment.html?orderNo="+data.data.orderNo;
                    }
                },
                error:function(){}
            })
        }


    })

});