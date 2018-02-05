import Vue from 'vue'
import App from './App.vue'

import './assets/style/test.css'
import './assets/img/bg.jpg'
import './assets/style/style.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render:(h)=>h(App)
}).$mount(root)