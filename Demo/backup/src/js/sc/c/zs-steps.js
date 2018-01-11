define(function(require) {

    var $ = require('jquery');
    var FE = require('sc/v/zs-steps');
    require('plugin/jquery.validate.js')($);
    require('plugin/upload/jquery.ui.widget.js')($);
    require('plugin/upload/jquery.iframe-transport.js')($);
    require('plugin/upload/jquery.fileupload.js')($);
    require('plugin/jquery.area.js')($);


    //验证邮政编码
    jQuery.validator.addMethod("checkPost", function(value, element) {
        return /^\d{4,6}$/.test(value);
    }, "请输入正确的邮政编码");

    //验证身份证号码
    jQuery.validator.addMethod("checkID", function(value, element) {
        return /^\d{15}$|^\d{18}$|^\d{17}[xX]$/.test(value);
    }, "请输入正确的身份证号码");

    //验证手机号码
    jQuery.validator.addMethod("checkMobile", function(value, element) {
        return /^1[3|4|5|8][0-9]\d{4,8}$/.test(value);
    }, "请输入正确的手机号码");

    //验证邮箱
    jQuery.validator.addMethod("checkEmail", function(value, element) {
        return /^\w+([-+.]\w+)*@\w+([-.] \w+)*\.\w+([-.]\w+)*$/.test(value);
    }, "请输入正确的邮箱地址");

    //验证固定电话
    jQuery.validator.addMethod("checkTel", function(value, element) {
        return /^\d{3}-\d{8}|\d{4}-\d{7}$/.test(value);
    }, "请输入正确的固定电话号码");

    

    $(function() {

        // 省市区联动
        $(document).area("eProvince", "eCity", "eArea", [44, 4403, 440305]);

        $('#rdoStoreY').click(function(){
            $(document).area("eProvince", "eCity", "eArea", [43, 4304, 430403]);
        });

        // 第一步
        $('.step1').on('click', '.btn-next', function() {

            // 获取选择的店铺类型
            var index, name;
            $('.shop-types').find('dl').each(function() {
                if ($(this).hasClass('on')) {
                    index = $('.shop-types').find('dl').index(this) + 1;
                    name = $(this).find('dt').text();
                    return false;
                }
            });

            // 验证
            if (!index) {
                FE.showErrorMsg(1, '请选择开店类型');
                return false;
            } else {
                if (name.indexOf('个人') >= 0) {
                    $('#stepPersonal').removeClass('ignore');
                    $('#stepEnterprise').addClass('ignore');
                } else {
                    $('#stepEnterprise').removeClass('ignore');
                    $('#stepPersonal').addClass('ignore');
                }
                FE.changeStepStatus(2);
            }
        });

        // 第二步 个人店 验证
        $('#formPersonal').validate({
            errorPlacement: function(error, element) {
                if (element.attr("type") == "checkbox" || element.attr("type") == "radio") {
                    error.appendTo(element.parent());
                } else {
                    error.appendTo(element.parent());
                }
            },
            rules: {
                pName: {
                    required: true,
                    minlength: 2
                },
                pCellphone: {
                    required: true,
                    checkMobile: true
                },
                pID: "required"
                    // pIDimg1: "required",
                    // pIDimg2: "required"
            },
            messages: {
                pName: {
                    required: "请输入姓名",
                    minlength: "姓名不能少于两位"
                },
                pCellphone: {
                    required: "请输入手机号",
                    checkMobile: '请输入正确的手机号'
                },
                pID: "请输入身份证号"
                    // pIDimg1: "请上传身份证正面图片",
                    // pIDimg2: "请上传身份证反面图片"
            },
            submitHandler: function(form) {
                alert(0)
                    // 直接提交表单
                    // form.submit(); 

                // ajax提交
                // console.log($(form).serialize());
                // var data = $(form).serialize();
                // $.ajax({
                //  cache: true,
                //  type: "POST",
                //  url:'',
                //  data:data,
                //  async: false,
                //     error: function(request){
                //         FE.showErrorMsg(2, "服务器错误，请重试");
                //     },
                //     success: function(data){
                //      FE.clearErrorMsg(2);
                //      FE.changeStepStatus(3);
                //     }
                // });

            }
        });

        // 第二步 企业店 验证
        $('#formEnterprise').validate({
            errorPlacement: function(error, element) {
                if (element.attr("type") == "checkbox" || element.attr("type") == "radio") {
                    error.appendTo(element.parent());
                } else {
                    error.appendTo(element.parent());
                }
            },
            rules: {
                eName: {
                    required: true
                },
                eCellphone: {
                    required: true,
                    checkMobile: true
                },
                ecName: "required",
                epName: "required",
                eRegFund: "required",
                eLicense: "required",
                eDateFrom: "required",
                eDateTo: "required",
                eScope: "required",
                eProvince: "required",
                eCity: "required",
                eArea: "required",
                eAddress: "required",
                eImgLicense: "required",
                eImgCode: "required",
                eImgTax: "required"
            },
            messages: {
                eName: {
                    required: "请输入姓名",
                    minlength: "姓名不能少于两位"
                },
                eCellphone: {
                    required: "请输入手机号",
                    checkMobile: '请输入正确的手机号'
                },
                ecName: "请输入企业名称",
                epName: "请输入法定代表人",
                eRegFund: "请输入注册资金",
                eLicense: "请输入营业执照号",
                eDateFrom: "请输入营业执照有效期",
                eDateTo: "请输入营业执照有效期",
                eScope: "请输入营业执照经营范围",
                eProvince: "请选择公司联系地址",
                eCity: "请选择公司联系地址",
                eArea: "请选择公司联系地址",
                eAddress: "请输入详细地址",
                eImgLicense: "请上传营业执照复印件",
                eImgCode: "请上传组织机构代码证复件",
                eImgTax: "请上传税务登记证复印件"
            },
            submitHandler: function(form) {
                // 直接提交表单
                // form.submit(); 

                // ajax提交
                // console.log($(form).serialize());
                // var data = $(form).serialize();
                // $.ajax({
                //  cache: true,
                //  type: "POST",
                //  url:'',
                //  data:data,
                //  async: false,
                //     error: function(request){
                //         FE.showErrorMsg(2, "服务器错误，请重试");
                //     },
                //     success: function(data){
                //      FE.clearErrorMsg(2);
                //      FE.changeStepStatus(3);
                //     }
                // });

            }
        });

        // 第三步
        // 第三步 验证
        $('#formShopInfo').validate({
            errorPlacement: function(error, element) {
                if (element.attr("type") == "checkbox" || element.attr("type") == "radio") {
                    error.appendTo(element.parent());
                } else {
                    error.appendTo(element.parent());
                }
            },
            rules: {
                sName: "required",
                sCategories: "required"
            },
            messages: {
                sName: "请输入店铺名称",
                sCategories: "请选择店铺类目"
            },
            submitHandler: function(form) {
                // 直接提交表单
                // form.submit(); 

                // ajax提交
                // console.log($(form).serialize());
                // var data = $(form).serialize();
                // $.ajax({
                //  cache: true,
                //  type: "POST",
                //  url:'',
                //  data:data,
                //  async: false,
                //     error: function(request){
                //         FE.showErrorMsg(3, "服务器错误，请重试");
                //     },
                //     success: function(data){
                //      FE.clearErrorMsg(4);
                //      FE.changeStepStatus(5);
                //     }
                // });
            }
        });

        // 第五步 协议
        $('#formAgreement').validate({
            errorPlacement: function(error, element) {
                if (element.attr("type") == "checkbox" || element.attr("type") == "radio") {
                    error.appendTo(element.parent());
                } else {
                    error.appendTo(element.parent());
                }
            },
            rules: {
                chkMall: "required",
                chkPay: "required"
            },
            messages: {
                chkMall: "请阅读并勾选此项",
                chkPay: "请阅读并勾选此项"
            },
            submitHandler: function(form) {
                // 直接提交表单
                // form.submit(); 

                // ajax提交
                // console.log($(form).serialize());
                // var data = $(form).serialize();
                // $.ajax({
                //  cache: true,
                //  type: "POST",
                //  url:'',
                //  data:data,
                //  async: false,
                //     error: function(request){
                //         FE.showErrorMsg(5, "服务器错误，请重试");
                //     },
                //     success: function(data){
                //      FE.clearErrorMsg(5);
                //      FE.changeStepStatus(6);
                //     }
                // });
            }
        });



        // 上传

        $('body').on('change', '.j-upload', function() {
            var $this = $(this),
                file_path = $this.val(),
                id = $this.attr('id'),
                size = 2;

            FE.beforeImgUpload(id, size);

            // FE.afterImgUpload(id, src);

        });

        $('#pIDimg1').fileupload({
            // url: 'http://localhost:8081/fileUpload-0.0.1-SNAPSHOT/rest/controller/upload',
            url: 'http://www.a.com:8083/ewtPictrue/imgInterface/uploadJson',
            dataType: 'json',
            forceIframeTransport: true, // 跨域
            done: function(e, data) {

                console.log(data);
                console.log(data.result);

                console.log(data.files[0].name); // 名称

                // 拼接一下url ，传到前端-src
                FE.afterImgUpload('#pIDimg1', "http://localhost:8081/fileUpload-0.0.1-SNAPSHOT/rest/controller/get/" + data.files[0].name);
                // 
            }
        });


        // 删除
        $('body').on('click', '.upload-preview-delete', function() {
            var $this = $(this),
                $preview = $this.closest('.upload-preview'),
                $wrap = $this.closest('.upload-wrap');

            //  to do 请求后端
            FE.afterDeletePreview($this, $preview, $wrap);
        });



        // 品牌资质 修改
        $('.brand-list').on('click', '.lnk-brand-edit', function() {
            var id = $(this).data().id;
            alert(id);
        });
        // 品牌资质 删除
        $('.brand-list').on('click', '.lnk-brand-delete', function() {
            var $this = $(this);
            alert(1);

            // ajax success
            $this.closest('li').remove();

        });

        // save
        // set
        var bid = 123;
        $('#formShopInfo').find('.btn-save').attr('data-id', bid);

        // click
        // get li
        $('#formShopInfo').find('.btn-save').on('click', function() {
            var $this = $(this),
                sid = $this.data().id;
            // find li
            var mli = $('li[data-id="' + sid + '"]');
            mli.find('p').text('');
        });

        // checkbox 
        $('#sCategory').find('input[type="checkbox"]').each(function() {
            var id = $(this).data().id;
            $(this).prop('checked',true);
            console.log($(this).data().id);
        })


    });

});
