/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 17:03:31
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-10 10:18:08
 */
import { get, post } from '@/utils/request'

//post 获取用户信息
function getUserInfo() {
  return post('/major/api/user/getUser')
}

//post 是否需要阅读招生简章
function getReadStatus() {
  return post('/activity/api/course/getReadStatus')
}

//getTimSign
function getTimSign() {
  return post('/message/user/getTimSign')
}

//post 获取招生简章内容
function getRecruitIntro() {
  return post('/activity/api/course/getRecruitIntro')
}

//post 设置阅读招生简章
function setReadNote() {
  return post('/activity/api/course/setReadNote')
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
  return post('/activity/api/course/getMajorList')
}

// post 根据专业id获取课程分类(右侧)
function getCourseList(params) {
  return post('/activity/api/course/getCourseList', params)
}

//post 获取班级列表
function getClassList(params) {
  return post('/activity/api/course/getClassList', params)
}

//post 获取班级详情 (未登录)
function getClassDetail(params) {
  return post('/activity/api/course/getClassDetail', params)
}

//post 获取班级详情 (已登录)
function getClassDetailInner(params) {
  return post('/activity/api/course/getClassDetailInner', params)
}

//post 搜索班级 {keyword:关键字,pageSize,pageNum},此处的页码从0开始,三个参数都必须要
function searchCourseClass(params) {
  return post('/es/elastic/searchCourseClass', params)
}

/**
 * @description: 获取购物车列表
 */
function getCartList() {
  return post('/activity/api/course/getCartList')
}

/**
 * @description: 删除购物车列表
 * @param {cartId}
 */
function cancelApplyCourse(param) {
  return post('/activity/api/course/cancelApplyCourse', param)
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
  return post('/activity/api/course/getOrderList', param)
}

/**
 * @description: 取消订单
 * @param {id}
 */
function cancelOrder(param) {
  return post('/activity/api/course/cancelOrder', param)
}

/**
 * @description: 删除订单
 * @param {id}
 */
function deleteOrder(param) {
  return post('/activity/api/course/deleteOrder', param)
}

/**
 * @description: 获取订单详情
 * @param {id}
 */
function getOrderDetail(param) {
  return post('/activity/api/course/getOrderDetail', param)
}

/**
 * @description: 新增收货地址
 * @param {id,username,mobile,provinceId,cityId,areaId,addressPrefix,address}
 */
function setGoodsAddress(param) {
  return post('/major/api/user/setGoodsAddress', param)
}

/**
 * @description: 修改收货地址
 * @param {id,username,mobile,provinceId,cityId,areaId,addressPrefix,address}
 */
function updateGoodsAddress(param) {
  return post('/major/api/user/updateGoodsAddress', param)
}

/**
 * @description: 获取 openid
 * @param {code}
 */
function getOpenID(param) {
  return post('/weixin-mp/wx/redirect/greet', param)
}

/**
 * @description: 获取排行榜名单
 * @param {pageSize, pageNum}
 */

function getShareRank(param) {
  return post('/activity/api/course/shareRank', param)
}

//post 使用JSSDK url:当前路径
function getJsapiTicket(param) {
  return post('/weixin-mp/wx/jsapi/getJsapiTicket', param)
}

//post 立即报名，添加购物车
function applyCourse(params) {
  return post('/activity/api/course/applyCourse', params)
}

//post 个人排行(邀请)信息 orderId: 订单ID
function userRankInfo(params) {
  return post('/activity/api/course/userRankInfo', params)
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
  setGoodsAddress,
  updateGoodsAddress,
  getOpenID,
  getShareRank,
  getJsapiTicket,
  userRankInfo
}
