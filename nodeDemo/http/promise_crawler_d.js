/**
 * Created by xiaoxm on 2017/3/1.
 */
//页面小爬虫

var http = require('http');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var fs = require('fs');
var url = "http://haokan.baidu.com/author/1648238346034835";
var baseUrl = "http://www.imooc.com/learn/";
var videoIds = [348,728,637,259,197,134,75]

function fsWrite(data){
    //var file=fs.creatWriteSteam("./test.txt");
    fs.appendFile("./test.txt",data+"\n",function(err){
        if(err){
            return console.log(err);
        }
        //console.log("写入文件成功");
    })
}

//去除字符串前后空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//过滤获取的数据
function filterChapters(htmlData){
    var $ = cheerio.load(htmlData.html);
    var chapters = $('.chapter');
    //对象格式如下
    /*coursesData = {
        titile:title,
        number:number,
        videos:[{
            chapterName:chapterName,
            videos:[
                title:title,
                id:id
            ]
        }]
    }
*/
    var title = trim($('.course-infos .pr .hd h2').text());
    //var number=$('.js-learn-num').text();
    var number=htmlData.number;
    //console.log(number+"人");
    //var number = parseInt(,10);

    var coursesData = {
        titile:title,
        number:number,
        videos:[]
    };

    chapters.each(function(item){
        var chapter= $(this);

        //加上split，为了去除标题中多余内容
        var chapterTitle=trim(chapter.find('strong').text()).split('\n')[0];
        //console.log(chapterTitle.split('\n')[0]);
        var videos=chapter.find('.video').children('li');
        var chaptersData={
            chapterTitle:chapterTitle,
            videos:[]
        };

        videos.each(function(item){
            var video=$(this).find('.J-media-item');

            var videoTitle=trim(video.text()).split('\n')[0];
            var id=video.attr('href').split('video/')[1];

            chaptersData.videos.push({
                Title:videoTitle,
                id:id
            });
        });

        coursesData.videos.push(chaptersData);
    });
    return coursesData;
};

//打印获取数据
function printCourseInfo(coursesData){
    console.log('object', coursesData)
    // coursesData.forEach(function(couseData){
    //     console.log(couseData.titile+"  课程共计："+couseData.number+"   人学习了\n");
    //     fsWrite(couseData.titile+"  课程共计："+couseData.number+"   人学习了\n");
    // });

    // coursesData.forEach(function(couseData){
    //     console.log("###"+couseData.titile+"####\n");
    //     fsWrite("###"+couseData.titile+"####\n");
    //     couseData.videos.forEach(function(item){
    //         var chapterTile=item.chapterTitle;
    //         console.log(chapterTile+'\n');
    //         fsWrite(chapterTile+'\n');

    //         item.videos.forEach(function(video){
    //             console.log("   【"+video.id+"】"+video.Title+"\n");
    //             fsWrite("   【"+video.id+"】"+video.Title+"\n");
    //         })
    //     })
    // })
}


//获取页面数据
function getPageAsync(url){
    return new Promise(function(resolve, reject){
        console.log("正在爬取！！");
        var htmlData={
            html:'',
            number:0
        };

        //获取课程学习人数
        var numbers=new Promise(function(resolve, reject){
            var vid = url.match(/[^http://www.imooc.com/learn/]\d*/);
            var option = {
                hostname:'www.imooc.com',
                path: '/course/AjaxCourseMembers?ids='+vid,
                method: 'GET',
                headers:{
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Encoding': 'gzip, deflate, sdch',
                    'Accept-Language': 'ZH,zh;q=0.8,EN;q=0.6',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Cookie': 'imooc_uuid=3a6a7b23-a1cb-4e58-881f-6f01b389d10d; imooc_isnew_ct=1485182108; loginstate=1; apsid=g4NDgzNTVlZDhlZWFkZjBiMDU1MDA2MTJhNmI2NTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzczNDU0NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3aW41ZG9AcXEuY29tAAAAAAAAAAAAAAAAAAAAAAAAADgzMzg3YzIxYmRkMjNmY2FkZTgwZWFmN2JlZjVjYmIxExWGWBMVhlg%3DYT; last_login_username=win5do%40qq.com; channel=491b6f5ab9637e8f6dffbbdd8806db9b_phpkecheng; PHPSESSID=erl04j809ba73030p4nj47vmd0; imooc_isnew=2; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1485426499,1485446171,1485502103,1485525699; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1485525715; cvde=588b52c05f023-9',
                    'Host': 'www.imooc.com',
                    'Pragma': 'no-cache',
                    'Referer': url,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            };
            /*{"result":0,
             "data":[{
             "id":"637",
             "numbers":"42952"
             }],
             "msg":"\u6210\u529f"
             }*/

            http.get(option,function(res){
                var rawData="";
                res.on("data",function(chunk){
                    rawData+=chunk;
                });
                res.on("end",function(){
                    console.log('11', rawData);
                    var number =  parseInt(JSON.parse(rawData));
                    htmlData.number=number;
                    resolve(htmlData);
                });
            }).on("error",function(e){
                reject(e);
                console.log("爬取出错！！");
            });
        });

        http.get(url,function(res){

            res.on("data",function(data){
                htmlData.html +=data;
            });
            res.on("end",function(){
                resolve(htmlData);
                /*var courseData=filterChapters(html);
                printCourseInfo(courseData);*/
            })
        }).on("error",function(e){
            reject(e);
            console.log("获取出错！！！");
        });
    });
}

var fetchCourseArray = [];

videoIds.forEach(function(id){
    // fetchCourseArray.push(getPageAsync(baseUrl+id));
    fetchCourseArray.push(getPageAsync(url));
});

// console.log('222', getPageAsync(url))

Promise
    .all(fetchCourseArray)
    .then(function(pages){
        var coursesData=[];
        pages.forEach(function(htmlData){
            var course = filterChapters(htmlData);
            coursesData.push(course);
        });

        coursesData.sort(function(a,b){
            return a.number < b.number;
        });
        printCourseInfo(coursesData);
        //fsWrite(JSON.stringify(coursesData));
    });


