// pages/list/index.js
Page({
  data: {
    list: [
      {
        type: "01",
        label: "闲钱管理",
        title: "现金宝货币基金",
        rate: "3.238",
        feature: "安全性高  流动性高",
        icon: "../../assets/images/index_icon1.png",
        code: "",
        url: ''
      },
      {
        type: "02",
        label: "定期理财",
        title: "汇添富消费行业混合",
        rate: "3.238",
        feature: "明确资金计划，畅享更高收益",
        icon: "../../assets/images/index_icon2.png",
        code: "000083",
        url: '../details/fund'
      },
      {
        type: "02",
        label: "工资定投",
        title: "汇添富理财30天A",
        rate: "3.238",
        feature: "每月工资定投，“月”存越有钱",
        icon: "../../assets/images/index_icon3.png",
        code: "470030",
        url: '../details/fund1'
      }
    ],
    imgUrls: [
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        href: "index",
        type: 'navigate'
      },
      {
        url: '../../assets/images/001.png',
        href: "../details/coupons",
        type: 'navigate'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        href: "../fund/fund",
        type: 'switchTab'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        href: "../account/index",
        type: 'switchTab'
      }
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
