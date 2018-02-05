import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import todoList from '@/components/todoList'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/todolist/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/todoList',
      name: 'todoList',
      component: todoList
    }
  ],
  linkActiveClass: 'linkActiveClass',
  linkExactActiveClass: 'linkExactActiveClass'
})
