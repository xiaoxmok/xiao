import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import VueI18n from 'vue-i18n'
import en from './local/en-US'
import zh from './local/zh-CN'

Vue.use(VueI18n)

const messages = {
  en: Object.assign({ message: 'hello' }, en),
  zh: Object.assign({ message: '你好' }, zh)
};
//console.log(messages.EN1)
const i18n = new VueI18n({
  locale: 'zh',  // set locale
  messages  // set locale messages
});

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

// console.log('test')

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
  el: '#src',
  i18n: i18n,
  router,
  store,
  render: h => h(App)
})
