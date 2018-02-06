<template>
  <div class="login_container">
    <div class="form">
      <el-form ref="form" :model="form" label-width="0px">
        <el-row>
          <el-col :span="24" class="login_title">
            用户登录
          </el-col>
        </el-row>
        <el-form-item>
          <el-input v-model="form.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="start">
            <el-checkbox v-model="rememberPsd">记住密码</el-checkbox>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="submit" class="fullBtn" round>主要按钮</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import storage from '../../../plugins/storage'
  import {Base64} from 'js-base64'
  import config from '../../../config/index'
  import {login} from '../../../services/apis/apis'

  export default {
    data () {
      return {
        rememberPsd: false, // 记住密码
        form: {
          account: '',
          password: ''
        }
      }
    },
    methods: {
      submit () {
        if (this.rememberPsd) {
          storage.set('LG_INFO', Base64.encode(JSON.stringify(this.form)))
        } else {
          storage.remove('LG_INFO')
        }
        login(this.form).then(res => {
          // 将token 存到本地缓存
          if (res.data.token) {
            storage.set(config.tokenKeyName, res.data.token)
          }
          // 将要跳转到的页面
          this.$router.push('/orderManage')
        })
      }
    },
    async mounted () {
      let form = storage.get('LG_INFO')
      if (form) {
        this.form = JSON.parse(Base64.decode(form))
        this.rememberPsd = true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .login_container
    min-height 100vh
    overflow: hidden
    box-sizing border-box
    // background: url("../../images/bg2.jpg") center center / cover no-repeat fixed;

  .login_title
    text-align: center
    margin: 0 0 25px;
    font-size: 25px;
    font-weight: 400;
    text-align: center;
    color: #323a45;

  .form
    position: absolute
    left: 50%
    top: 50%
    transform translate(-50%, -50%)
    width: 400px
    padding: 30px 40px 40px;
    border-radius: 10px;
    background-color: #fff;
</style>
