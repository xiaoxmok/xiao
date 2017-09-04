/**
 * Created by xiaoxm on 2017/3/1.
 */
//页面小爬虫

var http = require('http');
var cheerio = require('cheerio');
var url = "http://www.imooc.com/learn/348";

//去除字符串前后空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//过滤获取的数据
function filterChapters(html){
    var $ = cheerio.load(html);

    var chapters = $('.chapter');

    var courseData = [];

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

        courseData.push(chaptersData);
    });
    return courseData;
};

//打印获取数据
function printCourseInfo(courseData){
    courseData.forEach(function(item){
        var chapterTile=item.chapterTitle;
        console.log(chapterTile+'\n');

        item.videos.forEach(function(video){
            console.log("   【"+video.id+"】"+video.Title+"\n");
        })
    })
}

//获取url数据
http.get(url,function(res){
    var html="";

    res.on("data",function(data){
        html +=data;
    })
    res.on("end",function(){
        var courseData=filterChapters(html);
        printCourseInfo(courseData);
    })
}).on("error",function(){
    console.log("获取出错！！！");
});


