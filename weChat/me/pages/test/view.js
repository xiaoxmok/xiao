
var order=['red','yellow','blue','green','red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'red',
    scrollTop:0,
    scrollLeft:0
  },
  upper:function(e){
    console.log("upper：顶部");
  },
  lower:function(e){
    console.log("lower：底部");
  },
  scroll:function(e){
    console.log("scroll：滚动");
  },
  scrollL:function(e){
    this.setData({
      scrollLeft: this.data.scrollLeft + 10
    })
  },
   /**
    *按块滚动
    */
  tap:function(e){
    for(var i=0;i<order.length;i++){
      if(order[i] === this.data.toView){
        this.setData({
          toView:order[i+1]
        })
        console.log(this.data.toView);
        break;
      }
    }
  },
   /**
    *按块滚动
    */
  tapMove:function(e){
    this.setData({
      scrollTop:this.data.scrollTop + 10
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.scrollTop)
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  }
})