$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 获取地址列表
    function searchAddress(){
        $('.management ul').html('');
        $.ajax({
            type: 'GET',
            //url:'/web/addresses',
            url: '/public/json/address.json',
            dataType: 'json',
            beforeSend: function (request) {
                var time = new Date().getTime();
                var secure_token = $.md5(token + 'shop' + time);

                request.setRequestHeader("token", token);
                request.setRequestHeader("time", time);
                request.setRequestHeader("secure_token", secure_token);
            },
            success: function (data) {
                if (data.success === '0') {
                    var arr = data.data;
                    arr.forEach(function (item, index) {
                        var setDefault
                        if (item.default === '0') {
                            setDefault = '<a href="javascript:;" class="defalut">默认地址</a>';
                        } else {
                            setDefault = '<a href="javascript:;" data-name="'+item.id+'" class="setDefalut">设置默认</a>';
                        }

                        var html = '<li>\n' +
                            '                <div class="text">\n' +
                            '                    <span>' + item.name + '</span>\n' +
                            '                    <span>' + item.address + '</span>\n' +
                            '                    <span>' + item.phone + '</span>\n' +
                            '                </div>\n' +
                            '                <div class="operate">\n' +
                            setDefault +
                            '                    <a href="./addAddress.html?id='+item.id+'" class="edit">编辑</a>\n' +
                            '                    <a href="javascript:;" class="delete">删除</a>\n' +
                            '                </div>\n' +
                            '            </li>';

                        $('.management ul').append(html);
                    })
                }
            },
            error: function (xhr, status, error) {

            }
        });
    }

    searchAddress();

    // 编辑



    // 设置默认
    $('.management').on('click','.setDefalut',function(){
        var id = $(this).attr('data-name');

        $.ajax({
            type:'GET',
            //url:'/web/address/:'+id+'/update?defalut=0',
            url:'/public/json/address-update.json?defalut=0',
            dataType:'json',
            beforeSend:function(request){
                var time = new Date().getTime();
                var secure_token = $.md5(token + 'shop' + time);

                request.setRequestHeader("token", token);
                request.setRequestHeader("time", time);
                request.setRequestHeader("secure_token", secure_token);
            },
            success:function(data){
                if(data.success === '0'){
                    // 重新渲染列表
                    //location.reload();
                    searchAddress();
                }else{

                }
            },
            error:function(xhr,status,error){

            }
        })

    })

    // 删除
    $('.management').on('click','.delete',function(){
        var id = $(this).attr('data-name');

        $.ajax({
            type:'GET',
            //url:'/web/address/:'+id+'/delete?defalut=0',
            url:'/public/json/address-delete.json?defalut=0',
            dataType:'json',
            beforeSend:function(request){
                var time = new Date().getTime();
                var secure_token = $.md5(token + 'shop' + time);

                request.setRequestHeader("token", token);
                request.setRequestHeader("time", time);
                request.setRequestHeader("secure_token", secure_token);
            },
            success:function(data){
                if(data.success === '0'){
                    // 重新渲染列表
                    //location.reload();
                    searchAddress();
                }else{

                }
            },
            error:function(xhr,status,error){

            }
        })

    })

})