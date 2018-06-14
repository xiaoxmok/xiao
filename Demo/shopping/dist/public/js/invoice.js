$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');
    var getUrl = GetRequest();

    // 更新订单发票信息
    $('.submit').click(function () {
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
    });


});