<template>
  <section>
    <!--筛选条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filter">
        <el-form-item label="订单日期">
          <el-date-picker
            v-model="filter.begindate"
            type="date"
            placeholder="开始日期"
            format="yyyy-MM-dd">
          </el-date-picker>
          <span> - </span>
          <el-date-picker
            v-model="filter.enddate"
            type="date"
            placeholder="结束日期"
            format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="讲解员姓名">
          <el-input v-model="filter.expostorname" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="投诉情况">
          <el-select v-model="filter.complainstatus" placeholder="请选择">
            <el-option
              v-for="item in complainOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线路名称">
          <el-input v-model="filter.linename" placeholder="线路名称"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="filter.orderstatus" placeholder="请选择">
            <el-option
              v-for="item in orderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--工具条-->
    <el-col :span="24" class="controls">
      <el-button type="primary" @click="goDetail">查看</el-button>
      <el-button type="primary" @click="addOrder">新增订单</el-button>
      <el-button type="primary">导出excel表</el-button>
    </el-col>
    <!--列表-->
    <el-table
      :data="orderList"
      border
      size="small"
      header-cell-class-name="my_table_header"
      cell-class-name="my_table_cell"
      highlight-current-row
      style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="dbgndate" label="日期"></el-table-column>
      <el-table-column prop="corderno" label="订单号"></el-table-column>
      <el-table-column prop="clinename" label="线路名称"></el-table-column>
      <el-table-column prop="cwapusername" label="讲解员姓名"></el-table-column>
      <el-table-column prop="iqty" label="游客人数"></el-table-column>
      <el-table-column prop="corderstatus" label="订单状态"></el-table-column>
      <!--todo 时长-->
      <el-table-column prop="istandardduration" label="订单时长(h)"></el-table-column>
      <el-table-column prop="istandardduration" label="服务时长"></el-table-column>
      <el-table-column prop="namount" label="订单金额"></el-table-column>
      <el-table-column prop="csource" label="订单来源"></el-table-column>
      <el-table-column prop="ccomplainflag" label="投诉情况"></el-table-column>
    </el-table>
  </section>
</template>

<script>
  import {getOrderList} from '../../services/apis/apis'

  export default {
    data () {
      return {
        // 筛选表单
        filter: {
          begindate: '',
          enddate: '',
          expostorname: '',
          complainstatus: '',
          orderstatus: '',
          linename: ''
        },
        // 投诉情况选项
        complainOptions: [
          {
            label: '待处理', value: '10'
          }, {
            label: '已处理', value: '30'
          }, {
            label: '已取消', value: '40'
          }, {
            label: '无', value: '0'
          }
        ],
        // 订单情况选项
        orderOptions: [
          {
            label: '待处理', value: '20'
          }, {
            label: '待讲解', value: '30'
          }, {
            label: '讲解中', value: '31'
          }, {
            label: '待评价', value: '32'
          }, {
            label: '已完成', value: '40'
          }, {
            label: '已取消', value: '90'
          }
        ],
        // 列表
        orderList: []
      }
    },
    computed: {
    },
    methods: {
      search () {
        getOrderList(this.filter).then(res => {
          this.orderList = res
          console.log(this.orderList)
        })
      },
      goDetail () {
        // 查看详情
        this.$router.push('/orderDetail')
      },
      addOrder () {
        // 新增订单
        this.$router.push('/addOrder')
      },
      exportExcel () {
        // 导出excel
        console.log('exportExcel')
      }
    },
    async mounted () {
    }
  }
</script>

<style lang="stylus" scoped>
</style>
