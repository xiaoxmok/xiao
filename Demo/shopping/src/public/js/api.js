var api = {
    /**
     * 获取用户信息
     * @param token
     */
    getUser:function(token){
        var result;
        $.ajax({
            type:'POST',
            url:url+'/api/v1/user/get',
            dataType:'json',
            data:{token:token},
            async:false,
            success:function(data){
                //console.log(data);
                if(data.code === 200){
                    result = {
                        created_at:data.data.created_at,
                        email:data.data.email,
                        id:data.data.id,
                        name:data.data.name,
                        order_email_notify:data.data.order_email_notify,
                        order_sms_notify:data.data.order_sms_notify,
                        phone:data.data.phone,
                        school_no:data.data.school_no,
                        school_region_id:data.data.school_region_id,
                        sex:data.data.sex,
                        type:data.data.type,
                        updated_at:data.data.updated_at
                    }
                }else{
                    result = data.msg;
                }
            },
            error:function(){}
        });

        return result;
    },
    /**
     * 刷新Token
     */
    refreshToken:function(){
        var token = getCookie("token");
        $.ajax({
            type:'POST',
            url: url+'/api/v1/user/refresh',
            dataType:'json',
            data:{token:token},
            success:function(data){
                if(data.code === 200){
                    getCookie("token", data.data.original.access_token, {
                        expires: 30,
                        path: '/'
                    });
                }
            },
            error:function(){}
        });
    }
}