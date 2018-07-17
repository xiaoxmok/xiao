$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    //var img_ids = '';
    var img_ids = []
    //在input file内容改变的时候触发事件
    $('.file').change(function () {
        /*if (URL.createObjectURL($(this)[0].files[0])) {
            $(this).parent().find('.imgshow').attr("src", URL.createObjectURL($(this)[0].files[0]));
        }*/
        var formdata=new FormData();

        formdata.append('file',$(this).get(0).files[0]);
        formdata.append('token',token);

        var that = $(this);

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/system/image-upload',
            dataType: 'json',
            contentType: false,
            processData: false,
            data:formdata,
            success: function (data) {
                if (data.code === 200) {
                    that.parent().find('.imgshow').attr("src", data.data[0].url);
                    that.parent().find('.imgshow').attr("data-name", data.data[0].id);
                    img_ids.push(data.data[0].id);
                }
            },
            error: function () {
            }
        })

    })


    $('#price').keyup(function () {
        $(this).val($(this).val().replace(/[^\d.]/g, ''));
        if (Number($(this).val()) > 12888) {
            if(isEnglish()){
                $('.error').html('Amount of money');
            }else{
                $('.error').html('金额大了');
            }
        } else {
            $('.error').html('');
        }
    });


    var token = getCookie('token');
    var getUrl = GetRequest();



    $('.submit').click(function () {

        //var goods = $('#goods').children('option:selected').val();
        var type = $('#type').children('option:selected').val();
        var reason = $('#reason').children('option:selected').val();
        var price = $('#price').val();
        var description = $('#description').val();

        var phone = $('#phone').val();
        if (!CheckMobile(phone)) {
            if(isEnglish()){
                $('.error').html('Contact phone format is incorrect');
            }else{
                $('.error').html('联系电话格式不正确');
            }
            return;
        }


        var returnsData = {
            token: token,
            order_no: getUrl.id,
            type: type,
            reason: reason,
            price: price,
            phone: phone,
            reason_detail: description,
            //img_ids: img_ids,
        };

        if (img_ids.length !== 0) {
            returnsData.img_ids = img_ids.join(',');
        }
        

        $.ajax({
            type: 'POST',
            //url: '/' + url + 'public/json/returns.json?goods=' + goods + '&type=' + type + '&reason=' + reason + '&price=' + price + '&description=' + description + '&phone=' + phone,
            url: url + '/api/v1/order/return-or-exchange',
            dataType: 'json',
            data: returnsData,
            success: function (data) {
                if (data.code === 200) {
                    //location.href = "returnsNumber.html"

                    if(isEnglish()){
                        $('.error').html('Submitted successfully');
                    }else{
                        $('.error').html('提交成功');
                    }
                    setTimeout(function () {
                        location.href = "returnsNumber.html?id="+getUrl.id+"&type="+type;
                    }, 1000);

                } else {

                }
            },
            error: function (xhr, status, error) {

            }
        });


    });


})