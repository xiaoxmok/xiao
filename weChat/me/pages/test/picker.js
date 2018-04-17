// pages/test/picker.js
const date=new Date();
const days=[]
const months=[]
const years=[]

for(let i=1900;i<=date.getFullYear();i++){
  years.push(i);
}
for(let i=1;i<=12;i++){
  months.push(i);
}
for(let i=1;i<=31;i++){
  days.push(i);
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['深圳','北京','上海','重庆','成都','广州'],
    index:0,
    time:'12:01',
    date:'2017-05-20',
    year:date.getFullYear(),
    day: date.getDate(),
    month:date.getMonth()+1,
    years:years,
    days:days,
    months:months,
    value:[9999,1,1]
  },
  bindPickerChange:function(e){
    this.setData({
      index:e.detail.value
    })
  },
  bindTimeChnage:function(e){
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
    console.log(e.detail.value);
  },
  bindChange:function(e){
    var val=e.detail.value
    this.setData({
      year:this.data.years[val[0]],
      month:this.data.months[val[1]],
      day:this.data.days[val[2]]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})