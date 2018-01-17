/**
 * Created by xiaoxiangmin on 2018/1/12.
 */


/**
 * 获取两个时间，
 * endDate 当前时间
 * startDate 当前时间 减掉 m 个月的时间
 *
 * @param m
 */
function getDate(n) {

    var ret = '';

    var padding = function (num) {
        if (num <= 9) {
            return '0' + num;
        }
        return num;
    };

    var d = new Date();

    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var startDate, endDate;

    //获取当月的最后一天的日期
    var lastDay = new Date(year, month, 0);
    //当月最后一天
    lastDay = lastDay.getDate();

    var y = 0;

    if (n >= 12) {
        y = parseInt(n / 12);
        n = n % 12;
    }

    var f = month - n;

    if (f > 0) {
        if (day === lastDay) {
            day = (new Date(year, f, 0)).getDate();
        }

        startDate = year - y + '-' + padding(f) + '-' + padding(day);
    } else {
        if (day === lastDay) {
            day = (new Date(year, 12 - Math.abs(f), 0)).getDate();
        }
        startDate = year - y - 1 + '-' + padding(12 - Math.abs(f)) + '-' + padding(day);
    }


    ret += d.getFullYear() + '-';
    ret += padding(d.getMonth() + 1) + '-';
    ret += padding(d.getDate());

    endDate = ret;

    return {
        startDate: startDate,
        endDate: endDate
    }
}

console.log(getDate(25));


/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * new Date().Format("MM/dd/yyyy")
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

//例
var nowDt = new Date().Format("yyyy-MM-dd");
console.log(nowDt);