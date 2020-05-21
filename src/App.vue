<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-21 16:12:39
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

//PullRefresh
.van-pull-refresh{
  height: 100%;
}
</style>
