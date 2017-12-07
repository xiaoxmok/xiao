/**
 * Created by xiaoxiangmin on 2017/12/7.
 */

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

var me = true;      //true代表黑棋，false白子；
var over = false;       //表示是否结束

var chessBoard = [];        //判断重复落子
for(var i=0;i<15;i++){
    chessBoard[i] = [];
    for(var j=0;j<15;j++){
        chessBoard[i][j] = 0;
    }
}

//赢法数组
var wins = [];
for(var i=0; i<15; i++){
    wins[i] = [];
    for(var j=0; j<15; j++){
        wins[i][j] = [];            //构建一个三维数组
    }
}

var count = 0;      //赢法种类的索引
for(var i=0; i<15; i++){            //所有横线的赢法数
    for(var j=0; j<11; j++){
        //wins[0][0][0] = true;
        //wins[0][1][0] = true;
        //wins[0][2][0] = true;
        //wins[0][3][0] = true;
        //wins[0][4][0] = true;

        //wins[0][1][1] = true;
        //wins[0][2][1] = true;
        //wins[0][3][1] = true;
        //wins[0][4][1] = true;
        //wins[0][5][1] = true;
        for(var k=0; k<5; k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}

for(var i=0; i<15; i++){            //所有坚线的赢法数
    for(var j=0; j<11; j++){
        //wins[0][0][0] = true;
        //wins[1][0][0] = true;
        //wins[2][0][0] = true;
        //wins[3][0][0] = true;
        //wins[4][0][0] = true;

        //wins[1][0][1] = true;
        //wins[2][0][1] = true;
        //wins[3][0][1] = true;
        //wins[4][0][1] = true;
        //wins[5][0][1] = true;
        for(var k=0; k<5; k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}

for(var i=0; i<11; i++){            //所有正斜线的赢法数
    for(var j=0; j<11; j++){
        //wins[0][0][0] = true;
        //wins[1][1][0] = true;
        //wins[2][2][0] = true;
        //wins[3][3][0] = true;
        //wins[4][4][0] = true;

        //wins[0][1][1] = true;
        //wins[1][2][1] = true;
        //wins[2][3][1] = true;
        //wins[3][4][1] = true;
        //wins[4][5][1] = true;
        for(var k=0; k<5; k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}

for(var i=0; i<11; i++){            //所有反斜线的赢法数
    for(var j=14; j>3; j--){
        //wins[0][14][0] = true;
        //wins[1][13][0] = true;
        //wins[2][12][0] = true;
        //wins[3][11][0] = true;
        //wins[4][10][0] = true;

        //wins[0][13][1] = true;
        //wins[1][12][1] = true;
        //wins[2][11][1] = true;
        //wins[3][10][1] = true;
        //wins[4][9][1] = true;
        for(var k=0; k<5; k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}

console.log("所以赢法："+count);

//赢法统计数组
var myWin = [];             //我方赢法
var computerWin = [];       //计算机赢法
for(var i=0; i<count;i++){
    myWin[i] = 0;
    computerWin[i] = 0;
}

var bg = new Image();
bg.src = 'img/git.png';
bg.onload = function(){
    //context.drawImage(bg,0,0,450,450);      //增加背景水印
    drawChessBoard();
    /*oneStep(0,0,true);
    oneStep(1,1,true);
    oneStep(2,2,true);
    oneStep(3,3,true);
    oneStep(4,4,true);

    oneStep(0,1,true);
    oneStep(1,2,true);
    oneStep(2,3,true);
    oneStep(3,4,true);
    oneStep(4,5,true);

    oneStep(0,14);
    oneStep(1,13);
    oneStep(2,12);
    oneStep(3,11);
    oneStep(4,10);

    oneStep(0,13);
    oneStep(1,12);
    oneStep(2,11);
    oneStep(3,10);
    oneStep(4,9);*/
};

//网格颜色
context.strokeStyle = "#bfbfbf";

//画棋盘网格
var drawChessBoard = function(){
    for(var i=0;i<15;i++){
        context.moveTo(15 + i*30, 15);
        context.lineTo(15 + i*30, 435);
        context.stroke();
        context.moveTo(15, 15 + i*30);
        context.lineTo(435, 15 + i*30);
        context.stroke();
    }
};

//画棋子
var oneStep = function(i, j, me){           //画棋子，i、j位置，me黑白子切换
    context.beginPath();
    context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i*30 -2, 15 + j*30 -2, 13, 15 + i*30 -2, 15 + j*30 -2, 0);     //画圆
    if(me){
        gradient.addColorStop(0,"#0a0a0a");
        gradient.addColorStop(1,"#636766");
    }else{
        gradient.addColorStop(0,"#d1d1d1");
        gradient.addColorStop(1,"#f9f9f9");
    }
    context.fillStyle = gradient;
    context.fill();
};

chess.onclick = function(e){
    //判断是否结束
    if(over){
        return;
    }
    //只有在我方下棋时有效
    if(!me){
        return;
    }
    var x = e.offsetX;              //获取当前点击的位置
    var y = e.offsetY;
    var i = Math.floor(x /30);      //转换成棋盘所在的位置
    var j = Math.floor(y /30);
    if(chessBoard[i][j] == 0){
        oneStep(i,j,me);
        //console.log(me);
        chessBoard[i][j] = 1;

        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k] =6;
                if(myWin[k] == 5){
                    window.alert("您赢了。");
                    over = true;
                }
            }
        }
        if(!over){
            me = !me;
            computerAI();
        }
    }
};

var computerAI = function(){
    var myScore = [];               //我的方得分
    var computerScore = [];         //计算机的得分
    var max = 0;        //保存最高分数
    var u = 0,v = 0;    //最高分数的坐标

    //初始化数组
    for(var i=0;i<15;i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j=0;j<15;j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }

    //遍列整个棋盘
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBoard[i][j] == 0){      //判断是否空闲的点
                for(var k=0;k < count;k++){       //遍列所有的赢法，得出每个点的得分

                    //我方得分判断
                    if(wins[i][j][k]){          //假设在第k种赢法是true的话，则落子有价值
                        if(myWin[k] == 1){
                            myScore[i][j] += 200;   //假设第k种，我方已经连上一颗子，我方加上相应的得分
                        }else if(myWin[k] == 2){
                            myScore[i][j] += 400;   //假设第k种，我方已经连上二颗子，我方加上相应的得分
                        }else if(myWin[k] == 3){
                            myScore[i][j] += 2000;  //假设第k种，我方已经连上三颗子，我方加上相应的得分
                        }else if(myWin[k] == 4){
                            myScore[i][j] += 10000;   //假设第k种，我方已经连上四颗子，我方加上相应的得分
                        }
                    }

                    //计算机得分判断
                    if(wins[i][j][k]){          //假设在第k种赢法是true的话，则落子有价值
                        if(computerWin[k] == 1){
                            computerScore[i][j] += 220;   //假设第k种，我方已经连上一颗子，计算机加上相应的得分
                        }else if(computerWin[k] == 2){
                            computerScore[i][j] += 420;   //假设第k种，我方已经连上二颗子，计算机加上相应的得分
                        }else if(computerWin[k] == 3){
                            computerScore[i][j] += 2200;  //假设第k种，我方已经连上三颗子，计算机加上相应的得分
                        }else if(computerWin[k] == 4){
                            computerScore[i][j] += 20000;   //假设第k种，我方已经连上四颗子，计算机加上相应的得分
                        }
                    }
                }
                if(myScore[i][j] > max){        //获取我方得分最高的点
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] == max){        //
                    if(computerScore[i][j] > computerScore[u][v]){      //
                        u = i;
                        v = j;
                    }
                }

                if(computerScore[i][j] > max){        //获取计算机得分最高的点
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] == max){        //
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u,v,false);
    chessBoard[u][v] = 2;
    for(var k=0;k<count;k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k] =6;
            if(computerWin[k] == 5){
                window.alert("计算机赢了。");
                over = true;
            }
        }
    }
    if(!over){
        me = !me;
    }
};