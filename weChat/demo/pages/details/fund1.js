// pages/details/fund.js

var wxCharts = require('../../utils/wxcharts.js');
var charts; 
Page({
  data:{
    fund_title: '汇添富理财30天A',
    fund_id: '470030',
    fund_intro: [{
      label: '类型:',
      value: '理财型',
      is_red: true
    },{},{
      label: '成立时间:',
      value: '2013-05-09',
      is_red: false
    },{
      label: '申购费率:',
      value: '0',
      is_red: true,
    },{
      label: 'A类年化收益:',
      value: '3.541%',
      is_red: true
    },{
      label: '日每万份收益:',
      value: '0.9673(元)',
      is_red: true
    },{
      label: 'B类年化收益:',
      value: '3.831%',
      is_red: true
    },{
      label: '日每万份收益:',
      value: '1.0468(元)',
      is_red: true
    }],
    btn: [
      {
        is_cur: true
      }, {
        is_cur: false
      }, {
        is_cur: false
      }
    ],
    manager: {
      name: '蒋文玲',
      time: '2016-06-07',
      intro: "国籍：中国。学历：上海财经大学经济学硕士。业务资格：证券投资基金从业资格。从业经历：曾任汇添富基金债券交易员、债券风控研究员。2012年11月30日至2014年1月7日任浦银安盛基金货币市场基金的基金经理。2014年1月加入汇添富基金，历任金融工程部高级经理、固定收益基金经理助理。2014年4月8日至今任汇添富多元收益债券基金的基金经理助理，2015年3月10日至今任汇添富现金宝货币基金、汇添富理财14天债券基金、汇添富优选回报混合基金（原理财21天债券基金）的基金经理，2016年6月7日至今任汇添富货币基金、添富通货币基金、理财30天债券基金、理财60天债券基金、实业债债券基金的基金经理。",
      images_url: "../../assets/images/manager1.jpg"
    },
    fund_data: {
      data_simple: [{
        label: '参考年化收益率(%):',
        value: '3.550'
      },{
        label: '日期:',
        value: '2017-02-21'
      }]
    }
  },
  set_format: function(date){   // 格式化日期
    return date.getFullYear() + "-" + formatNumber(date.getMonth() + 1) + "-" + formatNumber(date.getDate());
    function formatNumber(n){
      n = n.toString();
      return n[1] ? n : '0' + n;
    }
  },
  date_data:[
      {
        date: '2017-01-03',
        unit: 2.258
      },{
        date: '2017-01-04',
        unit: 2.291
      },{
        date: '2017-01-05',
        unit: 2.280
      },{
        date: '2017-01-06',
        unit: 2.270
      },{
        date: '2017-01-09',
        unit: 2.266
      },{
        date: '2017-01-10',
        unit: 2.262
      },{
        date: '2017-01-11',
        unit: 2.237
      },{
        date: '2017-01-12',
        unit: 2.217
      },{
        date: '2017-01-13',
        unit: 2.198
      },{
        date: '2017-01-16',
        unit: 2.167
      },{
        date: '2017-01-17',
        unit: 2.194
      },{
        date: '2017-01-18',
        unit: 2.208
      },{
        date: '2017-01-19',
        unit: 2.202
      },{
        date: '2017-01-20',
        unit: 2.228
      },{
        date: '2017-01-23',
        unit: 2.231
      },{
        date: '2017-01-24',
        unit: 2.232
      },{
        date: '2017-01-25',
        unit: 2.235
      },{
        date: '2017-01-26',
        unit: 2.244
      },{
        date: '2017-02-03',
        unit: 2.239
      },{
        date: '2017-02-06',
        unit: 2.248
      },{
        date: '2017-02-07',
        unit: 2.245
      },{
        date: '2017-02-08',
        unit: 2.254
      },{
        date: '2017-02-09',
        unit: 2.271
      },{
        date: '2017-02-10',
        unit: 2.269
      },{
        date: '2017-02-13',
        unit: 2.296
      },{
        date: '2017-02-14',
        unit: 2.293
      },{
        date: '2017-02-15',
        unit: 2.280
      },{
        date: '2017-02-16',
        unit: 2.294
      },{
        date: '2017-02-17',
        unit: 2.291
      },{
        date: '2017-02-20',
        unit: 2.345
      },{
        date: '2017-02-21',
        unit: 2.352
      },{
        date: '2017-02-22',
        unit: 2.363
      },{
        date: '2017-02-23',
        unit: 2.365
      }
  ],
  new_date: function(){   // 以上是真实数据，做一些假的数据丢进去
    var now = new Date(),
        years_ago = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
        data_last = this.date_data[0].date, // 真实数据最近的
        new_date = [];
    for(var i = 0; i < 365; i++){
      var date_format = this.set_format(years_ago);
      if(date_format != data_last){
        years_ago.setDate(years_ago.getDate() + 1);
        if(years_ago.getDay() != 6 && years_ago.getDay() != 0){
          new_date.push(date_format);
        }
      }else{
        break;        
      }
    }
    // 加入假数据
    var date_arr = new_date;
    var unit_arr = [];
    var random_unit = [2.315,2.324,2.333,2.321,2.298,2.317,2.278,2.285,2.215];
    date_arr.map(function(n,i){
      unit_arr[i] = random_unit[Math.floor(Math.random() * random_unit.length)];
    });
    this.date_data.map(function(n,i){
      date_arr.push(n.date);
      unit_arr.push(n.unit);
    });

    return [date_arr, unit_arr];
  },
  getMonth:function(num){
    var mouthNum = num || 1,
        nowDate = new Date(),
        ago = new Date(nowDate.setMonth(nowDate.getMonth() - mouthNum)),
        ago_format = this.set_format(ago),
        ind = this.new_date()[0].indexOf(ago_format),
        new_date_arr = this.new_date()[0].slice(ind),
        new_unit_arr = this.new_date()[1].slice(ind);
    // 制定X轴显示几个
    new_date_arr.map(function(n,i,t){
      var col = ~~(t.length / 4);
      if(i % col != 0){
        t[i] = '';
      }else{
        t[i] = n.substring(5);
      }
    });
    // 获取数据最大值和最小值
    var data_max = new_unit_arr[0];
    var data_min = new_unit_arr[0];
    for(var i = 1; i < new_unit_arr.length; i++){ 
      if(data_max < new_unit_arr[i]) data_max = new_unit_arr[i];
      if(data_min > new_unit_arr[i]) data_min = new_unit_arr[i];
    }
    var a = [new_date_arr, new_unit_arr, data_max, data_min];
    if(charts){
      charts.updateData({
        categories: a[0],
        series: [{
            data: a[1],
            color: '#fb5c5f'
        }],
        yAxis: {
            min: a[3],
            max: a[2]
        }
      });
      charts.stopAnimation();
    }else{
      charts = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: a[0],
        dataPointShape: false,  // 是否在图表中显示数据点图形标识
        dataLabel: false,       // 是否在图表中显示数据内容值
        series: [{
            data: a[1],
            color: '#fb5c5f'
        }],
        xAxis: {
          disableGrid: true     // 不绘制X轴网格
        },
        yAxis: {
            gridColor: '#f8f8f8',
            fontColor: '#999999',
            min: a[3],
            max: a[2]
        },
        legend: false,          // 是否显示图表下方各类别的标识
        width: 375,
        height: 220
      });
    }
  },
  getOne: function(e){
    this.getMonth(1);
    this.setData({
      btn: [{
        is_cur: true
      }, {
        is_cur: false
      }, {
        is_cur: false
      }]
    });
  },
  getThree: function(){
    this.getMonth(3);
    this.setData({
      btn: [{
        is_cur: false
      }, {
        is_cur: true
      }, {
        is_cur: false
      }]
    });
  },
  getTwelve: function(){
    this.getMonth(12);
    this.setData({
      btn: [{
        is_cur: false
      }, {
        is_cur: false
      }, {
        is_cur: true
      }]
    });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getMonth(1);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})