/**
 * demo 入口函数
 * @authors 	Inman Shaw
 * @date    	2014-05-22 18:25:49
 * @version 	1.0.0
 */

define(function(require, exports, module) {
    var $ = require('jquery');
    require('plugin/jquery.tab')($);
    require('plugin/jquery.popup')($);

    $(function() {
        $('.tabs').tab();

        $('.lnk-popup').click(function() {
            $('#popupDemo').popup({
                beforeShow: function() {
                    alert('before show up aaa')
                }
            });
        });
    });


    // test worktile
    $.ajax({
        url: "https://worktile.com/api/projects/fa695dec636340fd9492dabfab917afc/tasks/exports?format=json",
        type: "GET",
        dataType: "json",
        success: function(ret) {
            console.log(ret)
        }

    });
});