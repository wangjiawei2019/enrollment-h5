<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-19 16:44:12
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-11 21:15:19
--> 
<template>
  <div class="list-item" @click="toDetail">
    <div class="img-wapper">
      <img class="lesson-img" alt="课程缩略图" v-lazy="item.image || require('@/assets/site.png')" />
      <div :class="status"></div>
    </div>
    <div class="desc-box" :class="{checked:checked}">
      <div class="title van-ellipsis" :class="{'full-title': full}" v-html="item.name"></div>
      <div class="subtitle van-ellipsis" :class="{'full-subtitle': full}" v-html="item.subtitle"></div>
      <div class="desc-footer">
        <div class="price" v-if="!full" :class="{red: checked || lesson}">
          <span>￥</span>
          <span>{{ item.money }}</span>
        </div>
        <slot name="lesson"></slot>
        <slot name="delete"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['checked', 'full', 'lesson', 'item'],
  computed: {
    status() {
      if (this.full) return 'full'
      if (this.item.status === 3 || this.item.status === 4) {
        return 'refund'
      } else if (this.item.status === 5 || this.item.status === 6) {
        return 'cancel'
      } else {
        return false
      }
    }
  },
  methods: {
    toDetail() {
      if (this.lesson) {
        //首页和搜索页可以进入详情
        this.$emit('toDetail', this.item.id)
      }
    }
  }
}
</script>

<style lang="scss" scpoed>
.list-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.94rem 0;
  box-sizing: border-box;
  position: relative;
}

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
  .cancel,
  .full {
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
  .full {
    background-image: url('~@/assets/images/order/yimanyuan.png');
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
    @include font(PingFang SC, 1.3125rem, rgba(51, 51, 51, 1), 400);
  }
  .subtitle {
    width: 100%;
    margin-top: 0.06rem;
    line-height: 1.56rem;
    @include font(PingFang SC, 0.94rem, rgba(102, 102, 102, 1), 400);
  }
  .full-title,
  .full-subtitle {
    color: #999;
  }
  .desc-footer {
    width: 100%;
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
        @include font(PingFang SC, 1.1875rem, rgba(51, 51, 51, 1), 500);
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