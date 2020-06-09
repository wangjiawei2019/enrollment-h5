/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-06-08 10:04:25
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
import wx from 'jweixin-module'
import 'reset-css'
import { Toast, Lazyload } from 'vant'

Vue.use(Toast)
Vue.use(Lazyload, { loading: require('@/assets/site.png'), error: require('@/assets/site.png') })
Toast.setDefaultOptions({ className: 'bm-toast', getContainer: '#app' }) // 修改默认配置

Vue.prototype.$wx = wx;
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
