// pages/details/coupons.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    tan:false,
    list:[
      {
        name:"radio1",
        title:'1. 您投资股票、基金、外汇、商品期货等金融资产有多少年的经验？',
        items:[
          {
            name:'a',
            value:'1年以内；'
          },
          {
            name: 'b',
            value: '1-2年；'
          },
          {
            name: 'c',
            value: '2-5年；'
          },
          {
            name: 'd',
            value: '5年以上'
          },
        ]
      },
      {
        name: "radio2",
        title: '2. 以下哪项最能说明您对投资理财知识掌握情况',
        items: [
          {
            name: 'a',
            value: '零基础，完全不懂；'
          },
          {
            name: 'b',
            value: '入门级，略懂投资理财知识；'
          },
          {
            name: 'c',
            value: '专业级，接受过专业金融机构组织的投资理财知识培训；'
          },
          {
            name: 'd',
            value: '很精通，取得相关金融资质或牌照'
          },
        ]
      },
      {
        name: "radio3",
        title: '3. 您最近三年的年均收入是多少？',
        items: [
          {
            name: 'a',
            value: '5万元以下；'
          },
          {
            name: 'b',
            value: '5万元至20万元；'
          },
          {
            name: 'c',
            value: '20万元至50万元；'
          },
          {
            name: 'd',
            value: '50万元以上'
          },
        ]
      },
      {
        name: "radio4",
        title: '4. 您用于金融投资的金额（储蓄存款除外）占家庭净资产的比重是？',
        items: [
          {
            name: 'a',
            value: '10%（含）以下；'
          },
          {
            name: 'b',
            value: '10%-30%（含）；'
          },
          {
            name: 'c',
            value: '30%-50%（含）；'
          },
          {
            name: 'd',
            value: '大于50%'
          },
        ]
      },
      {
        name: "radio5",
        title: '5. 以下哪项最能说明您的投资经验？',
        items: [
          {
            name: 'a',
            value: '除存款、国债外，我几乎不投资其他金融产品；'
          },
          {
            name: 'b',
            value: '大部分投资于存款、国债等，较少投资于股票、基金等风险产品；'
          },
          {
            name: 'c',
            value: '资产均衡地分布于存款、国债、银行理财产品、信托产品、股票、基金等；'
          },
          {
            name: 'd',
            value: '大部分投资于股票、基金、外汇等高风险产品，较少投资于存款、国债'
          },
        ]
      },
      {
        name: "radio6",
        title: '6. 根据您目前的家庭状况及未来发展，以下答案中哪个更加符合您家庭未来5 年的支出情况？',
        items: [
          {
            name: 'a',
            value: '预计支出将大幅增加，增速超过收入增速；'
          },
          {
            name: 'b',
            value: '预计支出将增加，但增速低于收入增速；'
          },
          {
            name: 'c',
            value: '预计支出将维持现状；'
          },
          {
            name: 'd',
            value: '预计支出将减少'
          },
        ]
      },
      {
        name: "radio7",
        title: '7. 您投资基金主要用于什么目的？',
        items: [
          {
            name: 'a',
            value: '养老；'
          },
          {
            name: 'b',
            value: '日常生活保障；'
          },
          {
            name: 'c',
            value: '子女教育；'
          },
          {
            name: 'd',
            value: '资产增值'
          },
        ]
      },
      {
        name: "radio8",
        title: '8. 以下哪项描述最符合您的投资态度？',
        items: [
          {
            name: 'a',
            value: '风险厌恶，不希望本金损失，希望获得稳定回报；'
          },
          {
            name: 'b',
            value: '保守投资，不希望本金损失，愿意承担一定幅度的收益波动；'
          },
          {
            name: 'c',
            value: '寻求资金的较高收益和成长性，愿意为此承担有限本金损失；'
          },
          {
            name: 'd',
            value: '希望赚取高回报，愿意为此承担较大本金损失'
          },
        ]
      },
      {
        name: "radio9",
        title: '9. 您的投资出现何种程度的波动时，您会呈现明显的焦虑？',
        items: [
          {
            name: 'a',
            value: '本金5%以内的损失；'
          },
          {
            name: 'b',
            value: '本金5%-15%的损失；'
          },
          {
            name: 'c',
            value: '本金15%-25%的损失；'
          },
          {
            name: 'd',
            value: '本金25%以上的损失'
          },
        ]
      },
      {
        name: "radio10",
        title: '10. 以下四个均为为期1年的投资项目中哪一个是您比较能接受的？',
        items: [
          {
            name: 'a',
            value: '预期收益4%，投资期间可能最大亏损1%；'
          },
          {
            name: 'b',
            value: '预期收益8%，投资期间可能最大亏损4.5%；'
          },
          {
            name: 'c',
            value: '预期收益16%，投资期间可能最大亏损12.5%；'
          },
          {
            name: 'd',
            value: '预期收益24%，投资期间可能最大亏损20%'
          },
        ]
      },
      {
        name: "radio11",
        title: '11. 您的可投资资产规模？',
        items: [
          {
            name: 'a',
            value: '100万以下'
          },
          {
            name: 'b',
            value: '100-500万'
          },
          {
            name: 'c',
            value: '500-1000万'
          },
          {
            name: 'd',
            value: '1000万以上'
          },
        ]
      },
      {
        name: "radio12",
        title: '12. 您对什么形式的活动比较感兴趣？',
        items: [
          {
            name: 'a',
            value: '投资理财类'
          },
          {
            name: 'b',
            value: '健康养生'
          },
          {
            name: 'c',
            value: '子女教育亲子活动'
          },
          {
            name: 'd',
            value: '艺术品鉴赏'
          },
          {
            name: 'e',
            value: '旅游探索'
          },
          {
            name: 'f',
            value: '体育运动类'
          },
        ]
      },
      {
        name: "radio13",
        title: '13. 您的职业？',
        items: [
          {
            name: 'a',
            value: '政府'
          },
          {
            name: 'b',
            value: '国企'
          },
          {
            name: 'c',
            value: '金融行业'
          },
          {
            name: 'd',
            value: '企业主'
          },
          {
            name: 'e',
            value: '互联网行业'
          },
          {
            name: 'f',
            value: '其他'
          },
        ]
      },
    ]
  },
  formSubmit:function(e){
    
    if (e.detail.value.radio13 == ''){
      this.setData({
        tan:true
      })
      setTimeout(function () {
        this.setData({
          tan: false
        })
      }.bind(this), 2000)
    }else{
      this.setData({
        loading: true
      })
      setTimeout(function () {
        this.setData({
          loading: false
        })
        wx.navigateTo({
          url: './coupons1'
        })
      }.bind(this), 2000)
     
    }

  },

  /**
   * 生命周期函数--监听页面加载
   * if (e.detail.value.radio==''){
      
    }
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