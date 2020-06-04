/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 17:03:31
 * @LastEditors: zxk
 * @LastEditTime: 2020-06-04 15:29:43
 */
import { get, post } from '@/utils/request'
import store from '@/store'
const environment = store.state.environment

//post 获取用户信息
function getUserInfo(){
  return post('/major/api/user/getUser')
}

//post 是否需要阅读招生简章
function getReadStatus() {
  return post('/major/api/course/getReadStatus')
}

//getTimSign
function getTimSign() {
  return post('/message/user/getTimSign')
}

//post 获取招生简章内容
function getRecruitIntro() {
  return post('/major/api/course/getRecruitIntro')
}

//post 设置阅读招生简章
function setReadNote() {
  return post('/major/api/course/setReadNote')
}

//get 发送短信验证码 { phone }
function sendsms(params) {
  return get('/auth/sendsms', params)
}

//get 验证码登录 params:{phone,code}
//TODO: 发布前要改成登录的连接
function login(params) {
  return get('/auth/login', params)
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

//post 获取班级详情 (未登录)
function getClassDetail(params) {
  return post('/major/api/course/getClassDetail', params)
}

//post 获取班级详情 (已登录)
function getClassDetailInner(params) {
  return post('/major/api/course/getClassDetailInner', params)
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
 * @description: 删除购物车列表
 * @param {cartId}
 */
function cancelApplyCourse(param) {
  return post('/major/api/course/cancelApplyCourse', param)
}

/**
 * @description: 创建订单
 * @param {classIdList,tradeType}
 */
function createOrder(url, param) {
  return post(url, param)
}

/**
 * @description: 获取我的订单
 * @param {status}
 */
function getOrderList(param) {
  return post('/major/api/course/getOrderList', param)
}

/**
 * @description: 取消订单
 * @param {id}
 */
function cancelOrder(param) {
  return post('/major/api/course/cancelOrder', param)
}

/**
 * @description: 删除订单
 * @param {id}
 */
function deleteOrder(param) {
  return post('/major/api/course/deleteOrder', param)
}

/**
 * @description: 获取订单详情
 * @param {id}
 */
function getOrderDetail(param) {
  return post('/major/api/course/getOrderDetail', param)
}

/**
 * @description: 提交收货地址
 * @param {orderId,userName,mobile,address}
 */
function setOrderAddress(param) {
  return post('/major/api/course/setOrderAddress', param)
}

/**
 * @description: 获取 openid
 * @param {code}
 */
function getOpenID(param) {
  return post('/weixin-mp/wx/redirect/greet', param)
}

//post 立即报名，添加购物车
function applyCourse(params) {
  return post('/major/api/course/applyCourse', params)
}

export default {
  getUserInfo,
  getReadStatus,
  getTimSign,
  getRecruitIntro,
  setReadNote,
  sendsms,
  login,
  getMajorList,
  getClassList,
  getClassDetail,
  getClassDetailInner,
  searchCourseClass,
  getCartList,
  cancelApplyCourse,
  createOrder,
  getOrderList,
  getCourseList,
  applyCourse,
  cancelOrder,
  deleteOrder,
  getOrderDetail,
  setOrderAddress,
  getOpenID
}
