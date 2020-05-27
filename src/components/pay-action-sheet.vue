<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-26 16:10:11
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-26 17:24:15
--> 
<template>
  <van-action-sheet
    v-model="show"
    :round="false"
    :close-on-click-overlay="false"
    :close-on-popstate="false"
  >
    <div class="action-sheet-box">
      <div class="cancel" @click="handleCancel"></div>
      <div class="total-title">总金额</div>
      <div class="total-money">
        <span>￥</span>
        <span>{{ totalMoney }}</span>
      </div>
      <div class="content time">
        <div class="left">支付剩余时间</div>
        <div class="right">{{ remainTime }}</div>
      </div>
      <div class="content method">
        <div class="left">支付方式</div>
        <div class="right">微信支付</div>
      </div>
      <van-button class="pay-button" type="info" round @click="confirmPay">确认支付</van-button>
    </div>
  </van-action-sheet>
</template>

<script>
import { ActionSheet, Button } from 'vant'

export default {
  props: ['showPay', 'totalMoney', 'remainTime'],
  data() {
    return { show: false }
  },
  components: {
    'van-button': Button,
    'van-action-sheet': ActionSheet
  },
  methods: {
    handleCancel() {
      this.$emit('handleCancel')
    },
    confirmPay() {
      this.$emit('confirmPay')
    }
  },
  watch: {
    showPay(nVal, oVal) {
      this.show = nVal
    }
  }
}
</script>

<style lang="scss" scoped>
.action-sheet-box {
  width: 100%;
  height: 21.5rem;
  box-sizing: border-box;
  padding: 0.94rem;
  @include flex(flex-start, center, column, nowrap);
  .cancel {
    align-self: flex-end;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    background-color: #fff;
    border-radius: 50%;
  }
  .cancel::before,
  .cancel::after {
    content: '';
    position: absolute; /*方便进行定位*/
    background-color: #999;
    height: 1.7rem;
    width: 0.14rem;
    left: 50%;
  }
  .cancel::before {
    transform: rotate(45deg); /*进行旋转*/
  }
  .cancel::after {
    transform: rotate(-45deg);
  }
  .total-title,
  .total-money,
  .content,
  .pay-button {
    width: calc(100% - 0.62rem);
    margin-left: 0.31rem;
    margin-right: 0.31rem;
  }
  .total-title {
    text-align: center;
    line-height: 1.84rem;
    @include font(PingFang SC, 1.31rem, rgba(51, 51, 51, 1), 400);
  }
  .total-money {
    margin-top: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 0.03rem solid #e9e9e9;
    @include flex(center, flex-start, row, nowrap);
    & span:nth-child(1) {
      line-height: 2.43rem;
      @include font(PingFang SC, 1.31rem, rgba(242, 50, 58, 1), 600);
    }
    & span:nth-child(2) {
      line-height: 1.75rem;
      @include font(PingFang SC, 2.19rem, rgba(242, 50, 58, 1), 600);
    }
  }

  .content {
    @include flex(space-between, center, row, nowrap);
    .left,
    .right {
      line-height: 1.75rem;
      @include font(PingFang SC, 1.25rem, rgba(102, 102, 102, 1), 400);
    }
    .right {
      color: #333;
    }
  }
  .pay-button {
    margin-top: 1.88rem;
    margin-bottom: 0.9rem;
  }
  .time {
    margin-top: 1.25rem;
  }
  .method {
    margin-top: 0.63rem;
  }
}
</style>