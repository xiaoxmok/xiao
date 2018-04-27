/**
 * Created by xiaoxm on 2017/3/1.
 */
//http.request

/*

Accept:application/json, text/javascript, *!/!*; q=0.01
 Accept-Encoding:gzip, deflate
 Accept-Language:ZH,zh;q=0.8
 Connection:keep-alive
 Content-Length:62
 Content-Type:application/x-www-form-urlencoded; charset=UTF-8
 Cookie:imooc_uuid=89e17e3f-ce26-4470-991f-5d6ce964da44; imooc_isnew_ct=1488013619; loginstate=1; apsid=JmYWM4OTQyZWNkMTUyN2UyMjJmZjEzYzBiNzMxY2MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzc0MDU0NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4aWFveG0ub2tAZm94bWFpbC5jb20AAAAAAAAAAAAAADJiZTJlZGU5YTM1NjI2ZTk4N2QwYWNmYjhiMDk5MTEziUmxWIlJsVg%3DNm; last_login_username=xiaoxm.ok%40foxmail.com; PHPSESSID=rf0gnp9g6qgl0told6eedfgnm0; Hm_lvt_8875c662941dbf07e39c556c8d97615f=1488337050; Hm_lpvt_8875c662941dbf07e39c556c8d97615f=1488339945; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1488168720,1488177080,1488249463,1488335991; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1488374928; IMCDNS=0; imooc_isnew=2; cvde=58b6346e60173-438
 Host:www.imooc.com
 Origin:http://www.imooc.com
 Referer:http://www.imooc.com/video/8837
 User-Agent:Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36
 X-Requested-With:XMLHttpRequest
 Form Data
 view source
 view URL encoded
*/

var http=require('http');
var querystring=require('querystring');

var postData = querystring.stringify({
    'content':"哈哈，别封我，测试一下！",
    'mid':8837
});

var options={
    hostname: 'www.imooc.com',
    port:80,
    path:"/course/docomment",
    method:"POST",
    headers:{
        'Accept':'application/json, text/javascript, *!*; q=0.01',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'ZH,zh;q=0.8',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'imooc_uuid=89e17e3f-ce26-4470-991f-5d6ce964da44; imooc_isnew_ct=1488013619; loginstate=1; apsid=JmYWM4OTQyZWNkMTUyN2UyMjJmZjEzYzBiNzMxY2MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzc0MDU0NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4aWFveG0ub2tAZm94bWFpbC5jb20AAAAAAAAAAAAAADJiZTJlZGU5YTM1NjI2ZTk4N2QwYWNmYjhiMDk5MTEziUmxWIlJsVg%3DNm; last_login_username=xiaoxm.ok%40foxmail.com; PHPSESSID=rf0gnp9g6qgl0told6eedfgnm0; Hm_lvt_8875c662941dbf07e39c556c8d97615f=1488337050; Hm_lpvt_8875c662941dbf07e39c556c8d97615f=1488339945; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1488168720,1488177080,1488249463,1488335991; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1488374928; IMCDNS=0; imooc_isnew=2; cvde=58b6346e60173-438',
        'Host':'www.imooc.com',
        'Origin':'http://www.imooc.com',
        'Referer':'http://www.imooc.com/video/883',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
};

var req = http.request(options,function(res){
    console.log("Status:"+res.statusCode);
    console.log("headers:"+JSON.stringify(res.headers));

    res.on("data",function(chunk){
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });

    res.on("end",function(){
        console.log("评论完毕！");
    })
});

req.on("error",function(e){
    console.log("Error:"+ e.message);
});

req.write(postData);
req.end();
