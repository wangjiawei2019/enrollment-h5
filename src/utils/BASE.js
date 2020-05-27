/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-04-29 16:44:41
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-27 16:10:57
 */

const httpBase = {
  development: 'https://gateway.jinlingkeji.cn',
  production: 'https://jlkjapp.jinlingkeji.cn/',
  test: 'https://gatewaytest.jinlingkeji.cn'
}
const domainBase = {
  development: 'https://enrollmenth5dev.jinlingkeji.cn',
  production: 'https://enrollmenth5pro.jinlingkeji.cn',
  test: 'https://enrollmenth5test.jinlingkeji.cn'
}
const APPID = {
  development: 'wx82110e9ea8978e79',
  production: 'wx82110e9ea8978e79',
  test: 'wx82110e9ea8978e79'
}

const httpBaseUrl = httpBase[process.env.NODE_ENV]
const domainBaseUrl = domainBase[process.env.NODE_ENV]
const JSAPIAPPID = APPID[process.env.NODE_ENV]

export { httpBaseUrl, domainBaseUrl, JSAPIAPPID }
