$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');


    // 全选
    $('.cartDetail table').on('click','input[name="selectAll"]',function (){
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
        order_items = [];
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
            allAmount += list.price;
        });
        //console.log(order_items);
        $('.Clearing .all em').html(allAmount.toFixed(2));
        $('.Clearing .amount em').html(checkedList.length);
        if (checkedList.length === 0) {
            $('.Clearing .all em').html("0.00");
            $('.cartDetail input[name="selectAll"]').prop("checked", false);
        }
    }

    // =======================

    // 获取购物车列表

    //var getCartInfo = api.getCartInfo(1, i18nLanguage);

    // goods_ids 用于获得推荐列表；
    var goods_ids=[];
    api.getCartList(getCookie('userId'), i18nLanguage,showCart);
    function showCart(getCartList) {
        //var getCartList = api.getCartList(getCookie('userId'), i18nLanguage);
        $('.cart .count').html(getCartList.length);

        $('.cartDetail table').html('');
        var head = '<tr>\n' +
            '                <th><input type="checkbox" name="selectAll" id="selectAll"><label for="selectAll">全选</label></th>\n' +
            '                <th>商品</th>\n' +
            '                <th class="td3">数量</th>\n' +
            '                <th>小计</th>\n' +
            '                <th>操作</th>\n' +
            '            </tr>';
        $('.cartDetail table').append(head);

        getCartList.forEach(function (item, index) {
            var price = (item.sku_info.school_price * item.quantity).toFixed(2);
            if(!goods_ids.in_array(item.sku_info.goods_id)){
                goods_ids.push(item.sku_info.goods_id);
            }


            var html = '<tr class="skuId">\n' +
                '                <td><input type="checkbox" name="select" data-name="' + item.id + '" value="' + item.sku_id + '"></td>\n' +
                '                <td>\n' +
                '                    <a href="./product.html?id=' + item.sku_info.goods_id + '">'+
                '                    <div class="img"><img src="'+item.sku_info.img_infos[0].url+'" alt=""></div>\n' +
                '                    <div class="con">\n' +
                '                        <p class="title">' + item.sku_info.goods_name + '</p>\n' +
                '                        <span class="unit_price">￥<em>' + item.sku_info.school_price + '</em></span>\n' +
                '                        <div class="amountM btnNum">' +
                '                           <input type="button" value="-" class="less">' +
                '                           <input type="text" value="' + item.quantity + '" class="text" id="quantity" data-name="' + item.id + '">' +
                '                           <input type="button" value="+" class="plus">\n' +
                '                        </div>' +
                '                    </div>\n' +
                '                    </a>'+
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
    //showCart();


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
    $('.cartDetail table').on('click','#delete',function(){
        var id = $(this).attr('data-name');
        var getCartDelete = api.getCartDelete(id);
        if(getCartDelete.code === 200){
            $(this).parent().parent().remove();
            var v = parseFloat($('.cart .count').html());
            $('.cart .count').html(v -1);
            changeCart();
        }
    })




    // 去结算
    //submitOrder.html

    $('#settle').click(function(){
        //console.log('22',order_items);
        if(order_items.length === 0){
            $('.error').html('请选择商品下单');
        }else{
            $('.error').html('');
            var param = ''
            order_items.forEach(function(item,index){
                if(index === 0){
                    param += 'goods'+index+'='+item.sku_id+'_'+item.quantity
                }else{
                    param += '&goods'+index+'='+item.sku_id+'_'+item.quantity
                }
            });
            //location.href = "submitOrder.html?order_items="+JSON.stringify(order_items);
            location.href = "submitOrder.html?"+param;
        }
    });

    // 获取推荐配件
    // console.log(goods_ids);
    //goods_ids=''

    var getRecommendAccessoryForGoods = api.getRecommendAccessoryForGoods(goods_ids, 0, 1, 20, '%2Bsale', i18nLanguage);
    var accessoryDataArr = getRecommendAccessoryForGoods.data;
    //$('.recommend ul').html('');
    accessoryDataArr.forEach(function(item,index){
        //var getSkuList = api.getSkuList(item.id, i18nLanguage);

        var html = '<li>\n' +
            '                    <a href="./product.html?id=' + item.id + '">'+
            '                    <img src="'+item.img_infos[0].url+'" alt=""></a>\n' +
            '                    <div class="con">\n' +
            '                        <p class="Title">'+item.name+'</p>\n' +
            '                        <p class="description">'+item.summary+'</p>\n' +
            '                        <p class="price"><span>常规价格：</span>\n' +
            '                            <del>￥'+item.price+'</del>\n' +
            '                        </p>\n' +
            '                        <p class="price"><span>学校优惠价：</span><em>￥'+item.school_price+'</em></p>\n' +
            '                        <a class="apply" href="javascript:;" data-name="'+item.sku_infos[0].id+'">加入购物车</a>\n' +
            '                    </div>\n' +
            '                </li>';

        $('.recommend ul').append(html);
    })

    // 推荐配件加入购物车
    $('.recommend .content').on('click','.apply',function(){
        var sku_id = $(this).attr('data-name');
        var quantity = 1;
        var createCart = api.getCartCreate(getCookie('userId'), sku_id, quantity);
        if (createCart.code === 200) {
            $('.zhezhao').show();
            $('.tan2 .con p').html('加入购物车成功');
            $('.tan2').show();
            api.getCartList(getCookie('userId'), i18nLanguage,showCart);
            setTimeout(function () {
                //location.href = "cart.html"
                $('.zhezhao').hide();
                $('.tan2').hide();
            }, 1000);
        }
    })

});
