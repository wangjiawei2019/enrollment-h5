/*
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-18 11:30:39
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-20 16:10:11
 */ 
import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  mutations: {
    setToken(state,token){
      state.token = token;
      localStorage.setItem('token',token);
    }
  },
  actions: {},
  modules: {},
  plugins: [persistedState()]
})
