$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

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

})