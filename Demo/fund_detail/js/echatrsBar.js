/**
 * Created by xiaoxiangmin on 2017/12/28.
 */


(function () {
    var barEcharts = {};

    var defaults={};
    var opts = {};

    barEcharts.init = function (donId,options) {
        var myChart = echarts.init(document.getElementById(donId));

        opts = extend(defaults, options);

        var option = {
            color: ['#ffdc7f', '#ffb415', '#ff8100', '#fc5b1f', '#ea4c29', "#cc7eb1", '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570'],
            backgroundColor:"#fff",

            /*legend: {
                data:['期间申购','期间赎回','期末总份额'],
                show:'false'
            },*/
            grid: {
                left: '3%',
                //right: '3%',
                top:'20',
                bottom:'0',
                containLabel: true
            },
            yAxis : [
                {
                    type : 'category',
                    //boundaryGap: [0, '100%'],
                    axisLine:{
                        show:'true',
                        lineStyle:{
                            color:"#999999"
                        }
                    },
                    axisLabel:{
                        color:"#999999"
                    },
                    data : opts.yData,
                    splitLine: {
                        show:'true',
                        interval:0,
                        lineStyle: {
                            color: "#999999",
                            type:"dashed"
                        }
                    }
                }
            ],
            xAxis : [
                {
                    type : 'value',
                    splitLine: {
                        show:false
                    },
                    axisLine:{
                        show:'true',
                        lineStyle:{
                            color:"#999999"
                        }
                    },
                    axisLabel:{
                        color:"#999999"
                    },
                    position:'top'
                }
            ],
            series :opts.data
        };

        myChart.setOption(option);

    };
    // 合并对象
    function extend(target, source) {
        for (var obj in source) {
            target[obj] = source[obj];
        }
        return target;
    }

    window.barEcharts = barEcharts;
})();