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

    var startDate,endDate;

    //获取当月的最后一天的日期
    var lastDay = new Date(year,month,0);
    //当月最后一天
    lastDay = lastDay.getDate();


    var f = month - n;


    if (f > 0) {
        if(day === lastDay){
            day = (new Date(year,f,0)).getDate();
        }

        startDate = year + '-' + padding(f) + '-' + padding(day);
    } else {
        if(day === lastDay){
            day = (new Date(year,12 - Math.abs(f),0)).getDate();
        }
        startDate = year - 1 + '-' + padding(12 - Math.abs(f)) + '-' + padding(day);
    }


    ret += d.getFullYear() + '-';
    ret += padding(d.getMonth() + 1) + '-';
    ret += padding(d.getDate());

    endDate = ret;

    return {
        startDate:startDate,
        endDate:endDate
    }
}

console.log(getDate(1));