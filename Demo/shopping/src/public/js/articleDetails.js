$(function(){
    var urlInfo = GetRequest();

    api.getArticleInfo(urlInfo.id,'',i18nLanguage,function(data){
        $('.articleTitle').html(data.data.title);
        $('.articleDetails').html(data.data.content);
    })

});