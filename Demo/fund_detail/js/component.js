//展开更多，收起 组件
(function () {

    var expand = {};

    var opts = {};
    var defaults = {            //默认参数配置
        onOff: true,             //是否默认收起
        onText: "展开全部",       //展开文字
        offText: "收起",           //收起文字
        defaultTextLen: 130       //默认显示字数 手机端显示5行
    };

    expand.init = function (dom, options) {

        opts = extend(defaults, options);

        //console.log($(dom)[1]);
        var old = [];

        for (var i = 0; i < $(dom).length; i++) {


            var oDiv = $(dom).eq(i).find('.introduction');
            var oA = $(dom).eq(i).find(".textOn");
            var oClick = $(dom).find(".textOn");
            var comp_more = $(dom).eq(i).find(".comp_more");
            old[i] = oDiv.html().replace(/\s+/g, "");

            var onOff = opts.onOff;


            if (old[i].length > opts.defaultTextLen) {  //判断
                oDiv.html(old[i].toString().substring(0, opts.defaultTextLen) + '...');//默认显示65个字符，字符末尾添加 “...>>展开”
                oA.html(opts.onText);
                oDiv.addClass("off");
                comp_more.show();
            } else {
                oDiv.html(old[i]);
                oA.html(opts.offText);
                oDiv.addClass("on");
                comp_more.hide();
            }

        }
        ;


        oClick.click(function () {
            var i = $(this).index(".textOn");
            console.log(i);
            if ($(this).parent().prev('.introduction').hasClass("off")) {  //判断
                $(this).parent().prev('.introduction').html(old[i]);
                $(this).html(opts.offText);
                $(this).parent().prev('.introduction').removeClass("off")
            } else {
                $(this).parent().prev('.introduction').html(old[i].toString().substring(0, opts.defaultTextLen) + '...');//默认显示65个字符，字符末尾添加 “...>>展开”
                $(this).html(opts.onText);
                $(this).parent().prev('.introduction').addClass("off")
            }
        });
    };

    // 合并对象
    function extend(target, source) {
        for (var obj in source) {
            target[obj] = source[obj];
        }
        return target;
    }


    window.expand = expand;
})();

/*饼图插件*/
(function () {
    var pieEcharts = {};

    var opts = {};
    var defaults = {            //默认参数配置
        title: '资产净值 29.58亿元(2017-09-30)',             //标题
        data: [],
        seriesCenter: ['22%', '55%'],
        seriesRadius: '65%',
        legendTop: '23%',
        legendLeft: '42%'
    };

    var screnH = window.screen.width;
    //console.log(screnH);
    if(screnH > 374){
        defaults = {            //默认参数配置
            title: '资产净值 29.58亿元(2017-09-30)',             //标题
            data: [],
            seriesCenter: ['22%', '55%'],
            seriesRadius: '65%',
            legendTop: '23%',
            legendLeft: '45%'
        };
    }

    pieEcharts.init = function (domID, options) {
        var myChart = echarts.init(document.getElementById(domID));

        opts = extend(defaults, options);

        var va = [];
        for (var i = 0; i < opts.data.length; i++) {
            va.push(opts.data[i].name);
        }

        var option = {
            color: ['#fedb85', '#fdb331', '#fd8124', '#fc5b1f', '#ea4c29', "#cc7eb1", '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570'],
            title: {
                text: opts.title,

                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight: 'normal'
                },
                x: 'center',
                top: '10'
            },
            legend: {
                orient: 'vertical',
                //left: 'left',
                left: opts.legendLeft,
                top: opts.legendTop,
                align:'auto',
                itemWidth: 14,
                selectedMode:false,
                itemGap:11,
                formatter: function (name) {
                    //console.log(name.length );
                    return (name.length > 14 ? (name.slice(0,14)+"\n"+name.slice(14)) : name );
                    //return (name.length > 8 ? (name.slice(0,8)+"...") : name );
                },
                data: va,
                padding:5,
                textStyle: {
                    color: '#666',
                    fontSize: 12,
                    fontWeight: 'normal',
                    lineHeight:14,
                    padding:0,
                    rich: {
                        a: {
                            lineHeight:0,
                            padding:0
                        }
                    }
                }
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: opts.seriesRadius,
                    center: opts.seriesCenter,
                    avoidLabelOverlap: false,
                    data: opts.data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            formatter: '{b}\n{d}%'
                        }
                    }


                }
            ]
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

    window.pieEcharts = pieEcharts;
})();

