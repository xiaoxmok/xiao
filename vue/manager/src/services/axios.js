import axios from 'axios'
import envConfig from '@/config'
import storage from '@/plugins/storage'
import {Loading, Message} from 'element-ui'
import router from '../router'

axios.defaults.baseURL = envConfig.baseURL
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

let loadingInstance
let tokenKeyName = envConfig.tokenKeyName

axios.interceptors.request.use((config) => {
  if (storage.get(tokenKeyName)) {
    config.headers.token = storage.get(tokenKeyName)
  }
  loadingInstance = Loading.service({fullscreen: true})
  return config
}, (error) => {
  loadingInstance.close()
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  loadingInstance.close()
  if (res.data.errorcode === 'E11001') {
    router.push({
      path: '/login'
    })
  }
  if (res.data.status === true || !res.data.hasOwnProperty('status')) {
    return res.data
  } else {
    // 错误提示
    Message({
      message: res.data.msg,
      type: 'error',
      center: true
    })
    return new Promise(() => {
    })
  }
}, function (error) {
  loadingInstance.close()
  return Promise.reject(error)
})
export default axios
