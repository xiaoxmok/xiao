import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 解决移动端点击 300毫秒的问题
fastclick.attach(document.body);

// 懒加载
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

import 'common/stylus/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
