/**
 * Created by xiaoxiangmin on 2017/11/30.
 */

//widget的写法


define(['widget','jquery'],function(widget,$){
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
            text4ConfirmBtn:'确定',
            text4CancelBtn:'取消',
            handler4AlertBtn:null,      //回调函数
            handler4CloseBtn:null,
            handler4ConfirmBtn:null,
            handler4CancelBtn:null,

            text4PromptBtn:'取消',
            isPromptInputPassword:'false',      //是否密码类型
            defaultValue4PromptInput:'',        //默认文字
            maxLength4PromptInput:'10',         //默认长度
            handler4PromptBtn:null
        };
        //this.handlers = {};
    };

    Window.prototype = $.extend({},new widget.Widget(),{
        //ui类，dom节点创建
        renderUI:function(){
            var footerContent = '';
            switch(this.cfg.winType){
                case "alert":
                    footerContent='<input type="button" value="'+ this.cfg.text4AlertBtn +'" class="window_alertBtn"/>';
                    break;
                case "confirm":
                    footerContent='<input type="button" value="'+ this.cfg.text4ConfirmBtn +'" class="window_confirmBtn"/>' +
                        '<input type="button" value="'+ this.cfg.text4CancelBtn +'" class="window_cancelBtn"/>';
                    break;
                case "prompt":
                    this.cfg.content += '<p class="window_promptInputWrapper"><input type="'+(this.cfg.isPromptInputPassword ? "text" : "password")+'" placeholder="'+this.cfg.defaultValue4PromptInput+'" maxlength="'+ this.cfg.maxLength4PromptInput +'" class="window_promptInput"/></p>';
                    footerContent='<input type="button" value="'+ this.cfg.text4ConfirmBtn +'" class="window_promptBtn"/>' +
                        '<input type="button" value="'+ this.cfg.text4CancelBtn +'" class="window_cancelBtn"/>';
                    break;
            }

            this.boundingBox = $('<div class="window_boundingBox">' +
                '<div class="window_header">'+ this.cfg.title +'</div>' +
                '<div class="window_content">'+ this.cfg.content +'</div>' +
                '<div class="window_footer">'+ footerContent +'</div>' +
                '</div>'
            );
            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div> ');
                this._mask.appendTo("body");
            }

            if(this.cfg.hasCloseBtn){
                this.boundingBox.append($('<div class="window_closeBtn">X</div>'));
            }

            this.boundingBox.appendTo("body");

            this._promptInput = this.boundingBox.find(".window_promptInput");
        },

        //操作类，监听事件
        bindUI:function(){
            var that = this;
            this.boundingBox.delegate(".window_alertBtn","click",function(){
                that.fire("alert");
                that.destroy();
            }).delegate(".window_closeBtn","click",function(){
                that.fire("close");
                that.destroy();
            }).delegate(".window_confirmBtn","click",function(){
                that.fire("confirm");
                that.destroy();
            }).delegate(".window_cancelBtn","click",function(){
                that.fire("cancel");
                that.destroy();
            }).delegate(".window_promptBtn","click",function(){
                that.fire("prompt",that._promptInput.val());
                that.destroy();
            });
            //调用自定义事件
            if(this.cfg.handler4AlertBtn){
                this.on("alert",this.cfg.handler4AlertBtn);
            }
            if(this.cfg.handler4CloseBtn){
                this.on("close",this.cfg.handler4CloseBtn);
            }

            if(this.cfg.handler4ConfirmBtn){
                this.on("confirm",this.cfg.handler4ConfirmBtn);
            }
            if(this.cfg.handler4CancelBtn){
                this.on("cancel",this.cfg.handler4CancelBtn);
            }
            if(this.cfg.handler4PromptBtn){
                this.on("prompt",this.cfg.handler4PromptBtn);
            }
        },

        //样式类，初始化属性
        syncUI:function(){
            this.boundingBox.css({
                width:this.cfg.width + 'px',
                height:this.cfg.height + 'px',
                left:(this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
                top:(this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
            });
            if(this.cfg.skinClassName){
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
            if(this.cfg.isDraggable){
                if(this.cfg.dragHandle){
                    this.boundingBox.draggable({handle:this.cfg.dragHandle});
                }else{
                    this.boundingBox.draggable();
                }

            }
        },

        //销毁处理
        destructor:function(){
            this._mask && this._mask.remove();
        },
        alert:function(cfg){
            $.extend(this.cfg,cfg,{winType:"alert"});
            this.render();
            return this;        //return this的写法是可用连缀写法
        },
        confirm:function(cfg){
            $.extend(this.cfg,cfg,{winType:"confirm"});
            this.render();
            return this;        //return this的写法是可用连缀写法
        },

        prompt:function(cfg){
            $.extend(this.cfg,cfg,{winType:"prompt"});
            this.render();
            this._promptInput.focus();      //让输入框自动获得焦点
            return this;
        }
    });
    return {Window:Window};
});