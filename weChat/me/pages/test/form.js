// pages/test/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch:false,
    slider:0,
    input:"none",
    radio:"none",
    checkbox:"none",
    list:[
      {
        name:'radio1'
      },
      {
        name: 'radio2'
      },
    ]
  },
  formSubmit:function(e){
    this.setData({
      switch: e.detail.value.switch,
      slider: e.detail.value.slider,
      input: e.detail.value.input,
      radio: e.detail.value.radio1,
      checkbox: e.detail.value.checkbox
    })
    console.log("提交：" + e.detail.value.radio1);
  },
  formReset:function(e){
    console.log("重置");
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