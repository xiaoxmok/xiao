$(function(){
    if (login()) {
        location.href = "index.html"
    }

    var token = getCookie('token');


    // 获取商品分类列表
    $.ajax({
        type: 'GET',
        url: url+'/api/v1/goods-category/index',
        dataType: 'json',
        success: function (data) {
            console.log("data", data);
            if (data.code === 200) {


            } else {

            }
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        }
    })

    // 获取商品列表
    $.ajax({
        type: 'GET',
        url: url+'/api/v1/goods/index',
        dataType: 'json',
        success: function (data) {
            console.log("data", data);
            if (data.code === 200) {


            } else {

            }
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        }
    })


    // 获取商品信息
    $.ajax({
        type: 'GET',
        url: url+'/api/v1/goods/get?id=1',
        dataType: 'json',
        success: function (data) {
            console.log("data", data);
            if (data.code === 200) {


            } else {

            }
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        }
    })
})