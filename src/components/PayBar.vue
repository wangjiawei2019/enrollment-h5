<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-20 09:35:54
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-21 11:42:05
--> 
<template>
  <div class="pay-bar" :class="{'safe-area':safeArea}">
    <slot name="check-slot"></slot>
    <slot name="total"></slot>
    <div class="price-box" v-if="buttonMethod !== 'delete'">
      <span>合计：</span>
      <span>￥</span>
      <span>{{ totalMoney }}</span>
    </div>
    <van-button
      type="danger"
      :disabled="buttonMethod === 'delete' && !result.length"
      @click="handleClick(buttonMethod)"
    >{{ buttonText }}</van-button>
  </div>
</template>

<script>
import { Button, Checkbox } from 'vant'
import http from '@/api'

export default {
  props: {
    safeArea: {
      // 固定定位底部 bottom 是否等于 0
      type: Boolean,
      default: false
    },
    result: {
      // 选中的数组，用来改变删除按钮的禁用与否
      type: Array,
      default: []
    },
    buttonText: {
      // 按钮文本
      type: String,
      default: '去支付'
    },
    totalMoney: {
      // 总金额
      type: Number,
      default: 0
    }
  },
  components: {
    'van-button': Button,
    'van-checkbox': Checkbox
  },
  data() {
    return {}
  },
  methods: {
    handleClick(method) {
      this[method]()
    },
    goPay() {
      this.$emit('goPay')
    },
    delete() {},
    submitOrder() {
      this.$emit('submitOrder', this.result)
    }
  },
  computed: {
    buttonMethod() {
      const obj = { 去支付: 'goPay', 删除: 'delete', 提交订单: 'submitOrder' }
      return obj[this.buttonText]
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-bar {
  position: fixed;
  width: 100%;
  height: 3.89rem;
  padding: 0 0.83rem;
  bottom: 3.63rem;
  bottom: calc(3.63rem + constant(safe-area-inset-bottom));
  bottom: calc(3.63rem + env(safe-area-inset-bottom));
  box-sizing: border-box;
  border-top: 0.03rem solid rgba(233, 233, 233, 1);
  background-color: #fff;
  @include flex(flex-start, center, row, nowrap);
  .price-box {
    flex: 1;
    margin-right: 0.94rem;
    @include flex(flex-end, center, row, nowrap);
    & span:nth-child(1) {
      line-height: 1.88rem;
      @include font(PingFang SC, 0.94rem, rgba(51, 51, 51, 1), 400);
    }
    & span:nth-child(2) {
      line-height: 1.31rem;
      @include font(PingFang SC, 0.94rem, #f2323a, 500);
    }
    & span:nth-child(3) {
      line-height: 1.84rem;
      @include font(PingFang SC, 1.31rem, #f2323a, 500);
    }
  }
}
.safe-area {
  bottom: 0;
  height: 3.89rem;
  height: calc(3.89rem + constant(safe-area-inset-bottom));
  height: calc(3.89rem + env(safe-area-inset-bottom));
}
</style>