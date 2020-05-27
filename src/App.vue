<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-27 15:58:03
--> 
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    const { terminal } = this.$route.query
    const userAgent = navigator.userAgent
    // 存储用户环境
    if (terminal === 'App') {
      this.$store.commit('setEnvironment', 'App-brower')
    } else if (userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
      this.$store.commit('setEnvironment', 'WEIXIN-brower')
    } else {
      this.$store.commit('setEnvironment', 'other-brower')
    }
    // 存储用户终端
    if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
      this.$store.commit('setUserAgent', 'Android')
    } else if (!!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      this.$store.commit('setUserAgent', 'IOS')
    } else {
      this.$store.commit('setUserAgent', 'brower')
    }
  }
}
</script> 

<style lang="scss">
#app {
  overflow: hidden;
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
  color: rgba(51, 51, 51, 1) !important;
  line-height: 1.66rem !important;
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
  .van-dialog__content {
    // height: 6.5rem !important;
    display: flex;
    justify-content: center;
    .van-dialog__message--has-title {
      padding-top: 0.94rem !important;
      // width: 15rem !important;
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
  height: 2.94rem;
  .van-tab__text {
    font-size: 1.31rem;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 1.84rem;
  }
  .van-tabs__line {
    border-radius: 0.09rem !important;
  }
}
.van-tabs--line {
  height: 100%;
  .van-tabs__content {
    height: 100%;
    .van-tab__pane {
      height: 100%;
    }
  }
}
//PullRefresh
.van-pull-refresh {
  min-height: 100% !important;
  height: 100%;
}
</style>