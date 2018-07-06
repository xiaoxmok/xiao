function getMonthDay(year,month){

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




}