/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 17:03:31
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-21 16:54:03
 */
import { get, post } from '@/utils/request'

//get 发送短信验证码 { phone }
function sendsms(params) {
  return get('/auth/sendsms', params)
}

//get 验证码登录 params:{phone,code}
//TODO: 发布前要改成登录的连接
function login(params) {
  return get('/auth/loginTest', params)
}

// post 获取课程分类
function getMajorList() {
  return post('/major/api/course/getMajorList')
}

//post 获取班级列表
function getClassList(params) {
  return post('/major/api/course/getClassList', params)
}

/**
 * @description: 获取购物车列表
 */
function getCartList() {
  return post('/major/api/course/getCartList')
}
/**
 * @description: 创建订单
 * @param {classIdList}
 */
function createOrder(param) {
  return post('/major/api/course/createOrder', param)
}

/**
 * @description: 获取我的订单
 * @param {status}
 */
function getOrderList(param) {
  return post('/major/api/course/getOrderList', param)
}

export default {
  sendsms,
  login,
  getMajorList,
  getClassList,
  getCartList,
  createOrder,
  getOrderList
}
