<template>
  <div class="cards">
    <!--产品基本信息-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品基本信息</span>
      </div>
      <div>
        <el-form label-position="left" inline class="my_panel trisect_panel">
          <el-form-item label="产品名称">
            <span>{{ orderDetailData.clinename }}</span>
          </el-form-item>
          <el-form-item label="讲解时长">
            <span>{{ orderDetailData.istandardduration }}</span>
          </el-form-item>
          <el-form-item label="订单编号">
            <span>{{ orderDetailData.corderno }}</span>
          </el-form-item>
          <el-form-item label="讲解员姓名">
            <span>{{ orderDetailData.cwapusername }}</span>
          </el-form-item>
          <el-form-item label="开始讲解时间">
            <span>{{ orderDetailData.dbgndate }}</span>
          </el-form-item>
          <el-form-item label="讲解结束时间">
            <span>{{ orderDetailData.denddate }}</span>
          </el-form-item>
          <el-form-item label="接团时间">
            <span>{{ orderDetailData.dcreate }}</span>
          </el-form-item>
          <el-form-item label="接团地点">
            <span>{{ orderDetailData.cplace }}</span>
          </el-form-item>
          <el-form-item label="讲解费">
            <span>{{ orderDetailData.namount }}</span>
          </el-form-item>
          <el-form-item label="游客姓名">
            <span>{{ orderDetailData.ccontactname }}</span>
          </el-form-item>
          <el-form-item label="游客手机">
            <span>{{ orderDetailData.ccontactmobile }}</span>
          </el-form-item>
          <el-form-item label="同游人数">
            <span>{{ orderDetailData.iqty }}</span>
          </el-form-item>
          <el-form-item label="订单状态">
            <span>{{ orderDetailData.corderstatus }}</span>
          </el-form-item>
          <!--todo lack field-->
          <el-form-item label="游客入景区车牌号">
            <span>{{ orderDetailData.dcreate }}</span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!--订单支付信息-->
    <el-card class="box-card mt30">
      <div slot="header" class="clearfix">
        <span>订单支付信息</span>
      </div>
      <div>
        <el-form label-position="left" inline class="my_panel trisect_panel">
          <el-form-item label="商户订单号">
            <span>{{ orderDetailData.payinfo.couttradeno }}</span>
          </el-form-item>
          <el-form-item label="订单主题">
            <span>{{ orderDetailData.payinfo.ctradesubject }}</span>
          </el-form-item>
          <el-form-item label="订单金额">
            <span>{{ orderDetailData.payinfo.ntotalamount }}</span>
          </el-form-item>
          <el-form-item label="交易类型">
            <span>{{ orderDetailData.payinfo.ctradetype }}</span>
          </el-form-item>
          <el-form-item label="支付状态">
            <span>{{ orderDetailData.payinfo.cpaystatus }}</span>
          </el-form-item>
          <el-form-item label="支付时间">
            <span>{{ orderDetailData.payinfo.ctrade }}</span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-button class="mt30" type="primary" @click="returnBack">返回</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 订单详情
        orderDetailData: {
          uuid: '213g213yu21y3y',
          corderno: 'T001002002001',
          clinename: '线路1',
          cwapusername: '赵钱孙李',
          iqty: '20',
          dbgndate: '2017-12-01',
          denddate: '2017-12-02',
          istandardduration: 2,
          drealbgndate: '2017-12-01',
          drealenddate: '2017-12-01',
          namount: '400',
          csource: '线上预定',
          ccomplainflag: 0,
          corderstatus: '40',
          ccomplainstatus: '30',
          cpaytype: '10',
          cpaystatus: '1',
          dcreate: '2017-12-03',
          cplace: '上海',
          ccontactname: '王尼玛',
          ccontactmobile: '18118232221',
          tracklist: [{
            longitude: '104.056669',
            latitude: '30.671548',
            detailplace: '宽窄巷子',
            createtime: '2017-12-27 11:12:00'
          }],
          payinfo: {
            couttradeno: '商户订单号',
            ctradeno: '交易号',
            ctradetype: '交易类型',
            ctradesubject: '交易主题',
            ctrade: '交易时间',
            cpaystatus: '支付状态',
            ntotalamount: '支付金额'
          }
        }
      }
    },
    computed: {
    },
    methods: {
      returnBack () {
        this.$router.push('/orderManage')
      }
    },
    async mounted () {
    }
  }
</script>

<style lang="stylus" scoped>

</style>
