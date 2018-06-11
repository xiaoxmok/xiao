var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var endTime, time=null;

window.onload = function () {
    endTime = new Date().getTime() + 0.1 * 60 * 1000;
    time = setInterval(function () {

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;

        render(context)
    }, 1000);
    //render(context);
}

/**
 * 绘图
 * @param cxt
 */
function render(cxt) {


    var nowTime = new Date();
    var t = endTime - nowTime.getTime();

    if (t > 0) {

        var hours = Math.floor(t / 1000 / 60 / 60 % 24);
        var minutes = Math.floor(t / 1000 / 60 % 60);
        var seconds = Math.floor(t / 1000 % 60);



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
    } else {
        clearInterval(time);
        //return;
    }
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
