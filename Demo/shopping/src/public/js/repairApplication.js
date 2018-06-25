$(function () {
    if (!login()) {
        //location.href = "login.html"
    }

    var token = getCookie('token');

    $('.radio[name="type"]').click(function () {
        var value = $(this).val();
        console.log(value);
        if (value === 'self') {
            $('.serCon').hide();
            $('#self').show();
        } else if (value === 'door') {
            $('.serCon').hide();
            $('#door').show();
        }
    })

    var self_img_ids = []
    var door_img_ids = []
    //在input file内容改变的时候触发事件
    $('#self .file').change(function () {
        /*if (URL.createObjectURL($(this)[0].files[0])) {
            $(this).parent().find('.imgshow').attr("src", URL.createObjectURL($(this)[0].files[0]));
        }*/
        var that = $(this);
        var formdata = new FormData();

        formdata.append('file', $(this).get(0).files[0]);
        //formdata.append('token', token);

        getImg_id(formdata,function(data){
            that.parent().find('.imgshow').attr("src", data[0].url);
            that.parent().find('.imgshow').attr("data-name", data[0].id);
            self_img_ids.push(data[0].id);
        })
    })

    $('#door .file').change(function () {
        var that = $(this);
        var formdata = new FormData();

        formdata.append('file', $(this).get(0).files[0]);
        //formdata.append('token', token);

        getImg_id(formdata,function(data){
            that.parent().find('.imgshow').attr("src", data[0].url);
            that.parent().find('.imgshow').attr("data-name", data[0].id);
            door_img_ids.push(data[0].id);
        })
    })

    function getImg_id(formdata,callback){

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/system/image-upload',
            dataType: 'json',
            contentType: false,
            processData: false,
            data: formdata,
            success: function (data) {
                if (data.code === 200) {
                    callback(data.data);
                }
            },
            error: function () {
            }
        });
    }

    // 设备分类
    $.ajax({
        type: 'GET',
        url: url + '/api/v1/category/index?type=device',
        dataType: 'json',
        success: function (data) {
            if (data.code === 200) {
                var dataArr = data.data;
                dataArr.forEach(function (item, index) {
                    var html = '<option value="' + item.id + '">' + item.name + '</option>';
                    $('.device').append(html);
                    if (index === 0) {
                        deviceChild(item.id);
                    }
                })
            }
        },
        error: function () {
        }
    });
    //deviceChild($('.device option:selected').val());


    $('.device').bind('change', function () {
        deviceChild($(this).find('option:selected').val());
    });

    function deviceChild(id) {
        $('.deviceChild').html('');
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/category/get?id=' + id,
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    var dataArr = data.data.children;
                    if (dataArr.length === 0) {
                        $('.deviceChild').hide();
                        return;
                    }
                    dataArr.forEach(function (item, index) {
                        var html = '<option value="' + item.id + '">' + item.name + '</option>';
                        $('.deviceChild').append(html);
                        $('.deviceChild').show('');
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
                dataArr.forEach(function (item, index) {
                    var html = '<option value="' + item.id + '">' + item.name + '</option>';
                    $('.fault').append(html);
                    if (index === 0) {
                        faultChild(item.id);
                    }
                })
            }
        },
        error: function () {
        }
    });
    //deviceChild($('.device option:selected').val());


    $('.fault').bind('change', function () {
        faultChild($(this).find('option:selected').val());
    });

    function faultChild(id) {

        $('.faultChild').html('');
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/category/get?id=' + id,
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    var dataArr = data.data.children;
                    if (dataArr.length === 0) {
                        $('.faultChild').hide();
                        return;
                    }
                    dataArr.forEach(function (item, index) {
                        var html = '<option value="' + item.id + '">' + item.name + '</option>';
                        $('.faultChild').append(html);
                        $('.faultChild').show('');
                    })
                }
            },
            error: function () {
            }
        })
    }

    // 获取用户设备和卡券信息
    $('#door .phone').on('change', function () {
        var phone = $(this).val();
        if (!CheckMobile(phone)) {
            if (isEnglish()) {
                $('.error').html('Phone format is incorrect.');
            } else {
                $('.error').html('手机格式不正确.');
            }
            //return;
        } else {
            $('.error').html('');
            api.getRepairInfo(phone, function (data) {
                var device_infos = data.device_infos;
                var coupon_infos = data.coupon_infos;

                //你的设备
                if (device_infos.length !== 0) {
                    device_infos.forEach(function (item, index) {
                        var html = '<p><input type="radio" name="addr" id="device4" checked=""><label for="device4"><span>型号：macbook air 序列号：120000 购买时间：2018-05-25</span></label></p>';

                        $('#sku_id').append(html);
                    })
                } else {
                    // $('#sku_id').html('<p>none</p>');
                }

                // 代金券
                if (coupon_infos.length !== 0) {
                    $('#user_coupon_id').html('');
                    coupon_infos.forEach(function (item, index) {
                        var html;
                        var type = {
                            repair: '维修券'
                        }

                        if (isEnglish()) {
                            html = '<a href="javascript:;" class="ticket1" data-name="' + item.id + '">\n' +
                                '                        <div class="up">\n' +
                                '                            <div class="img"></div>\n' +
                                '                            <p>' + item.type + '</p>\n' +
                                '                        </div>\n' +
                                '                        <div class="down">\n' +
                                '                            <p>Unused</p>\n' +
                                '                        </div>\n' +
                                '                    </a>';
                        } else {
                            html = '<a href="javascript:;" class="ticket1" data-name="' + item.id + '">\n' +
                                '                        <div class="up">\n' +
                                '                            <div class="img"></div>\n' +
                                '                            <p>' + type[item.type] + '</p>\n' +
                                '                        </div>\n' +
                                '                        <div class="down">\n' +
                                '                            <p>未使用</p>\n' +
                                '                        </div>\n' +
                                '                    </a>';
                        }

                        $('#user_coupon_id').append(html);
                    })
                } else {
                    // $('#user_coupon_id').html('<p>none</p>');
                }
            });
        }

    });

    var user_coupon_id = [];
    $('#user_coupon_id').on('click', '.ticket1', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            var that = $(this);
            user_coupon_id.forEach(function (item, index) {
                if (item === that.attr('data-name')) {
                    user_coupon_id.splice(index, 1);
                }
            })
        } else {
            $(this).addClass('active');
            user_coupon_id.push($(this).attr('data-name'));
        }
        //console.log(user_coupon_id);
    });


    // 提交
    $('.submit').click(function () {
        var repairData;
        var device_category = [];
        var fault_category = [];
        var type = $('#type input[name="type"]:checked').val();
        if (type === 'self') {
            device_category.push($('#self .device option:selected').val());
            device_category.push($('#self .deviceChild option:selected').val());
            fault_category.push($('#self .fault option:selected').val());
            fault_category.push($('#self .faultChild option:selected').val());

            var phone = $('#self .phone').val();
            if (!CheckMobile(phone)) {
                if (isEnglish()) {
                    $('.error').html('Phone format is incorrect.');
                } else {
                    $('.error').html('手机格式不正确.');
                }
                return;
            }

            if(self_img_ids.length === 0){
                if (isEnglish()) {
                    $('.error').html('Please upload pictures.');
                } else {
                    $('.error').html('请上传图片.');
                }
            }

            repairData = {
                type:type,
                device_category: device_category.join(','),
                fault_category: fault_category.join(','),
                img_ids: self_img_ids.join(','),
                param: $('#self .param').val(),
                sn: $('#self .sn').val(),
                description: $('#self .description').val(),
                phone: phone,
                email: $('#self .email').val(),
                lang:i18nLanguage
            }
        } else {
            device_category.push($('#door .device option:selected').val());
            device_category.push($('#door .deviceChild option:selected').val());
            fault_category.push($('#door .fault option:selected').val());
            fault_category.push($('#door .faultChild option:selected').val());

            var phone = $('#door .phone').val();
            if (!CheckMobile(phone)) {
                if (isEnglish()) {
                    $('.error').html('Phone format is incorrect.');
                } else {
                    $('.error').html('手机格式不正确.');
                }
                return;
            }

            if(door_img_ids.length === 0){
                if (isEnglish()) {
                    $('.error').html('Please upload pictures.');
                } else {
                    $('.error').html('请上传图片.');
                }
            }

            repairData = {
                type:type,
                device_category: device_category.join(','),
                fault_category: fault_category.join(','),
                img_ids: door_img_ids.join(','),
                param: $('#door .param').val(),
                sn: $('#door .sn').val(),
                description: $('#door .description').val(),
                phone: phone,
                email: $('#door .email').val(),
                sku_id:$('#sku_id').attr('data-name'),
                user_coupon_id:user_coupon_id.join(','),
                lang:i18nLanguage
            }
        }

        // console.log(repairData);

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/repair/create',
            dataType: 'json',
            data:repairData,
            success: function (data) {
                if (data.code === 200) {
                    if (isEnglish()) {
                        $('.error').html('Submitted successfully.');
                    } else {
                        $('.error').html('提交成功。');
                    }
                    setTimeout(function () {
                        location.href = "index.html"
                    }, 1000);
                }
            },
            error: function () {
            }
        })
    });


})