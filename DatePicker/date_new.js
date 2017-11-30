/**
 * Created by xiaoxm on 2017/7/11.
 */
(function(){

    var datepicker = {};
    var monthData;//当前年份、月份数据
    var $wrapper;

    var checkedData;//已选中日期

    //获取当前时间
    var nowDate = new Date();
    var nowDay = nowDate.getDate();
    var nowMonth = nowDate.getMonth()+1;
    var nowYear = nowDate.getFullYear();

    checkedData = nowDate;//默认当前时间为选中时间

    var opts={};

    var defaults = {
        //input:".input",
        isClick:false,       //过去日期是否可点击的判断，false:不可点击；true:可点击
        isTime:false
    };
    var isClick = defaults.isClick;
    //console.log("isClick="+isClick);

    //获取年月日
    datepicker.getMonthDate= function(year,month){
        var ret = [];

        //判断month 等于0情况
        if(month === 0) {
            month=12;
            year--;
        }

        //如果年、月并设置，则获取当前年、月
        if(!year || !month){
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth()+1; //getMonth()比真实月份少1，所以要加1；
        }

        //获取当月的第一天；
        var firstDay = new Date(year,month - 1, 1);

        //获取当月第一天是周几；
        var firstDayWeekDay = firstDay.getDay();

        //默认周日是0，将周日改为7；
        /*if(firstDayWeekDay === 0){
         firstDayWeekDay =7;
         }*/

        //获取当前年和月
        year = firstDay.getFullYear();
        month = firstDay.getMonth() +1;


        //获取上月的最后一天的日期
        var lastDayOfLastMonth = new Date(year, month -1,0);
        //获取上月最后一天
        lastDayOfLastMonth = lastDayOfLastMonth.getDate();
        //console.log(lastDayOfLastMonth);

        //上月日期，需要显示多少天
        var preMonthDayCount = firstDayWeekDay;

        //获取当月的最后一天的日期
        var lastDay = new Date(year,month,0);
        //当月最后一天
        lastDay = lastDay.getDate();

        //获取当月的最后一天的日期
        var lastDayWeekDay = new Date(year,month,0);
        //当月最后一天是周几
        lastDayWeekDay = lastDayWeekDay.getDay();
        //console.log(lastDay);

        //下一个月的天数
        var nextMonthDayCount;

        switch (lastDayWeekDay){
            case 0:
                nextMonthDayCount = 6;
                break;
            case 1:
                nextMonthDayCount = 5;
                break;
            case 2:
                nextMonthDayCount = 4;
                break;
            case 3:
                nextMonthDayCount = 3;
                break;
            case 4:
                nextMonthDayCount = 2;
                break;
            case 5:
                nextMonthDayCount = 1;
                break;
            default:
                nextMonthDayCount = 0;
                break;
        }

        //循环
        for(var i=0;i<7*6;i++){
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;
            var thisYear = year;

            if(date <= 0){
                //上一月
                showDate = lastDayOfLastMonth + date;
                thisMonth = month -1;
            }else if(date > lastDay){
                //下一月
                showDate = showDate -lastDay;
                thisMonth = month + 1;
            }

            //判断thisMonth越界情况
            if(thisMonth === 0) {
                thisMonth=12;
                thisYear--;
            }
            if(thisMonth === 13) {
                thisMonth=1;
                thisYear++;
            }


            //console.log(lastDay+'-'+preMonthDayCount+'-'+nextMonthDayCount);
            //每个月需要显示的总天数
            var allMontDay = lastDay+preMonthDayCount+nextMonthDayCount;
            if(i === allMontDay){
                break;
            }

            if(thisMonth<=9){
                thisMonth=parseInt('0'+thisMonth);
                //thisMonth='0'+thisMonth;
            }

            ret.push({
                year:thisYear,
                month:thisMonth,
                date:date,
                showDate:showDate
            });
        }
        //console.log(ret);

        return {
            year:year,
            month:month,
            days:ret
        };

    };

    //渲染上期组件
    datepicker.buildui = function(year,month){

        //获取一个月的数据；
        monthData = datepicker.getMonthDate(year,month);

        //console.log(monthData);

        var html = '<div class="ui-datepicker-header">'
            +'<a href="javascript:;" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'
            +'<a href="javascript:;" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'
            +'<span class="ui-datepicker-curr-month">'+monthData.year+'-'+monthData.month+'</span>'
            +'</div>'
            +'<div class="ui-datepicker-body">'
            +'<table>'
            +'<thead>'
            +'<tr>'
            +'<th>日</th>'
            +'<th>一</th>'
            +'<th>二</th>'
            +'<th>三</th>'
            +'<th>四</th>'
            +'<th>五</th>'
            +'<th>六</th>'
            +'</tr>'
            +'</thead>'
            +'<tbody>';

        for(var i=0;i<monthData.days.length;i++){
            var date = monthData.days[i];
            //console.log(date);


            if(i%7 === 0){
                html += '<tr>';
            }


            //获取目标日期
            var fDate = new Date(date.year,date.month-1,date.showDate,23,59,59);
            //console.log("fDate=="+fDate+" >= nowDate=="+nowDate+"======="+(nowDate <= fDate).toString());
            //console.log("nowDate=="+nowDate);


            //判断过去日期是否可点击 ui-datepicker-body-nowday
            if(isClick){
                if(checkedData === nowDate){
                    //判断是否当天日期，是则变颜色；否则不变
                    if(nowDay === date.showDate && nowMonth === date.month && nowYear === monthData.year){
                        html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td ui-datepicker-body-nowday">'+date.showDate+'</td>';
                    }else{
                        html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td">'+date.showDate+'</td>';
                    }
                }else{
                    if(parseInt(checkedData.toString().substring(8,10)) === date.showDate && parseInt(checkedData.toString().substring(5,7)) === date.month && parseInt(checkedData.substring().substr(0,4)) === monthData.year){
                        html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td ui-datepicker-body-nowday">'+date.showDate+'</td>';
                    }else{
                        html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td">'+date.showDate+'</td>';
                    }
                }
            }else{
                //当当前时间小于等于目标日期时，可点击; 否则不可点击，变灰色 ui-datepicker-body-nowday
                if(nowDate <= fDate){
                    //判断是否已有选中上期
                    //console.log("值呢11="+checkedData.toString().substring(0,4)+"-"+checkedData.toString().substring(5,7)+"-"+checkedData.toString().substring(8,10)); //2017-12-03
                    if(checkedData === nowDate){
                        //判断是否当天日期，是则变颜色；否则不变
                        if(nowDay === date.showDate && nowMonth === date.month && nowYear === monthData.year){
                            html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td ui-datepicker-body-nowday">'+date.showDate+'</td>';
                        }else{
                            html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td">'+date.showDate+'</td>';
                        }
                    }else{
                        if(parseInt(checkedData.toString().substring(8,10)) === date.showDate && parseInt(checkedData.toString().substring(5,7)) === date.month && parseInt(checkedData.substring().substr(0,4)) === monthData.year){
                            html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td ui-datepicker-body-nowday">'+date.showDate+'</td>';
                        }else{
                            html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td">'+date.showDate+'</td>';
                        }
                    }

                }else{
                    html += '<td data-date="'+date.date+'">'+date.showDate+'</td>';
                }
            }



            if(i%7 === 6){
                html += '</tr>';
            }

        }

        html += '</tbody>'
            +'</table>'
            +'</div>'

        return html;
    };

    //重绘日期组件
    datepicker.render= function(direction){

        var year,month;
        //当monthData存在时
        if(monthData){
            year = monthData.year;
            month = monthData.month;
        }

        if(direction === 'prev') month--;
        if(direction === 'next') month++;

        var html = datepicker.buildui(year,month);
        //console.log(html);

        //$dom.innerHTML = html;
        if(!$wrapper){
            $wrapper = document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className = 'ui-datepicker-wrapper';
        }
        $wrapper.innerHTML = html;


    };

    datepicker.init = function(input,options){

        opts = extend(defaults,options);

        //是否可点击
        isClick = opts.isClick;
        console.log("isClick="+isClick);

        datepicker.render();

        //点击input展开日期选择器，判断日期组件是否展开
        var $input = document.querySelectorAll(input);
        //var $input = input;
        console.log($input);

        var isOpen = false;
        for(var i=0;i<$input.length;i++){
            var $inp = $input[i];
            console.log($inp);
            $inp.addEventListener('click',function(e){
                var $target = e.target;
                if(isOpen){
                    $wrapper.classList.remove('ui-datepicker-wrapper-show');
                    isOpen = false;
                }else{
                    $wrapper.classList.add('ui-datepicker-wrapper-show');

                    //显示位置；
                    var left = $target.offsetLeft;
                    var top = $target.offsetTop;
                    var height = $target.offsetHeight;
                    $wrapper.style.left = left + 'px';
                    $wrapper.style.top = top + height +'px';

                    isOpen = true;
                }
            },false);

            //点击日期显示在input上
            $wrapper.addEventListener('click', function(e){
                var $target = e.target;
                if(!$target.classList.contains('ui-datepicker-body-td')) return;

                var date = new Date(monthData.year,monthData.month-1,$target.dataset.date);

                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;

                $inp.value=format(date);
                console.log($inp);

                checkedData = $inp.value; //获取选中值
                console.log("选中日期为："+checkedData);

                datepicker.render();

            }, false);
        }

        //点击上一月、下一月
        $wrapper.addEventListener('click', function(e){
            var $target = e.target;
            if(!$target.classList.contains('ui-datepicker-btn')) return;

            if($target.classList.contains('ui-datepicker-prev-btn')){
                //上一月
                datepicker.render('prev');
                console.log('prev');

            }else if($target.classList.contains('ui-datepicker-next-btn')){
                //下一月
                datepicker.render("next");
                console.log('next');

            }

        }, false);



    };

    //日期格式化
    function format(date){
        var ret = '';

        var padding=function(num){
            if(num<=9){
                return '0'+num;
            }
            return num;
        };

        var d = new Date();

        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth()+1) +'-';
        ret += padding(date.getDate());

        //是否显示 时分秒（当前时间）
        if(opts.isTime){
            ret += ' '+padding(d.getHours()) +':';
            ret += padding(d.getMinutes()) +':';
            ret += padding(d.getSeconds());
        }

        return ret;
    }

    // 合并对象
    function extend(target, source) {
        for (var obj in source) {
            target[obj] = source[obj];
        }
        return target;
    }

    window.datepicker=datepicker;

})();