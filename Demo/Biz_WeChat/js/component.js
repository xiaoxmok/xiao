/*饼图插件*/
(function () {
    var pieEcharts = {};

    var opts = {};
    var defaults = {            //默认参数配置        iphone5
        title: '',             //标题
        data: [],
        seriesCenter: ['30%', '50%'],
        seriesRadius: '60%',
        legendTop: '15%',
        legendLeft: '55%'
    };

    var screnH = window.screen.width;
    //console.log(screnH);


    pieEcharts.init = function (domID, options) {


        var domId = document.getElementById(domID);

        if(screnH < 374){               //       iphone5s
            domId.style.height = 10 + 'rem';
        }

        if (screnH > 374) {           //iphone6 iphone7 iphone8
            domId.style.height = 9 + 'rem';
        }
        if (screnH > 413) {           //iphone6 plus iphone7 plus iphone8 plus
            domId = document.getElementById(domID);
            domId.style.height = 8 + 'rem';
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

        //console.log(num);

        var gap = -2;
        if (isAndroid) {
            if(num === 3){
                domId.style.height = 10 + 'rem';
                gap = -5;
            }else if(num === 4){
                domId.style.height = 12 + 'rem';
                gap = -8;
            }else if(num === 5){
                domId.style.height = 14 + 'rem';
                gap = -9;
            }else{
                domId.style.height = 9 + 'rem';
                gap = -4;
            }

        }

        //if(va.length = 1){}
        switch (va.length) {
            case 1:
                opts.legendTop = '50%';
                if (opts.title.length === 0) {
                    opts.legendTop = '40%';
                }
                break;
            case 2:
                opts.legendTop = '35%';
                if (opts.title.length === 0) {
                    opts.legendTop = '30%';
                }
                break;
            case 3:
                opts.legendTop = '35%';
                if (opts.title.length === 0) {
                    opts.legendTop = '25%';
                }
                break;
            case 4:
                opts.legendTop = '32%';
                domId.style.height = 6 + 'rem';
                opts.seriesRadius='70%';
                if (opts.title.length === 0) {
                    opts.legendTop = '15%';
                }
                break;
            case 5:
                opts.legendTop = '25%';
                if (opts.title.length === 0) {
                    opts.legendTop = '10%';
                }
                break;
            case 6:
                opts.legendTop = '10%';
                if (opts.title.length === 0) {
                    opts.legendTop = '5%';
                }
                break;
            default:
                opts.legendTop = '5%';
                break;
        }
        var myChart = echarts.init(document.getElementById(domID));
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
                itemGap: 11,            //此处需要上线需要修改为 gap，目前值仅为调试所用。
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
        myChart.on('click', function (params) {

            //console.log('aa',params.dataIndex);
            //console.log('aa');
            switch (params.dataIndex){
                case 0:
                    var html='<a href="cmbc.html" class="dis_flex dis_info">\n' +
                        '                <p class="flex_2 tl">民生</p>\n' +
                        '                <p class="flex_2 tc">147</p>\n' +
                        '                <p class="flex_2 tr">1520446.19</p>\n' +
                        '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                        '            </a>\n' +
                        '            <a href="#" class="dis_flex dis_info">\n' +
                        '                <p class="flex_2 tl">新浪</p>\n' +
                        '                <p class="flex_2 tc">148</p>\n' +
                        '                <p class="flex_2 tr">237200.93</p>\n' +
                        '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                        '            </a>'
                    $('.pieData').html(html);

                    break;
                case 1:
                    var html='<a href="cmbc.html" class="dis_flex dis_info">\n' +
                        '                <p class="flex_2 tl">阿里</p>\n' +
                        '                <p class="flex_2 tc">147</p>\n' +
                        '                <p class="flex_2 tr">1520446.19</p>\n' +
                        '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                        '            </a>\n' +
                        '            <a href="#" class="dis_flex dis_info">\n' +
                        '                <p class="flex_2 tl">百度</p>\n' +
                        '                <p class="flex_2 tc">148</p>\n' +
                        '                <p class="flex_2 tr">237200.93</p>\n' +
                        '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                        '            </a>';
                    $('.pieData').html(html);
                    break;
                case 2:
                    var html='<a href="cmbc.html" class="dis_flex dis_info">\n' +
                        '                <p class="flex_2 tl">互联网</p>\n' +
                        '                <p class="flex_2 tc">147</p>\n' +
                        '                <p class="flex_2 tr">1520446.19</p>\n' +
                        '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                        '            </a>\n' +
                        '            <a href="#" class="dis_flex dis_info">\n' +
                        '                <p class="flex_2 tl">新浪</p>\n' +
                        '                <p class="flex_2 tc">148</p>\n' +
                        '                <p class="flex_2 tr">237200.93</p>\n' +
                        '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                        '            </a>';
                    $('.pieData').html(html);
                    break;
                case 3:
                    var html='<a href="cmbc.html" class="dis_flex dis_info">\n' +
                        '                <p class="flex_2 tl">其它</p>\n' +
                        '                <p class="flex_2 tc">147</p>\n' +
                        '                <p class="flex_2 tr">1520446.19</p>\n' +
                        '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                        '            </a>\n' +
                        '            <a href="#" class="dis_flex dis_info">\n' +
                        '                <p class="flex_2 tl">新浪</p>\n' +
                        '                <p class="flex_2 tc">148</p>\n' +
                        '                <p class="flex_2 tr">237200.93</p>\n' +
                        '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                        '            </a>';
                    $('.pieData').html(html);
                    break;
                default:

                    break;
            }
        });
        myChart.on('mouseout',function(params){
            //console.log('22');
            var html = '<a href="cmbc.html" class="dis_flex dis_info">\n' +
                '                <p class="flex_2 tl">民生</p>\n' +
                '                <p class="flex_2 tc">147</p>\n' +
                '                <p class="flex_2 tr">1520446.19</p>\n' +
                '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                '            </a>\n' +
                '            <a href="#" class="dis_flex dis_info">\n' +
                '                <p class="flex_2 tl">新浪</p>\n' +
                '                <p class="flex_2 tc">148</p>\n' +
                '                <p class="flex_2 tr">237200.93</p>\n' +
                '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                '            </a>\n' +
                '            <a href="#" class="dis_flex dis_info">\n' +
                '                <p class="flex_2 tl">新浪</p>\n' +
                '                <p class="flex_2 tc">148</p>\n' +
                '                <p class="flex_2 tr">237200.93</p>\n' +
                '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                '            </a>\n' +
                '            <a href="#" class="dis_flex dis_info">\n' +
                '                <p class="flex_2 tl">新浪</p>\n' +
                '                <p class="flex_2 tc">148</p>\n' +
                '                <p class="flex_2 tr">237200.93</p>\n' +
                '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                '            </a>\n' +
                '            <a href="#" class="dis_flex dis_info">\n' +
                '                <p class="flex_2 tl">新浪</p>\n' +
                '                <p class="flex_2 tc">148</p>\n' +
                '                <p class="flex_2 tr">237200.93</p>\n' +
                '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                '            </a>\n' +
                '            <a href="#" class="dis_flex dis_info">\n' +
                '                <p class="flex_2 tl">新浪</p>\n' +
                '                <p class="flex_2 tc">148</p>\n' +
                '                <p class="flex_2 tr">237200.93</p>\n' +
                '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                '            </a>\n' +
                '            <a href="#" class="dis_flex dis_info">\n' +
                '                <p class="flex_2 tl">新浪</p>\n' +
                '                <p class="flex_2 tc">148</p>\n' +
                '                <p class="flex_2 tr">237200.93</p>\n' +
                '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                '            </a>\n' +
                '            <a href="#" class="dis_flex dis_info">\n' +
                '                <p class="flex_2 tl">新浪</p>\n' +
                '                <p class="flex_2 tc">148</p>\n' +
                '                <p class="flex_2 tr">237200.93</p>\n' +
                '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                '            </a>\n' +
                '            <a href="#" class="dis_flex dis_info">\n' +
                '                <p class="flex_2 tl">新浪</p>\n' +
                '                <p class="flex_2 tc">148</p>\n' +
                '                <p class="flex_2 tr">237200.93</p>\n' +
                '                <p class="flex_1"><span class="to_right"></span></p>\n' +
                '            </a>';
            $('.pieData').html(html);
        })
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

