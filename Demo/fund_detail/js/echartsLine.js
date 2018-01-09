/**
 * Created by xiaoxiangmin on 2017/10/31.
 */
(function () {
    var lineEcharts = {};

    var defaults = {
        lineColor: '#fe5a5b',            //线颜色
        areaColorMax: "#ffcec6",         //区域颜色 深
        areaColorMin: '#fffaf9',         //区域颜色 浅
        tooltipBgColor: "#fe5a5b",               //悬浮背景色
        markPointPicPath: 'image://img/icon_to.png',       //悬浮图标地址
        title:'七日年化收益率（%）',
        subtext:'',
        symbolX: '40',       //图表标尺寸X
        symbolY: '25',        //图表标尺寸Y
        data: [],          //数据
        date: [],          //日期
        lastValue: '0',     //当前数据最后一个值
        cycle: '30'          //周期，近1月，近3月，近6月，近1年，具体的天数
    };
    var opts = {};

    lineEcharts.init = function (domId, options) {

        var myChart = echarts.init(document.getElementById(domId));

        opts = extend(defaults, options);

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    axis: 'x',
                    snap: 'true'
                },
                showContent: 'false',
                formatter: '{b} <br/>{a}：{c}',
                backgroundColor: 'rgba(' + parseInt(opts.tooltipBgColor.substring(1, 3), 16).toString() + ',' + parseInt(opts.tooltipBgColor.substring(3, 5), 16).toString() + ',' + parseInt(opts.tooltipBgColor.substring(5, 7), 16).toString() + ',0.7)'
            },
            /*legend:{
                type:'plain',
                show:'true',
                data:['17-11-02']
            },*/
            title: {
                left: 'center',
                top:10,
                text: opts.title,
                subtext:opts.subtext,
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '13',
                    color: "#666",
                    rich:{
                        a: {
                            color: '#fe5a5b',
                            lineHeight: 10,
                            fontSize:'13'
                        }
                    }
                }
            },
            grid: {
                x: 50,
                y: 40,
                x2: 30,
                y2: 30,
                top:50,
                borderWidth: 1,
                borderColor: "#f4f4f4"

            },
            xAxis: {
                type: 'category',
                boundaryGap: false,

                //data: date,

                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#999"
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#f1f1f1"
                    }
                },
                data: opts.date,
                axisLabel: {
                    /*formatter: function (value, index) {
                     var date = new Date(value += oneDay);
                     //var date = new Date(value);
                     var texts = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
                     return texts;
                     },*/
                    interval: opts.cycle - 2,
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
                        color: "#f1f1f1"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#f1f1f1"
                    }
                },
                splitNumber: 3,
                axisLabel: {
                    formatter: function (value) {
                        return value.toFixed(3);
                    },

                    textStyle: {
                        color: '#7d7d7d'
                    }
                },
                min: function (value) {
                    return value.min - 0.05;
                },
                max: function (value) {
                    return value.max + 0.05;
                }


            },
            series: [
                {
                    name: '收益率',
                    type: 'line',
                    smooth: true,
                    symbol: 'emptyCircle',
                    sampling: 'average',
                    markPoint: {
                        symbol: opts.markPointPicPath,
                        symbolSize: [opts.symbolX, opts.symbolY],
                        symbolOffset: [-24, -18],
                        data: [
                            {
                                name: '最后一个值',
                                yAxis: opts.lastValue,
                                xAxis: opts.cycle - 1,
                                label: {
                                    normal: {
                                        position: [5, 4],
                                        color: '#fff'
                                    }
                                }
                            }
                        ]
                    },
                    itemStyle: {
                        normal: {
                            color: opts.lineColor
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: opts.areaColorMax
                            }, {
                                offset: 1,
                                color: opts.areaColorMin
                            }])
                        }
                    },
                    data: opts.data
                }
            ]
        };
        myChart.setOption(option);



        myChart.on('mouseover', function (params) {
            //console.log(params.name);
            myChart.setOption({
                series: [
                    {
                        markPoint: {
                            symbolSize: [0, 0]
                        }
                    }
                ]
            });
        })
    };


// 合并对象
    function extend(target, source) {
        for (var obj in source) {
            target[obj] = source[obj];
        }
        return target;
    }

    window.lineEcharts = lineEcharts;

})();
