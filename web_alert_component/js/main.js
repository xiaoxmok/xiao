/**
 * Created by xiaoxiangmin on 2017/11/30.
 */
require.config({
    paths:{
        jquery:'jquery-2.2.2.min'
    }
});

require(['jquery','window'],function($,w){
    $('#a').click(function(){
        new w.Window().alert("welcome!!",function(){
            console.log("关闭弹窗");
        });
    });
});