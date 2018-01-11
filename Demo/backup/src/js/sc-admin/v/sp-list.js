/**
 * 商场官方后台-系统管理-服务协议管理
 * @authors Inman Shaw
 * @date    2014-07-15 14:06:33
 * @version 1.0.0
 */
define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.popup')($);
    require('plugin/jquery.checkAll')($);
    var elArr = []; // 存储所选的input dom 数组

    $(function() {
        //头部导航选中
        $('.mod-nav').find('nav>a').eq(2).addClass('active').siblings().removeClass('active');
        
        // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(1).find('dd').eq(0).find('a').toggleClass('active');

        // 全选
        $('.j-chk-all').checkAll({
            name: "chk"
        });


        // 多项删除
        $('.btn-delete-selected').on('click', function() {
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                deleteConfirm('您确定删除所选项吗？');
            }

        });

       //审核
        $('.btn-check').on('click',function(){
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                var $pop = $('#popcheck');
                $pop.popup({
                    "esc": true
                });
            }
          
        });

        //上架
        $('.btn-addshelf').on('click',function(){
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                deleteConfirm('您确定上架该项商品吗？');
            }
        });

        //下架
        $('.btn-removeshelf').on('click',function(){
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                deleteConfirm('您确定下架该项商品吗');
            }
        });


        // 推荐设置
        $('.btn-recommand').on('click',function(){
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                var $pop = $('#poprecommand');
                $pop.popup({
                    "esc": true
                });
            }
        });

        // 修改
        $('.btn-edit').on('click',function(){
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                var $pop = $('#popEdit');
                $pop.popup({
                    "esc": true
                });
            }
        });

        // 单项删除
        $('.tb-sp-list').on('click','.lnk-detele',function(){
            setSelectArr('chk', 1, this);
            deleteConfirm('您确定删除该项吗？');
        });

    });

    /*
     * Name:    deleteConfirm
     * Desc:    弹窗-删除确认
     */
    function deleteConfirm(msg) {
        var $pop = $('#popDeleteConfirm');
        $pop.find('.title').text('提示');
        $pop.find('.cnt').text(msg);
        $pop.popup({
            "esc": true
        });
    }

    /*
     * Name:    getSelectArr
     * Desc:    get 已选择的元素dom对象 数组
     */
    function getSelectArr() {
        return elArr;
    }

    /*
     * Name:    setSelectArr
     * Desc:    set 已选择的元素dom对象 数组
     */
    function setSelectArr(name, flag, obj) {
        elArr.length = 0;
        // 单项
        if(flag === 1 && obj){
            var ipt = $(obj).parent().parent().find('input[type="checkbox"]')[0];
            elArr.push(ipt);
        }
        // 多项
        else{
            $('input[name="'+name+'"]').each(function() {
                if (this.checked) elArr.push(this);
            });
        }
    }

    /*
     * Name:    getSelectArr
     * Desc:    get 已选择的元素dom对象 数组
     */
    exports.getSelectArr = getSelectArr;

});
