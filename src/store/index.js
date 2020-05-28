/*
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-18 11:30:39
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-28 14:10:44
 */

import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    confirmOrder: { list: [], classIdList: [], totalMoney: 0 },
    code: '', // JSAPI 支付的 code
    openId: '', // JSAPI 支付的 openID
    environment: '', // 用户环境 'WEIXIN-brower' 'App-brower' 'other-brower' 微信浏览器或者App或其他浏览器
    userAgent: '' // 用户机型 'Android' 'IOS' 'brower'
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setConfirmOrderList(state, info) {
      state.confirmOrder = info
    },
    setCode(state, code) {
      state.code = code
    },
    setOpenID(state, openId) {
      state.openId = openId
    },
    setEnvironment(state, environment) {
      state.environment = environment
    },
    setUserAgent(state, userAgent) {
      state.userAgent = userAgent
    }
  },
  actions: {},
  modules: {},
  plugins: [persistedState()]
})
