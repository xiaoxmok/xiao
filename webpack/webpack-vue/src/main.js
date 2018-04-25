import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import en from './local/en-US'
import zh from './local/zh-CN'

Vue.use(VueI18n)

const messages = {
    en:  Object.assign({ message: 'hello' }, en),
    zh: Object.assign({ message: '你好' }, zh)
};

const i18n = new VueI18n({
    locale: 'zh',  // set locale
    messages  // set locale messages
});

import './assets/style/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App),
    i18n,
    /*function(h){
        return h(src);
    }*/
}).$mount(root)