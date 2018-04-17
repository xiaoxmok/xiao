// pages/details/coupons6.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: false,
    animationData: {},
    list: [
      {
        name: '货币类100%',
        text1: [
          { value: '汇添富现金宝' }
        ],
        text2: []
      },
    ]
  },
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.rotate(360).step()

    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      this.setData({
        img: true
      })
    }.bind(this), 1000)
  }
})