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

            if ((old[i].length - 4) > opts.defaultTextLen) {  //判断
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
            //console.log(i);
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
    var defaults = {            //默认参数配置        iphone5
        title: '资产净值 29.58亿元(2017-09-30)',             //标题
        data: [],
        seriesCenter: ['22%', '45%'],
        seriesRadius: '50%',
        legendTop: '18%',
        legendLeft: '42%'
    };

    var screnH = window.screen.width;
    //console.log(screnH);


    pieEcharts.init = function (domID, options) {
        var myChart = echarts.init(document.getElementById(domID));

        var domId = document.getElementById(domID);

        if (screnH > 374) {           //iphone6 iphone7 iphone8
            defaults = {            //默认参数配置
                title: '资产净值 29.58亿元(2017-09-30)',             //标题
                data: [],
                seriesCenter: ['22%', '45%'],
                seriesRadius: '60%',
                legendTop: '15%',
                legendLeft: '45%'
            };

            domId.style.height = 9 + 'rem';
        }
        if (screnH > 413) {           //iphone6 plus iphone7 plus iphone8 plus
            defaults = {            //默认参数配置
                title: '资产净值 29.58亿元(2017-09-30)',             //标题
                data: [],
                seriesCenter: ['22%', '45%'],
                seriesRadius: '60%',
                legendTop: '15%',
                legendLeft: '45%'
            };
            domId = document.getElementById(domID);
            domId.style.height = 8.2 + 'rem';
        }

        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端



        opts = extend(defaults, options);

        var va = [];
        var num = 0;
        for (var i = 0; i < opts.data.length; i++) {
            va.push(opts.data[i].name);
            if (opts.data[i].name.length > 13) {
                num += 1;
            }
        }

        console.log(num);

        if (isAndroid) {
            if(num === 3){
                domId.style.height = 10 + 'rem';
            }else if(num === 4){
                domId.style.height = 12 + 'rem';
            }else{
                domId.style.height = 9 + 'rem';
            }

        }

        //if(va.length = 1){}
        switch (va.length) {
            case 1:
                opts.legendTop = '35%';
                if (opts.title.length == 0) {
                    opts.legendTop = '30%';
                }
                break;
            case 2:
                opts.legendTop = '30%';
                if (opts.title.length == 0) {
                    opts.legendTop = '25%';
                }
                break;
            case 3:
                opts.legendTop = '25%';
                if (opts.title.length == 0) {
                    opts.legendTop = '23%';
                }
                break;
            case 4:
                opts.legendTop = '20%';
                if (opts.title.length == 0) {
                    opts.legendTop = '15%';
                }
                break;
            case 5:
                opts.legendTop = '15%';
                if (opts.title.length == 0) {
                    opts.legendTop = '10%';
                }
                break;
            case 6:
                opts.legendTop = '10%';
                if (opts.title.length == 0) {
                    opts.legendTop = '5%';
                }
                break;
            default:
                opts.legendTop = '15%';
                break;
        }

        var option = {
            color: ['#fedb85', '#fdb331', '#fd8124', '#fc5b1f', '#ea4c29', "#cc7eb1", '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570'],
            title: {
                text: opts.title,
                itemGap: -3,
                padding: 0,
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
                align: 'auto',
                itemWidth: 12,
                itemHeight: 12,
                selectedMode: false,
                itemGap: 15,
                formatter: function (name) {
                    //console.log(name.length );
                    var names = name.split(":");
                    if (name.length > 13) {
                        if (names[0].length > 13) {
                            return names[0].slice(0, 13) + "\n" + names[0].slice(13) + ':' + names[1];
                        } else {
                            return names[0] + ':' + "\n" + names[1];
                        }
                    } else {
                        return name;
                    }
                    //return (name.length > 14 ? (name.slice(0,14)+"\n"+name.slice(14)) : name );
                    //return (name.length > 8 ? (name.slice(0,8)+"...") : name );
                },
                data: va,
                padding: 5,
                textStyle: {
                    color: '#666',
                    fontSize: 12,
                    fontWeight: 'normal',
                    lineHeight: 14,
                    padding: 0,
                    rich: {
                        a: {
                            lineHeight: 0,
                            padding: 0
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

