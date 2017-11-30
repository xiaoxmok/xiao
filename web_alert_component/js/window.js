/**
 * Created by xiaoxiangmin on 2017/11/30.
 */
define(['jquery'],function($){
    function Window(){

    };

    Window.prototype = {
        alert:function(content,handle){
            var boundingBox = $('<div class="window_boundingBox"></div>');
            boundingBox.appendTo("body");
            boundingBox.html(content);

            var btn = $('<input type="button" value="确定">');
            btn.appendTo(boundingBox);
            btn.click(function(){
                handle && handle();
                boundingBox.remove();
            });
        },
        confirm:function(){},
        prompt:function(){}
    };
    return {Window:Window};
});