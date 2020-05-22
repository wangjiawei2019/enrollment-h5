/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 17:03:31
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-22 11:50:23
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

// post 获取课程分类初始列表
function getMajorList() {
  return post('/major/api/course/getMajorList')
}
// post 根据专业id获取课程分类(右侧)
function getCourseList(params) {
  return post('/major/api/course/getCourseList', params)
}

//post 获取班级列表
function getClassList(params) {
  return post('/major/api/course/getClassList', params)
}

//post 获取班级详情
function getClassDetail(params){
  return post('/major/api/course/getClassDetail',params)
}

//post 搜索班级 {keyword:关键字,pageSize,pageNum},此处的页码从0开始,三个参数都必须要
function searchCourseClass(params) {
  return post('/es/elastic/searchCourseClass', params)
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

//post 立即报名，添加购物车
function applyCourse(params) {
  return post('/major/api/course/applyCourse', params)
}

export default {
  sendsms,
  login,
  getMajorList,
  getClassList,
  getClassDetail,
  searchCourseClass,
  getCartList,
  createOrder,
  getOrderList,
  getCourseList,
  applyCourse
}
