require.config({
    //  baseUrl:变更基目录
    baseUrl:'./',
    paths:{
        jquery:'jquery-2.2.2.min'
    },
    shim:{

    }
})
require(['jquery','alert'],function($,alert){
    alert.alertName("zhangSan");
    alert.alertAge(22);
})

// AMD模式属于异步操作，有回调函数，但不能按需加载，必需在前面模块加载完才能触发回调函数