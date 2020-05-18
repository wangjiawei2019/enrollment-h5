/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-18 11:19:17
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Index from '../views/Index'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'login' },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children:[
      { path: '/', redirect: '/index/home' },
      { path: '/index/home', component: Home}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
