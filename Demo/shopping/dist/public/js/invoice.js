$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');
    var getUrl = GetRequest();

    var billing_type,normal_invoice_type,normal_content,vat_invoice_type,vat_content;
    if(isEnglish()){
        billing_type={
            normal:'normal',
            vat:'vat'
        }
        normal_invoice_type={
            personal:'personal',
            company:'company'
        }
        normal_content={
            detail:'detail',
            category:'category'
        }
        vat_invoice_type ={
            company:'company'
        }
        vat_content={
            detail:'detail'
        }

    }else{
        billing_type={
            normal:'普通发票',
            vat:'增值税发票'
        }
        normal_invoice_type={
            personal:'个人',
            company:'企业'
        }
        normal_content={
            detail:'商品明细',
            category:'商品类别'
        }
        vat_invoice_type ={
            company:'企业'
        }
        vat_content={
            detail:'商品明细'
        }
    }

    api.getOrderInfo(getUrl.order_no,function(data){
        console.log(data);
            $('#order_no em').html(data.invoice_info.order_no);
            $('#billing_type em').html(billing_type[data.invoice_info.billing_type]);
            $('#normal_invoice_type em').html(normal_invoice_type[data.invoice_info.normal_invoice_type]);
            $('#normal_title em').html(data.invoice_info.normal_title);
            $('#normal_tax_no em').html(data.invoice_info.normal_tax_no);
            $('#normal_content em').html(normal_content[data.invoice_info.normal_content]);
            $('#vat_invoice_type em').html(vat_invoice_type[data.invoice_info.vat_invoice_type]);
            $('#vat_tax_no em').html(data.invoice_info.vat_tax_no);
            $('#vat_content em').html(vat_content[data.invoice_info.vat_content]);
            $('#vat_company em').html(data.invoice_info.vat_company);
            $('#vat_address em').html(data.invoice_info.vat_address);
            $('#vat_phone em').html(data.invoice_info.vat_phone);
            $('#vat_bank em').html(data.invoice_info.vat_bank);
            $('#vat_bank_no em').html(data.invoice_info.vat_bank_no);
            $('#receiver_name em').html(data.invoice_info.receiver_name);
            $('#receiver_phone em').html(data.invoice_info.receiver_phone);
            $('#receiver_province em').html(data.invoice_info.receiver_province);
            $('#receiver_city em').html(data.invoice_info.receiver_city);
            $('#receiver_area em').html(data.invoice_info.receiver_area);
            $('#receiver_address em').html(data.invoice_info.receiver_address);
    })

    // 更新订单发票信息
    /*$('.submit').click(function () {
        var invoiceData;
        // 普通发票
        if($('.invoiceInfo input[name="info"]:checked').val() === 'normal'){
            invoiceData = {
                token:token,
                order_no: getUrl.order_no,
                billing_type:'normal',
                normal_invoice_type:$('.invoiceType input[name="type1"]:checked').val(),
                normal_title:$('#normal_title').val(),
                normal_tax_no:$('#normal_tax_no').val(),
                normal_content:$('.invoiceType input[name="content1"]:checked').val()
            }
        }else{
            // 增值税发票
            invoiceData = {
                token:token,
                order_no: getUrl.order_no,
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

        //console.log(invoiceData);

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/order/update',
            dataType: 'json',
            data: invoiceData,
            success:function(data){
                if(data.code === 200){
                    $('.error').html('提交成功，2秒后跳转个人中心页面');
                    setTimeout(function () {
                        location.href = "center.html"
                    }, 2000);
                }
            },
            error:function(){}
        })
    });*/


});