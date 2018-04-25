import Vue from 'vue'
import App from './App'
import router from './router'
import './config'
import axios from './services/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import vueMoment from 'vue-moment'
import './plugins/filter'

Vue.prototype.$http = axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(vueMoment) // moment的filter指令集
/* eslint-disable no-new */
new Vue({
  el: '#src',
  router,
  template: '<App/>',
  components: {App}
})
