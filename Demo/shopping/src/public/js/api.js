var api = {
    /**
     * 获取用户信息
     * @param token
     */
    getUser: function (token) {
        var result;
        $.ajax({
            type: 'POST',
            url: url + '/api/v1/user/get',
            dataType: 'json',
            data: {token: token},
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = {
                        created_at: data.data.created_at,
                        email: data.data.email,
                        id: data.data.id,
                        name: data.data.name,
                        order_email_notify: data.data.order_email_notify,
                        order_sms_notify: data.data.order_sms_notify,
                        phone: data.data.phone,
                        school_no: data.data.school_no,
                        school_region_id: data.data.school_region_id,
                        sex: data.data.sex,
                        type: data.data.type,
                        updated_at: data.data.updated_at
                    }
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 刷新Token
     */
    refreshToken: function () {
        var token = getCookie("token");
        $.ajax({
            type: 'POST',
            url: url + '/api/v1/user/refresh',
            dataType: 'json',
            data: {token: token},
            success: function (data) {
                if (data.code === 200) {
                    getCookie("token", data.data.original.access_token, {
                        expires: 30,
                        path: '/'
                    });
                }
            },
            error: function () {
            }
        });
    },
    /**
     * 获取学校信息
     * @param id
     * @param lang
     * @returns {*}
     */
    getSchool: function (id, lang) {
        var result;
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/school/get?id=' + id + '&lang=' + lang,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = {
                        id: data.data.id,
                        logo_id: data.data.logo_id,
                        logo_info: data.data.logo_info,
                        name: data.data.name,
                        description: data.data.description,
                        phone: data.data.phone,
                        city: data.data.city
                    }
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 获取商品子分类列表
     * @param id
     * @param lang
     */
    getDoodsCategory: function (id, lang) {
        var result;
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/goods-category/index?id=' + id + '&lang=' + lang,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = {
                        id: data.data.id,
                        parent_id: data.data.parent_id,
                        name: data.data.name
                    }
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 获取商品列表
     * @param category_id
     * @param page
     * @param count
     * @param sort
     * @param lang
     * @returns {*}
     */
    getGoodsList: function (category_id, page, count, sort, lang) {
        var result;
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/goods/index?category_id=' + category_id + '&page=' + page + '&count=' + count + '&sort=' + sort + '&lang=' + lang,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = {
                        data: {},
                        extra: {
                            total: data.extra.total,
                            count: data.extra.count,
                            page: data.extra.page,
                            last: data.extra.last
                        }
                    }
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;

    },
    /**
     * 获取商品信息
     * @param id
     * @param lang
     * @returns {*}
     */
    getGoods: function (id, lang) {
        var result;
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/goods-category/index?id=' + id + '&lang=' + lang,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = {
                        id: data.data.id,
                        name: data.data.name,
                        summary: data.data.summary,
                        introduce: data.data.introduce,
                        faq: data.data.faq,
                        price: data.data.price,
                        school_price: data.data.school_price,
                        education_price: data.data.education_price,
                        stock: data.data.stock,
                        category_id: data.data.category_id,
                        category_info: {
                            id: data.data.category_info.id,
                            parent_id: data.data.category_info.parent_id,
                            name: data.data.category_info.name
                        },
                        status: data.data.status,
                        img_ids: data.data.img_ids,
                        img_infos: data.data.img_infos,
                        param: {
                            k1: data.data.param.k1,
                            k2: data.data.param.k2,
                            k3: data.data.param.k3,
                            k4: data.data.param.k4,
                            k5: data.data.param.k5,
                            k6: data.data.param.k6
                        }
                    }
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 获取购物车列表
     * @param userId
     * @param lang
     * @returns {*}
     */
    getCartList: function (userId, lang) {
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/cart/index?user_id=' + userId + '&lang=' + lang + '&token=' + token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 向购物车添加一条记录
     * @param userId
     * @param skuId
     * @param quantity
     * @returns {*}
     */
    getCartCreate: function (userId, skuId, quantity) {
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'POST',
            url: url + '/api/v1/cart/create',
            dataType: 'json',
            data: {
                user_id: userId,
                sku_id: skuId,
                quantity: quantity,
                token: token
            },
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 删除购物车条目
     * @param id
     * @returns {*}
     */
    getCartDelete: function (id) {
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/cart/delete?id=' + id + '&token=' + token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;

    },
    /**
     * 更新购物车条目，只更新数量
     * @param id
     * @param quantity
     * @returns {*}
     */
    getCartUpdate: function (id, quantity) {
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'POST',
            url: url + '/api/v1/cart/update',
            dataType: 'json',
            data: {
                id: id,
                quantity: quantity,
                token: token
            },
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 获取购物车条目详细信息
     * @param id
     * @param lang
     * @returns {*}
     */
    getCartInfo: function (id, lang) {
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/cart/get?id=' + id + '&lang=' + lang + '&token=' + token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 学校推荐商品列表
     * @param school_id
     * @param category_id
     * @param page
     * @param count
     * @param sort
     * @param lang
     * @returns {*}
     */
    getRecommendGoodsForSchool: function (school_id, category_id, page, count, sort, lang) {
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/recommend/goods-for-school?school_id=' + school_id + '&category_id=' + category_id + '&page=' + page + '&count=' + count + '&sort=' + sort + '&lang=' + lang + '&token=' + token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 学生推荐商品列表
     * @param user_id
     * @param category_id
     * @param page
     * @param count
     * @param sort
     * @param lang
     * @returns {*}
     */
    getRecommendGoodsForUser: function (user_id, category_id, page, count, sort, lang) {
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/recommend/goods-for-user?user_id=' + user_id + '&category_id=' + category_id + '&page=' + page + '&count=' + count + '&sort=' + sort + '&lang=' + lang + '&token=' + token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 用户配件推荐
     * @param goods_ids
     * @param category_id
     * @param page
     * @param count
     * @param sort
     * @param lang
     * @returns {*}
     */
    getRecommendAccessoryForGoods: function (goods_ids, category_id, page, count, sort, lang) {
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/recommend/accessory-for-goods?goods_ids=' + goods_ids + '&category_id=' + category_id + '&page=' + page + '&count=' + count + '&sort=' + sort + '&lang=' + lang + '&token=' + token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 获取调查问卷列表
     * @param lang
     * @returns {*}
     */
    getQuestionnaireList: function (lang) {
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/recommend/questionnaire/list?&lang=' + lang + '&token=' + token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 获取订单列表
     * @param user_id
     * @param status
     * @returns {*}
     */
    getOrderList:function(user_id,status){
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/order/index?user_id=' + user_id + '&status=' + status + '&token=' + token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 订单支付
     * @param order_no
     * @param price
     * @returns {*}
     */
    postOrderPlay:function(order_no,price){
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'POST',
            url: url + '/api/v1/order/pay',
            dataType: 'json',
            data:{
                order_no:order_no,
                price:price,
                token:token
            },
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 取消订单
     * @param order_no
     * @returns {*}
     */
    getOrderCancel:function(order_no){
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/order/cancel?order_no='+order_no+'&token='+token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 获取地址列表
     * @param user_id
     * @returns {*}
     */
    getAddressList:function(user_id){
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/address/index?user_id='+user_id+'&token='+token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 删除收货地址
     * @param id
     * @returns {*}
     */
    getAddressDelete:function(id){
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/address/delete?id='+id+'&token='+token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    },
    /**
     * 获取收货地址信息
     * @param id
     */
    getAddressId:function(id){
        var result;
        var token = getCookie("token");
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/address/delete?id='+id+'&token='+token,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = data.data
                } else {
                    result = data.msg;
                }
            },
            error: function () {
            }
        });

        return result;
    }
}
