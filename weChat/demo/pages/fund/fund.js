Page({
  data: {
    list: [
      {
        type: "01",
        title: "业绩优良",
        description: "汇添富在亚洲资产管理中荣获2016年中国“最佳债券基金管理人”",
        icon: "../../assets/images/fund_icon1.png",
      },
      {
        type: "01",
        title: "精打细算",
        description: "线上平台直接购买，可享受更多费率折扣",
        icon: "../../assets/images/fund_icon2.png",
      },
      {
        type: "01",
        title: "了若指掌",
        description: "长期致力于二级市场投资，以专业闻名业内",
        icon: "../../assets/images/fund_icon3.png",
      },
    ],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
