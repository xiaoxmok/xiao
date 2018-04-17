Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
        name:'小熊',
        ind:0,
        info:{
          dw:"至尊星耀IV",
          reslut:{
            all:3104,
            wins:1568,
            winPer:"50.5%"
          },
          mvp:1273,
          god:307,
          fiveK:2,
          fourK:78,
          threeK:542,
          doubleK:17,
          weekS:117,
          fristB:453,
          helpK:39,
          kill:31,
          fvf:{
            all: 2131,
            wins: 1121,
            winPer: "52.6%"
          },
          tvt:{
            all: 35,
            wins: 18,
            winPer: "51.4%"
          },
          ovo:{
            all: 230,
            wins: 110,
            winPer: "47.8%"
          },
          fun:{
            all: 96,
            wins: 49,
            winPer: "51%"
          }
        },
        list:[
          {
            name: '宫本武藏',
            col1_name: '荣耀战力',
            col1_val: '2780',
            col1_per: '江西前十',
            col2_name: '场次',
            col2_per: '837',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '54.6%',
            is_recom: true
          },{
            name: '墨子',
            col1_name: '荣耀战力',
            col1_val: '1813',
            col1_per: '带动全场',
            col2_name: '场次',
            col2_per: '285',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '57.9%',
            is_new: false
          }, {
            name: '干将莫邪',
            col1_name: '荣耀战力',
            col1_val: '-',
            col1_per: '-',
            col2_name: '场次',
            col2_per: '-',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '-',
            is_new: true
          }, {
            name: '千年老妖',
            col1_name: '荣耀战力',
            col1_val: '-',
            col1_per: '-',
            col2_name: '场次',
            col2_per: '-',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '-',
            is_new: true
          }
        ],
        selected:true
      }, {
        name: '斌斌',
        ind: 1,
        list: [
          {
            name: '赵云',
            col1_name: '荣耀战力',
            col1_val: '2416',
            col1_per: '专职带线',
            col2_name: '场次',
            col2_per: '484',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '51.0%',
            is_recom: true
          }, {
            name: '韩信',
            col1_name: '荣耀战力',
            col1_val: '1369',
            col1_per: '专职带线',
            col2_name: '场次',
            col2_per: '410',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '50.0%',
            is_recom: false
          }, {
            name: '干将莫邪',
            col1_name: '荣耀战力',
            col1_val: '-',
            col1_per: '-',
            col2_name: '场次',
            col2_per: '-',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '-',
            is_new: true
          },
        ]
      }, {
        name: '管子',
        ind: 2,
        list: [
          {
            name: '宫本武藏',
            col1_name: '荣耀战力',
            col1_val: '2780',
            col1_per: '江西前十',
            col2_name: '场次',
            col2_per: '837',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '54.6%',
            is_recom: true
          }, {
            name: '宫本武藏',
            col1_name: '荣耀战力',
            col1_val: '2780',
            col1_per: '江西前十',
            col2_name: '场次',
            col2_per: '837',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '54.6%',
            is_recom: true
          }
        ]
      }, {
        name: '西瓜',
        ind: 3,
        list: [
          {
            name: '杨戬',
            col1_name: '荣耀战力',
            col1_val: '2483',
            col1_per: '专业一挑五',
            col2_name: '场次',
            col2_per: '296',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '53.4%',
            is_recom: true
          }, {
            name: '安琪拉',
            col1_name: '荣耀战力',
            col1_val: '1220',
            col1_per: 'MVP',
            col2_name: '场次',
            col2_per: '61',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '55.7%',
            is_recom: true
          }
        ]
      }, {
        name: '妹子',
        ind: 4,
        list: [
          {
            name: '安琪拉',
            col1_name: '荣耀战力',
            col1_val: '1073',
            col1_per: 'MVP',
            col2_name: '场次',
            col2_per: '177',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '48.0%',
            is_recom: true
          }, {
            name: '鲁班七号',
            col1_name: '荣耀战力',
            col1_val: '86',
            col1_per: '神队友',
            col2_name: '场次',
            col2_per: '36',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '55.6%',
            is_recom: true
          }
        ]
      }, {
        name: '大彬',
        ind: 5,
        list: [
          {
            name: '亚瑟',
            col1_name: '荣耀战力',
            col1_val: '337',
            col1_per: '神队友',
            col2_name: '场次',
            col2_per: '42',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '52.4%',
            is_recom: true
          }, {
            name: '鲁班七号',
            col1_name: '荣耀战力',
            col1_val: '40',
            col1_per: '神队友',
            col2_name: '场次',
            col2_per: '36',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '55.6%',
            is_recom: true
          }
        ]
      }, {
        name: '虾米',
        ind: 6,
        list: [
          {
            name: '后裔',
            col1_name: '荣耀战力',
            col1_val: '2653',
            col1_per: '猥琐发育',
            col2_name: '场次',
            col2_per: '1837',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '55.6%',
            is_recom: true
          }, {
            name: '白起',
            col1_name: '荣耀战力',
            col1_val: '1701',
            col1_per: '坦克',
            col2_name: '场次',
            col2_per: '79',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '44.3%',
            is_recom: false
          }, {
            name: '兰陵王',
            col1_name: '荣耀战力',
            col1_val: '816',
            col1_per: '后起之秀',
            col2_name: '场次',
            col2_per: '38',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '50.0%',
            is_new: true
          }
        ]
      }, {
        name: '大彬',
        ind: 7,
        list: [
          {
            name: '亚瑟',
            col1_name: '荣耀战力',
            col1_val: '337',
            col1_per: '神队友',
            col2_name: '场次',
            col2_per: '42',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '52.4%',
            is_recom: true
          }, {
            name: '鲁班七号',
            col1_name: '荣耀战力',
            col1_val: '40',
            col1_per: '神队友',
            col2_name: '场次',
            col2_per: '36',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '55.6%',
            is_recom: true
          }
        ]
      }, {
        name: '大彬',
        ind: 8,
        list: [
          {
            name: '亚瑟',
            col1_name: '荣耀战力',
            col1_val: '337',
            col1_per: '神队友',
            col2_name: '场次',
            col2_per: '42',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '52.4%',
            is_recom: true
          }, {
            name: '鲁班七号',
            col1_name: '荣耀战力',
            col1_val: '40',
            col1_per: '神队友',
            col2_name: '场次',
            col2_per: '36',
            col3_name: '胜率',
            col3_per_old: '',
            col3_per_new: '55.6%',
            is_recom: true
          }
        ]
      }
    ]
  },
  taptab:function(e){
    var id = e.currentTarget.id.split('tab')[1];
    for (var i = 0; i < this.data.tab.length; i++) {
      this.data.tab[i].selected = false;
    }
    this.data.tab[id].selected = true;
    this.setData({
      tab: this.data.tab
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    setTimeout(function () {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading(); //完成停止加载
    }, 1000);
  }
})