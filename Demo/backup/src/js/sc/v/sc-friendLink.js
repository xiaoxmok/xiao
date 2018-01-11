/**
 *
 * @authors 谭子良
 * @date    2014-05-21 13:53:24
 * @version 1.0.0
 */

define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.tab')($);
    require('plugin/jquery.inputFocus')($);
    require('plugin/jquery.validate.js')($);
    //验证电话 手机号码 或 固话
    jQuery.validator.addMethod("checkMobile", function(value, element) {
        var mobile,phone;
        mobile = /^1[3|4|5|8][0-9]\d{4,8}$/.test(value);
        phone = /^\d{3}-\d{8}|\d{4}-\d{7}$/.test(value);
        if(mobile || phone){
            return true;
        }else{
            return false;
        }
    }, "请输入正确的手机号码或固定电话");
    //验证邮箱
    jQuery.validator.addMethod("checkEmail", function(value, element) {
        return /^\w+([-+.]\w+)*@\w+([-.] \w+)*\.\w+([-.]\w+)*$/.test(value);
    }, "请输入正确的邮箱地址");


    $(function() {

        //所有产品分类展示
        require.async('sc/v/pub-showProCates', function(showProCates) {
            showProCates.showProCates();
        });

        // 头部右侧搜索
        $('.search-area').tab({
            titleActive: 'current', // 标题激活样式
            cntActive: 'current' // 内容激活样式
        });

        $('.search-area').find(".text").inputFocus(); //进入焦点时

        //表单提交验证
        $('#friendMessage').validate({
            rules: {
                siteName: {
                    required: true,
                    minlength: 2
                },
                siteUrl: {
                    required: true,
                    url:true
                },
                mobile: {
                    required: true,
                    checkMobile:true
                },
                email: {
                    email: true
                },
                qqNumber:{
                    number: true
                }
            },
            messages: {
                siteName: {
                    required: "请输入网站名称",
                    minlength: "没有这么短的网站名称"
                },
                siteUrl: {
                    required: "请输入正确网址",
                    url: "网址错误"
                },
                mobile: {
                    required: "请输入电话号或手机号",
                    checkMobile: '请输入正确的电话号或手机号'
                },
                email: "请输入正确的邮箱地址",
                qqNumber: "请输入QQ号"
            }
        });

    });

});