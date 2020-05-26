/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-26 16:51:46
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

Vue.config.productionTip = false

/* 手机查看console */
var VConsole = require("vconsole/dist/vconsole.min.js");
new VConsole();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
