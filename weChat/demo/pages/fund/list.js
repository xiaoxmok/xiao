// pages/fund/list.js
Page({
  data:{
    tab: [
      {
        name: '全部基金',
        ind: 0,
        list: [
          {
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%',
            is_recom: true
          },{
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%',
            is_new: true
          },{
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%',
          },{
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%',
          }
        ],
        selected: true
      },
      {
        name: '股票型',
        ind: 1,
        list: [
          {
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          },{
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          }
        ]
      },{
        name: '混合型',
        ind: 2,
        list: [
          {
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          },{
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          }
        ]
      },{
        name: '债券型',
        ind: 3,
        list: [
          {
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          },{
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          }
        ]
      },{
        name: '货币型',
        ind: 4,
        list: [
          {
            name: '大欣基金（2734494）',
            col1_name: '每万份收益',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '7日年化收益率',
            col2_per: '7.50%',
            col3_name: '认/申购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          },{
            name: '大欣基金（2734494）',
            col1_name: '每万份收益',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '7日年化收益率',
            col2_per: '7.50%',
            col3_name: '认/申购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          }
        ]
      },{
        name: '理财型',
        ind: 5,
        list: [
          {
            name: '大欣基金（2734494）',
            col1_name: '每万份收益',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '最新运作期收益率',
            col2_per: '7.50%',
            col3_name: '认/申购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          },{
            name: '大欣基金（2734494）',
            col1_name: '每万份收益',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '最新运作期收益率',
            col2_per: '7.50%',
            col3_name: '认/申购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          }
        ]
      },{
        name: '其他基金',
        ind: 6,
        list: [
          {
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          },{
            name: '大欣基金（2734494）',
            col1_name: '最新净值',
            col1_val: '1.000',
            col1_per: '23.00%',
            col2_name: '近3个月收益',
            col2_per: '7.50%',
            col3_name: '认购费率',
            col3_per_old: '1.5%',
            col3_per_new: '0.15%'
          }
        ]
      }
    ]
  },
  taptab: function(e){
    var id = e.currentTarget.id.split('tab')[1];
    for(var i = 0; i < this.data.tab.length; i++){
      this.data.tab[i].selected = false;
    }
    this.data.tab[id].selected = true;
    this.setData({
      tab: this.data.tab
    });
  },
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    setTimeout(function(){
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading(); //完成停止加载
    },1000);
  },
  onShareAppMessage: function () {
    return {
      title: '汇添富',
      path: '/pages/fund/list',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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