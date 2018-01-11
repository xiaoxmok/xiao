/**
 * 全选 全不选 反选
 * @authors Inman Shaw
 * @date    2014-07-09 10:39:01
 * @version 1.0.0
 */

define(function($) {
    return function($) {

        // plugin start

        ;
        (function($, window, document, undefined) {
            "use strict";
            $.fn.checkAll = function(options) {
                var defaults = {
                    type: 'all', // 全选-all; 反选-invert
                    name: '', // 默认name
                    callback: function() {} // 回调函数
                };
                var opts = $.extend(defaults, options);
                // 初始化
                var init = function(o) {
                    $(o).on('click', function() {
                        var elArr = [];
                        var check = this.checked;
                        $('input[name="' + opts.name + '"]').each(function() {
                            // 全选/全不选
                            if (opts.type === 'all') {
                                this.checked = check;
                                if(check) elArr.push(this);
                            }
                            // 反选
                            else {
                                if (this.checked){
                                    this.checked = false;
                                }else{
                                    this.checked = true;
                                    elArr.push(this);
                                }
                            }
                        });

                        // 回调函数：返回所选的input dom 数组
                        if(opts.callback){
                            opts.callback(elArr);
                        }
                    });
                };
                return this.each(function() {
                    init(this);
                });
            };
        })(jQuery, window, document)

        // plugin end

    }
});