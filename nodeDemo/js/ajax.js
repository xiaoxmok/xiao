/**
 * Created by xiaoxm on 2017/4/26.
 */

var http;
if(window.XMLHttpRequest){
    http= new XMLHttpRequest;   //ie7+,chrome firefox,opera,...
}else{
    http= new ActiveXObject("Microsoft.XMLHTTP"); //IE5 IE6
}

//http.open(method,url,async);   method:get/post方法、url：请求地址、async:同步(false)/异步（async）默认为异步（）;
//http.send(string);
http.open(get,url,true);
http.send();

http.onreadystatechange=function(){
    if(http.readyState==4&&http.status==200){
        var s=http.responseText;    //请求成功后的一些处理；
    }
};