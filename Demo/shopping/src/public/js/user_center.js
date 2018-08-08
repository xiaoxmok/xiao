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

    $('.userName .person .name em').html(getUser.name);
    $('.userName .person .sex em').html(sex);
    $('.userName .person .role em').html(role);

    var school_no,school_info;
    if(getUser.type === 'student'){
        if(isEnglish()){
            school_info = 'Student ID No.: '
        }else{
            school_info = '学号: '
        }
    }else{
        if(isEnglish()){
            school_info = 'Staff: ';
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
            waitingForPay: "Waiting for payment",
            paying: "Waiting for payment",
            paid: "Paid",
            waitingForInstall: "Waiting for Install",
            installing: "Installation in Progress",
            installed: "Installed",
            dispatching: "Delivering",
            dispatched: "Shipped to Destination",
            waitingForSign: "Waiting For Sign",
            signed: "Delivered",
            canceled: "Canceled",
            returning: "Returning",
            waitingForExchange: "Waiting for Exchanging",
            returned: "Returned",
            exchanging: "Exchanging",
            exchanged: "Exchanged",
            waitingForReturn: "returnHandled"
        };
    } else {
        status = {
            waitingForPay: "待支付",
            paying: "待支付",
            paid: "已支付",
            waitingForInstall: "待安装",
            installing: "安装中",
            installed: "已安装",
            dispatching: "配送中",
            dispatched: "已配送",
            waitingForSign: "待签收",
            signed: "已签收",
            canceled: "已取消",
            returning: "退货中",
            refuseForReturn: "退货完成",
            waitingForExchange: "待换货",
            returned: "已退货",
            exchanging: "换货中",
            exchanged: "已换货",
            waitingForReturn: "待退货",
            refuseForExchange: "拒绝换货"
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

                    var toPay;
                    if(item.pay_type === 'unionpay'){
                        if(isEnglish()){
                            toPay = '<a href="./payment.html?orderNo=' + item.order_no + '&center=true">Go to pay</a>'
                        }else{
                            toPay = '<a href="./payment.html?orderNo=' + item.order_no + '&center=true">去支付</a>'
                        }
                    }else{
                        if(isEnglish()){
                            toPay = '<a href="javascript:;" class="toPay" data-name="'+item.order_no+'">Go to pay</a>'
                        }else{
                            toPay = '<a href="javascript:;" class="toPay" data-name="'+item.order_no+'">去支付</a>'
                        }
                    }


                    var operate
                    // 订单状态的管理
                    if (isEnglish()) {
                        if (item.status === 'waitingForPay') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                toPay +
                                '                    <a href="javascript:;" id="cancel" data-name="' + item.order_no + '">Cancel Order</a>\n';
                        } else if (item.status === 'paying') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n' +
                                toPay +
                                '                    <a href="javascript:;" id="cancel" data-name="' + item.order_no + '">Cancel Order</a>\n';
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
                        } else if (item.status === 'returning') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        } else if (item.status === 'exchanged') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        } else if (item.status === 'refuseForReturn') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        } else if (item.status === 'waitingForExchange') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        } else if (item.status === 'exchanging') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        } else if (item.status === 'refuseForExchange') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">Details</a>\n'
                        }
                    } else {
                        if (item.status === 'waitingForPay') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                toPay +
                                '                    <a href="javascript:;" id="cancel" data-name="' + item.order_no + '">取消订单</a>\n';
                        } else if (item.status === 'paying') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n' +
                                toPay +
                                '                    <a href="javascript:;" id="cancel" data-name="' + item.order_no + '">取消订单</a>\n';
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
                        } else if (item.status === 'waitingForExchange') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'returned') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'returning') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'refuseForReturn') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'refuseForExchange') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'exchanged') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        } else if (item.status === 'exchanging') {
                            operate = '              <a href="./ordersDetail.html?id=' + item.order_no + '">查看详情</a>\n'
                        }
                    }
                    var pc_hmtl
                    if (isEnglish()) {
                        pc_hmtl = '<tr>\n' +
                            '                <td>\n' +
                            '                    <div class="img"><img src="' + item.goods_cover_url + '" alt=""><p>' + item.goods_sum + ' Pieces</p></div>\n' +
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

    // 去支付
    $('.myOrder').on('click', '.toPay', function () {
        //console.log('22');
        var orderId = $(this).attr('data-name');
        var pay_type;

        $('.zhezhao').show();
        $('.tan5').show();

        $('.tan5 .typeClick div').click(function(){
            $('.tan5 .typeClick div').removeClass('active')
            $(this).addClass('active');
        })

        $('.clear').click(function(){
            $('.zhezhao').hide();
            $('.tan5').hide();
        })

        $('.goPay').click(function(){
            pay_type = $(this).parent().parent().find('.active').attr('data-name');

            location.href = 'payment.html?orderNo=' + orderId + '&center=true&pay_type='+ pay_type;
        })
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
                    var dataArr = data.data;
                    $('.myDevice ul').html('')
                    dataArr.forEach(function(item,index){
                        var html;
                        if(isEnglish()){
                            html = '<li>\n' +
                                '                    <img src="'+item.img_infos[0].url+'" alt="">\n' +
                                '                    <div class="con">\n' +
                                '                        <p class="Title">'+item.goods_name+'</p>\n' +
                                '                        <a class="apply" href="./repairApplication.html">Request Repair</a>\n' +
                                '                    </div>\n' +
                                '                </li>'
                        }else{
                            html = '<li>\n' +
                                '                    <img src="'+item.img_infos[0].url+'" alt="">\n' +
                                '                    <div class="con">\n' +
                                '                        <p class="Title">'+item.goods_name+'</p>\n' +
                                '                        <a class="apply" href="./repairApplication.html">申请维修</a>\n' +
                                '                    </div>\n' +
                                '                </li>'
                        }

                        $('.myDevice ul').append(html);

                    })


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
            uSubmited: 'Request Submitted.',
            pReceived: 'Ruturned successfully. Waiting for assessing',
            pEvaluated: 'Assessment accomplished. Waiting for confirmation',
            uConfirmed: 'Repairing plan is confirmed. Repair in progress',
            pRepairing: 'Repaired successfully,to be received by user',
            pRepaired: 'Received successfully, repair accomplished',
            uWaitingForPay: 'Received successfully, waiting for payment',
            uPaid: 'Paid successfully, repair accomplished',
            uCanceled: 'repair request canceled'
        };

        backup_status = {
            uSubmited: 'Request submitted. Waiting for loaner',
            pNoticedUser: 'Waiting for receiving',
            uReceived: 'Loaner received by user.',
            uReturned: 'Loaner delivered. To be returned.',
            pConfirmReturned: 'Loaner returned.',
            none:''
        }
    }else{
        repairStatus = {
            uSubmited: '提交成功待返件',
            pReceived: '返件成功待评估',
            pEvaluated: '评估完成，待用户确认维修',
            uConfirmed: '维修方案已确认，维修中',
            pRepairing: '维修完成，待用户领取',
            pRepaired: '设备已确认领取，维修完成',
            uWaitingForPay: '设备已确认领取，待支付',
            uPaid: '付款成功，维修完成',
            uCanceled: '已取消维修申请'
        };

        backup_status = {
            uSubmited: '申请提交成功，待分配备用机',
            pNoticedUser: '备用机待领',
            uReceived: '用户已领取',
            uReturned: '使用中，待归还',
            pConfirmReturned: '确认用户归还',
            none: ''
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
                        var isSz = false;
                        if(getUser.school_info.city === 'sh'){
                            isSz = false;
                        }else{
                            isSz = true;
                        }

                        var operate;
                        if(isEnglish()){
                            if(item.status === 'uSubmited'){
                                operate = '<a href="javascript:;" class="cancelRepair">Cancel my request</a>'
                            }else if(item.status === 'pReceived'){
                                operate = '<a href="javascript:;" class="cancelRepair">Cancel my request</a>'
                            }else if(item.status === 'pEvaluated'){
                                operate = '<a href="javascript:;" class="confirmRepair">Confirm repair request</a>'
                            }else if(item.status === 'uConfirmed'){
                                if(isSz){
                                    operate = '<a href="javascript:;" class="applyBackup">Apply Backup</a>'
                                }else{
                                    operate = ''
                                }
                            }else if(item.status === 'pRepaired'){
                                operate = ''
                            }else if(item.status === 'uWaitingForPay'){
                                operate = '<a href="javascript:;" class="waitForPay" data-name="'+item.order_no+'" data-repair_no="'+item.repair_no+'" data-price="'+item.price+'">Make the payment</a>'
                            }else if(item.status === 'pReceived'){
                                operate = ''
                            }else if(item.status === 'uPaid'){
                                operate = ''
                            }else if(item.status === 'uCanceled'){
                                operate = ''
                            }

                            if(item.backup_status === 'pNoticedUser'){
                                operate += '<a href="javascript:;" class="receivingConfirmed">Receiving loaner confirmed</a>'
                            }

                        }else{
                            if(item.status === 'uSubmited'){
                                operate = '<a href="javascript:;" class="cancelRepair">取消维修申请</a>'
                            }else if(item.status === 'pReceived'){
                                operate = '<a href="javascript:;" class="cancelRepair">取消维修申请</a>'
                            }else if(item.status === 'pEvaluated'){
                                operate = '<a href="javascript:;" class="confirmRepair">确认维修</a>'
                            }else if(item.status === 'uConfirmed'){
                                if(isSz){
                                    operate = '<a href="javascript:;" class="applyBackup">申请备用机</a>'
                                }else{
                                    operate = ''
                                }
                            }else if(item.status === 'pRepaired'){
                                operate = ''
                            }else if(item.status === 'uWaitingForPay'){
                                operate = '<a href="javascript:;" class="waitForPay" data-name="'+item.order_no+'" data-repair_no="'+item.repair_no+'" data-price="'+item.price+'">支付</a>'
                            }else if(item.status === 'pReceived'){
                                operate = ''
                            }else if(item.status === 'uPaid'){
                                operate = ''
                            }else if(item.status === 'uCanceled'){
                                operate = ''
                            }

                            if(item.backup_status === 'pNoticedUser'){
                                operate += '<a href="javascript:;" class="receivingConfirmed">备用机确认领取</a>'
                            }
                        }

                        var backupStatus;
                        if(item.backup_status !== null){
                            if(isEnglish()){
                                backupStatus = backup_status[item.backup_status];
                            }else{
                                backupStatus = backup_status[item.backup_status];
                            }
                        }else{
                            backupStatus = '';
                        }


                        if(isEnglish()){
                            pcHtml = '<tr>\n' +
                                '                <td><p>'+item.description+'</p></td>\n' +
                                '                <td><div class="img"><img src="'+ url +'" alt=""></div></td>\n' +
                                '                <td><p>'+item.device_category_info[0]+'</p></td>\n' +
                                '                <td><p>'+item.evaluation+'</p></td>\n' +
                                '                <td class="operate" data-name="'+item.id+'">'+operate+'</td>\n' +
                                '                <td class="status">\n' +
                                '                    <p>'+repairStatus[item.status]+'</p>\n' +
                                '                    <span>repair no：'+item.repair_no+'</span>\n' +
                                '                </td>\n' +
                                '                <td class="backup_status">\n' +
                                '                    <p>'+backupStatus+'</p>\n' +
                                '                    <span>Created time：'+item.created_at+'</span>\n' +
                                '                </td>\n' +
                                '            </tr>';

                            mHtml = '<li>\n' +
                                '                    <div class="up">\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>Status：<em>'+repairStatus[item.status]+'</em></div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>Backup Staus：<em>'+backupStatus+'</em></div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>repair no：<em>'+item.repair_no+'</em></div>\n' +
                                '                            <div class="status">'+repairStatus[item.status]+'</div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>order no：<em>'+item.device_category_info[0]+'</em></div>\n' +
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
                                '                        <div class="operate" data-name="'+item.id+'">\n' +
                                '                            <div class="time"><span>Created time：'+item.created_at+'</span></div>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                    <div class="down">\n' +
                                                            operate +
                                '                    </div>\n' +
                                '                </li>';

                        }else{
                            pcHtml = '<tr>\n' +
                                '                <td><p>'+item.description+'</p></td>\n' +
                                '                <td><div class="img"><img src="'+ url +'" alt=""></div></td>\n' +
                                '                <td><p>'+item.device_category_info[0]+'</p></td>\n' +
                                '                <td><p>'+item.evaluation+'</p></td>\n' +
                                '                <td class="operate" data-name="'+item.id+'">'+operate+'</td>\n' +
                                '                <td class="status">\n' +
                                '                    <p>'+repairStatus[item.status]+'</p>\n' +
                                '                    <span>单号：'+item.repair_no+'</span>\n' +
                                '                </td>\n' +
                                '                <td class="backup_status">\n' +
                                '                    <p>'+backupStatus+'</p>\n' +
                                '                    <span>创建时间：'+item.created_at+'</span>\n' +
                                '                </td>\n' +
                                '            </tr>';

                            mHtml = '<li>\n' +
                                '                    <div class="up">\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>状态：<em>'+repairStatus[item.status]+'</em></div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>备用机状态：<em>'+backupStatus+'</em></div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>单号：<em>'+item.repair_no+'</em></div>\n' +
                                '                        </div>\n' +
                                '                        <div class="operate">\n' +
                                '                            <div>设备型号：<em>'+item.device_category_info[0]+'</em></div>\n' +
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
                                '                            <div class="time"><span>提交时间：'+item.created_at+'</span></div>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                    <div class="down" data-name="'+item.id+'">\n' +
                                                            operate +
                                '                    </div>\n' +
                                '                </li>';
                        }

                        $('.records .pcService').append(pcHtml);
                        $('.records .mService ul').append(mHtml);


                    })
                }
            },
            error: function (xhr, status, error) {

            }
        })


        // 取消维修申请
        $('.records').on('click', '.cancelRepair', function () {
            var that = $(this);

            $.ajax({
                type: 'POST',
                url: url + '/api/v1/repair/update',
                dataType: 'json',
                data:{
                    token: token,
                    id: that.parent().attr('data-name'),
                    status: 'uCanceled'
                },
                success: function(data){
                    if (data.code === 200) {
                        if(isEnglish()){
                            showTan('repair request canceled');
                        }else{
                            showTan('取消维修申请成功');
                        }
                        getMaintenanceRecords();
                    }else{
                        showTan(data.msg);
                    }
                },
                error: function(){}
            })

        });

        // 确认维修
        $('.records').on('click', '.confirmRepair', function () {
            var that = $(this);

            var price_type;

            $('.zhezhao').show();
            $('.tan3').show();
            $('.typeClick div').click(function(){
                $(this).parent().find('div').removeClass('active');
                $(this).addClass('active');

                price_type = $('.tan3 typeClick').find('active').attr('data-name');

                $.ajax({
                    type: 'POST',
                    url: url + '/api/v1/repair/confirm-price',
                    dataType: 'json',
                    data:{
                        token: token,
                        id: that.parent().attr('data-name'),
                        price_type : price_type
                    },
                    success: function(data){
                        if (data.code === 200) {
                            if(isEnglish()){
                                showTan('Confirm repair request');
                            }else{
                                showTan('确认维修');
                            }
                            getMaintenanceRecords();
                        }else{
                            showTan(data.msg);
                        }
                    },
                    error: function(){}
                })
            })


        });

        // 申请备用机
        $('.records').on('click', '.applyBackup', function () {
            var that = $(this);
            // 获取备用机券
            $.ajax({
                type: 'get',
                url: url + '/api/v1/coupon/index?type=backup',
                dataType: 'json',
                success: function(data){
                    if(data.code === 200){
                        var dataArr = data.data;
                        var flag = false;
                        var count = 0;
                        var coupon_id;
                        dataArr.forEach(function(item,index){
                            if(item.used === 'n'){
                                flag = true;
                                count +=1;
                                coupon_id = item.id
                            }
                        })

                        // 有备用机券可用
                        if(flag){
                            var r;
                            if(isEnglish()){
                                r=confirm("You have "+count+" Loaner Coupon.One coupon will be used if you submit successfully.Confirm to submit the request?")
                            }else{
                                r = confirm("您当前有"+count+"张备⽤机券，提交成功后将⾃动扣除1张。是否确认提交申请？")
                            }

                            if (r==true)
                            {
                                $.ajax({
                                    type: 'POST',
                                    url: url + '/api/v1/repair/update',
                                    dataType: 'json',
                                    data:{
                                        token: token,
                                        id: that.parent().attr('data-name'),
                                        backup_status: 'uSubmited',
                                        user_backup_coupon_id: coupon_id
                                    },
                                    success: function(data){
                                        if (data.code === 200) {
                                            if(isEnglish()){
                                                showTan('Receiving loaner confirmed');
                                            }else{
                                                showTan('申请备用机确认领取成功');
                                            }
                                            getMaintenanceRecords();
                                        }else{
                                            showTan(data.msg);
                                        }
                                    },
                                    error: function(){}
                                })
                            }
                            else
                            {
                                //document.write("You pressed Cancel!")
                            }
                        }else{
                            var r;
                            if(isEnglish()){
                                r=confirm("Service fee might apply to loaner request. Confirm to submit the request?")
                            }else{
                                r = confirm("提交备⽤机申请可能产⽣服务费，是否确认提交？")
                            }

                            if (r==true)
                            {
                                $.ajax({
                                    type: 'POST',
                                    url: url + '/api/v1/repair/update',
                                    dataType: 'json',
                                    data:{
                                        token: token,
                                        id: that.parent().attr('data-name'),
                                        backup_status: 'uSubmited',
                                        user_backup_coupon_id: coupon_id
                                    },
                                    success: function(data){
                                        if (data.code === 200) {
                                            if(isEnglish()){
                                                showTan('Receiving loaner confirmed');
                                            }else{
                                                showTan('申请备用机确认领取成功');
                                            }
                                            getMaintenanceRecords();
                                        }else{
                                            showTan(data.msg);
                                        }
                                    },
                                    error: function(){}
                                })
                            }
                            else
                            {
                                //document.write("You pressed Cancel!")
                            }
                        }

                    }
                },
                error: function(){}
            })

        });

        // 支付
        $('.records').on('click', '.waitForPay', function () {
            var that = $(this);

            var flag = false;
            var pay_type;

            $('.zhezhao').show();
            $('.tan4').show();
            $('.typeClick div').click(function(){
                $(this).parent().find('div').removeClass('active');
                $(this).addClass('active');

                pay_type = $(this).attr('data-name')

                if(that.attr('data-name') !== 'null'){
                    location.href = "payment.html?orderNo="+that.attr('data-name');
                }else{
                    $.ajax({
                        type:'POST',
                        url:url+'/api/v1/order/create',
                        dataType:'json',
                        data:{
                            token: token,
                            price: that.attr('data-price'),
                            order_type: 'repair',
                            pay_type: pay_type,
                            repair_id: that.parent().attr('data-name'),
                        },
                        success:function(data){
                            if(data.code === 200){
                                location.href = "payment.html?orderNo="+data.data.orderNo;
                            }
                        },
                        error:function(){}
                    })
                }
            })

        });

        // 备用机确认领取
        $('.records').on('click', '.receivingConfirmed', function () {
            var that = $(this);

            $.ajax({
                type: 'POST',
                url: url + '/api/v1/repair/update',
                dataType: 'json',
                data:{
                    token: token,
                    id: that.parent().attr('data-name'),
                    backup_status: 'uReceived'
                },
                success: function(data){
                    if (data.code === 200) {
                        if(isEnglish()){
                            showTan('Loaner successfully requested');
                        }else{
                            showTan('备用机申请成功');
                        }
                        getMaintenanceRecords();
                    }else{
                        showTan(data.msg);
                    }
                },
                error: function(){}
            })
        });

    }

    function showTan(text) {
        $('.zhezhao').show();
        $('.tan2 .con p').html(text);

        $('.tan2').show();
        setTimeout(function () {
            //location.href = "cart.html"
            $('.zhezhao').hide();
            $('.tan2').hide();
        }, 1000);
    }


    $('.cls').click(function(){
        $('.zhezhao').hide();
        $('.pop').hide();
    })




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