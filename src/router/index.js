/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-18 18:11:56
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Index from '../views/Index'
import Login from '../views/Login'
import Notice from '../views/Notice'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'login' },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children:[
      { path: "/login/notice", component: Notice}
    ]
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
