import Vue from 'vue'
import Router from 'vue-router'

const header = r => require.ensure([], () => r(require('@/components/common/header/header.vue')), 'index')
// login
const login = r => require.ensure([], () => r(require('@/components/common/login/login.vue')), 'index')
// 404
const notFound = r => require.ensure([], () => r(require('@/components/common/index/404.vue')), 'index')
// nav-订单管理
const orderManage = r => require.ensure([], () => r(require('@/components/orderManage/orderManage.vue')), 'orderManage')
const addOrder = r => require.ensure([], () => r(require('@/components/orderManage/addOrder.vue')), 'orderManage')
const orderDetail = r => require.ensure([], () => r(require('@/components/orderManage/orderDetail.vue')), 'orderManage')

const test = r => require.ensure([], () => r(require('@/components/orderManage/test.vue')), 'index')

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden: true
    },
    {
      path: '/',
      name: '订单管理',
      component: header,
      iconCls: 'iconfont icon-dingdan', // 图标样式class
      children: [
        {path: '/orderManage', component: orderManage, name: '订单列表'},
        {path: '/addOrder', component: addOrder, name: '新增订单'},
        {path: '/orderDetail', component: orderDetail, name: '订单详情'}
      ]
    },
    {
      path: '/',
      name: '',
      component: header,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-dingdan', // 图标样式class
      children: [
        {path: '/nav2', component: orderManage, name: '导航二'}
      ]
    },
    {
      path: '/',
      name: '',
      component: header,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-dingdan', // 图标样式class
      children: [
        {path: '/nav3', component: test, name: '导航三'}
      ]
    },
    {
      path: '*',
      name: '404',
      component: notFound,
      hidden: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('from:', from.fullPath, ',to: ', to.fullPath)
  next()
})

export default router
