$(function(){
    var urlInfo = GetRequest();

    if(urlInfo.id){
        api.getArticleInfo(urlInfo.id,'',i18nLanguage,function(data){
            $('.articleTitle').html(data.data.title);
            $('.articleDetails').html(data.data.content);
        })
    }

    if(urlInfo.statistics){
        api.getStatistics(function(data){
            //$('.articleTitle').html(data.data.title);
            $('.articleDetails').html(data.page);
        })
    }
    if(urlInfo.device_config_page){
        api.getDeviceConfigPage(function(data){
            //$('.articleTitle').html(data.title);
            $('.articleDetails').html(data.page);
        })
    }


});