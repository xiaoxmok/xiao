import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 修改mutations时输出的日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// vuex解决路由之间参数传递的问题

// 线下调试
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] :[]
})

