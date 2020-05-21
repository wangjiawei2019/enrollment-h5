/*
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-18 11:30:39
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-21 11:32:01
 */

import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    confirmOrder: { list: [], classIdList: [], totalMoney: 0 }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setConfirmOrderList(state, info) {
      state.confirmOrder = info
    }
  },
  actions: {},
  modules: {},
  plugins: [persistedState()]
})
