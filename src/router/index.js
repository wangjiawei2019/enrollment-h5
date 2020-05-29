/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-29 16:41:23
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import qs from 'qs'
import http from '@/api'
import store from '@/store'
import Index from '@/views/Index'
import Lesson from '@/views/Lesson'
import List from '@/views/List'
import ConfirmOrder from '@/views/ConfirmOrder'
import OrderDetail from '@/views/OrderDetail'
import Order from '@/views/Order'
import Login from '@/views/Login'
import Notice from '@/views/Notice'
import Search from '@/views/Search'
import ApplyRule from '@/views/ApplyRule'
import Address from '@/views/Address'
import LessonDetail from '@/views/LessonDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children: [{ path: '/login/notice', component: Notice }]
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
        meta: { tab: 0, keepAlive: true},
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
    path: '/order-detail',
    name: 'OrderDetail',
    component: OrderDetail,
    props: true,
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      title: '班级搜索',
      keepAlive: true
    }
  },
  {
    path: '/lesson-detail',
    name: 'LessonDetail',
    component: LessonDetail
  },
  {
    path: '/apply-rule',
    name: 'ApplyRule',
    component: ApplyRule,
    meta: {
      title: '报名须知'
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: {
      title: '收货地址'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  //游客页面: 课程列表页，搜索页面，详情页
  var visitorPages = ['Lesson', 'Search', 'LessonDetail']
  if (to.meta.title) {
    //判断是否有标题
    document.title = to.meta.title
  } else {
    document.title = '网上老年大学招生'
  }
  if (to.name === 'Login') {
    const query = qs.parse(to.hash.split('?')[1])
    if (query.token) {
      //更新token,直接登录
      store.commit('setToken', query.token)
      //是否需要去报名须知
      http
        .getReadStatus()
        .then(res => {
          if (res.data) {
            next({ path: '/index', replace: true })
          } else {
            next({ path: '/apply-rule' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      if (store.state.token) {
        //有缓存，说明不需要去看招生简章了
        next({ path: '/index', replace: true })
      } else {
        next()
      }
    }
  } else {
    if (!store.state.token && visitorPages.indexOf(to.name) === -1) {
      //非游客页面 需要登录
      next({ path: '/login' })
    } else {
      //已登录
      next()
    }
  }
})

export default router
