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
        new w.Window().alert({
            content:"welcome!!",
            title:"这是一个标题",
            text4AlertBtn:'OK',
            hasCloseBtn:true,
            dragHandle:'.window_header',
            handle4AlertBtn:function(){                         //回调函数
                console.log("你点击了 "+this.text4AlertBtn+" 按钮，关闭弹窗");
            },
            handle4CloseBtn:function(){
                console.log("你点击了 关闭 按钮，关闭弹窗");
            },
            width:300,
            height:150,
            y:100
        });
    });
});