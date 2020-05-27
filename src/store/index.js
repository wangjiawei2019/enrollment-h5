/*
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-18 11:30:39
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-27 15:21:42
 */

import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    confirmOrder: { list: [], classIdList: [], totalMoney: 0 },
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
