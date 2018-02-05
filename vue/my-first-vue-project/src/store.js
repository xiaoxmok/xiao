/**
 * Created by xiaoxm on 2018/2/4.
 */
const STORAGE_KEY = 'todos-vuejs'
export default {
  // localStorage 长久保存
  fetch: function () {
    // return window.localStorage.getItem(STORAGE_KEY) ? JSON.parse(window.localStorage.getItem(STORAGE_KEY)):[]
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function (items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },

  // sessionStorage 短期保存，页面关闭后失效
  sessionFetch: function () {
    // return window.localStorage.getItem(STORAGE_KEY) ? JSON.parse(window.localStorage.getItem(STORAGE_KEY)):[]
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '[]')
  },
  sessionSave: function (items) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}
