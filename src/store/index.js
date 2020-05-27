/*
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-18 11:30:39
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-26 18:31:46
 */

import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    confirmOrder: { list: [], classIdList: [], totalMoney: 0 },
    terminal: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setConfirmOrderList(state, info) {
      state.confirmOrder = info
    },
    setTerminal(state, terminal){
      state.terminal = terminal
    }
  },
  actions: {},
  modules: {},
  plugins: [persistedState()]
})
