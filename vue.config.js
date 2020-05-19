/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-19 11:08:32
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-19 11:08:54
 */
module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 要公用的scss的路径
          resources: './src/assets/css/common.scss'
        })
        .end()
    })
  }
}
