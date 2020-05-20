<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-20 16:08:01
--> 
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
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
</style>
