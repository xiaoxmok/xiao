/**
 * Created by xiaoxiangmin on 2017/12/7.
 */
(function(){
    var chess = {};
    var html;
    var canvas;
    var context;

    var me;    //true代表黑棋，false白子；
    var over;     //表示是否结束

   /* chess.buildui = function(){


    };*/
    var chessBoard = [];        //判断重复落子
    var wins = [];      //赢法数组
    var count = 0;      //赢法种类的索引
    var myWin = [];             //我方赢法
    var computerWin = [];       //计算机赢法

    //画棋盘网格
    chess.drawChessBoard = function(){

        //网格颜色
        context.strokeStyle = "#bfbfbf";

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
    chess.oneStep = function(i, j, me){           //画棋子，i、j位置，me黑白子切换
        context.beginPath();
        context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
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
        context.closePath();
    };

    //计算机AI
    chess.computerAI = function(){
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
        chess.oneStep(u,v,false);
        chessBoard[u][v] = 2;
        for(var k=0;k<count;k++){
            if(wins[u][v][k]){
                computerWin[k]++;
                myWin[k] =6;
                if(computerWin[k] == 5){
                    chess.gameOver();
                }
            }
        }
        if(!over){
            me = !me;
        }
    };

    //初始化游戏
    chess.newGame = function(){

        context = null;
        canvas = null;

        canvas = document.getElementById("chess");
        context = canvas.getContext('2d');

        //context.clearRect(0,0,canvas.width,canvas.height);

        canvas.height=canvas.height;        //清空画布

        me = true;      //true代表黑棋，false白子；
        over = false;       //表示是否结束

        chessBoard = [];        //判断重复落子
        for(var i=0;i<15;i++){
            chessBoard[i] = [];
            for(var j=0;j<15;j++){
                chessBoard[i][j] = 0;
            }
        }

        //赢法数组
        wins = [];
        for(var i=0; i<15; i++){
            wins[i] = [];
            for(var j=0; j<15; j++){
                wins[i][j] = [];            //构建一个三维数组
            }
        }

        count = 0;      //赢法种类的索引
        for(var i=0; i<15; i++){            //所有横线的赢法数
            for(var j=0; j<11; j++){
                for(var k=0; k<5; k++){
                    wins[i][j+k][count] = true;
                }
                count++;
            }
        }

        for(var i=0; i<15; i++){            //所有坚线的赢法数
            for(var j=0; j<11; j++){
                for(var k=0; k<5; k++){
                    wins[j+k][i][count] = true;
                }
                count++;
            }
        }

        for(var i=0; i<11; i++){            //所有正斜线的赢法数
            for(var j=0; j<11; j++){
                for(var k=0; k<5; k++){
                    wins[i+k][j+k][count] = true;
                }
                count++;
            }
        }

        for(var i=0; i<11; i++){            //所有反斜线的赢法数
            for(var j=14; j>3; j--){
                for(var k=0; k<5; k++){
                    wins[i+k][j-k][count] = true;
                }
                count++;
            }
        }

        console.log("所以赢法："+count);

        //赢法统计数组
        myWin = [];             //我方赢法
        computerWin = [];       //计算机赢法
        for(var i=0; i<count;i++){
            myWin[i] = 0;
            computerWin[i] = 0;
        }

        canvas.onclick = function(e){
            chess.meClick(e);
        }

    };

    //游戏结束
    chess.gameOver = function(){
      over = true;
      var flag;
      if(me){
          flag = confirm("你赢了，是否重新开始");
      }else{
          flag = confirm("电脑赢了，是否重新开始");
      }
      if (flag) {
            setTimeout(function(){
                chess.newGame();
                chess.drawChessBoard();
            },200);
      }
    };

    //我方落子
    chess.meClick = function(e){
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
            chess.oneStep(i,j,me);
            //console.log(me);
            chessBoard[i][j] = 1;

            for(var k=0;k<count;k++){
                if(wins[i][j][k]){
                    myWin[k]++;
                    computerWin[k] =6;
                    if(myWin[k] == 5){
                        chess.gameOver();
                        //over = true;
                    }
                }
            }
            if(!over){
                me = !me;
                chess.computerAI();
            }
        }
    };

    chess.init = function(dom){
        html = '<canvas id="chess" width="450px" height="450px"></canvas>';
        document.querySelector(dom).innerHTML = html;

        chess.newGame(dom);
        chess.drawChessBoard();

    };

    window.chess=chess;
})();









