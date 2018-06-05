$(function () {
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');


    // 全选
    $('.cartDetail input[name="selectAll"]').click(function () {
        //alert(this.checked);
        if ($(this).is(':checked')) {
            console.log('111');
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

    $('input[type="checkbox"]').click(function () {
        var checkedList = [];
        var allAmount = 0;
        $("input[name='select']:checked").each(function () {
            var list = {
                title: $(this).parent().parent().find('.title').html(),
                price: parseFloat($(this).parent().parent().find('.price em').html()),
                amount: $(this).parent().parent().find('.amount').val() || $(this).parent().parent().find('.amountM').val()
            }
            //console.log($(this).parent().parent().html());
            checkedList.push(list);
            allAmount += list.price;
            $('.Clearing .all em').html(allAmount.toFixed(2));
        });
        console.log(checkedList);
        $('.Clearing .amount em').html(checkedList.length);
        if (checkedList.length === 0) {
            $('.Clearing .all em').html("0.00");
            $('.cartDetail input[name="selectAll"]').prop("checked", false);
        }
    });

    // =======================

    // 获取购物车列表
    var getCartList = api.getCartList(getCookie('userId'), i18nLanguage);
    var getCartInfo = api.getCartInfo(1, i18nLanguage);



    // 获取推荐配件
    //var goods_ids = [1, 2];

    //var getRecommendAccessoryForGoods = api.getRecommendAccessoryForGoods(goods_ids, 0, 1, 20, '%2Bsale', i18nLanguage);


});
