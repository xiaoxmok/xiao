var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var time = null;
//var endTime = new Date().getTime() + 0.1 * 60 * 1000;
var endTime = new Date(2018,5,12,16,20,6).getTime();

var curShowTimeSeconds = 0;

var balls = [];
var colors = ['#33b5e5','#0099cc','#aa66cc','#99CC00','#669900','#FFBB33','#FF8800','#FF4444','#CC0000'];

window.onload = function () {
    //render(context);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    time = setInterval(function () {

        render(context)
        updata();
    }, 50);
    //render(context);
}

/**
 * 更新
 */
function updata() {
    // 下一个时间
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = Math.floor(nextShowTimeSeconds / 1000 / 60 / 60 % 24);
    var nextMinutes = Math.floor(nextShowTimeSeconds / 1000 / 60 % 60);
    var nextSeconds = Math.floor(nextShowTimeSeconds / 1000 % 60);

    var curHours = Math.floor(curShowTimeSeconds / 1000 / 60 / 60 % 24);
    var curMinutes = Math.floor(curShowTimeSeconds / 1000 / 60 % 60);
    var curSeconds = Math.floor(curShowTimeSeconds / 1000 % 60);

    // 判断两个时间是否一至
    if(nextSeconds !== curSeconds){
        curShowTimeSeconds = nextShowTimeSeconds;
    }

}

/**
 * 获取当前时间
 * @returns {number}
 */
function getCurrentShowTimeSeconds() {
    var nowTime = new Date();
    var ret = endTime - nowTime.getTime();

    return ret >= 0 ? ret : 0;
}

/**
 * 绘图
 * @param cxt
 */
function render(cxt) {


    // 清空给定矩形内的指定像素
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = Math.floor(curShowTimeSeconds / 1000 / 60 / 60 % 24);
    var minutes = Math.floor(curShowTimeSeconds / 1000 / 60 % 60);
    var seconds = Math.floor(curShowTimeSeconds / 1000 % 60);


    /*var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();*/

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);
    //renderDigit(MARGIN_LEFT + 108 * (RADIUS + 1), MARGIN_TOP, 10, cxt);


    //clearInterval(time);

}

/**
 * 绘制数字
 * @param x
 * @param y
 * @param num
 * @param cxt
 */
function renderDigit(x, y, num, cxt) {

    cxt.fillStyle = '#005588';

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }
    }
}
