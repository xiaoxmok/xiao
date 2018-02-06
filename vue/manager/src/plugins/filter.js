import Vue from 'vue'

// 保留小数
Vue.filter('fixed', function (value, precision) {
  if (!precision) {
    precision = 2
  }
  if (!value && value !== 0) {
    return value
  }
  return value.toFixed(precision)
})
