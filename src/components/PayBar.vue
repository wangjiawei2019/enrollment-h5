<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-20 09:35:54
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-20 12:04:38
--> 
<template>
  <div class="pay-bar" :class="{'safe-area':!showCheck}">
    <van-checkbox
      class="all-check"
      v-if="showCheck"
      v-model="checked"
      checked-color="#f2323a"
      icon-size="1.38rem"
      @click="checkAll"
    >全选</van-checkbox>
    <div class="price-box">
      <span>合计：</span>
      <span>￥</span>
      <span>29.3</span>
    </div>
    <van-button type="danger" @click="pay">{{ buttonText }}</van-button>
  </div>
</template>

<script>
import { Button, Checkbox } from 'vant'

export default {
  props: ['showCheck', 'buttonText'],
  components: {
    'van-button': Button,
    'van-checkbox': Checkbox
  },
  data() {
    return {
      checked: true
    }
  },
  methods: {
    pay() {},
    checkAll() {
      this.$emit('checkAll', this.checked)
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