$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');


    // 全选
    $('.cartDetail input[name="selectAll"]').click(function () {
        //alert(this.checked);
        if ($(this).is(':checked')) {
            $('input[name="select"]').each(function () {
                //此处如果用attr，会出现第三次失效的情况
                $(this).prop("checked", true);
            });
        } else {
            $('input[name="select"]').each(function () {
                $(this).prop("checked", false);
            });
            //$(this).removeAttr("checked");
        }

    });

    /*//没被选中的
    var checkedList = new Array();
    $("input[name='id']:not(:checked)").each(function() {
        checkedList.push($(this).val());
    });*/

    //已选中的
    var order_items = [];
    $('.cartDetail table').on('click','input[type="checkbox"]',function () {

        changeCart();
    });

    function changeCart() {
        var allAmount = 0;
        var checkedList = [];
        var order_items = [];
        $("input[name='select']:checked").each(function () {
            //console.log($(this));
            var list = {
                title: $(this).parent().parent().find('.title').html(),
                price: parseFloat($(this).parent().parent().find('.price em').html())
                //amount: $(this).parent().parent().find('.amount').val() || $(this).parent().parent().find('.amountM').val()
            };
            var orderList={
                sku_id: $(this).val(),
                quantity: $(this).parent().parent().find('#quantity').val()
            };
            //console.log($(this).parent().parent().html());
            checkedList.push(list);
            order_items.push(orderList);

        });
        //console.log(order_items);
        checkedList.forEach(function(item,index){
            allAmount += item.price;
            $('.Clearing .all em').html(allAmount.toFixed(2));
        });


        $('.Clearing .amount em').html(checkedList.length);
        if (checkedList.length === 0) {
            $('.Clearing .all em').html("0.00");
            $('.cartDetail input[name="selectAll"]').prop("checked", false);
        }
    }

    // =======================

    // 获取购物车列表
    var getCartList = api.getCartList(getCookie('userId'), i18nLanguage);
    var getCartInfo = api.getCartInfo(1, i18nLanguage);

    function shoCart() {
        //$('.cartDetail tbody').html('');
        getCartList.forEach(function (item, index) {
            var price = (item.sku_info.school_price * item.quantity).toFixed(2);
            var html = '<tr class="skuId">\n' +
                '                <td><input type="checkbox" name="select" data-name="' + item.id + '" value="' + item.sku_id + '"></td>\n' +
                '                <td>\n' +
                '                    <div class="img"><img src="../public/img/order.png" alt=""></div>\n' +
                '                    <div class="con">\n' +
                '                        <p class="title">' + item.name + '</p>\n' +
                '                        <span class="unit_price">￥<em>' + item.sku_info.school_price + '</em></span>\n' +
                '                        <div class="amountM btnNum">' +
                '                           <input type="button" value="-" class="less">' +
                '                           <input type="text" value="' + item.quantity + '" class="text" id="quantity" data-name="' + item.id + '">' +
                '                           <input type="button" value="+" class="plus">\n' +
                '                        </div>' +
                '                    </div>\n' +
                '                </td>\n' +
                '                <td class="td3 btnNum">\n' +
                '                    <input type="button" value="-" class="less">' +
                '                    <input type="text" value="' + item.quantity + '" class="text" id="quantity" data-name="' + item.id + '">' +
                '                    <input type="button" value="+" class="plus">' +
                '                </td>\n' +
                '                <td class="price">￥<em>' + price + '</em></td>\n' +
                '                <td class="operate">\n' +
                '                    <a href="javascript:;" id="delete" data-name="' + item.id + '">删除</a>\n' +
                '                </td>\n' +
                '            </tr>';

            $('.cartDetail table').append(html);
        })
    };
    shoCart();


    // 修改商品数量
    $('.btnNum').on('click', '.less', function () {
        var value = $(this).parent().find('.text').val();
        var id = $(this).parent().find('.text').attr('data-name');
        if (value > 1) {
            value--;
            $(this).parentsUntil('table','.skuId').find('#quantity').attr('value',value);
            $(this).parent().find('#quantity').attr('value',value);
            var getCartUpdate = api.getCartUpdate(id, value);

            if(getCartUpdate.code === 200){
                //console.log($(this).parentsUntil('table','.skuId').html());
                var unit_price = parseFloat($(this).parentsUntil('table','.skuId').find('.unit_price em').html());
                var price = (unit_price * value).toFixed(2)
                $(this).parentsUntil('table','.skuId').find('.price em').html(price);
                changeCart();
            }
        }
    });
    $('.btnNum').on('click', '.plus', function () {
        var value = $(this).parent().find('.text').val();
        var id = $(this).parent().find('.text').attr('data-name');
        value++;
        $(this).parentsUntil('table','.skuId').find('#quantity').attr('value',value);
        $(this).parent().find('#quantity').attr('value',value);
        var getCartUpdate = api.getCartUpdate(id, value);
        if(getCartUpdate.code === 200){

            //console.log($(this).parentsUntil('table','.skuId').html());
            var unit_price = parseFloat($(this).parentsUntil('table','.skuId').find('.unit_price em').html());
            var price = (unit_price * value).toFixed(2)
            $(this).parentsUntil('table','.skuId').find('.price em').html(price);
            changeCart();
        }
    });


    // 删除购物车订单


    // 去结算



    // 获取推荐配件
    //var goods_ids = [1, 2];

    //var getRecommendAccessoryForGoods = api.getRecommendAccessoryForGoods(goods_ids, 0, 1, 20, '%2Bsale', i18nLanguage);


});
