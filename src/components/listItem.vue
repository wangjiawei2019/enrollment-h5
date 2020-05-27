<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-19 16:44:12
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-27 15:56:57
--> 
<template>
  <div class="list-item">
    <div class="top-box">
      <div class="img-wapper">
        <img :src="item.image || require('@/assets/site.png')" alt="课程缩略图" class="lesson-img" />
        <div :class="status"></div>
      </div>
      <div class="desc-box" :class="{checked:checked}">
        <div class="title van-ellipsis" v-html="item.name"></div>
        <div class="subtitle van-ellipsis" v-html="item.subtitle"></div>
        <div class="desc-footer">
          <div class="price" :class="{red: checked || lesson}">
            <span>￥</span>
            <span>{{ item.money }}</span>
          </div>
          <slot name="lesson"></slot>
        </div>
      </div>
    </div>
    <slot name="button"></slot>
  </div>
</template>

<script>
export default {
  props: ['checked', 'lesson', 'item'],
  computed: {
    status() {
      if (this.item.status === 3 || this.item.status === 4) {
        return 'refund'
      } else if (this.item.status === 5 || this.item.status === 6) {
        return 'cancel'
      } else {
        return false
      }
    }
  }
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
    .refund,
    .cancel {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);

      background-repeat: no-repeat;
      background-size: 3.33rem 3.33rem;
      background-position: 100% 100%;
    }
    .refund {
      background-image: url('~@/assets/images/order/yituikuan.png');
    }
    .cancel {
      background-image: url('~@/assets/images/order/yiquxiao.png');
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
    .desc-footer {
      @include flex(space-between, center, row, nowrap);
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
  }
  .checked {
    width: 10.5rem;
  }
}
</style>