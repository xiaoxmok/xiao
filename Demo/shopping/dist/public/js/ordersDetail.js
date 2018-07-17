$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 获取url参数
    var hash = GetRequest();
    api.getOrderInfo(hash.id,getOrderInfo);

    function getOrderInfo(getOrderInfo){
        var status;
        if(isEnglish()){
            status = {
                waitingForPay:"waitingForPay",
                paying:"paying",
                paid:"paid",
                waitingForInstall:"waitingForInstall",
                installing:"installing",
                installed:"installed",
                dispatching:"dispatching",
                dispatched:"dispatched",
                waitingForSign:"waitingForSign",
                signed:"signed",
                canceled:"canceled",
                returned:"returned",
                exchanged:"exchanged",
                waitingForReturn:"waitingForReturn"
            };
        }else{
            status = {
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
                exchanged:"已换货",
                waitingForReturn:"待退货"
            };
        }


        $('.confirm table').html('');
        $('.orderStatus em').html(status[getOrderInfo.status]);
        $('.logisticsStatus em').html(status[getOrderInfo.status]);
        if(getOrderInfo.address_info !== null){
            $('.addressee em').html(getOrderInfo.address_info.reciever_name);
        }

        $('.message em').html(getOrderInfo.message);
        $('.price em').html(getOrderInfo.price);

        var billing_type,normal_invoice_type,normal_content;
        if(isEnglish()){
            billing_type= {
                normal:'normal',
                vat:'vat'
            };
            normal_invoice_type = {
                personal:'personal',
                company:'company'
            };
            normal_content ={
                details:'details',
                category:'category'
            };
        }else{
            billing_type= {
                normal:'普通',
                vat:'增值税'
            };
            normal_invoice_type = {
                personal:'个人',
                company:'公司'
            };
            normal_content ={
                details:'商品明细',
                category:'商品类别'
            };
        }

        $('#billing_type em').html(billing_type[getOrderInfo.invoice_info.billing_type]);
        $('#normal_invoice_type em').html(normal_invoice_type[getOrderInfo.invoice_info.normal_invoice_type]);
        $('#normal_title em').html(getOrderInfo.invoice_info.normal_title);
        $('#normal_tax_no em').html(getOrderInfo.invoice_info.normal_tax_no);
        $('#normal_content em').html(normal_content[getOrderInfo.invoice_info.normal_content]);
        $('#vat_invoice_type em').html(getOrderInfo.invoice_info.vat_invoice_type);
        $('#vat_content em').html(getOrderInfo.invoice_info.vat_content);
        $('#vat_company em').html(getOrderInfo.invoice_info.vat_company);
        $('#vat_tax_no em').html(getOrderInfo.invoice_info.vat_tax_no);
        $('#vat_address em').html(getOrderInfo.invoice_info.vat_address);
        $('#vat_phone em').html(getOrderInfo.invoice_info.vat_phone);
        $('#vat_bank em').html(getOrderInfo.invoice_info.vat_bank);
        $('#vat_bank_no em').html(getOrderInfo.invoice_info.vat_bank_no);
        $('#receiver_name em').html(getOrderInfo.invoice_info.receiver_name);
        $('#receiver_phone em').html(getOrderInfo.invoice_info.receiver_phone);
        $('#receiver_province em').html(getOrderInfo.invoice_info.receiver_province);
        $('#receiver_city em').html(getOrderInfo.invoice_info.receiver_city);
        $('#receiver_area em').html(getOrderInfo.invoice_info.receiver_area);
        $('#receiver_address em').html(getOrderInfo.invoice_info.receiver_address);

        if(getOrderInfo.invoice_info.billing_type === 'normal'){
            $('.normal').show();
        }else{
            $('.vat').show();
        }


        $('.orderNumber em').html(getOrderInfo.order_no);
        $('.orderTime em').html(getOrderInfo.create_at);
        /*$('.deliveryMethod em').html(getOrderInfo.express_info.company_name);
        $('.trackingNumber em').html(getOrderInfo.express_info.express_no);*/
    }

    var getOrderItems = api.getOrderItems(hash.id);

    var goodsArr = getOrderItems.data;
    goodsArr.forEach(function(item,index){
        var price = (item.sku_info.school_price * item.quantity).toFixed(2);
        var html = '<tr>\n' +
            '                    <td>\n' +
            '                        <div class="img"><img src="'+item.sku_info.img_infos[0].url+'" alt=""></div>\n' +
            '                        <div class="con">\n' +
            '                            <p class="title">'+item.sku_info.goods_name+'</p>\n' +
            '                            <span class="price">￥<em>'+item.sku_info.school_price+'</em></span>\n' +
            '                            <span class="amountM">X'+item.quantity+'</span>\n' +
            '                        </div>\n' +
            '                    </td>\n' +
            '                    <td class="td3">\n' +
            '                        X'+item.quantity+'\n' +
            '                    </td>\n' +
            '                    <td>￥'+price+'</td>\n' +
            '                </tr>';

        $('.confirm .con table').append(html);
    });


});