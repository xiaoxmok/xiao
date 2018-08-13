$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    /*  switch按钮的切换事件 */
    $(".switch label").on("click", function () {
        var labelclass = $(this).attr("class");
        var check = $(this).siblings("input");
        if (labelclass == "switch_on") {
            check.attr("checked", false);
            check.attr("dataName", 'n');
            $(this).attr("class", "switch_off");
        } else {
            check.attr("checked", true);
            check.attr("dataName", 'y');
            $(this).attr("class", "switch_on");
        }
    });

    var token = getCookie('token');

    // 获取个人信息
    var getUser = api.getUser(token);

    // 获取校区
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/school-region/index?school_id='+getUser.school_id+'&lang='+i18nLanguage+'&city='+getCookie('city'),
        dataType: 'json',
        //data: {lang: i18nLanguage},
        async:false,
        success: function (data) {
            if (data.code === 200) {
                var regionArr = data.data;
                $('#schoolSearch').html('');
                regionArr.forEach(function (item, index) {
                    var html = '<option value="' + item.id + '">' + item.name + '</option>';
                    $('#schoolSearch').append(html);
                })
            }
        },
        error: function () {
        }
    });

    var getAddressList = api.getAddressList(getCookie('userId'));

    var defalutAddress;

    getAddressList.forEach(function(item,index){
       if(item.is_default === 'y'){
           defalutAddress = item.address;
       }
    });
    $('.defalutAddress span').html(defalutAddress);

    // 设置个人信息
    //var getUser = api.getUser(token);

    $('.sex[value="' + getUser.sex + '"]').attr('checked', 'true');
    $('.role[value="' + getUser.type + '"]').attr('checked', 'true');
    $('.name').val(getUser.name);
    $('.no').val(getUser.school_no);
    $('#schoolSearch').find('option[value="'+getUser.school_region_id+'"]').attr('selected',true);

    if (getUser.order_email_notify === 'y') {
        $('#check-1').attr('checked', true);
        $('#check-1').attr('dataName', 'y');
        $('#check-1').siblings("label").attr("class", "switch_on");
    } else {
        $('#check-1').attr('checked', false);
        $('#check-1').attr('dataName', 'n');
        $('#check-1').siblings("label").attr("class", "switch_off");
    }
    if (getUser.order_sms_notify === 'y') {
        $('#check-2').attr('checked', true);
        $('#check-2').attr('dataName', 'y');
        $('#check-2').siblings("label").attr("class", "switch_on");
    } else {
        $('#check-2').attr('checked', false);
        $('#check-2').attr('dataName', 'n');
        $('#check-2').siblings("label").attr("class", "switch_off");
    }


    // 手机注册用户只能修改邮箱，邮箱注册用户只能修改手机
    if(getUser.verify_type === 'phone'){
        $('.phone').parent().hide();
        $('.email').val(getUser.email);
    }else{
        $('.email').parent().hide();
        $('.phone').val(getUser.phone);
    }


    // 获取默认地址



    // 更新个人信息
    $('.submit').click(function () {

        // 校区变了需要修改学校地址
        var oldRegion = getUser.school_region_id;


        var updataData = {
            token: token,
            id: getUser.id,
            name:$('.name').val(),
            sex: $('.sex[name="sex"]:checked').val(),
            type: $('.role[name="role"]:checked').val(),
            school_region_id: $('#schoolSearch').children('option:selected').val(),
            order_email_notify:$('#check-1').attr('dataName'),
            order_sms_notify:$('#check-2').attr('dataName'),
            school_no: $('.no').val(),
            default_address: $('.defalutAddress span').html()
        }

        if(getUser.verify_type === 'phone' && $('.email').val() !== getUser.email){
            updataData.email=$('.email').val();
        }
        if(getUser.verify_type === 'email' && $('.phone').val() !== getUser.phone){
            updataData.phone=$('.phone').val();
        }

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/user/update',
            dataType: 'json',
            data:updataData,
            success: function (data) {
                if (data.code === 200) {


                    if(oldRegion !== parseInt(updataData.school_region_id)){
                        var getAddressList = api.getAddressList(getCookie('userId'));
                        var addId;
                        getAddressList.forEach(function(item,index){
                            if(item.is_from_school === 'y'){
                                addId =  item.id;
                            }
                        })

                        // var getAddressId = api.getAddressId(addId);
                        // console.log(addId,typeof addId)
                        getUser = api.getUser(token);

                        $.ajax({
                            type: 'POST',
                            url: url + '/api/v1/address/update',
                            dataType: 'json',
                            data: {
                                token: token,
                                id: addId,
                                address: getUser.school_info.name+' '+getUser.school_region_info.name,
                                is_from_school: 'y'
                            },
                            success: function (data) {
                                if (data.code === 200) {
                                    if(isEnglish()){
                                        $('.error').html('Successfully modified.');
                                    }else{
                                        $('.error').html('修改成功。');
                                    }

                                    setTimeout(function () {
                                        location.href = "center.html"
                                    }, 1000);
                                } else {

                                }
                            },
                            error: function (xhr, status, error) {

                            }
                        })
                    }else{
                        if(isEnglish()){
                            $('.error').html('Successfully modified.');
                        }else{
                            $('.error').html('修改成功。');
                        }

                        setTimeout(function () {
                            location.href = "center.html"
                        }, 1000);
                    }

                } else {
                    $('.error').html(data.msg);
                }
            },
            error: function (xhr, status, error) {
            }
        });
    });
});