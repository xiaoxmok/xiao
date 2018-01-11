/**
 * 
 * @authors jiangzhiqiang 
 * @date    2014-08-19 11:10:54
 * @version 1.0.0
 */


define(function(require, exports, module) {

    var $ = require('jquery');
    /*require('plugin/jquery.checkAll')($);*/
    require('plugin/jquery.popup')($);
    var elArr = [];         // 存储所选的input dom 数组
    var actType = 'delete';       // 存储处理类型 对所选进行 删除 发布 取消发布 delete | release | cancelRelease

    $(function() {
        //头部导航选中
        $('.mod-nav').find('nav>a').eq(1).addClass('active').siblings().removeClass('active');
         // 左侧导航选中
        $('.mod-sidenav').children('dd').eq(1).find('dd').eq(3).find('a').toggleClass('active');
        // 收缩  {默认为展开}
        $('.ui-border-table').on('click','.td-span-expand', function() {
            var $this = $(this);   
            var tr = $this.closest("tr");
            var $className = tr.attr("class"); 
            $this.removeClass("td-span-expand").addClass("td-span-collapse"); 
            var trs = findChilrenTR(tr);
            for(var i = 0;i<trs.length;i++){
                trs[i].hide();
            }

        });
        


        // 展开
        $('.ui-border-table').on('click','.td-span-collapse', function() {
            var $this = $(this);   
            var tr = $this.closest("tr");
            var $className = tr.attr("class"); 
            $this.removeClass("td-span-collapse").addClass("td-span-expand");
            var trs = findChilrenTR(tr);
            for(var i = 0;i<trs.length;i++){
                trs[i].show();
            }
        });



        // 表格单选
        $('.ui-border-table').on("click","tbody>tr",function(e){
            var $tar = $(e.target);
            if(!$tar.hasClass('td-span-collapse') && !$tar.hasClass('td-span-expand')){
                setCheked($(this));
            }
            if(e.target.tagName == "INPUT"){
                setCheked($(this));
            }
            function setCheked(checks){
                var tr = checks;
                var check = tr.find('input[name=chk]');
                if (check.is(":checked")) check.prop('checked',false)
                else {check.prop('checked',true)}
                tr.siblings().find('input[name=chk]').prop('checked',false);
            }
        });

        // 设置担保额度
        $('.btn-settings').on('click', function() {
            setSelectArr('chk');

            if (elArr.length <= 0) {
                var $pop = $('#popTips');
                $pop.find('.title').text('设置担保额度');
                $pop.find('.msg').text('您还没有选择任何项');
                $pop.popup({
                    "esc": true
                });
            } else {
                pop();
            }

        });

    });
    
    /*
     * Name:    findChilrenTR
     * Desc:    找出当前tr的子集-tr
     */
    function findChilrenTR(obj){
        var childrenArr = [];
        var id = obj.attr('data-id');
        var trs = obj.siblings();
        return findTrs(id,trs,childrenArr);
    }

    /*
     * Name:    findChilrenTR
     * Desc:    递归找出tr的子集-tr 
     */
    function findTrs(id,trs,arr){
        trs.each(function(){
            var tr = $(this);
            var pid = tr.attr('data-pid');
            var cid = tr.attr('data-id');
            if(pid == id){
                arr.push(tr);
                arr.splice(tr.index(),1);
                findTrs(cid,trs,arr);
            }
        })
        return arr;
    }

     /*
     * Name:    deleteConfirm
     * Desc:    弹窗-设置佣金
     */
    function pop() {
        var $pop = $('#popSettings');
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
