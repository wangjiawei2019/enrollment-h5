/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-22 14:54:11
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import qs from 'qs'
import store from '@/store'
import Index from '@/views/Index'
import Lesson from '@/views/Lesson'
import List from '@/views/List'
import ConfirmOrder from '@/views/ConfirmOrder'
import Order from '@/views/Order'
import Login from '@/views/Login'
import Notice from '@/views/Notice'
import Search from '@/views/Search'
import ApplyRule from '@/views/ApplyRule'
import LessonDetail from '@/views/LessonDetail'
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
  },
  {
    path: '/confirm-order',
    name: 'ConfirmOrder',
    component: ConfirmOrder,
    meta: {
      title: '确认订单'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta:{
      title: '班级搜索'
    }
  },
  {
    path: '/lesson-detail',
    name: 'LessonDetail',
    component: LessonDetail,
    meta:{
      title: '班级详情'
    }
  },
  {
    path: '/apply-rule',
    name: 'ApplyRule',
    component: ApplyRule,
    meta:{
      title: '报名须知'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    //判断是否有标题
    console.log(to.meta.title)
    document.title = to.meta.title
  }
  if (to.name === 'Login') {
    const query = qs.parse(to.hash.split('?')[1])
    if (query.token) {
      //更新token,直接登录
      store.commit('setToken', query.token)
      // store.commit('setToken', token);
      //是否需要去报名须知
      next({ path: '/index', replace: true })
    } else {
      if (store.state.token) {
        //是否去报名须知
        //true-->去报名须知
        //false-->去首页
        next({ path: '/index', replace: true })
      } else {
        next()
      }
    }
  } else {
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
