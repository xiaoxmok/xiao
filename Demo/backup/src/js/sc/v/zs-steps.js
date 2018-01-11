/**
 * zs-steps.js 开店步骤
 * @authors 	Inman Shaw
 * @date    	2014-06-04 16:14:03
 * @version 	1.0.0
 */
define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.validate.js')($);
    

    $(function() {

        // 开店类型选择（悬浮、点击）
        $('.shop-types').find('.item-wrap').find('dl').hover(function() {
            $('.shop-types').find('.item-wrap').find('dl').removeClass('hover');
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        }).click(function() {
            $('.shop-types').find('.item-wrap').find('dl').removeClass('on');
            $(this).addClass('on');
            var name = $(this).find('dt').text();
            $('.steps').find('li').eq(0).find('.ui-step-text').text('选择开店类型:' + name);
            // 清除错误信息
            clearErrorMsg(1);
        });

        // 所有的 上一步
        $('.step').on('click', '.btn-prev', function() {
            changeStepStatus($(this).data().step - 1);
        });

        // test 下一步
        // $('.step:not(.step1)').on('click','.btn-next', function(){
        // 	var next_step = $(this).data().step + 1;
        // 	changeStepStatus(next_step);
        // 	return false;
        // });


        // 第三步
        $('.step3').on('click', '.btn-add-brand-info', function() {
            var target = $('.step3').find('.form-inside');
            if (target.is(':visible')) target.slideUp(400);
            else target.slideDown(400);
        });

        // 类目选择
        $('#sCategory').on('click', 'input[type="checkbox"]', function() {
            var $this = $(this),
                id = $this.data().id,
                val = $('#sCategories').val(),
                reg = /\s{2,}/g;
            if ($this.prop('checked')) {
                val = val + ' ' + id;
            } else {
                if (val.indexOf(id) >= 0) {
                    val = val.replace(id, '');
                }
            }
            $('#sCategories').val(val.replace(reg, ' '));
        });


        // require.async(['plugin/jquery.picker', 'plugin/jquery.picker.date', 'plugin/jquery.picker.lang'], function() {
        //     $('.datepicker').pickadate();
        //     // console.log(a);
        // });


        require('plugin/jquery.picker')($);
        require('plugin/jquery.picker.date')($);
        require('plugin/jquery.picker.lang')($);

        $('.timepicker').pickadate({
        	format: 'yyyy-mm-dd'
        });

    });





    /*
    	表单验证方法拓展
    */




    /*
     * Name:    changeStep
     * Desc:    更改步骤状态
     *
     * @step:   要跳转的步骤
     */
    function changeStepStatus(step) {
        var prev = step == 1 ? 0 : (step - 2),
            curr = step - 1,
            next = step;
        $('.step').hide();
        $('.step' + step).not('.ignore').show();
        // 上一步
        if ($('.steps').find('li').eq(next).hasClass('ui-step-active')) {
            $('.steps').find('li').eq(next).removeClass('ui-step-active');
            $('.steps').find('li').eq(curr).removeClass('ui-step-done').addClass('ui-step-active');
        } else {
            $('.steps').find('li').eq(prev).removeClass('ui-step-active').addClass('ui-step-done');
            $('.steps').find('li').eq(curr).addClass('ui-step-active');
        }
    }

    /*
     * Name:    showError
     * Desc:    显示错误信息
     *
     * @step:   第几步
     * @msg:  	错误信息
     */
    function showErrorMsg(step, msg) {
        $('.step' + step).find('.btn-box').prepend('<p class="msg-error">' + msg + '</p>');
    }

    /*
     * Name:    clearError
     * Desc:    清除错误信息
     *
     * @step:   第几步（传参则清除指定步骤的错误信息，不传参则清除所有错误信息）
     */
    function clearErrorMsg(step) {
        if (step) $('.step' + step).find('.msg-error').remove();
        else $('.msg-error').remove();
    }

    /*
		图片上传前的验证
		@id:	上传控件ID
		@size: 	图片最大限制（单位M）
		return: string(错误信息，为空时表示验证通过)
	*/
    function beforeImgUpload(id, size) {
        var $this = $(id),
            file_path = $this.val(),
            msg = '';

        // 大小限制
        if (!checkFileSize(id, 2)) {
            msg = '大小不能超过2M';
        } else {
            msg = '';
        }

        // 格式限制
        if (!checkPhotoPath(file_path)) {
            msg += ' 仅支持jpg/png/gif 的图片格式';
        } else {
            msg = '';
        }

        return msg;
    }

    /*
		图片上传后的操作(显示预览)
		@id:	上传控件ID
		@src: 	预览图片地址
	*/
    require('plugin/jquery.imgUploadPreview.js')($);

    function afterImgUpload(id, src) {
        $(id).imgUploadPreview({
            src: src
        });
    }

    /*
		删除预览后的操作
		@obj:		操作的链接
		@preview: 	预览的dom
		@wrap: 		上传的dom
	*/
    function afterDeletePreview(obj, preview, wrap) {
        var $preview = preview,
            $this = obj,
            $wrap = wrap;
        if ($preview.find('li').length == 1) { // 仅剩一项预览
            var btnUploadClone = $preview.find('.ui-btn-upload').clone(true);
            $preview.remove();
            if ($wrap.find('.ui-btn-upload').length <= 0) {
                btnUploadClone.find('span').text('上传图片');
                $wrap.append(btnUploadClone);
            }
        } else { // 多余一项预览
            $this.parent().remove();
        }
    }

    /*
		检查文件大小
		@id： 		file控件ID
		@size: 		最大size（单位M）
		@return: 	true or false
	*/
    function checkFileSize(id, size) {
        if (typeof FileReader !== "undefined") {
            var rel_size = document.getElementById(id).files[0].size;
            rel_size = rel_size / 1024;
            rel_size = rel_size / 1024;
            if (rel_size <= size) return true;
            else return false;
        }
    }

    /*
		检查图片格式
		@path： 	上传的文件的路径
		@return: 	true or false
	*/
    function checkPhotoPath(path) {
        var type = new RegExp("((\.jpg)|(\.png)|(\.gif))$", 'i');
        if (!type.test(path)) return false;
        else return true;
    }

    /*
		添加品牌之后的操作
		@tar： 	填充品牌list的目标元素
		@obj： 	品牌信息 json
	*/
    function addToBrandList(obj, tar) {
        var html = '<li data-id="' + obj.id + '">' +
            '<div class="img-box">' +
            '<img src="' + obj.src + '" alt="' + obj.name + '">' +
            '<div class="mask"></div>' +
            '<div class="lnks">' +
            '<a href="javascript:;" class="fr lnk-brand-delete" data-id="' + obj.id + '">删除</a>' +
            '<a href="javascript:;" class="lnk-brand-edit" data-id="' + obj.id + '">修改</a>' +
            '</div>' +
            '</div>' +
            '<p>' + obj.name + '</p>' +
            '</li>';
        $(tar).append(html);
        formBrandHide();
    }
    /*
        显示: 添加品牌表单
    */
    function formBrandShow() {
        $('.step3').find('.form-inside').stop().slideDown(400);
    }
    /*
        隐藏: 添加品牌表单
    */
    function formBrandHide() {
        $('.step3').find('.form-inside').stop().slideUp(400);
    }


    /*
     *	更改步骤状态
     *	@step:   要跳转的步骤
     */
    exports.changeStepStatus = changeStepStatus;

    /*
     *	显示错误信息
     *	@step:  第几步
     * 	@msg:  	错误信息
     */
    exports.showErrorMsg = showErrorMsg;

    /*
     *	清除错误信息
     *	@step:  第几步（传参则清除指定步骤的错误信息，不传参则清除所有错误信息）
     */
    exports.clearErrorMsg = clearErrorMsg;

    /*
     *	添加品牌之后的操作
     *	@tar： 	填充品牌list的目标元素
     *	@obj： 	品牌信息 json:{id: '', name: '', src: ''}
     */
    exports.addToBrandList = addToBrandList;

    /*
     *  图片上传前的验证
     *  @id:    上传控件ID
     *  @size:  图片最大限制（单位M）
     *  return: string(错误信息，为空时表示验证通过)
     */
    exports.beforeImgUpload = beforeImgUpload;

    /*
     *	图片上传后的操作(显示预览)
     *	@id:	上传控件ID
     *	@src: 	预览图片地址
     */
    exports.afterImgUpload = afterImgUpload;

    /*
        删除预览后的操作
        @obj:       操作的链接
        @preview:   预览的dom
        @wrap:      上传的dom
    */
    exports.afterDeletePreview = afterDeletePreview;

    /*
        显示: 添加品牌表单
    */
    exports.formBrandShow = formBrandShow;
    /*
        隐藏: 添加品牌表单
    */
    exports.formBrandHide = formBrandHide;

});
