
define(function(require) {

    var $ = require('jquery');
    var FE = require('sc-admin/v/xt-settings-add');
    require('plugin/kindeditor-4.1.10/kindeditor-min');

    var KindEditor = window.KindEditor;
    KindEditor.ready(function(K) {
        window.editor = K.create('#editorDesc', FE.EditorOptions);
    });

    $(function(){

        $('.btn-submit').on('click', function(){
            
            // 获取编辑器内容
            var html = editor.html();
            console.log(html);

        });
        
    });

});