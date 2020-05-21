<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-21 10:12:23
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-21 16:35:14
--> 
<template>
  <div class="confirm-order-page">
    <van-sticky>
      <div class="title-box van-hairline--bottom">
        <div class="title">该订单包含以下课程</div>
        <div class="subtitle">购买后不支持退款、转让</div>
      </div>
    </van-sticky>
    <div class="list-box">
      <list-item v-for="item in confirmOrder.list" :key="item.classId" :item="item"></list-item>
    </div>
    <pay-bar
      buttonText="提交订单"
      :safeArea="true"
      :result="confirmOrder.classIdList"
      :totalMoney="confirmOrder.totalMoney"
      @submitOrder="submitOrder"
    >
      <template v-slot:total>
        <div class="total-box">
          共
          <span class="red">{{ confirmOrder.list.length }}</span>门课程
        </div>
      </template>
    </pay-bar>
    <van-action-sheet
      v-model="showPay"
      :round="false"
      :close-on-click-overlay="false"
      :close-on-popstate="false"
    >
      <div class="action-sheet-box">
        <div class="cancel" @click="handleCancel"></div>
        <div class="total-title">总金额</div>
        <div class="total-money">
          <span>￥</span>
          <span>{{ confirmOrder.totalMoney }}</span>
        </div>
        <div class="content time">
          <div class="left">支付剩余时间</div>
          <div class="right">1:59:59</div>
        </div>
        <div class="content method">
          <div class="left">支付方式</div>
          <div class="right">微信支付</div>
        </div>
        <van-button class="pay-button" type="info" round @click="confirmPay()">确认支付</van-button>
      </div>
    </van-action-sheet>
    <van-dialog
      v-model="showDialog"
      width="20.19rem"
      confirm-button-text="继续支付"
      confirm-button-color="#F2323A"
      cancel-button-text="放弃"
      cancel-button-color="#999999"
      show-cancel-button
      title="是否放弃本次支付"
      message="1小时59分钟内未支付将被取消"
      @cancel="dialogCancel"
      @confirm="dialogConfirm"
    ></van-dialog>
  </div>
</template>

<script>
import { Sticky, ActionSheet, Dialog, Button } from 'vant'
import ListItem from '@/components/listItem'
import PayBar from '@/components/payBar'
import http from '@/api'

export default {
  name: 'ConfirmOrder',
  components: {
    'van-sticky': Sticky,
    'van-button': Button,
    'van-action-sheet': ActionSheet,
    [Dialog.Component.name]: Dialog.Component, // 必须这样局部注册，否则会调用全局方法
    'list-item': ListItem,
    'pay-bar': PayBar
  },
  data() {
    return {
      showPay: false,
      showDialog: false
    }
  },
  methods: {
    submitOrder(classIdList) {
      http.createOrder({ classIdList }).then(res => {
        this.showPay = true
      })
    },
    confirmPay() {},
    handleCancel() {
      console.log('1')
      this.showDialog = true
    },
    dialogConfirm() {
      this.showDialog = false
    },
    dialogCancel() {
      this.showDialog = false
      this.showPay = false
    }
  },
  computed: {
    confirmOrder() {
      return this.$store.state.confirmOrder
    }
  }
}
</script>

<style lang="scss" scpoed>
.confirm-order-page {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  .title-box {
    width: 100%;
    height: 5.34rem;
    padding: 0 0.94rem;
    box-sizing: border-box;
    background-color: #fff;
    @include flex(center, flex-start, column, nowrap);
    .title {
      line-height: 1.84rem;
      @include font(PingFang SC, 1.31rem, rgba(51, 51, 51, 1), 500);
    }
    .subtitle {
      margin-top: 0.31rem;
      line-height: 1.31rem;
      @include font(PingFang SC, 0.94rem, rgba(102, 102, 102, 1), 400);
    }
  }
  .list-box {
    width: calc(100% - 1.88rem);
    margin: 0 auto;
    margin-bottom: calc(3.63rem + 0.94rem);
    margin-bottom: calc(3.63rem + 0.94rem + constant(safe-area-inset-bottom));
    margin-bottom: calc(3.63rem + 0.94rem + env(safe-area-inset-bottom));
    @include flex(flex-start, flex-start, column, nowrap);
  }
  .total-box {
    @include font(PingFang SC, 0.94rem, rgba(51, 51, 51, 1), 400);
    .red {
      color: #f2323a;
    }
  }
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
}
</style>