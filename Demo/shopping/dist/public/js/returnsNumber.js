$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');
    var getUrl = GetRequest();
    if (getUrl.type === 'return') {
        if(isEnglish()){
            $('.typeName').html('Enter Express Tracking Number');
            $('title').html('Enter Express Tracking Number');
            $('.title').html('Enter Express Tracking Number');
        }else{
            $('.typeName').html('填写退货运单号');
            $('title').html('填写退货运单号');
            $('.title').html('填写退货运单号');
        }
    } else {
        if(isEnglish()){
            $('.typeName').html('Enter Express Tracking Number');
            $('title').html('Enter Express Tracking Number');
            $('.title').html('Enter Express Tracking Number');
        }else{
            $('.typeName').html('填写换货运单号');
            $('title').html('填写换货运单号');
            $('.title').html('填写换货运单号');
        }
    }

    $('.submit').click(function () {
        var company_name = $('.select').children('option:selected').val();
        var express_no = $('.trackingNumber').val();

        if (company_name.length === 0) {
            if(isEnglish()){
                $('.error').html('Shipping Company');
            }else{
                $('.error').html('请选择快递类型');
            }
            return;
        }
        if (express_no.length === 0) {
            if(isEnglish()){
                $('.error').html('Enter Express Tracking Number');
            }else{
                $('.error').html('请输入快递单号');
            }
            return;
        }

        var data = {
            token: token,
            order_no: getUrl.id,
            company_name: company_name,
            express_no: express_no
        };

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/order/return-or-exchange-express',
            dataType: 'json',
            data: data,
            success: function (data) {
                if (data.code === 200) {
                    if(isEnglish()){
                        $('.error').html('Submitted successfully');
                    }else{
                        $('.error').html('提交成功');
                    }
                    setTimeout(function () {
                        location.href = "center.html";
                    }, 1000);
                }
            },
            error: function () {
            }
        });
    })
});