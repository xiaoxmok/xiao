
//展开更多，收起 组件
(function(){

    var expand = {};

    var opts = {};
    var defaults = {            //默认参数配置
        onOff:true,             //是否默认收起
        onText:"展开全部",       //展开文字
        offText:"收起",           //收起文字
        defaultTextLen:112       //默认显示字数 手机端显示5行
    };

    expand.init = function(dom, options){

        opts = extend(defaults,options);
        //var oA = $(oA);

        var oDiv = $(dom).find('p');
        var oA = $(dom).find("a");

        var onOff = opts.onOff;
        var old=oDiv.html();

        if(onOff){  //判断
            oDiv.html(old.toString().substring(0,opts.defaultTextLen)+'...');//默认显示65个字符，字符末尾添加 “...>>展开”
            oA.html(opts.onText);
        }else{
            oDiv.html(old);
            oA.html(opts.offText);
        }

        oA.click(function(){
            if(onOff){  //判断
                onOff=false;
                oDiv.html(old);
                //oDiv.animate({height:"100%"});
                oA.html(opts.offText);
            }else{
                onOff=true;
                oDiv.html(old.toString().substring(0,opts.defaultTextLen)+'...');//默认显示65个字符，字符末尾添加 “...>>展开”
                //oDiv.animate({height:"100%"});
                oA.html(opts.onText);
            }
        })
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
(function(){
    var pieEcharts = {};

    var opts = {};
    var defaults = {            //默认参数配置
        title:'资产净值 29.58亿元(2017-09-30)',             //标题
        data: [                                             //数据
            {value:61.67, name:'银行存款：61.67%'},
            {value:36.75, name:'债券：36.75%'},
            {value:0.97, name:'买入返售证券：0.97%'},
            {value:0.60, name:'其他资产：0.60%'},
            {value:0.01, name:'其他：0.00%'}
        ],
        seriesCenter:['22%', '55%'],
        seriesRadius:'65%',
        legendTop:'25%',
        legendLeft:'50%'
    };

    pieEcharts.init = function(domID,options){
        var myChart = echarts.init(document.getElementById(domID));

        opts = extend(defaults,options);

        var option = {
            color:['#fedb85','#fdb331', '#fd8124', '#fc5b1f', '#ea4c29','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            title : {
                text: opts.title,

                textStyle:{
                    color:'#666',
                    fontSize:14,
                    fontWeight:'normal'
                },
                x:'center',
                top:'10'
            },
            legend: {
                orient: 'vertical',
                //left: 'left',
                left:opts.legendLeft,
                top:opts.legendTop,
                itemWidth:14,
                data: [opts.data[0].name,opts.data[1].name,opts.data[2].name,opts.data[3].name,opts.data[4].name],
                textStyle:{
                    color:'#666',
                    fontSize:12,
                    fontWeight:'normal'
                }
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : opts.seriesRadius,
                    center: opts.seriesCenter,
                    avoidLabelOverlap:false,
                    data:[
                        {value:opts.data[0].value, name:opts.data[0].name},
                        {value:opts.data[1].value, name:opts.data[1].name},
                        {value:opts.data[2].value, name:opts.data[2].name},
                        {value:opts.data[3].value, name:opts.data[3].name},
                        {value:opts.data[4].value, name:opts.data[4].name}
                    ],
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

    window.pieEcharts=pieEcharts;
})();

