/**
 * 
 * @authors jiangzhiqiang 
 * @date    2014-08-19 11:10:54
 * @version 1.0.0
 */


define(function(require, exports, module) {

    var $ = require('jquery');
    require('plugin/jquery.checkAll')($);
    require('plugin/jquery.popup')($);
    var elArr = [];         // 存储所选的input dom 数组
    var actType = 'delete';       // 存储处理类型 对所选进行 删除 发布 取消发布 delete | release | cancelRelease

    $(function() {
        //头部导航选中
        $('.mod-nav').find('nav>a').eq(3).addClass('active').siblings().removeClass('active');
         // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(0).find('dd').eq(1).find('a').toggleClass('active');
        // 收缩  {默认为展开}
        $('.ui-border-table').on('click','.td-span-expand', function() {
            var $this = $(this);   
            var tr = $this.closest("tr");
            var $className = tr.attr("class"); 
            $this.removeClass("td-span-expand").addClass("td-span-collapse"); 
            tr.siblings("tr").each(function(){
                var className = $(this).attr("class") || "";
                console.log($className+":"+className);
                if(className.indexOf($className)> -1){
                    $(this).hide();
                }
            })
        });
        
        // 展开
        $('.ui-border-table').on('click','.td-span-collapse', function() {
            var $this = $(this);   
            var tr = $this.closest("tr");
            var $className = tr.attr("class"); 
            $this.removeClass("td-span-collapse").addClass("td-span-expand");
            tr.siblings().each(function(){
                var className = $(this).attr("class") || "";
                if(className.indexOf($className)> -1){
                    $(this).show();
                }
            })
        });
        

        // 全选
        $('.j-chk-all').checkAll({
            name: "chk"
        });


        // 删除
        $('.btn-delete-selected').on('click', function() {
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                deleteConfirm();
            }

        });

         // 单项删除
        $('.tb-column').find('.lnk-detele').on('click',function(){
            setSelectArr('chk', 1, this);
            deleteConfirm('您确定删除该项吗？');
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
     * Name:    deleteConfirm
     * Desc:    弹窗-删除确认
     */
    function deleteConfirm() {
        var $pop = $('#popDeleteConfirm');
        $pop.popup({
            "esc": true
        });
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
    exports.getActType = getActType;

});
