$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 获取个人中心信息
    $.ajax({
        type: 'GET',
        //url:'/web/user_center',
        url: '/'+urlL+'public/json/user_center.json',
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
                $('.school .img img').attr('src', data.data.school.pic);
                $('.school .con .title').html(data.data.school.name);
                $('.school .con span').html(data.data.school.detail);

                var sex, role;
                if (getCookie("userLanguage") === '0') {
                    if (data.data.sex === '0') {
                        sex = '男';
                    } else if (data.data.sex === '1') {
                        sex = '女';
                    }
                    if (data.data.role === '0') {
                        role = '学生';
                    } else if (data.data.role === '1') {
                        role = '家长';
                    } else if (data.data.role === '1') {
                        role = '教职员工';
                    }
                } else if (getCookie("userLanguage") === '1') {
                    if (data.data.sex === '0') {
                        sex = 'Male';
                    } else if (data.data.sex === '1') {
                        sex = 'Female';
                    }
                    if (data.data.role === '0') {
                        role = 'Student';
                    } else if (data.data.role === '1') {
                        role = 'Parents';
                    } else if (data.data.role === '1') {
                        role = 'Staff';
                    }
                }

                $('.userName .person .name').html(data.data.name);
                $('.userName .person .sex').html(sex);
                $('.userName .person .role').html(role);
                $('.userName .person .no em').html(data.data.no);
                $('.userName .person .address em').html(data.data.address);
                $('.userName .person .email em').html(data.data.email);
                $('.userName .person .phone em').html(data.data.phone);

            } else {

            }
        },
        error: function (xhr, status, error) {

        }
    })


    // 获取我的订单
    function getOrders() {
        $('.pcOrder').html('');
        $('.mOrder li').html('');

        $.ajax({
            type: 'GET',
            //url:'/web/orders?page_size=10&page_num=1',
            url: '/'+urlL+'public/json/orders.json?page_size=10&page_num=1',
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
                    if (data.data.length > 0) {
                        var dataArr = data.data;
                        dataArr.forEach(function(item,index){
                            var pc_hmtl = '<tr>\n' +
                                '                <td>\n' +
                                '                    <div class="img"><img src="'+item.pic+'" alt=""></div>\n' +
                                '                    <div class="con">\n' +
                                '                        <p>订单号：'+item.no+'</p>\n' +
                                '                        <span>下单时间：'+item.time+'</span>\n' +
                                '                    </div>\n' +
                                '                </td>\n' +
                                '                <td>'+item.status+'</td>\n' +
                                '                <td>￥'+item.price+'</td>\n' +
                                '                <td class="operate">\n' +
                                '                    <a href="./ordersDetail.html?id='+item.no+'">查看详情</a>\n' +
                                '                    <a href="./invoice.html">开具发票</a>\n' +
                                '                    <a href="./returns.html?id='+item.no+'">退换货</a>\n' +
                                '                </td>\n' +
                                '            </tr>';
                            $('.pcOrder').append(pc_hmtl);

                            var m_html = '<li>\n' +
                                '                    <div class="up">\n' +
                                '                        <div class="img"><img src="'+item.pic+'" alt=""></div>\n' +
                                '                        <div class="con">\n' +
                                '                            <p>订单号：'+item.no+'</p>\n' +
                                '                            <span>下单时间：'+item.time+'</span>\n' +
                                '                        </div>\n' +
                                '                        <div class="status">订单状态：'+item.status+'</div>\n' +
                                '                    </div>\n' +
                                '                    <div class="down">\n' +
                                '                        <a href="./ordersDetail.html">查看详情</a>\n' +
                                '                        <a href="./invoice.html">开具发票</a>\n' +
                                '                        <a href="./returns.html?id='+item.no+'">退换货</a>\n' +
                                '                    </div>\n' +
                                '                </li>';
                            $('.mOrder ul').append(m_html);

                        });
                    }else{
                        var pc_tr = '<tr>\n' +
                            '                <td colspan="5">\n' +
                            '                    <p>暂无数据</p>\n' +
                            '                </td>\n' +
                            '            </tr>';
                        $('.pcOrder').append(pc_tr);

                        var m_li = '<li>\n' +
                            '                    <div>\n' +
                            '                        <p>暂无数据</p>\n' +
                            '                    </div>\n' +
                            '                </li>';
                        $('.mOrder ul').append(m_li);
                    }
                } else {
                    var pcerror = '<tr>\n' +
                        '                <td colspan="5">\n' +
                        '                    <p>获取失败</p>\n' +
                        '                </td>\n' +
                        '            </tr>'
                    $('.pcOrder').append(pcerror);

                    var m_li = '<li>\n' +
                        '                    <div>\n' +
                        '                        <p>获取失败</p>\n' +
                        '                    </div>\n' +
                        '                </li>';
                    $('.mOrder li').append(m_li);
                }
            },
            error: function (xhr, status, error) {

            }
        })
    }
    getOrders();


    // 获取我的收藏
    function getMyCollect(){
        $('.collect ul').html('');

        $.ajax({
            type:'GET',
            //url:'/web/collect?page_size=10&page_num=1',
            url:'/'+urlL+'public/json/collect.json?page_size=10&page_num=1',
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
                    if(data.data.length >0){
                        var dataArr = data.data;
                        dataArr.forEach(function(item,index){
                            var html = '<li>\n' +
                                '                    <img src="'+item.pic+'" alt="">\n' +
                                '                    <div class="con">\n' +
                                '                        <p class="Title">'+item.name+'</p>\n' +
                                '                        <p class="description">'+item.detail+'</p>\n' +
                                '                        <p class="price"><span>常规价格：</span><del>￥'+item.origin_price+'</del></p>\n' +
                                '                        <p class="price"><span>学校优惠价：</span><em>￥'+item.edu_price+'</em></p>\n' +
                                '                    </div>\n' +
                                '                </li>';

                            $('.collect ul').append(html);

                        })
                    }else{
                        var error = '<li>\n' +
                            '                    <p>无数据</p>\n' +
                            '                </li>';

                        $('.collect ul').append(error);
                    }
                }else{
                    var error = '<li>\n' +
                        '                    <p>无数据</p>\n' +
                        '                </li>';

                    $('.collect ul').append(error);
                }
            },
            error:function(xhr,status,error){

            }
        })
    }

    // 获取我的设备
    function getMyDevice(){}

    // 获取我的特权券
    function getMyTicket(){}

    // 获取维修记录
    function getMaintenanceRecords(){}


    $('.orderNav li').click(function () {
        var index = $(this).index();

        $('.list').hide().eq(index).show();
        $('.orderNav li').removeClass('active');
        $(this).addClass('active');

        switch (index){
            case 0:
                getOrders();
                break;
            case 1:
                getMyCollect();
                break;
            case 2:
                getMyDevice();
                break;
            case 3:
                getMyTicket();
                break;
            case 4:
                getMaintenanceRecords();
                break;
        }
    })

    // 退出登录
    $('.signOut').click(function(){
        var signOutData = {
            token:token,
        }
        delAllCookie();
        $.ajax({
            type:'POST',
            url:url+'/api/v1/user/logout',
            dataType:'json',
            data:signOutData,
            success:function(data){
                if(data.code === 200){
                    delAllCookie();
                    setTimeout(function () {
                        location.href = "index.html"
                    }, 1000);
                }
            },
            error:function(xhr,status,error){

            }
        })

    });
});