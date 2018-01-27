/**
 * Created by xiaoxiangmin on 2017/11/30.
 */
require.config({
    paths:{
        jquery:'jquery-2.2.2.min',
        jqueryUI:'jquery-ui.min'
    }
});

require(['jquery','window','jqueryUI'],function($,w,$UI){
    $('#a').click(function(){
        var win = new w.Window();
        console.log(win.constructor === w.Window);
        console.log(win instanceof w.Window);
        win.alert({
            content:"welcome!!",
            title:"这是一个标题",
            text4AlertBtn:'OK',
            hasCloseBtn:true,
            dragHandle:'.window_header',
            handler4AlertBtn:function(){                         //回调函数
                console.log("你点击了 "+win.cfg.text4AlertBtn+" 按钮，关闭弹窗");
            },
            handler4CloseBtn:function(){
                console.log("你点击了 关闭 按钮，关闭弹窗");
            },
            width:300,
            height:150,
            y:100
        }).on("alert",function(){
            //回调函数写法2
            console.log("第二次alert ");
        }).on("close",function(){
            console.log("第二次close");
        });

        /*也可以这样写
        win.on("cancel",function(){
            console.log("第二次close");
        });*/
    });
    $('#b').click(function(){
        var win = new w.Window();
        win.confirm({
            content:"您确实需要关闭吗？",
            title:"这是二个标题",
            text4ConfirmBtn:'是',
            text4CancelBtn:'否',
            hasCloseBtn:true,
            dragHandle:'.window_header',
            handler4ConfirmBtn:function(){                         //回调函数
                console.log("你点击了 "+win.cfg.text4ConfirmBtn+" 按钮，关闭弹窗");
            },
            handler4CancelBtn:function(){
                console.log("你点击了 "+win.cfg.text4CancelBtn+" 按钮，关闭弹窗");
            },
            width:300,
            height:150,
            y:100
        }).on("confirm",function(){
            //回调函数写法2
            console.log("第二次confirm ");
        }).on("cancel",function(){
            console.log("第二次cancel");
        });

    });
    $('#c').click(function(){
        var win = new w.Window();
        win.prompt({
            content:"请输入您的名字：",
            title:"输入",
            text4PromptBtn:'输入',
            text4CancelBtn:'取消',
            hasCloseBtn:true,
            dragHandle:'.window_header',
            defaultValue4PromptInput:'please',
            handler4PromptBtn:function(value){                         //回调函数
                console.log("你点击了 "+win.cfg.text4ConfirmBtn+" 按钮，关闭弹窗,您输入的内容为："+value);
            },
            handler4CancelBtn:function(){
                console.log("你点击了 "+win.cfg.text4CancelBtn+" 按钮，关闭弹窗");
            },
            width:300,
            height:150,
            y:100
        }).on("prompt",function(){
            //回调函数写法2
            console.log("第二次prompt ");
        }).on("cancel",function(){
            console.log("第二次cancel");
        });

    });
});