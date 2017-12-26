var oHtml = document.documentElement;
getFont();
window.onresize = function(){

    getFont();

}
function getFont(){
    var screenWidth = oHtml.clientWidth;
    if(screenWidth <= 320){

        oHtml.style.fontSize = '20px';
    }else if(screenWidth >= 640){

        oHtml.style.fontSize = '40px';
    }else{

        oHtml.style.fontSize = screenWidth/(640/40)+'px';

    }
}

window.onload=function(){

    // 解决:active在ios系统没效果的问题
	document.body.addEventListener('touchstart', function () { });

    
    
};




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
    var defaults = {            //默认参数配置
        title: '资产净值 29.58亿元(2017-09-30)',             //标题
        data: [],
        seriesCenter: ['22%', '55%'],
        seriesRadius: '50%',
        legendTop: '18%',
        legendLeft: '42%'
    };

    var screnH = window.screen.width;
    //console.log(screnH);
    if(screnH > 374){
        defaults = {            //默认参数配置
            title: '资产净值 29.58亿元(2017-09-30)',             //标题
            data: [],
            seriesCenter: ['22%', '55%'],
            seriesRadius: '60%',
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
                itemGap:-3,
                padding:0,
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
                itemWidth: 12,
                itemHeight: 12,
                selectedMode:false,
                itemGap:11,
                formatter: function (name) {
                    //console.log(name.length );
                    var names = name.split(":");
                    if(name.length > 13){
                        if(names[0].length > 13){
                            return names[0].slice(0,13)+"\n"+names[0].slice(13)+':'+names[1];
                        }else{
                            return names[0]+':'+"\n"+names[1];
                        }
                    }else{
                        return name;
                    }
                    //return (name.length > 14 ? (name.slice(0,14)+"\n"+name.slice(14)) : name );
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


/**
 * Created by xiaoxm on 2017/12/17.
 */

/*

 Number类型：
 Number类型是ECMAScript中最常用和最令人关注的类型了；这种类型使用IEEE754格式来表示整数和浮点数值（浮点数值在某些语言中也被成为双精度数值），为支持各种数据类型，ECMA-262定义了不同的数值面量格式。
 十进制：
 var intNum=10; //整数
 八进制:
 var octalNum1=070; //八进制的56
 var octalNum2=079; //无效的八进制数值-解析为79
 八进制字面量在严格模式下是无效的；
 十六进制：
 var hexNum1=0xA; //10
 切记：在进行运算的时候，所有以八进制和十六进制表示的数值都最终被转换成十进制；
 为什么操作小数会出现误差？
 浮点数值的最高进度是17位小数，但在进行运算的时候其精确度却远远不如整数；整数在进行运算的时候都会转成10进制；
 而Java和JavaScript中计算小数运算时，都会先将十进制的小数换算到对应的二进制，一部分小数并不能完整的换算为二进制，
 这里就出现了第一次的误差。待小数都换算为二进制后，再进行二进制间的运算，得到二进制结果。然后再将二进制结果换算为十进制，
 这里通常会出现第二次的误差。
 所以(0.1+0.2)!=03
 */


/**
 * 解决加法精度问题
 * 保留两位小数
 * @param arg1
 * @param arg2
 * @returns {number}
 */
function accAdd(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m + arg2 * m) / m).toFixed(n))
}

Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};


/**
 * 解决除法精度问题
 * @param arg1
 * @param arg2
 * @returns {number}
 */
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};

/**
 * 解决乘法精度问题
 * @param arg1
 * @param arg2
 * @returns {number}
 */
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m
        )
}

Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};

/**
 * 解决减法精度问题
 * 保留两位小数
 * @param arg2
 * @param arg1
 * @returns {number}
 */
function accSubtr(arg2, arg1) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
//动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
};

Number.prototype.subtr = function (arg) {
    return accSubtr(arg, this);
};


//如需要调用
//var a=12.32, b=12.3333
//(a).add(b);

//加法：add
//减法：subtr
//乘法：mul
//除法：div



