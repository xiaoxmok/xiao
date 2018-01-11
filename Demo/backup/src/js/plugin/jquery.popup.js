/**
 * jquery popup plugin
 * @authors     Inman Shaw
 * @date        2014-05-23 10:12:16
 * @version     1.0.0
 */
/*  html:
    <div id="popup" class="popup radius popup-effect-2">
        <div class="popup-header">header</div>
        <div class="popup-content">
            content here
            <p class="popup-footer">footer</p>
        </div>
    </div>

    useage:
    1   配置data-popup属性，无需添加js
        <a href="javascript:;" data-popup="#popupLogin">show2</a>
    2
        $(function(){
            // 页面加载完就弹出
            $('.popup').popup();

            // 点击弹出
            $('.lnk-popup').click(function(){
                $('.popup').popup();
            })
        })
*/

define(function() {

    return function($) {

        ;
        (function($, window, undefined) {
            "use strict";
            $.fn.popup = function(options) {
                var defaults = {
                    width: '80%', // 指定弹窗宽度
                    height: 'auto', // 指定弹窗高度
                    element: '.popup', // 弹窗class或id
                    closeEl: '.popup-close', // 关闭class
                    overlay: 'popup-overlay', // 遮罩class name
                    docClick: false, // 点击弹窗之外时是否关闭
                    esc: false, // ESC时是否关闭
                    hasOverlay: true, // 是否需要蒙层（默认是）
                    beforeShow: null, // 弹出前函数
                    afterShow: null // 弹出后函数
                };
                var opts = $.extend(defaults, options);
                var $pop,
                    $body = $('body'),
                    $overlay = $body.find('.' + opts.overlay);
                var hide = function() {
                    if ($('.popup-show').length <= 1) $overlay.removeClass('popup-show-overlay');
                    $pop.removeClass('popup-show').removeAttr('style');
                    if (opts.esc) $body.off('keyup', hideOnEsc);
                    if (opts.docClick) $body.off('click', hideOnDocumentClick);

                    // 是否还有弹窗
                    if ($('.popup-show').length > 0) {
                        $('.popup-show').css('z-index', 1001);
                    }
                };
                var hideOnDocumentClick = function() {
                    if ($(event.target).hasClass(opts.overlay)) hide();
                };
                var hideOnEsc = function(event) {
                    if (event.keyCode === 27) return hide();
                };
                var show = function() {
                    if (opts.beforeShow) opts.beforeShow($pop);
                    // 设置尺寸
                    if ($pop.css('width') != '' && $pop.css('width') != 'auto') opts.width = $pop.css('width');
                    if ($pop.css('height') != '' && $pop.css('height') != 'auto') opts.height = $pop.css('height');
                    $pop.css({
                        'width': opts.width,
                        'height': opts.height,
                        'margin-top': -($pop.outerHeight() / 2) + 'px',
                        'margin-left': -($pop.outerWidth() / 2) + 'px'
                    });

                    if (opts.hasOverlay) {
                        // 是否有其他弹窗
                        if ($('.popup-show').length > 0) {
                            $('.popup-show').css('z-index', 999);
                        }

                        if ($body.find('.' + opts.overlay).length <= 0) {
                            $body.append('<div class="' + opts.overlay + '"></div>');
                        }
                        $overlay = $body.find('.' + opts.overlay);
                        if ($('html').hasClass('lt-ie8')) { // IE 6 7
                            $overlay.css('height', $(document).outerHeight() + 'px');
                        }
                        $overlay.addClass('popup-show-overlay');
                    }

                    $pop.addClass('popup-show');

                    // close
                    $pop.find(opts.closeEl).on('click', hide)
                    if (opts.esc) $body.on('keyup', hideOnEsc);
                    if (opts.docClick) $body.on('click', hideOnDocumentClick);
                };
                return this.each(function() {
                    $pop = $(this);
                    show();
                });
            };
            // 给链接添加固定格式的属性可默认激活弹窗事件
            $(function() {
                $(document).on('click', '[data-popup^="#pop"]', function() {
                    var $this = $(this),
                        target = $this.data().popup;
                    $(target).popup();
                })
            });
        })(jQuery, window);

    }
});