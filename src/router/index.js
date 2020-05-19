/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-19 10:17:04
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Lesson from '@/views/Lesson'
import List from '@/views/List'
import Order from '@/views/Order'
import Login from '@/views/Login'

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
        component: Lesson
      },
      {
        path: 'list',
        name: 'List',
        component: List
      },
      {
        path: 'order',
        name: 'Order',
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
