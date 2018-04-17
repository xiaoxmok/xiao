Page({
    data:{
        list:[
            {
                id:'xiong',
                name:"小熊",
                open:false,
                pages:[{
                    dw:"钻石I",
                    ch:"宫本武臧 江西第一",
                    mw:"最佳队友"
                }]
            },
            {
                id:'bin',
                name:"斌斌",
                open:false,
                pages:[{
                    dw:"铂金I",
                    ch:"江湖的传说",
                    mw:"专业带线"
                }]
            },
            {
                id:'guan',
                name:"管子",
                open:false,
                pages:[{
                    dw:"铂金V",
                    ch:"张良 于都第一",
                    mw:"专业铺助"
                }]
            },
            {
                id:'gua',
                name:"西瓜",
                open:false,
                pages:[{
                    dw:"铂金IV",
                    ch:"红包专业户",
                    mw:"专业一挑五"
                }]
            },
            {
                id:'mei',
                name:"妹子",
                open:false,
                pages:[{
                    dw:"黄金I",
                    ch:"新起之秀",
                    mw:"重点保护对象"
                }]
            },
            {
                id:'mei2',
                name:"大彬",
                open:false,
                pages:[{
                    dw:"黄金I",
                    ch:"新起之秀",
                    mw:"重点保护对象"
                }]
            }
        ]
    },
    kindToggle:function(e){
        var id=e.currentTarget.id,list=this.data.list;
        for(var i=0;i<list.length;i++){
            if(list[i].id==id){
                list[i].open=!list[i].open;
            }else{
                list[i].open=false;
            }
        }
        this.setData({
            list:list
        })
    },
    onShareAppMessage: function () {
      // 用户点击右上角分享
      return {
        title: 'KUE战队', // 分享标题
        desc: '王者不可阻档，快乐生活，快乐学习。', // 分享描述
        path: 'pages/index/index' // 分享路径
      }
    }
})