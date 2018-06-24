$(function(){
    if (!login()) {
        //location.href = "login.html"
    }

    var token = getCookie('token');

    $('.radio[name="ser"]').click(function(){
        var value = $(this).val();
        console.log(value);
        if(value == 0){
            $('.serCon').hide();
            $('.serCon').eq(0).show();
        }else if(value == 1){
            $('.serCon').hide();
            $('.serCon').eq(1).show();
        }
    })

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

    // 设备分类
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/category/index?type=device',
        dataType: 'json',
        success: function (data) {
            if (data.code === 200) {
                var dataArr = data.data;
                dataArr.forEach(function(item,index){
                    var html = '<option value="'+item.id+'">'+item.name+'</option>';
                    $('.device').append(html);
                    if(index === 0){
                        deviceChild(item.id);
                    }
                })
            }
        },
        error: function () {
        }
    });
    //deviceChild($('.device option:selected').val());


    $('.device').bind('change',function(){
        deviceChild($('.device option:selected').val());
    });

    function deviceChild(id){
        $('.deviceChild').html('');
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/category/get?id='+id,
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    var dataArr = data.data.children;
                    dataArr.forEach(function(item,index){
                        var html = '<option value="'+item.id+'">'+item.name+'</option>';
                        $('.deviceChild').append(html);
                    })
                }
            },
            error: function () {
            }
        })
    }

    // 故障分类
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/category/index?type=fault',
        dataType: 'json',
        success: function (data) {
            if (data.code === 200) {
                var dataArr = data.data;
                dataArr.forEach(function(item,index){
                    var html = '<option value="'+item.id+'">'+item.name+'</option>';
                    $('.fault').append(html);
                    if(index === 0){
                        faultChild(item.id);
                    }
                })
            }
        },
        error: function () {
        }
    });
    //deviceChild($('.device option:selected').val());


    $('.fault').bind('change',function(){
        faultChild($('.fault option:selected').val());
    });

    function faultChild(id){
        $('.faultChild').html('');
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/category/get?id='+id,
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    var dataArr = data.data.children;
                    dataArr.forEach(function(item,index){
                        var html = '<option value="'+item.id+'">'+item.name+'</option>';
                        $('.faultChild').append(html);
                    })
                }
            },
            error: function () {
            }
        })
    }




    // 提交
    $('.submit').click(function(){

    });


})