import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 去掉浏览器警告(Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners)
import 'default-passive-events'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang' // Internationalization

import '@/styles/index.scss'  // 全局样式
import '@/icons'
import '@/permission'
// 页面导出pdf
import htmlToPdf from '@/utils/htmlToPdf'
Vue.use(htmlToPdf)

Vue.config.productionTip = false

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
