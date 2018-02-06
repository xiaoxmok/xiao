<template>
  <div class="form_panel">
    <el-form :model="addForm" ref="addOrder" label-width="140px">
      <el-form-item label="产品名称" prop="name">
        <el-select v-model="addForm.value1" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接团日期">
        <el-date-picker
          v-model="addForm.value4"
          align="right"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="接团时间">
        <el-time-picker
          v-model="addForm.value3"
          placeholder="任意时间点">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="接团地点">
        <el-col :span="12">
          <el-input v-model="addForm.value2" placeholder="请输入内容"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="游客姓名">
        <el-col :span="12">
          <el-input v-model="addForm.value2" placeholder="请输入内容"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="游客手机">
        <el-col :span="12">
          <el-input v-model="addForm.value2" placeholder="请输入内容"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="同行人数">
        <el-col :span="12">
          <el-input v-model="addForm.value2" placeholder="请输入内容"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="支付状态">
        <el-select v-model="addForm.value8" placeholder="请选择">
          <el-option
            v-for="item in payStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-select v-model="addForm.value7" placeholder="请选择">
          <el-option
            v-for="item in payWayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游客入园车牌号">
        <el-col :span="12">
          <el-input v-model="addForm.value2" placeholder="请输入内容"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {addForm} from '../../services/apis/apis'

  export default {
    data () {
      return {
        addForm: {
          value1: '',
          value2: '',
          value3: '',
          value4: '',
          value7: '',
          value8: ''
        },
        payStateOptions: [
          {
            label: '未支付', value: '0'
          },
          {
            label: '支付成功', value: '1'
          }
        ],
        // 讲解员线路订单支付方式选项
        payWayOptions: [
          {
            label: '支付宝', value: '10'
          },
          {
            label: '微信', value: '20'
          },
          {
            label: '线下支付', value: '30'
          }
        ],
        options: [
          {
            label: '线路1',
            value: '线路1'
          },
          {
            label: '线路2',
            value: '线路2'
          },
          {
            label: '线路3',
            value: '线路3'
          }
        ]
      }
    },
    computed: {
    },
    methods: {
      cancel () {
        this.$router.push('/orderManage')
      },
      save () {
        addForm(this.addForm).then(res => {
          if (res.status) {
            this.$message('添加成功')
            this.$router.push('/orderManage')
          }
        })
      }
    },
    async mounted () {
    }
  }
</script>

<style lang="stylus" scoped>

</style>
