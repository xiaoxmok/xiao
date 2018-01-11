/**
 * 商场官方后台-系统管理-服务协议管理
 * @authors Inman Shaw
 * @date    2014-07-15 14:06:33
 * @version 1.0.0
 */
define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.popup')($);
    require('plugin/jquery.area.js')($);

    // 记录选中的颜色 输入框的 位置
    var flagTr = -1;

    $(function() {
        //头部导航选中
        $('.mod-nav').find('nav>a').eq(2).addClass('active').siblings().removeClass('active');
        
        // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(1).find('dd').eq(0).find('a').toggleClass('active');

      
        // 修改分类
        $('.lnk-edit').on('click',function(){
            var $pop = $('#popEdit');
            $pop.popup({
                "esc": true
            });
        });


        // 新建运费模版
        $('.btn-new-model').on('click',function(){
            $('.new-model-area').slideToggle();
        });

        
        // 新建运费模版的tab切换
        $('.tab-title ul').on('click','li',function(){
            var li = $(this);
            li.addClass('active').siblings().removeClass('active');
            $('.cnt').hide().eq(li.index()).show();
        });

        //右侧导航 缩放
        $('.title-header').on('click',function(){
            var header = $(this);
            // 导航 展示区 缩放
            $('.nav-cnt').slideToggle();
            // 右边的按钮 样式变更.
            header.find('span').toggleClass('ico-slideUp');
        });

        // 品牌-- 新建
        $('#btn-add').on('click',function(){
            var $this = $(this);
            var add_area = $('#add-area');
            add_area.show();
            $this.hide();
        });

        // 品牌-- 取消
        $('#btn-cancel').on('click',function(){
            var add_area = $('#add-area');
            var btn_add = $('#btn-add');
            add_area.hide();
            btn_add.show();
            add_area.find('input').val('').removeClass('required');
        });

        // 品牌-- 保存
        $('#btn-save').on('click',function(){
            var btn_add = $('#btn-add');
            var add_area = $('#add-area'),
                input = add_area.find('input');
            var edit_area = $('#edit-area');

            var val = input.val();
            if(val.trim().length>0){
                add_area.hide();
                btn_add.hide();
                edit_area.show();
                edit_area.find('.val').text(val);
                input.removeClass('required'); 
            }else{
               input.addClass('required'); 
            }
        });

        // 品牌-- 编辑
        $('#btn-edit').on('click',function(){
            var add_area = $('#add-area');
            var btn_add = $('#btn-add');
            var edit_area = $('#edit-area');
            add_area.show();
            btn_add.hide();
            edit_area.hide();
        });

        // 商品属性增加
        $('#add-Field').on('click',function(){
            var model_LI = $('#goods-model');
            var current_li = $(this).closest('li');
            current_li.before(model_LI.html());
        });

        // 商品属性 删除
        $('.goods-filed').on('click','.filed-del',function(){
            var current_li = $(this).closest('li');
            current_li.remove();
        });

        
        // 输入框 的字数 检测
        var prestr = ""; // 记录上一次的 输入结果
        $('.wordcount').on('keyup keypress',function(){
            var input = $(this);
            var str = input.val();
            var num = strlen(str);
            //input.val(getValidstr(str,60));
            if(num<61){
                prestr = str;
                input.siblings('.tip').find('.wordNum').text(num);
            }else{
                // 当输入超过的时候，则回退到上一次输入的内容
                input.val(prestr);
            }
        });

        // 设置价格区间
        $('#set-range').on('click',function(){
            var lnk =  $(this);
            var popDiv = $('.price-range')[0];
            if(!$(popDiv).is(':visible')){
                $(popDiv).show();
            }
            removeEvent($(popDiv),lnk);
            // 点击层以外的内容都关闭层
            function removeEvent(obj,lnk){
                obj.click(function(e) {
                    e.stopPropagation();
                    obj.show();
                });
                $(document).click(function(e) {
                    var tar = e.target;
                    if($(tar).is(lnk)){
                        return false;
                    }else{
                        if(obj.is(':visible')){
                            obj.hide();
                        }   
                    }
                });
            }
        });

        // 价格区间 - 删除
        $('.range-l').on('click','.del-range',function(){
            var ul = $('.range-l');
            var currentLi = $(this).closest('li');
            // 获取当前删除按钮所在li 的 序列
            var index = currentLi.index();
            currentLi.remove();
            if(index == 2){
                var delRange = currentLi.find('.del-range');
                var lastLi =  ul.find('li:last');
                lastLi.append(delRange);
                ul.append('<li><i class="ico-add"></i><a href="javascript:;" id="add-range">增加区间</a></li>');
            }
            
        });

        // 价格区间 - 增加
        $('.range-l').on('click','#add-range',function(){
            var rangeModel = $('#range-model');
            var currentLi = $(this).closest('li');

            var ul = $('.range-l');
            // 默认为一行。最多3行
            var len = ul.find('li').length;
            // 当前已经有2个li 的时候, 增加后 去掉 a 
            if(len == 3){
                // 移除之前的 li 的删除按钮
                ul.find('.del-range').remove();
                ul.append(rangeModel.html());
                currentLi.remove();
            }else{
                currentLi.before(rangeModel.html());
            }
        });

        // 选择计量单位 
        $('#sel-unit').on('click',function(){
            var $pop = $('#popUnit');
            var unit = null;
            var $this = $(this); 
            var input = $this.closest('.item-r').find('input');
            var span = $this.parent().prev();
            var $unit = input.val() || span.text();
            $pop.popup({
                "esc": true
            });

            // 弹层 单位 初始化 选中
            $('.cnt').find('a').each(function(){
                var lnk = $(this);
                if(lnk.text() == $unit){
                    lnk.addClass('active');
                }
            })

            // 选择计量单位 -  tab 切换
            $('.groups').on('click','li',function(){
                var tab = $(this);
                tab.addClass('active').siblings().removeClass('active');
                // 展示 内容区
                var areas = $('.cnt').find('ul:eq('+tab.index()+')');
                areas.show().siblings().hide();
            });

            // 选择计量单位 - 选择单位
            $('.cnt').find('a').on('click',function(){
                var lnk = $(this);
                $('.cnt').find('a').removeClass('active');
                lnk.addClass('active');
                unit = lnk;
            });


            //保存  单位： 包/吨/袋/份/罐/公斤/毫升/毫克/壶/盒/KG/克/瓶/箱 
            $pop.find('.popup-save').on('click',function(e){
                e.stopPropagation();
                // 关闭弹层
                $pop.find('.popup-close')[0].click(); 
                if(unit == null){
                    return false;
                }
                var ut = unit.text();
                
                var units = ['包','吨','袋','份','公斤','毫升','毫克','壶','盒','KG','克','瓶','箱'];
                if($.inArray(ut,units) >= 0){
                    span.text(ut);
                    input.val('');
                }else{
                    input.val(ut);
                    span.text('');
                }
                $('.cnt').find('a').removeClass('active');
            });
        });
    
        // 为每一个颜色块 加上一个 data-id    
    

        // 商品规格 - 颜色全选
        $('.color-table').on('click','#chkAll',function(){
            var chkAll = $(this);
            var colorTb = $('.color-table');
            var chks = colorTb.find('input[type=checkbox]').not($('#chkAll'));
            if(chkAll.prop('checked')){
                $('.colors').find('tbody').html('');
                if(colorArr){
                    colorArr = new Array();
                }
                chks.prop('checked',true).each(function(i,obj){
                    var rmk = $(this).siblings('.rmk');
                    var value = rmk.text();
                    var color = $(this).siblings('.color').css('background-color');
                    rmk.hide().next().val(value).show();

                    // 全选 颜色 预览
                    viewColors($(this),true,i);
                });
            }else{
                chks.prop('checked',false).each(function(i,obj){
                    var rmk = $(this).siblings('.rmk');
                    var value = rmk.text();
                    var color = $(this).siblings('.color').css('background-color');

                    rmk.show().next().hide(); 

                    // 全选 颜色 预览
                    viewColors($(this),false,i);
                });;
            }
            
        });
    
        chechEvent($('.color-table'));
        chechEvent($('.cm-table'));


        // 图片预览区的 上传图片
        $('.colors').on('change','.ui-btn-upload-trigger',function(){
            var imgArea = $(this).closest('.upload-wrap').next('.ImgShow');
            var bool = PreviewImage(this,imgArea.find('.uploadImg'));
            if(bool){
                imgArea.show().on('click','a',function(){
                    imgArea.hide(); // 隐藏 预览图片
                    $(this).val('');   // 清空上传文件域
                });
            }
        });

        // 颜色输入框的 时间绑定
        $('.color-table').on('click keyup mouseup','.text',function(e){
            switch(e.type){
               case 'mouseup': Ifocus($(this));
               case 'click': return false;
               case 'keyup': IkeyUp($(this));
            }

            /*输入框 的点击事件绑定*/
            function Ifocus(obj){
                var $name = obj.val();
                $('.colors').find('tbody>tr').each(function(){
                    var tr = $(this);
                    var name = tr.find('.rmk').text();
                    if( name == $name){
                        flagTr = tr.index();
                    }
                });
                return false;
            }

            /*输入框 的输入中绑定*/
            function IkeyUp(obj){
                var value = obj.val();
                if(flagTr >= 0){
                    $('.colors').find('tbody>tr').eq(flagTr).find('.rmk').text(value);
                }
                return false;
            }
        });
    });

    

    // 颜色点击 改成 input 显示 
    function chechEvent(obj){
        var checkAll = $('#chkAll');
        var checks = obj.find('input[type=checkbox]').not(checkAll);
        checks.each(function(i,ob){
            var checkbox = $(ob);
            var color = checkbox.siblings('.color');
            var rmk = checkbox.siblings('.rmk');
            var input = rmk.next();
            checkbox.on('click',function(){
                var bool = checks.not(':checked').length > 0 ? false : true;
                checkAll[0].checked = bool;

                if(checkbox.prop('checked')){
                    var value = rmk.text();
                    // 选颜色
                    if(obj.is($('.color-table'))){
                        viewColors(checkbox,true,i); 
                    }
                    rmk.hide().next().val(value).show();
                }else{
                    // 选颜色
                    if(obj.is($('.color-table'))){  
                        viewColors(checkbox,false,i); 
                    }
                    rmk.show().next().hide();
                }
            });
        });
    }

    /*  
    *   颜色点击之后  预览 
    *   chk 复选框 
    *   bool 选中？  
    *   index 第几个？
    */ 
    var colorArr = new Array();
    function viewColors(chk,bool,index){

        var target = $('.colors');
        var source = target.next('.model').clone();
        var td_1 = source.find('td').eq(0);
        var td_2 = source.find('td').eq(1);
        var upload_btn = td_2.find('.upload-wrap');
        var img_area = td_2.find('.ImgShow');

        var _name = chk.siblings('.text').val();
        
        var i = $.inArray(index,colorArr);
        if(i < 0 && bool){
            /*选中*/
            var spans = chk.siblings('span').clone(),
                color = $(spans)[0],
                name = $(spans)[1];
            name.style.display = 'inline-block';
            var html = color.outerHTML+name.outerHTML;
            td_1.html(html);

            img_area.hide();

            target.show().find('tbody').append(source.find('tbody').html());
            colorArr.push(index);
        }else if(i >= 0 && !bool){
            /*取消选中*/
            target.find('tbody>tr').each(function(){
                var tr = $(this);
                var nm = tr.find('td').eq(0).find('.rmk').text();
                if(nm == _name){
                    tr.remove();    // 移除当前 tr
                    colorArr.splice(i,1); //
                    if(colorArr.length < 1){
                        target.hide();
                    }
                }
            });
        }else{
            return false;
        }  
    }


    // 图片上传的缩略图预览
    function PreviewImage(fileObj,img){
        var ext=fileObj.value.substring(fileObj.value.lastIndexOf(".")+1).toLowerCase();
     
         // gif在IE浏览器暂时无法显示
        if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
             alert("图片的格式必须为png或者jpg或者jpeg格式！"); 
             fileObj.value = '';
             return false;
        }
    
        var isIE = navigator.userAgent.match(/MSIE/)!= null,
         isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;
         
        if(isIE) {
            fileObj.select();
            var reallocalpath = document.selection.createRange().text;
            // IE6浏览器设置img的src为本地路径可以直接显示图片
            if (isIE6) {
                img.src = reallocalpath;
            }else {
                // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
                 // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
            }
        }else {
            html5Reader(fileObj);
        }
        function html5Reader(fileObj){
             var file = fileObj.files[0];
             var reader = new FileReader();
             reader.readAsDataURL(file);

             reader.onload = function(e){
                 img.attr('src',this.result);
             }
        }  
        return true;   
    }  


    //计算字符串长度
    function strlen(str) {
        //获得字符串实际长度，中文2，英文1
        var realLength = 0, 
            len = str.length, 
            charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    }

});
