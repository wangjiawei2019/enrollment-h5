<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-13 10:03:42
--> 
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import { JSAPIAPPID, domainBaseUrl } from '@/utils/BASE'
import http from '@/api'
import store from '@/store'

export default {
  created() {
    // let url = encodeURIComponent(window.location.href.split("#")[0]);
    this.getJsConfig(window.location.href.split('#')[0])
  },
  mounted() {
    if (process.env.NODE_ENV === 'production' && !store.state.productionLocationOrigin) {
      // 生产环境截取 location
      store.commit('setProductionLocationOrigin', window.location.origin)
    }

    if (store.state.environment === 'WEIXIN-brower') {
      if (!store.state.code || !store.state.openId) {
        store.state.code && store.commit('setCode', '')
        this.getCode() // 获取 JSAPI 支付所需 code
      }
    }

    //android禁止微信浏览器调整字体大小
    //TODO: 可能会在刚刚进去的时候大字体，1秒之后变回来
    if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
      this.handleFontSize()
    } else {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', this.handleFontSize, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', this.handleFontSize)
        document.attachEvent('onWeixinJSBridgeReady', this.handleFontSize)
      }
    }
  },
  methods: {
    getJsConfig(url) {
      let params = { url }
      http
        .getJsapiTicket(params)
        .then(res => {
          this.$wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名
            jsApiList: [
              'updateAppMessageShareData', //分享给朋友
              'updateTimelineShareData' //分享给朋友圈
            ] // 必填，需要使用的JS接口列表
          })
        })
        .catch(err => {})
    },
    handleFontSize() {
      // 设置网页字体为默认大小
      WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
      // 重写设置网页字体大小的事件
      WeixinJSBridge.on('menu:setfont', function() {
        WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
      })
    },
    getCode() {
      const searchParams = new URLSearchParams(window.location.search)
      const urlCode = searchParams.get('code')
      if (!store.state.code && !urlCode) {
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${JSAPIAPPID}&redirect_uri=${encodeURIComponent(
          `${domainBaseUrl || store.state.productionLocationOrigin}/#/`
        )}&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirect`
        window.location.replace(url)
      } else if (!store.state.code && urlCode) {
        store.commit('setCode', urlCode)
        this.getOpenID(urlCode)
      }
    },
    getOpenID(code) {
      http
        .getOpenID({ code })
        .then(res => {
          store.commit('setOpenID', res.data)
          this.$router.replace('/')
        })
        .catch(err => {
          store.commit('setCode', '') // 清空 code
          this.$router.replace('/')
          this.getCode()
        })
    }
  }
}
</script>

<style lang="scss">
#app {
  overflow: hidden;
}

.bm-toast {
  width: fit-content !important;
  padding: 1.25rem 1.56rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  opacity: 0.8;
  font-size: 1.31rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 1.84rem;
}

// tabbar
.van-tabbar {
  height: 3.63rem !important;
  .van-tabbar-item {
    flex-direction: row;
    font-size: 1.25rem;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 1.75rem;
    .van-tabbar-item__icon {
      margin-bottom: 0;
      margin-right: 0.38rem;
    }
  }
  .van-tabbar-item:nth-child(1) {
    .van-tabbar-item__icon {
      & > img {
        width: 1.44rem;
        height: 1.19rem;
      }
    }
  }
  .van-tabbar-item:nth-child(2) {
    .van-tabbar-item__icon {
      & > img {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
  .van-tabbar-item:nth-child(3) {
    .van-tabbar-item__icon {
      & > img {
        width: 1.06rem;
        height: 1.25rem;
      }
    }
  }
  &::after {
    top: 0 !important;
    bottom: 0 !important;
    transform: none !important;
    border-width: 0.03rem 0 !important;
    border-color: rgba(233, 233, 233, 1) !important;
  }
}

.van-hairline--bottom::after {
  top: 0 !important;
  bottom: 0 !important;
  border-width: 0 0 0.03rem 0 !important;
  transform: none !important;
  border-color: rgba(233, 233, 233, 1) !important;
}

// Empty
.van-empty {
  .van-empty__image {
    width: 14.75rem;
    height: 8.875rem;
  }
  .van-empty__description {
    margin-top: 0.3125rem;
    line-height: 1.6875rem;
    font-size: 1.1875rem;
    font-family: PingFang SC;
    color: rgba(153, 153, 153, 1);
    font-weight: 400;
  }
}

// checkbox van-checkbox__label
.van-checkbox__label {
  width: 100% !important;
  margin-left: 0.63rem !important;
}
.all-check {
  .van-checkbox__label {
    margin-left: 0.94rem !important;
    font-size: 0.94rem !important;
    font-family: PingFang SC;
    font-weight: 400 !important;
    color: rgba(51, 51, 51, 1) !important;
    line-height: 1.88rem !important;
  }
}

// button
.van-button--danger {
  width: 5.33rem !important;
  height: 2.22rem !important;
  background-color: #f2323a !important;
  border-color: #f2323a !important;
  border-radius: 0.28rem !important;
  padding: 0 !important;
  font-size: 1.06rem !important;
  font-family: PingFang SC !important;
  font-weight: 400 !important;
  line-height: 1.47rem !important;
}
.van-button--info {
  height: 3.44rem !important;
  background-color: #f2323a !important;
  border-color: #f2323a !important;
  .van-button__text {
    font-size: 1.31rem !important;
    font-family: PingFang SC !important;
    font-weight: 400 !important;
    color: rgba(255, 255, 255, 1) !important;
  }
}
.van-button--plain {
  width: 6rem !important;
  height: 2.56rem !important;
  padding: 0 !important;
  border-radius: 0.31rem !important;
  font-size: 1.19rem !important;
  font-family: PingFang SC !important;
  font-weight: 400 !important;
  color: #666 !important;
  line-height: 1.66rem !important;
  border-color: #666 !important;
}
.van-button--disabled {
  opacity: 1 !important;
  background-color: #cccccc !important;
  border-color: #cccccc !important;
}

// dialog
.van-dialog {
  border-radius: 0.5rem !important;
  .van-dialog__header {
    padding: 0 !important;
    margin-top: 1.56rem !important;
    font-size: 1.44rem !important;
    font-family: PingFang SC !important;
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
    line-height: 1.75rem !important;
  }
  .van-dialog__header--isolated {
    margin-bottom: 1.56rem !important;
  }
  .van-dialog__content {
    display: flex;
    justify-content: center;
    .van-dialog__message--has-title {
      padding-top: 0.94rem !important;
      font-size: 1.31rem !important;
      font-family: PingFang SC !important;
      font-weight: 400 !important;
      color: rgba(102, 102, 102, 1) !important;
      line-height: 2rem !important;
    }
  }
  .van-dialog__footer--buttons {
    height: 3.91rem !important;
    .van-dialog__cancel,
    .van-dialog__confirm {
      height: 100% !important;
      font-size: 1.31rem !important;
      font-family: PingFang SC !important;
      font-weight: 400 !important;
      line-height: 3.91rem;
    }
  }
}

// tabs
.van-tabs__wrap {
  height: 2.94rem !important;
  .van-tab {
    padding-top: 0.64rem !important;
    align-items: flex-start !important;
    .van-tab__text {
      font-size: 1.31rem !important;
      font-family: PingFang SC !important;
      font-weight: 500 !important;
      line-height: 1.84rem !important;
    }
  }
  .van-tabs__line {
    border-radius: 0.09rem !important;
  }
}
.van-tabs--line {
  height: 100%;
  .van-tabs__content {
    .van-tab__pane {
      height: 100%;
    }
  }
}

//PullRefresh
.van-pull-refresh {
  min-height: calc(100vh - 6.57rem) !important;
  height: 100%;
}

// van-area
.van-area {
  // height: 16.25rem !important;
  border-radius: 0.94rem !important;
  .van-picker__toolbar {
    height: 3.72rem !important;
    border-bottom: 0.03rem solid #e9e9e9;
    .van-picker__cancel,
    .van-picker__confirm {
      padding: 0 1.25rem !important;
      font-size: 1.31rem !important;
      font-family: PingFang SC !important;
      font-weight: 400 !important;
      color: rgba(51, 51, 51, 1) !important;
      line-height: 1.84rem !important;
    }
    .van-picker__confirm {
      color: #f2323a !important;
    }
  }
  .van-picker-column__item {
    font-size: 1.31rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 1.84rem;
  }
}
</style>