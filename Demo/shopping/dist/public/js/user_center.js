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

    var school_no,school_info;
    if(getUser.type === 'student'){
        if(isEnglish()){
            school_info = 'Student ID No.: '
        }else{
            school_info = '学号: '
        }
    }else{
        if(isEnglish()){
            school_info = 'Faculty number: ';
        }else{
            school_info = '教职员工号: ';
        }
    }
    if(getUser.school_no !== null){
        school_no = getUser.school_no
    }else{
        if(isEnglish()){
            school_no = 'unfilled';
        }else{
            school_no = '未填写';
        }
    }

    $('.userName .person .no em').html(school_info + school_no);
    var email;
    if(getUser.email !== null){
        email = getUser.email.split('@')[0].slice(0,-4) + '****@' +getUser.email.split('@')[1];
    }else{
        if(isEnglish()){
            email = 'unfilled';
        }else{
            email = '未填写';
        }
    }

    $('.userName .person .email em').html(email);
    $('.userName .person .phone em').html(getUser.phone.slice(0,3)+'****'+getUser.phone.slice(-4));

    // 获取默认地址

    var getAddressList = api.getAddressList(getCookie('userId'));

    var defalutAddress;

    getAddressList.forEach(function (item, index) {
        if (item.is_default === 'y') {
            defalutAddress = item.address;
        }
    });
    $('.userName .person .address em').html(defalutAddress);
    //console.log('getUser.school_id',getUser);

    // 获取学校信息
    var getSchool = api.getSchool(getUser.school_info.id, i18nLanguage);
    $('.school .img img').attr('src', getSchool.logo_info.url);
    $('.school .con .title').html(getSchool.name);
    $('.school .con span').html(getSchool.description)

    var status;
    if (isEnglish()) {
        status = {
            waitingForPay: "waitingForPay",
            paying: "paying",
            paid: "paid",
            waitingForInstall: "waitingForInstall",
            installing: "installing",
            installed: "installed",
            dispatching: "dispatching",
            dispatched: "dispatched",
            waitingForSign: "waitingForSign",
            signed: "signed",
            canceled: "canceled",
            returned: "returned",
            exchanged: "exchanged",
            waitingForReturn: "waitingForReturn"
        };
    } else {
        status = {
            waitingForPay: "待支付",
            paying: "支付中",
            paid: "已支付",
            waitingForInstall: "待安装",
            installing: "安装中",
            installed: "已安装",
            dispatching: "配送中",
            dispatched: "已配送",
            waitingForSign: "待签收",
            signed: "已签收",
            canceled: "已取消",
            returned: "已退货",
            exchanged: "已换货",
            waitingForReturn: "待退货"
        };
    }


    // 获取我的订单
    function getOrders(getOrderList) {
        $('.pcOrder').html('');
        $('.mOrder ul').html('');

        var head;
        if (isEnglish()) {
            head = '<tr>\n' +
                '                <th>Order No.</th>\n' +
                '                <th>Order Status</th>\n' +
                '                <th>Order Amount</th>\n' +
                '                <th>Manage</th>\n' +
                '            </tr>';
        } else {
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
                dataArr.forEach(function (item, index) {
                    var operate
                    // 订单状态的管理
                    if (isEnglish()) {
                        if (item.status === 'waitingForPay') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                '                    <a href="./payment.html?orderNo=' + item.order_no + '&center=true">Go to pay</a>\n' +
                                '                    <a href="javascript:;" id="cancel" data-name="' + item.order_no + '">Cancel Order</a>\n';
                        } else if (item.status === 'paying') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        } else if (item.status === 'paid') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">Return and Refund</a>';
                        } else if (item.status === 'waitingForInstall') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">Return and Refund</a>\n';
                        } else if (item.status === 'installing') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">Return and Refund</a>\n';
                        } else if (item.status === 'installed') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">Return and Refund</a>\n';
                        } else if (item.status === 'dispatching') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">Return and Refund</a>\n';
                        } else if (item.status === 'waitingForSign') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id=' + item.no + '">Return and Refund</a>\n';
                        } else if (item.status === 'signed') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">Return and Refund</a>\n';
                        } else if (item.status === 'canceled') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        } else if (item.status === 'waitingForReturn') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        } else if (item.status === 'returned') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        } else if (item.status === 'exchanged') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">Request an invoice (Fapiao)</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">Return and Refund</a>\n';
                        }
                    } else {
                        if (item.status === 'waitingForPay') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                '                    <a href="./payment.html?orderNo=' + item.order_no + '&center=true">去支付</a>\n' +
                                '                    <a href="javascript:;" id="cancel" data-name="' + item.order_no + '">取消订单</a>\n';
                        } else if (item.status === 'paying') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'paid') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">开具发票</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">退换货</a>';
                        } else if (item.status === 'waitingForInstall') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">开具发票</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">退换货</a>\n';
                        } else if (item.status === 'installing') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">开具发票</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">退换货</a>\n';
                        } else if (item.status === 'installed') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">开具发票</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">退换货</a>\n';
                        } else if (item.status === 'dispatching') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">开具发票</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">退换货</a>\n';
                        } else if (item.status === 'waitingForSign') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">开具发票</a>\n' +
                                '                    <a href="./returns.html?id=' + item.no + '">退换货</a>\n';
                        } else if (item.status === 'signed') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">开具发票</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">退换货</a>\n';
                        } else if (item.status === 'canceled') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'waitingForReturn') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'returned') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'exchanged') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                '                    <a href="./invoice.html?order_no=' + item.order_no + '">开具发票</a>\n' +
                                '                    <a href="./returns.html?id=' + item.order_no + '">退换货</a>\n';
                        }
                    }
                    var pc_hmtl
                    if (isEnglish()) {
                        pc_hmtl = '<tr>\n' +
                            '                <td>\n' +
                            '                    <div class="img"><img src="' + item.goods_cover_url + '" alt=""><p>共' + item.goods_sum + '件</p></div>\n' +
                            '                    <div class="con">\n' +
                            '                        <p>Order No.: ' + item.order_no + '</p>\n' +
                            '                        <span>Order Created at: ' + item.created_at + '</span>\n' +
                            '                    </div>\n' +
                            '                </td>\n' +
                            '                <td>' + status[item.status] + '</td>\n' +
                            '                <td>￥' + toPrice(item.price) + '</td>\n' +
                            '                <td class="operate">\n' +
                            operate +
                            '                </td>\n' +
                            '            </tr>';
                    } else {
                        pc_hmtl = '<tr>\n' +
                            '                <td>\n' +
                            '                    <div class="img"><img src="' + item.goods_cover_url + '" alt=""><p>共' + item.goods_sum + '件</p></div>\n' +
                            '                    <div class="con">\n' +
                            '                        <p>订单号：' + item.order_no + '</p>\n' +
                            '                        <span>下单时间：' + item.created_at + '</span>\n' +
                            '                    </div>\n' +
                            '                </td>\n' +
                            '                <td>' + status[item.status] + '</td>\n' +
                            '                <td>￥' + toPrice(item.price) + '</td>\n' +
                            '                <td class="operate">\n' +
                            operate +
                            '                </td>\n' +
                            '            </tr>';
                    }

                    $('.pcOrder').append(pc_hmtl);

                    if (isEnglish()) {
                        var m_html = '<li>\n' +
                            '                    <div class="up">\n' +
                            '                        <div class="img"><img src="' + item.goods_cover_url + '" alt=""><p>共' + item.goods_sum + '件</p></div>\n' +
                            '                        <div class="con">\n' +
                            '                            <p>Order No.：' + item.order_no + '</p>\n' +
                            '                            <span>Order Created at:' + item.created_at + '</span>\n' +
                            '                        </div>\n' +
                            '                        <div class="status">Order Status：' + status[item.status] + '</div>\n' +
                            '                    </div>\n' +
                            '                    <div class="down">\n' +
                            operate +
                            '                    </div>\n' +
                            '                </li>';
                    } else {
                        var m_html = '<li>\n' +
                            '                    <div class="up">\n' +
                            '                        <div class="img"><img src="' + item.goods_cover_url + '" alt=""><p>共' + item.goods_sum + '件</p></div>\n' +
                            '                        <div class="con">\n' +
                            '                            <p>订单号：' + item.order_no + '</p>\n' +
                            '                            <span>下单时间：' + item.created_at + '</span>\n' +
                            '                        </div>\n' +
                            '                        <div class="status">订单状态：' + status[item.status] + '</div>\n' +
                            '                    </div>\n' +
                            '                    <div class="down">\n' +
                            operate +
                            '                    </div>\n' +
                            '                </li>';
                    }
                    $('.mOrder ul').append(m_html);
                });
            } else {
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
    api.getOrderList('', getOrders);


    // 取消订单
    $('.myOrder').on('click', '#cancel', function () {
        //console.log('22');
        var orderId = $(this).attr('data-name');
        var getOrderCancel = api.getOrderCancel(orderId);
        api.getOrderList('', getOrders);
    });


    // 获取我的收藏
    function getMyCollect() {
        $('.collect ul').html('');

        $.ajax({
            type: 'GET',
            url: url + '/api/v1/fav/index?token=' + token + '&lang=' + i18nLanguage,
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    if (data.data.length > 0) {
                        var dataArr = data.data;
                        dataArr.forEach(function (item, index) {
                            var html;

                            if(item.summary !== null){
                                summary = item.summary;
                            }else{
                                summary = 'Not described';
                            }
                            if (isEnglish()) {
                                var html = '<li>\n' +
                                    '                    <a href="./product.html?id=' + item.id + '">\n' +
                                    '                    <img src="' + item.img_infos[0].url + '" alt="">\n' +
                                    '                    <div class="con">\n' +
                                    '                        <p class="Title">' + item.name + '</p>\n' +
                                    '                        <p class="description">' + summary + '</p>\n' +
                                    '                        <p class="price"><span>MSRP：</span><del>￥' + toPrice(item.price) + '</del></p>\n' +
                                    '                        <p class="price"><span>School Special Offer：</span><em>￥' + toPrice(item.school_price) + '</em></p>\n' +
                                    '                    </div>\n' +
                                    '                    </a>\n' +
                                    '                </li>';
                            } else {
                                var html = '<li>\n' +
                                    '                    <a href="./product.html?id=' + item.id + '">\n' +
                                    '                    <img src="' + item.img_infos[0].url + '" alt="">\n' +
                                    '                    <div class="con">\n' +
                                    '                        <p class="Title">' + item.name + '</p>\n' +
                                    '                        <p class="description">' + summary + '</p>\n' +
                                    '                        <p class="price"><span>常规价格：</span><del>￥' + toPrice(item.price) + '</del></p>\n' +
                                    '                        <p class="price"><span>学校优惠价：</span><em>￥' + toPrice(item.school_price) + '</em></p>\n' +
                                    '                    </div>\n' +
                                    '                    </a>\n' +
                                    '                </li>';
                            }
                            $('.collect ul').append(html);

                        })
                    } else {
                        var error = '<li>\n' +
                            '                    <p>no data</p>\n' +
                            '                </li>';

                        $('.collect ul').append(error);
                    }
                } else {
                    var error = '<li>\n' +
                        '                    <p>no data</p>\n' +
                        '                </li>';

                    $('.collect ul').append(error);
                }
            },
            error: function (xhr, status, error) {

            }
        })
    }

    // 获取我的设备
    function getMyDevice() {

        $.ajax({
            type:'post',
            url: url + '/api/v1/user/device-list',
            dataType:'json',
            data:{token:token,lang:i18nLanguage},
            success:function(data){
                if(data.code === 200){


                }
            },
            error:function(){}
        });

    }

    // 获取我的特权券
    function getMyTicket() {

        $.ajax({
            type: 'GET',
            url: url + '/api/v1/coupon/index?token=' + token + '&type=repair ',
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    var dataArr = data.data;
                    $('.ticket ul').html('');

                    dataArr.forEach(function (item, index) {
                        var html;
                        var type = {
                            repair: '维修券'
                        }
                        if (isEnglish()) {
                            html = '<li class="ticket1">\n' +
                                '                <div class="up">\n' +
                                '                    <div class="img"></div>\n' +
                                '                    <p>' + item.type + '</p>\n' +
                                '                </div>\n' +
                                '                <div class="down">\n' +
                                '                    <a href="javascript:;">Unused</a>\n' +
                                '                </div>\n' +
                                '            </li>';
                        } else {
                            html = '<li class="ticket1">\n' +
                                '                <div class="up">\n' +
                                '                    <div class="img"></div>\n' +
                                '                    <p>' + type[item.type] + '</p>\n' +
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
            error: function (xhr, status, error) {

            }
        })

    }

    var repairStatus,backup_status;
    if(isEnglish()){
        repairStatus = {
            uSubmited: 'uSubmited',
            pReceived: 'pReceived',
            pEvaluated: 'pEvaluated',
            uConfirmed: 'uConfirmed',
            pRepairing: 'pRepairing',
            pRepaired: 'pRepaired',
            uReceived: 'uReceived',
            uWaitingForPay: 'uWaitingForPay',
            uPaid: 'uPaid'
        };

        backup_status = {
            uSubmited: 'uSubmited',
            pNoticedUser: 'pNoticedUser',
            uReceived: 'uReceived',
            uReturned: 'uReturned',
            pConfirmReturned: 'pConfirmReturned'
        }
    }else{
        repairStatus = {
            uSubmited: '用户已提交',
            pReceived: '平台确认收到机器',
            pEvaluated: '平台已评估',
            uConfirmed: '用户已确认',
            pRepairing: '平台维修中',
            pRepaired: '平台维修完成待领取',
            uReceived: '用户已领取',
            uWaitingForPay: '待用户支付费用',
            uPaid: '用户已支付'
        };

        backup_status = {
            uSubmited: '用户已提交申请',
            pNoticedUser: '已通知用户领取备用机',
            uReceived: '用户已领取',
            uReturned: '用户已归还',
            pConfirmReturned: '平台确认用户已归还'
        }
    }

    // 获取维修记录
    function getMaintenanceRecords() {
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/repair/index?token=' + token,
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    var dataArr = data.data;
                    $('.pcService').html('');
                    $('.mService ul').html('');
                    var head;
                    if(isEnglish()){
                        head = '<tr>\n' +
                            '                <th>Fault description</th>\n' +
                            '                <th>Fault image</th>\n' +
                            '                <th>No.</th>\n' +
                            '                <th>Evaluation</th>\n' +
                            '                <th>Operating</th>\n' +
                            '                <th>Status</th>\n' +
                            '                <th>Backup Status</th>\n' +
                            '            </tr>';
                    }else{
                        head = '<tr>\n' +
                            '                <th>故障描述</th>\n' +
                            '                <th>故障照片</th>\n' +
                            '                <th>设备型号</th>\n' +
                            '                <th>维修评估</th>\n' +
                            '                <th>操作</th>\n' +
                            '                <th>维修状态</th>\n' +
                            '                <th>备用状态</th>\n' +
                            '            </tr>';
                    }

                    $('.pcService').append(head);

                    dataArr.forEach(function (item, index) {
                        var pcHtml,mHtml,url;
                        if(item.img_infos.length > 0){
                            url = item.img_infos[0].url;
                        }else{
                            url = '';
                        }
                        if(isEnglish()){
                            pcHtml = '<tr>\n' +
                                '                <td><p>'+item.description+'</p></td>\n' +
                                '                <td><div class="img"><img src="'+ url +'" alt=""></div></td>\n' +
                                '                <td><p>'+item.order_no+'</p></td>\n' +
                                '                <td><p>'+item.evaluation+'</p></td>\n' +
                                '                <td class="operate"><a href="javascript:;">'+backup_status[item.backup_status]+'</a></td>\n' +
                                '                <td class="status">\n' +
                                '                    <p>'+repairStatus[item.status]+'</p>\n' +
                                '                    <span>repair no：'+item.repair_no+'</span>\n' +
                                '                </td>\n' +
                                '                <td class="backup_status">\n' +
                                '                    <p>'+backup_status[item.backup_status]+'</p>\n' +
                                '                    <span>Created time：'+item.created_at+'</span>\n' +
                                '                </td>\n' +
                                '            </tr>';

                            mHtml = '<li>\n' +
                                '                    <div class="up">\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>repair no：<em>'+item.repair_no+'</em></div>\n' +
                                '                            <div class="status">'+repairStatus[item.status]+'</div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>order no：<em>'+item.order_no+'</em></div>\n' +
                                '                            <div class="status">'+backup_status[item.backup_status]+'</div>\n' +
                                '                        </div>' +
                                '                        <div class="text">\n' +
                                '                            <div class="question">\n' +
                                '                                <span>'+item.description+'</span>\n' +
                                '                            </div>\n' +
                                '                            <div class="assess">\n' +
                                '                                <span>'+item.evaluation+'</span>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div class="status">'+repairStatus[item.status]+'</div>\n' +
                                '                            <div class="time"><span>Created time：'+item.created_at+'</span></div>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                    <div class="down">\n' +
                                '                        <a href="javascript:;">'+backup_status[item.backup_status]+'</a>\n' +
                                '                    </div>\n' +
                                '                </li>';

                        }else{
                            pcHtml = '<tr>\n' +
                                '                <td><p>'+item.description+'</p></td>\n' +
                                '                <td><div class="img"><img src="'+ url +'" alt=""></div></td>\n' +
                                '                <td><p>'+item.order_no+'</p></td>\n' +
                                '                <td><p>'+item.evaluation+'</p></td>\n' +
                                '                <td class="operate"><a href="javascript:;">'+backup_status[item.backup_status]+'</a></td>\n' +
                                '                <td class="status">\n' +
                                '                    <p>'+repairStatus[item.status]+'</p>\n' +
                                '                    <span>单号：'+item.repair_no+'</span>\n' +
                                '                </td>\n' +
                                '                <td class="backup_status">\n' +
                                '                    <p>'+backup_status[item.backup_status]+'</p>\n' +
                                '                    <span>创建时间：'+item.created_at+'</span>\n' +
                                '                </td>\n' +
                                '            </tr>';

                            mHtml = '<li>\n' +
                                '                    <div class="up">\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>单号：<em>'+item.repair_no+'</em></div>\n' +
                                '                            <div class="status">'+repairStatus[item.status]+'</div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>设备型号：<em>'+item.order_no+'</em></div>\n' +
                                '                            <div class="status">'+backup_status[item.backup_status]+'</div>\n' +
                                '                        </div>' +
                                '                        <div class="text">\n' +
                                '                            <div class="question">\n' +
                                '                                <span>'+item.description+'</span>\n' +
                                '                            </div>\n' +
                                '                            <div class="assess">\n' +
                                '                                <span>'+item.evaluation+'</span>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div class="status">'+repairStatus[item.status]+'</div>\n' +
                                '                            <div class="time"><span>提交时间：'+item.created_at+'</span></div>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                    <div class="down">\n' +
                                '                        <a href="javascript:;">'+backup_status[item.backup_status]+'</a>\n' +
                                '                    </div>\n' +
                                '                </li>';
                        }

                        $('.pcService').append(pcHtml);
                        $('.mService ul').append(mHtml);


                    })
                }
            },
            error: function (xhr, status, error) {

            }
        })
    }


    $('.orderNav li').click(function () {
        var index = $(this).index();

        orderNav(index);

    })

    function orderNav(index){
        $('.list').hide().eq(index).show();
        $('.orderNav li').removeClass('active');
        $('.orderNav li').eq(index).addClass('active');

        switch (index) {
            case 0:
                $('.pcOrder').html('Loading...');
                $('.mOrder ul').html('Loading...');
                api.getOrderList('', getOrders);
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
                $('.pcService').html('Loading...');
                $('.mService ul').html('Loading...');
                getMaintenanceRecords();
                break;
        }
    }

    var getUrl = GetRequest();
    if(getUrl.nav){
        orderNav(parseInt(getUrl.nav));
    }

    // 为我推荐
    $('.forMe').click(function () {
        if (getUser.questionnaire_option_id_group == null) {
            location.href = "questionnaire.html"
        } else {
            location.href = "recommendForMe.html"
        }
    })

});