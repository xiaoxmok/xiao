//index.js
//获取应用实例
var app = getApp()
Page({
  logout() {
    wx.redirectTo({
      url: '../login/index',
    })
  }
})
