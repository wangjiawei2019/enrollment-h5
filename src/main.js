/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-29 17:52:08
 */

/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-18 11:20:12
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import { Toast, Lazyload } from 'vant'

Vue.use(Toast)
Vue.use(Lazyload, { loading: require('@/assets/site.png'), error: require('@/assets/site.png') })
Toast.setDefaultOptions({ className: 'bm-toast', getContainer: '#app' }) // 修改默认配置

Vue.config.productionTip = false

/* 手机查看console */
if (process.env.NODE_ENV !== 'production') {
  var VConsole = require('vconsole/dist/vconsole.min.js')
  new VConsole()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
