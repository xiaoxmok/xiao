/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-08-06 18:10:54
 * @version $Id$
 */


define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.popup')($);
    require('plugin/jquery.checkAll')($);
    var elArr = [];         // 存储所选的input dom 数组
    var actType = 'delete';       // 存储处理类型 对所选进行 删除 发布 取消发布 delete | release | cancelRelease

    $(function() {
         //头部导航选中
        $('.mod-nav').find('nav>a').eq(3).addClass('active').siblings().removeClass('active');

        // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(2).find('dd').eq(0).find('a').toggleClass('active');

        // 全选
        $('.j-chk-all').checkAll({
            name: "chk"
        });


        // 删除
        $('.btn-delete-selected').on('click', function() {
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.title').text('是否删除');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                backConfirm("delete");
            }

        });

        // 发布
        $('.btn-release').on('click', function() {
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.title').text('是否发布');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                backConfirm("release");
            }

        });


        // 取消发布
        $('.btn-cancel-release').on('click', function() {
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.title').text('是否取消发布');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                backConfirm("cancelRelease");
            }

        });


    });

    /*
     * Name:    deleteConfirm
     * Desc:    弹窗-处理前确认是 删除 发布 取消发布
     */
    function backConfirm(_type) {
        var $pop = $('#popDeleteConfirm');
        switch(_type){
            case 'release':
                $pop.find('.title').text('是否发布');
                $pop.find('.cnt').text('您确定发布所选项吗？');
                break;
            case 'cancelRelease':
                $pop.find('.title').text('是否取消发布');
                $pop.find('.cnt').text('您确定取消发布所选项吗？');
                break;
            default:
                $pop.find('.title').text('是否删除');
                $pop.find('.cnt').text('您确定删除所选项吗？');
                break;
        }
        $pop.popup({
            "esc": true
        });
        actType = _type;
    }

    /*
     * Name:    getSelectArr
     * Desc:    get 已选择的元素dom对象 数组
     */
    function getSelectArr() {
        return elArr;
    }

    /*
     * Name:    getActType
     * Desc:    get 处理数型 删除 发布 取消发布
     */
    function getActType() {
        return actType;
    }

    /*
     * Name:    setSelectArr
     * Desc:    set 已选择的元素dom对象 数组
     */
    function setSelectArr(name) {
        elArr.length = 0;
        $('input[name="'+name+'"]').each(function() {
            if (this.checked) elArr.push(this);
        });
    }

    /*
     * Name:    getSelectArr
     * Desc:    get 已选择的元素dom对象 数组
     */
    exports.getSelectArr = getSelectArr;
    exports.getActType = getActType;

});
