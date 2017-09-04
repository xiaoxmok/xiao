/**
 * Created by xiaoxm on 2017/7/11.
 */
(function(){

    var datepicker = {};
    var monthData;//当前年份、月份
    var $wrapper;

    var isClick = false; //过去日期是否可点击的判断，false:不可点击；true:可点击

    //获取年月日
    datepicker.getMonthDate= function(year,month){
        var ret = [];

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

            if(date <= 0){
                //上一月
                showDate = lastDayOfLastMonth + date;
                thisMonth = month -1;
            }else if(date > lastDay){
                //下一月
                showDate = showDate -lastDay;
                thisMonth = month + 1;
            }

            //判断month越界情况
            if(thisMonth === 0) thisMonth=12;
            if(thisMonth === 13) thisMonth=1;


            //console.log(lastDay+'-'+preMonthDayCount+'-'+nextMonthDayCount);
            //每个月需要显示的总天数
            var allMontDay = lastDay+preMonthDayCount+nextMonthDayCount;
            if(i === allMontDay){
                break;
            }

            if(thisMonth<=9){
                thisMonth='0'+thisMonth;
            }

            ret.push({
                month:thisMonth,
                date:date,
                showDate:showDate
            });
        }

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

        //console.log(year +'-'+month);

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


            if(i%7 === 0){
                html += '<tr>';
            }

            //获取当前时间
            var nowDate = new Date();
            var nowDay = nowDate.getDate();
            var nowMonth = nowDate.getMonth()+1;
            var nowYear = nowDate.getFullYear();

            //获取目标日期
            var fDate = new Date(monthData.year,date.month-1,date.showDate+1);

            //判断过去日期是否可点击
            if(isClick){
                if(nowDay === date.showDate && nowMonth === monthData.month && nowYear === monthData.year){
                    html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td ui-datepicker-body-nowday">'+date.showDate+'</td>';
                }else{
                    html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td">'+date.showDate+'</td>';
                }
            }else{
                //当当前时间小于等于目标日期时，可点击; 否则不可点击，变灰色
                if(nowDate <= fDate){
                    //判断是否当天日期，是则变颜色；否则不变
                    if(nowDay === date.showDate && nowMonth === monthData.month && nowYear === monthData.year){
                        html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td ui-datepicker-body-nowday">'+date.showDate+'</td>';
                    }else{
                        html += '<td data-date="'+date.date+'" class="ui-datepicker-body-td">'+date.showDate+'</td>';
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
        //当monthData不存在时
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

    datepicker.init = function(input){

        datepicker.render();

        //点击input展开日期选择器，判断日期组件是否展开
        var $input = document.querySelector(input);
        var isOpen = false;
        $input.addEventListener('click',function(){
            if(isOpen){
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            }else{
                $wrapper.classList.add('ui-datepicker-wrapper-show');

                //显示位置；
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.left = left + 'px';
                $wrapper.style.top = top + height +'px';

                isOpen = true;
            }

        },false)

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

        //点击日期显示在input上
        $wrapper.addEventListener('click', function(e){
            var $target = e.target;
            if(!$target.classList.contains('ui-datepicker-body-td')) return;

            var date = new Date(monthData.year,monthData.month-1,$target.dataset.date);

            $wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen = false;

            $input.value=format(date);


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

        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth()+1) +'-';
        ret += padding(date.getDate());

        return ret;
    }

    window.datepicker=datepicker;

})();