/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-04-29 16:44:41
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-25 16:15:52
 */
// 生产环境打包
// const jxglHttpBaseUrl = process.env.NODE_ENV === 'development' ? 'https://jxglxttest.jinlingkeji.cn/api/v8' : 'https://jxgl.jinlingkeji.cn/api/v8'
// const jxglDomainBaseUrl = process.env.NODE_ENV === 'development' ? 'https://appjxglh5-dev.jinlingkeji.cn' : 'https://jxglh5.jinlingkeji.cn'

// 开发环境打包
const httpBaseUrl = process.env.NODE_ENV === 'development' ? 'https://gateway.jinlingkeji.cn' : 'https://gateway.jinlingkeji.cn'
const domainBaseUrl = process.env.NODE_ENV === 'development' ? 'https://enrollmenth5dev.jinlingkeji.cn/' : 'https://enrollmenth5dev.jinlingkeji.cn/'

export { httpBaseUrl, domainBaseUrl }
