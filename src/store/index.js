/*
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-18 11:30:39
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-29 14:25:34
 */

import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mobile: null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    confirmOrder: { list: [], classIdList: [], totalMoney: 0 },
    courseClassAddress: null, // 收货地址
    code: '', // JSAPI 支付的 code
    openId: '', // JSAPI 支付的 openID
    environment: '', // 用户环境 'WEIXIN-brower' 'App-brower' 'other-brower' 微信浏览器或者App或其他浏览器
    userAgent: '' // 用户机型 'Android' 'IOS' 'brower'
  },
  mutations: {
    setMobile(state, mobile) {
      state.mobile = mobile
    },
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
    },
    setCourseClassAddress(state, info) {
      state.courseClassAddress = info
    }
  },
  actions: {},
  modules: {},
  plugins: [persistedState()]
})
