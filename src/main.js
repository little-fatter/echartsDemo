import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import '@/core/lazy_use' // 加载第三方VUE插件
import bootstrap from './core/bootstrap' // 应用启动服务
import '@/permission' // 入口路由权限控制
// import '@/core/icons'// 自定义图标
import '@/utils/directive'// 公共指令
import '@/utils/filter' // 公共管道
import '@/components/global.less'
import '@/assets/css/global.less' // 引用全局样式,覆盖默认样式
import PanelTitle from '@/components/Dashboard/PanelTitle'

import echarts from 'echarts'

Vue.component('PanelTitle', PanelTitle)

Vue.prototype.$chartRender = function (id, option) {
  const wrapper = document.getElementById(id)
  const chartObj = echarts.init(wrapper)
  chartObj.setOption(option)
  chartObj.resize()
  window.resize = function () {
    chartObj.resize()
  }
  return chartObj
}
Vue.prototype.findMaxValue = function (arr, keyOfValue) {
  let max = null
  let matrix = []
  if (arr instanceof Array) {
    matrix = arr.map((o) => {
      if (typeof o[keyOfValue] === 'number') {
        return o[keyOfValue]
      } else {
        // eslint-disable-next-line no-throw-literal
        throw o[keyOfValue] + ' is not a valid Number'
      }
    })
    matrix = matrix.sort((a, b) => {
      return a - b
    })
    max = matrix[matrix.length - 1]
  } else {
    // eslint-disable-next-line no-throw-literal
    throw 'The arr params of function findMaxValue is not an Array'
  }
  return max
}

Vue.prototype.findMinValue = function (arr, keyOfValue) {
  let min = null
  let matrix = []
  if (arr instanceof Array) {
    matrix = arr.map((o) => {
      if (typeof o[keyOfValue] === 'number') {
        return o[keyOfValue]
      } else {
        // eslint-disable-next-line no-throw-literal
        throw o[keyOfValue] + 'is not a valid Number'
      }
    })
    matrix = matrix.sort((a, b) => {
      return a - b
    })
    min = matrix[0]
  } else {
    // eslint-disable-next-line no-throw-literal
    throw 'The arr params of function findMinValue is not an Array'
  }
  return min
}

console.log('当前环境', process.env.VUE_APP_CURRENTENV)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
