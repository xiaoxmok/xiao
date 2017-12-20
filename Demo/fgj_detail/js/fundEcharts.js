/**
 * Created by xiaoxiangmin on 2017/10/31.
 */
$(function(){

    var month = 7;
    var symbolX= 40;
    var symbolY= 25;


    var lineColor='#4c7abf';          //线颜色
    var areaColorMax='#4c7abf';         //区域颜色 深
    var areaColorMin='#b1afbf';          //区域颜色 浅
    var tooltipBgColor='#4c7abf';         //悬浮背景色
    var markPointPicPath='image://img/icon_to1.png';         //悬浮图标地址

    myCharts(month,lineColor,areaColorMax,areaColorMin,tooltipBgColor,markPointPicPath);

    $('.fund_date a').click(function(){
        var index = $(this).index();
        if(index == 0){
            month = 7;
            myCharts(month,lineColor,areaColorMax,areaColorMin,tooltipBgColor,markPointPicPath);
        }else if(index == 1){
            month = 31;
            myCharts(month,lineColor,areaColorMax,areaColorMin,tooltipBgColor,markPointPicPath);
        }else if(index == 2){
            month = 61;
            myCharts(month,lineColor,areaColorMax,areaColorMin,tooltipBgColor,markPointPicPath);
        }
        $('.fund_date a').removeClass('skin').eq(index).addClass('skin');
        //console.log(index);

    });

    function myCharts(num,lineColor,areaColorMax,areaColorMin,tooltipBgColor,markPointPicPath){
        var myChart = echarts.init(document.getElementById('line'));

        var oneDay = 24 * 3600 * 1000;
        var date = [];

        var data = [];
        var now = +new Date(2017, 1, 1);
        for (var i = 0; i < month; i++) {
            now = new Date(+now + oneDay);
            data.push( (Math.random().toFixed(5)/10 + 4.2).toFixed(3));
            //console.log(data);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
            //console.log(date);
        }
        var value = data[data.length-1];

        //颜色 16进制转10进制
        //console.log('rgba('+parseInt(tooltipBgColor.substring(1,3),16).toString()+','+parseInt(tooltipBgColor.substring(3,5),16).toString()+','+parseInt(tooltipBgColor.substring(5,7),16).toString()+',0.7)');

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer:{
                    type: 'line',
                    axis:'x',
                    snap:'true'
                },
                showContent:'false',
                formatter: '{b} <br/>{a}：{c}',
                backgroundColor:'rgba('+parseInt(tooltipBgColor.substring(1,3),16).toString()+','+parseInt(tooltipBgColor.substring(3,5),16).toString()+','+parseInt(tooltipBgColor.substring(5,7),16).toString()+',0.7)'
            },
            title: {
                left: 'center',
                text: '七日年化收益率（%）',
                textStyle:{
                    fontWeight:'normal',
                    fontSize:'15',
                    color:"#999"
                }
            },
            grid:{
                x:50,
                y:40,
                x2:30,
                y2:30,
                borderWidth: 1,
                borderColor: "#f4f4f4"

            },
            xAxis: {
                type: 'category',
                boundaryGap: false,

                //data: date,

                axisLine: {
                    show:false,
                    lineStyle: {
                        color: "#c0c0c0"
                    }
                },
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: "#c0c0c0"
                    }
                },
                data: date,
                axisLabel : {
                    /*formatter: function (value, index) {
                     var date = new Date(value += oneDay);
                     //var date = new Date(value);
                     var texts = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
                     return texts;
                     },*/
                    interval:num-2,
                    textStyle: {
                        color: '#7d7d7d'
                    }
                }/*,
                 axisPointer:{
                 handle:{
                 show:'true'
                 }
                 }*/
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                axisLine: {
                    lineStyle: {
                        color: "#c0c0c0"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#c0c0c0"
                    }
                },
                splitNumber:3,
                axisLabel : {
                    formatter: function(value) {
                        return value.toFixed(3);
                    },

                    textStyle: {
                        color: '#7d7d7d'
                    }
                },
                min: function(value) {
                    return value.min - 0.05;
                },
                max: function(value) {
                    return value.max + 0.05;
                }


            },
            series: [
                {
                    name:'收益率',
                    type:'line',
                    smooth:true,
                    symbol: 'emptyCircle',
                    sampling: 'average',
                    markPoint:{
                        symbol:markPointPicPath,
                        symbolSize:[symbolX,symbolY],
                        symbolOffset:[-24,-18],
                        data:[
                            {
                                name: '最后一个值',
                                yAxis: value,
                                xAxis: num-1,
                                label:{
                                    normal:{
                                        position:[5,4],
                                        color:'#fff'
                                    }
                                }
                            }
                        ]
                    },
                    itemStyle: {
                        normal: {
                            color: lineColor
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: areaColorMax
                            }, {
                                offset: 1,
                                color: areaColorMin
                            }])
                        }
                    },
                    data: data
                }
            ]
        };
        myChart.setOption(option);

        //console.log(myChart);

        /*$('#line').on('dblclick', function (){
         console.log("11111");
         myChart.setOption({
         series: [
         {
         markPoint:{
         symbolSize:[0,0]
         }
         }
         ]
         });
         });*/

        $('#line').on('mousemove', function (params){
            console.log(params.name);
            myChart.setOption({
                series: [
                    {
                        markPoint:{
                            symbolSize:[0,0]
                        }
                    }
                ]
            });
        })
    };

});