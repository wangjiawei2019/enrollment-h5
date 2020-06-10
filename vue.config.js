/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-19 11:08:32
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-10 10:13:14
 */

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  productionSourceMap: !IS_PROD,
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    const cdn = {
      js: [
        // 可以写成动态版本号
        '//cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
        '//cdn.bootcss.com/vue-router/3.1.6/vue-router.min.js',
        '//cdn.bootcss.com/vuex/3.1.3/vuex.min.js',
        '//cdn.bootcss.com/axios/0.19.2/axios.min.js'
      ]
    }
    if (IS_PROD) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
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
  },
  configureWebpack: config => {
    if (IS_PROD) {
      config['externals'] = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios'
      }
      // config['plugins'].push(new BundleAnalyzerPlugin())
    }
  },
  publicPath: IS_PROD ? 'https://lndxappcdn.jinlingkeji.cn/h5_activity/fronted/' : './', // 默认'/'，部署应用包时的基本 URL
  lintOnSave: false
}
