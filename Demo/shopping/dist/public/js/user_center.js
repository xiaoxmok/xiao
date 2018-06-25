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
    //console.log('getUser.school_id',getUser);

    // 获取学校信息
    var getSchool = api.getSchool(getUser.school_info.id,i18nLanguage);
    $('.school .img img').attr('src', getSchool.logo_info.url);
    $('.school .con .title').html(getSchool.name);
    $('.school .con span').html(getSchool.description)

    var status;
    if(isEnglish()){
        status = {
            waitingForPay:"waitingForPay",
            paying:"paying",
            paid:"paid",
            waitingForInstall:"waitingForInstall",
            installing:"installing",
            installed:"installed",
            dispatching:"dispatching",
            dispatched:"dispatched",
            waitingForSign:"waitingForSign",
            signed:"signed",
            canceled:"canceled",
            returned:"returned",
            exchanged:"exchanged",
            waitingForReturn:"waitingForReturn"
        };
    }else{
        status = {
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
            exchanged:"已换货",
            waitingForReturn:"待退货"
        };
    }


    // 获取我的订单
    function getOrders(getOrderList) {
        $('.pcOrder').html('');
        $('.mOrder ul').html('');

        var head;
        if(isEnglish()){
            head = '<tr>\n' +
                '                <th>Order No.</th>\n' +
                '                <th>Order Status</th>\n' +
                '                <th>Order Amount</th>\n' +
                '                <th>Manage</th>\n' +
                '            </tr>';
        }else{
            head = '<tr>\n' +
                '                <th>订单号</th>\n' +
                '                <th>订单状态</th>\n' +
                '                <th>订单金额</th>\n' +
                '                <th>操作</th>\n' +
                '            </tr>';
        }
        $('.pcOrder').append(head);

        //var getOrderList = api.getOrderList('');
        if (getOrderList.code === 200) {
            if (getOrderList.data.length > 0) {
                var dataArr = getOrderList.data;
                dataArr.forEach(function(item,index){
                    var operate
                    // 订单状态的管理
                    if(isEnglish()){
                        if(item.status === 'waitingForPay'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n' +
                                '                    <a href="./payment.html?orderNo='+item.order_no+'&center=true">Go to pay</a>\n' +
                                '                    <a href="javascript:;" id="cancel" data-name="'+item.order_no+'">Cancel Order</a>\n';
                        }else if(item.status === 'paying'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n'
                        }else if(item.status === 'paid'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">Return and Refund</a>';
                        }else if(item.status === 'waitingForInstall'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">Return and Refund</a>\n';
                        }else if(item.status === 'installing'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">Return and Refund</a>\n';
                        }else if(item.status === 'installed'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">Return and Refund</a>\n';
                        }else if(item.status === 'dispatching'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">Return and Refund</a>\n';
                        }else if(item.status === 'waitingForSign'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id='+item.no+'">Return and Refund</a>\n';
                        }else if(item.status === 'signed'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">Return and Refund</a>\n';
                        }else if(item.status === 'canceled'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n'
                        }else if(item.status === 'waitingForReturn'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n'
                        }else if(item.status === 'returned'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n'
                        }else if(item.status === 'exchanged'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">Return and Refund</a>\n';
                        }
                    }else{
                        if(item.status === 'waitingForPay'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                                '                    <a href="./payment.html?orderNo='+item.order_no+'&center=true">去支付</a>\n' +
                                '                    <a href="javascript:;" id="cancel" data-name="'+item.order_no+'">取消订单</a>\n';
                        }else if(item.status === 'paying'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n'
                        }else if(item.status === 'paid'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">开具发票</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>';
                        }else if(item.status === 'waitingForInstall'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">开具发票</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                        }else if(item.status === 'installing'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">开具发票</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                        }else if(item.status === 'installed'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">开具发票</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                        }else if(item.status === 'dispatching'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">开具发票</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                        }else if(item.status === 'waitingForSign'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">开具发票</a>\n' +
                                '                    <a href="./returns.html?id='+item.no+'">退换货</a>\n';
                        }else if(item.status === 'signed'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">开具发票</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                        }else if(item.status === 'canceled'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n'
                        }else if(item.status === 'waitingForReturn'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n'
                        }else if(item.status === 'returned'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n'
                        }else if(item.status === 'exchanged'){
                            operate = '              <a href="./ordersDetail.html?id='+item.order_no+'">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no='+item.order_no+'">开具发票</a>\n' +
                                '                    <a href="./returns.html?id='+item.order_no+'">退换货</a>\n';
                        }
                    }
                    var pc_hmtl
                    if(isEnglish()){
                        pc_hmtl = '<tr>\n' +
                            '                <td>\n' +
                            '                    <div class="img"><img src="'+item.goods_cover_url+'" alt=""><p>共'+item.goods_sum+'件</p></div>\n' +
                            '                    <div class="con">\n' +
                            '                        <p>Order No.: '+item.order_no+'</p>\n' +
                            '                        <span>Order Created at: '+item.created_at+'</span>\n' +
                            '                    </div>\n' +
                            '                </td>\n' +
                            '                <td>'+status[item.status]+'</td>\n' +
                            '                <td>￥'+item.price+'</td>\n' +
                            '                <td class="operate">\n' +
                            operate+
                            '                </td>\n' +
                            '            </tr>';
                    }else{
                        pc_hmtl = '<tr>\n' +
                            '                <td>\n' +
                            '                    <div class="img"><img src="'+item.goods_cover_url+'" alt=""><p>共'+item.goods_sum+'件</p></div>\n' +
                            '                    <div class="con">\n' +
                            '                        <p>订单号：'+item.order_no+'</p>\n' +
                            '                        <span>下单时间：'+item.created_at+'</span>\n' +
                            '                    </div>\n' +
                            '                </td>\n' +
                            '                <td>'+status[item.status]+'</td>\n' +
                            '                <td>￥'+item.price+'</td>\n' +
                            '                <td class="operate">\n' +
                            operate+
                            '                </td>\n' +
                            '            </tr>';
                    }

                    $('.pcOrder').append(pc_hmtl);

                    if(isEnglish()){
                        var m_html = '<li>\n' +
                            '                    <div class="up">\n' +
                            '                        <div class="img"><img src="'+item.goods_cover_url+'" alt=""><p>共'+item.goods_sum+'件</p></div>\n' +
                            '                        <div class="con">\n' +
                            '                            <p>Order No.：'+item.order_no+'</p>\n' +
                            '                            <span>Order Created at:'+item.created_at+'</span>\n' +
                            '                        </div>\n' +
                            '                        <div class="status">Order Status：'+status[item.status]+'</div>\n' +
                            '                    </div>\n' +
                            '                    <div class="down">\n' +
                            operate +
                            '                    </div>\n' +
                            '                </li>';
                    }else{
                        var m_html = '<li>\n' +
                            '                    <div class="up">\n' +
                            '                        <div class="img"><img src="'+item.goods_cover_url+'" alt=""><p>共'+item.goods_sum+'件</p></div>\n' +
                            '                        <div class="con">\n' +
                            '                            <p>订单号：'+item.order_no+'</p>\n' +
                            '                            <span>下单时间：'+item.created_at+'</span>\n' +
                            '                        </div>\n' +
                            '                        <div class="status">订单状态：'+status[item.status]+'</div>\n' +
                            '                    </div>\n' +
                            '                    <div class="down">\n' +
                            operate +
                            '                    </div>\n' +
                            '                </li>';
                    }
                    $('.mOrder ul').append(m_html);
                });
            }else{
                var pc_tr = '<tr>\n' +
                    '                <td colspan="5">\n' +
                    '                    <p>none</p>\n' +
                    '                </td>\n' +
                    '            </tr>';
                $('.pcOrder').append(pc_tr);

                var m_li = '<li>\n' +
                    '                    <div>\n' +
                    '                        <p>none</p>\n' +
                    '                    </div>\n' +
                    '                </li>';
                $('.mOrder ul').append(m_li);
            }
        } else {
            var pcerror = '<tr>\n' +
                '                <td colspan="5">\n' +
                '                    <p>error</p>\n' +
                '                </td>\n' +
                '            </tr>'
            $('.pcOrder').append(pcerror);

            var m_li = '<li>\n' +
                '                    <div>\n' +
                '                        <p>error</p>\n' +
                '                    </div>\n' +
                '                </li>';
            $('.mOrder li').append(m_li);
        }
    }
    //getOrders();
    $('.pcOrder').html('Loading...');
    $('.mOrder ul').html('Loading...');
    api.getOrderList('',getOrders);


    // 取消订单
    $('.myOrder').on('click','#cancel',function(){
        //console.log('22');
        var orderId = $(this).attr('data-name');
        var getOrderCancel = api.getOrderCancel(orderId);
        api.getOrderList('',getOrders);
    });


    // 获取我的收藏
    function getMyCollect(){
        $('.collect ul').html('');

        $.ajax({
            type:'GET',
            url:url+'/api/v1/fav/index?token='+token+'&lang='+i18nLanguage,
            dataType:'json',
            success:function(data){
                if(data.code === 200){
                    if(data.data.length >0){
                        var dataArr = data.data;
                        dataArr.forEach(function(item,index){
                            var html;
                            if(isEnglish()){
                                var html = '<li>\n' +
                                    '                    <a href="./product.html?id=' + item.id + '">\n' +
                                    '                    <img src="'+item.img_infos[0].url+'" alt="">\n' +
                                    '                    <div class="con">\n' +
                                    '                        <p class="Title">'+item.name+'</p>\n' +
                                    '                        <p class="description">'+item.introduce+'</p>\n' +
                                    '                        <p class="price"><span>MSRP：</span><del>￥'+toPrice(item.price)+'</del></p>\n' +
                                    '                        <p class="price"><span>School Special Offer：</span><em>￥'+toPrice(item.school_price)+'</em></p>\n' +
                                    '                    </div>\n' +
                                    '                    </a>\n' +
                                    '                </li>';
                            }else{
                                var html = '<li>\n' +
                                    '                    <a href="./product.html?id=' + item.id + '">\n' +
                                    '                    <img src="'+item.img_infos[0].url+'" alt="">\n' +
                                    '                    <div class="con">\n' +
                                    '                        <p class="Title">'+item.name+'</p>\n' +
                                    '                        <p class="description">'+item.introduce+'</p>\n' +
                                    '                        <p class="price"><span>常规价格：</span><del>￥'+toPrice(item.price)+'</del></p>\n' +
                                    '                        <p class="price"><span>学校优惠价：</span><em>￥'+toPrice(item.school_price)+'</em></p>\n' +
                                    '                    </div>\n' +
                                    '                    </a>\n' +
                                    '                </li>';
                            }
                            $('.collect ul').append(html);

                        })
                    }else{
                        var error = '<li>\n' +
                            '                    <p>no data</p>\n' +
                            '                </li>';

                        $('.collect ul').append(error);
                    }
                }else{
                    var error = '<li>\n' +
                        '                    <p>no data</p>\n' +
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
    function getMyTicket(){

        $.ajax({
            type:'GET',
            url:url+'/api/v1/coupon/index?token='+token+'&type=repair ',
            dataType:'json',
            success:function(data){
                if(data.code === 200){
                    var dataArr = data.data;
                    $('.ticket ul').html('');

                    dataArr.forEach(function(item,index){
                        var html;
                        var type = {
                            repair: '维修券'
                        }
                        if(isEnglish()){
                            html = '<li class="ticket1">\n' +
                                '                <div class="up">\n' +
                                '                    <div class="img"></div>\n' +
                                '                    <p>'+item.type+'</p>\n' +
                                '                </div>\n' +
                                '                <div class="down">\n' +
                                '                    <a href="javascript:;">Unused</a>\n' +
                                '                </div>\n' +
                                '            </li>';
                        }else{
                            html = '<li class="ticket1">\n' +
                                '                <div class="up">\n' +
                                '                    <div class="img"></div>\n' +
                                '                    <p>'+type[item.type]+'</p>\n' +
                                '                </div>\n' +
                                '                <div class="down">\n' +
                                '                    <a href="javascript:;">未使用</a>\n' +
                                '                </div>\n' +
                                '            </li>';
                        }

                        $('.ticket ul').append(html);
                    })
                }
            },
            error:function(xhr,status,error){

            }
        })

    }

    // 获取维修记录
    function getMaintenanceRecords(){
        $.ajax({
            type:'GET',
            url:url+'/api/v1/repair/index?token='+token,
            dataType:'json',
            success:function(data){
                if(data.code === 200){

                }
            },
            error:function(xhr,status,error){

            }
        })
    }


    $('.orderNav li').click(function () {
        var index = $(this).index();

        $('.list').hide().eq(index).show();
        $('.orderNav li').removeClass('active');
        $(this).addClass('active');

        switch (index){
            case 0:
                $('.pcOrder').html('Loading...');
                $('.mOrder ul').html('Loading...');
                api.getOrderList('',getOrders);
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

    // 为我推荐
    $('.forMe').click(function(){
        if(getUser.questionnaire_option_id_group == null){
            location.href = "questionnaire.html"
        }else{
            location.href = "recommendForMe.html"
        }
    })

});