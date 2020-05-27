/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-04-29 16:44:41
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-27 10:05:32
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
const httpBaseUrl = httpBase[process.env.NODE_ENV]
const domainBaseUrl = domainBase[process.env.NODE_ENV]

export { httpBaseUrl, domainBaseUrl }
