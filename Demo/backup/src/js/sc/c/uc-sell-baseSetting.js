/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-08-11 15:34:14
 * @version $Id$
 */

define(function(require) {

    var $ = require('jquery');
    var FE = require('sc/v/uc-sell-baseSetting');
    require('plugin/jquery.validate.js')($);
    require('plugin/jquery.area.js')($);
    require('plugin/kindeditor-4.1.10/kindeditor-min');
    var KindEditor = window.KindEditor;
    KindEditor.ready(function(K) {
        window.editor = K.create('#storeInformation', FE.EditorOptions);
        editor.afterBlur = function(){
            this.sync();
        }
    });

    $(function(){

    	// 省市区联动
        $(document).area("eProvince", "eCity","eArea", [44, 4403, 440305]);

        // 验证提交内容
        $('#baseSetting').validate({
            errorPlacement: function(error, element) {
                if (element.attr("type") == "checkbox" || element.attr("type") == "radio") {
                    error.appendTo(element.parent());
                } else {
                    error.appendTo(element.parent());
                }
            },
            rules: {
                storeName: "required",
                companyName: "required",
                agree01:"required",
                agree02:"required"
            },
            messages: {
                storeName: "请输入店铺名称",
                companyName: "请输入公司名称",
                agree01:"请阅读并勾选此项",
                agree02:"请阅读并勾选此项"
            },
            submitHandler: function(form) {
                var cb = checkStoreCates();                 //选择店铺类型
                var bb = byteRangeLength(100,400);          //店铺介绍文字
                if(cb == true && bb == true ){
                    var html = $("#storeInformation").val();
                    console.log(html);
                    form.submit(); 
                }else{
                    return false;
                }
                
            }
        });

        //选择店铺类型
        function checkStoreCates(){
            var boo = $(".storeCates").find("input:checked");
            if(boo.length>0){
                return true;
            }else{
                $(".storeCates").append('<label class="error">请输入店铺名称</label>');
                return false;
            }
        }

        //店铺介绍内容应在50字符与200字符汉字之间
        function byteRangeLength(n,m) {
            var value = $("#storeInformation").val();
            var length = value.length;
            for(var i = 0; i < value.length; i++){
                if(value.charCodeAt(i) > 127){
                    length++;
                }
            }
            if( length >= n && length <= m ){
                $("#storeInformationError").hide();
                return true;
            }else{
                $("#storeInformationError").text('请输入不少于50个字符的店铺介绍文字').show();
                return false;
            }
        }

        
    });

});