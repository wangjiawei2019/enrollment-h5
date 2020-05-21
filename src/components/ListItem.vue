<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-19 16:44:12
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-21 09:38:18
--> 
<template>
  <div class="list-item">
    <div class="top-box">
      <div class="img-wapper">
        <img :src="item.image || '@/assets/site.png'" alt="课程缩略图" class="lesson-img" />
        <div class="mask"></div>
      </div>
      <div class="desc-box" :class="{checked:checked}">
        <div class="title van-ellipsis">{{ item.name }}</div>
        <div class="subtitle van-ellipsis">{{ item.subtitle }}</div>
        <div class="price" :class="{red: checked}">
          <span>￥</span>
          <span>{{ item.money }}</span>
        </div>
      </div>
    </div>
    <slot name="button"></slot>
  </div>
</template>

<script>
export default {
  props: ['checked', 'item']
}
</script>

<style lang="scss" scpoed>
.list-item {
  width: 100%;
  @include flex(flex-start, flex-start, column, nowrap);
}
.top-box {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.94rem 0;
  box-sizing: border-box;
  .img-wapper {
    width: 100%;
    flex: 0 0 8.13rem;
    position: relative;
    height: 5rem;
    margin-right: 0.94rem;
    border-radius: 0.3125rem;
    overflow: hidden;
    .lesson-img {
      width: 100%;
      height: 100%;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      background-image: url('~@/assets/images/order/yiquxiao.png');
      background-repeat: no-repeat;
      background-size: 3.33rem 3.33rem;
      background-position: 100% 100%;
    }
  }
  .desc-box {
    flex: 1;
    width: 12.5rem;
    overflow: hidden;
    @include flex(center, flex-start, column, nowrap);
    .title {
      width: 100%;
      line-height: 1.64rem;
      @include font(PingFang SC, 1.17rem, rgba(51, 51, 51, 1), 400);
    }
    .subtitle {
      width: 100%;
      margin-top: 0.06rem;
      line-height: 1.56rem;
      @include font(PingFang SC, 0.94rem, rgba(102, 102, 102, 1), 400);
    }
    .price {
      margin-top: 0.25em;
      @include flex(flex-start, flex-end, row, nowrap);
      & span:nth-child(1) {
        line-height: 1.17rem;
        @include font(PingFang SC, 0.83rem, rgba(51, 51, 51, 1), 500);
      }
      & span:nth-child(2) {
        line-height: 1.47rem;
        @include font(PingFang SC, 1.06rem, rgba(51, 51, 51, 1), 500);
      }
    }
    .red {
      span {
        color: #f2323a !important;
      }
    }
  }
  .checked {
    width: 10.5rem;
  }
}
</style>