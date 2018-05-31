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
            url: url + '/api/v1/school/get?id='+id+'&lang='+lang,
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
    getDoodsCategory:function(id, lang){
        var result;
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/goods-category/index?id='+id+'&lang='+lang,
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
    getGoodsList:function(category_id,page,count,sort,lang){
        var result;
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/goods/index?category_id='+category_id+'&page='+page+'&count='+count+'&sort='+sort+'&lang='+lang,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = {
                        data:{

                        },
                        extra:{
                            total:data.extra.total,
                            count:data.extra.count,
                            page:data.extra.page,
                            last:data.extra.last
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
    getGoods:function(id,lang){
        var result;
        $.ajax({
            type: 'GET',
            url: url + '/api/v1/goods-category/index?id='+id+'&lang='+lang,
            dataType: 'json',
            async: false,
            success: function (data) {
                //console.log(data);
                if (data.code === 200) {
                    result = {
                        id:data.data.id,
                        name:data.data.name,
                        summary:data.data.summary,
                        introduce:data.data.introduce,
                        faq:data.data.faq,
                        price:data.data.price,
                        school_price:data.data.school_price,
                        education_price:data.data.education_price,
                        stock:data.data.stock,
                        category_id:data.data.category_id,
                        category_info:{
                            id:data.data.category_info.id,
                            parent_id:data.data.category_info.parent_id,
                            name:data.data.category_info.name
                        },
                        status:data.data.status,
                        img_ids:data.data.img_ids,
                        img_infos:img_infos,
                        param:{
                            
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
    }
}