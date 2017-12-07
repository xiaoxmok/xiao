/**
 * Created by xiaoxiangmin on 2017/11/30.
 */

//原始写法


define(['jquery'],function($){
    function Window(){
        this.cfg = {
            width:'300',
            height:'200',
            title:"标题",
            content: '',
            handler:null,
            isDraggable:true,           //是否可拖动
            dragHandle:'null',          //手动把手
            hasMask:true,               //是否显示遮罩层
            skinClassName:null,         //定制皮肤
            hasCloseBtn:false,          //是否显示关闭按钮
            text4AlertBtn:'确定',
            handler4AlertBtn:null,
            handler4CloseBtn:null
        };
        this.handlers = {};
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
            var that = this;
            if(CFG.hasMask){
                mask = $('<div class="window_mask"></div> ');
                mask.appendTo("body");
            }

            var btn = boundingBox.find('.window_footer input');
            //btn.appendTo(boundingBox);
            btn.click(function(){
                CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                boundingBox.remove();
                mask.remove();
                that.fire("alert");
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
                    CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                    boundingBox.remove();
                    mask.remove();
                    that.fire("close");
                });
            }
            if(CFG.isDraggable){
                if(CFG.dragHandle){
                    boundingBox.draggable({handler:CFG.dragHandle});
                }else{
                    boundingBox.draggable();
                }

            }

        },
        confirm:function(){},
        prompt:function(){},

        //自定义事件
        on:function(type,handler){
            if(typeof this.handlers[type] == "undefined"){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
        },
        fire:function(type,data){
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for(var i=0;i<handlers.length;i++){
                    handlers[i](data);
                }
            }
        }
    };
    return {Window:Window};
});