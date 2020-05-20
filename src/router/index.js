/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-20 16:34:46
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import qs from 'qs'
import store from "@/store"
import http from '@/api'
import Index from '@/views/Index'
import Lesson from '@/views/Lesson'
import List from '@/views/List'
import Order from '@/views/Order'
import Login from '@/views/Login'
import Notice from '@/views/Notice'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children: [{ path: '/login/notice', component: Notice }],
    meta: {
      title: '网上老年大学招生'
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    redirect: '/index/lesson',

    children: [
      {
        path: 'lesson',
        name: 'Lesson',
        meta: { tab: 0 },
        component: Lesson
      },
      {
        path: 'list',
        name: 'List',
        meta: { tab: 1 },
        component: List
      },
      {
        path: 'order',
        name: 'Order',
        meta: { tab: 2 },
        component: Order
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjIwMDk1NSwibG9naW5UaW1lIjoiMTU4OTg3OTQ1OTIyMiIsInBob25lIjoiMTg0NTk0MDYxMTQiLCJ0eXBlIjoiMCIsImV4cCI6MTU4OTk2NTg1OX0.U_XgICcrs9P86QqJ40Lu_YWo1b66HmBCCX-NJs0HU5ttsxD9nwFV6vqLB-bUif_JM6xwjCELpYIpyt18ZrJvEA'
router.beforeEach((to,from,next)=>{

  if(to.name === 'Login'){
    const query = qs.parse(to.hash.split('?')[1]);
    if (query.token) { //将token&手机号存入store,直接登录
      // store.commit('setToken', query.token);
      store.commit('setToken', token);
      //是否需要去报名须知
      next({path: '/index',replace: true})
    }else{
      next();
    }
  }else{
    next()
  }
})

// const logined = store.state.isLogin

// router.beforeEach((to, from, next) => {
//   //beforeEach是router的钩子函数，在进入路由前执行
//   if (to.meta.title) {
//     //判断是否有标题
//     console.log(to.meta.title)
//     document.title = to.meta.title
//   }

//   if (to.name == 'Login') {
//     if (!logined) {
//       next()
//     } else {
//       router.replace('/index')
//     }
//   } else {
//     if (!logined) {
//       router.replace('/login')
//     } else {
//       next()
//     }
//   }
// })

export default router
