/**
 * Created by xiaoxiangmin on 2017/11/30.
 */
define(['jquery'],function($){
    function Window(){
        this.cfg = {
            width:'300',
            height:'200',
            title:"标题",
            content: '',
            handle:null,
            isDraggable:true,           //是否可拖动
            dragHandle:'null',          //手动把手
            hasMask:true,               //是否显示遮罩层
            skinClassName:null,         //定制皮肤
            hasCloseBtn:false,          //是否显示关闭按钮
            text4AlertBtn:'确定',
            handle4AlertBtn:null,
            handle4CloseBtn:null
        }
    };

    Window.prototype = {
        alert:function(cfg){
            var CFG = $.extend(this.cfg,cfg);
            var boundingBox = $('<div class="window_boundingBox">' +
                                    '<div class="window_header">'+ CFG.title +'</div>' +
                                    '<div class="window_content">'+ CFG.content +'</div>' +
                                    '<div class="window_footer"><input type="button" value="'+ CFG.text4AlertBtn +'" /></div>' +
                                '</div>'
                                );
            boundingBox.appendTo("body");
            //boundingBox.html(CFG.content);
            var mask = null;
            if(CFG.hasMask){
                mask = $('<div class="window_mask"></div> ');
                mask.appendTo("body");
            }

            var btn = boundingBox.find('.window_footer input');
            //btn.appendTo(boundingBox);
            btn.click(function(){
                CFG.handle4AlertBtn && CFG.handle4AlertBtn();
                boundingBox.remove();
                mask.remove();
            });
            boundingBox.css({
                width:CFG.width + 'px',
                height:CFG.height + 'px',
                left:(CFG.x || (window.innerWidth - CFG.width)/2) + 'px',
                top:(CFG.y || (window.innerHeight - CFG.height)/2) + 'px'
            });
            if(CFG.hasCloseBtn){
                var closeBtn = $('<div class="window_closeBtn">X</div>');
                closeBtn.appendTo(boundingBox);
                closeBtn.click(function(){
                    CFG.handle4CloseBtn && CFG.handle4CloseBtn();
                    boundingBox.remove();
                    mask.remove();
                });
            }
            if(CFG.isDraggable){
                if(CFG.dragHandle){
                    boundingBox.draggable({handle:CFG.dragHandle});
                }else{
                    boundingBox.draggable();
                }

            }

        },
        confirm:function(){},
        prompt:function(){}
    };
    return {Window:Window};
});