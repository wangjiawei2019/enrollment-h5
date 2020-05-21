/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 17:03:31
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-21 15:02:14
 */
import { get, post } from '@/utils/request'

//get 发送短信验证码 { phone }
function sendsms(params){
  return get('/auth/sendsms',params)
}

//get 验证码登录 params:{phone,code}
//TODO: 发布前要改成登录的连接
function login(params){
  return get('/auth/loginTest',params)
}

// post 获取课程分类初始列表
function getMajorList(){
  return post('/major/api/course/getMajorList');
}
// post 根据专业id获取课程分类(右侧)
function getCourseList(params){
  return post('/major/api/course/getCourseList',params);
}

//post 获取班级列表
function getClassList(params){
  return post('/major/api/course/getClassList',params);
}

//post 立即报名，添加购物车
function applyCourse(params){
  return post('/major/api/course/applyCourse',params)
}

export default {
  sendsms,
  login,
  getMajorList,
  getCourseList,
  getClassList,
  applyCourse
}
