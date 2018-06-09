$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    // 获取个人信息
    var getUser = api.getUser(token);

    var sex, role;
    if (getCookie("userLanguage") === 'zh') {
        if (getUser.sex === 'male') {
            sex = '男';
        } else if (getUser.sex === 'female') {
            sex = '女';
        }
        if (getUser.type === 'student') {
            role = '学生';
        } else if (getUser.type === 'teacher') {
            role = '老师';
        } else if (getUser.type === 'staff') {
            role = '教职员工';
        }
    } else if (getCookie("userLanguage") === 'en') {
        if (getUser.sex === 'male') {
            sex = 'male';
        } else if (getUser.sex === 'female') {
            sex = 'female';
        }
        if (getUser.type === 'student') {
            role = 'student';
        } else if (getUser.type === 'teacher') {
            role = 'teacher';
        } else if (getUser.type === 'staff') {
            role = 'staff';
        }
    }

    $('.userName .person .name').html(getUser.name);
    $('.userName .person .sex').html(sex);
    $('.userName .person .role').html(role);
    $('.userName .person .no em').html(getUser.school_no);

    $('.userName .person .email em').html(getUser.email);
    $('.userName .person .phone em').html(getUser.phone);

    // 获取默认地址

    var getAddressList = api.getAddressList(getCookie('userId'));

    var defalutAddress;

    getAddressList.forEach(function(item,index){
        if(item.is_default === 'y'){
            defalutAddress = item.address;
        }
    });
    $('.userName .person .address em').html(defalutAddress);


    // 获取学校信息
    var getSchool = api.getSchool(getUser.id,i18nLanguage);
    $('.school .img img').attr('src', getSchool.logo_info.url);
    $('.school .con .title').html(getSchool.name);
    $('.school .con span').html(getSchool.description);

    var status = {
        waitingForPay:"待支付",
        paying:"支付中",
        paid:"已支付",
        waitingForInstall:"待安装",
        installing:"安装中",
        installed:"已安装",
        dispatching:"配送中",
        dispatched:"已配送",
        waitingForSign:"待签收",
        signed:"已签收",
        canceled:"已取消",
        returned:"已退货",
        exchanged:"已换货"
    };

    // 获取我的订单
    function getOrders() {
        $('.pcOrder').html('');
        $('.mOrder li').html('');
        var head = '<tr>\n' +
            '                <th>订单号</th>\n' +
            '                <th>订单状态</th>\n' +
            '                <th>订单金额</th>\n' +
            '                <th>操作</th>\n' +
            '            </tr>';
        $('.pcOrder').append(head);

        var getOrderList = api.getOrderList('');
        if (getOrderList.code === 200) {
            if (getOrderList.data.length > 0) {
                var dataArr = getOrderList.data;
                dataArr.forEach(function(item,index){
                    var operate
                    // 订单状态的管理
                    if(item.status === 'waitingForPay'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                            '                    <a href="./payment.html?orderNo='+item.order_no+'&center=true">去支付</a>\n' +
                            '                    <a href="javascript:;" id="cancel" data-name="'+item.order_no+'">取消订单</a>\n';
                    }else if(item.status === 'paying'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n'
                    }else if(item.status === 'paid'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n'
                    }else if(item.status === 'waitingForInstall'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                            '                    <a href="./invoice.html">开具发票</a>\n' +
                            '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                    }else if(item.status === 'installing'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                            '                    <a href="./invoice.html">开具发票</a>\n' +
                            '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                    }else if(item.status === 'installed'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                            '                    <a href="./invoice.html">开具发票</a>\n' +
                            '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                    }else if(item.status === 'dispatching'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                            '                    <a href="./invoice.html">开具发票</a>\n' +
                            '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                    }else if(item.status === 'waitingForSign'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                            '                    <a href="./invoice.html">开具发票</a>\n' +
                            '                    <a href="./returns.html?id='+item.no+'">退换货</a>\n';
                    }else if(item.status === 'signed'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                            '                    <a href="./invoice.html">开具发票</a>\n' +
                            '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                    }else if(item.status === 'canceled'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n'
                    }else if(item.status === 'returned'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n'
                    }else if(item.status === 'exchanged'){
                        operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                            '                    <a href="./invoice.html">开具发票</a>\n' +
                            '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                    }


                    var pc_hmtl = '<tr>\n' +
                        '                <td>\n' +
                        '                    <div class="img"><img src="'+item.goods_cover_url+'" alt=""><p>共'+item.goods_sum+'件</p></div>\n' +
                        '                    <div class="con">\n' +
                        '                        <p>订单号：'+item.order_no+'</p>\n' +
                        '                        <span>下单时间：'+item.create_at+'</span>\n' +
                        '                    </div>\n' +
                        '                </td>\n' +
                        '                <td>'+status[item.status]+'</td>\n' +
                        '                <td>￥'+item.price+'</td>\n' +
                        '                <td class="operate">\n' +
                                            operate+
                        '                </td>\n' +
                        '            </tr>';
                    $('.pcOrder').append(pc_hmtl);

                    var m_html = '<li>\n' +
                        '                    <div class="up">\n' +
                        '                        <div class="img"><img src="'+item.goods_cover_url+'" alt=""><p>共'+item.goods_sum+'件</p></div>\n' +
                        '                        <div class="con">\n' +
                        '                            <p>订单号：'+item.order_no+'</p>\n' +
                        '                            <span>下单时间：'+item.create_at+'</span>\n' +
                        '                        </div>\n' +
                        '                        <div class="status">订单状态：'+status[item.status]+'</div>\n' +
                        '                    </div>\n' +
                        '                    <div class="down">\n' +
                                                operate +
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
    }
    getOrders();


    // 取消订单
    $('.myOrder').on('click','#cancel',function(){
        //console.log('22');
        var orderId = $(this).attr('data-name');
        var getOrderCancel = api.getOrderCancel(orderId);
        if(getOrderCancel.code === 200){
            getOrders();
        }
    });


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


});