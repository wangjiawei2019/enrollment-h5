<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-21 10:12:23
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-10 15:35:12
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
          <span>共</span>
          <span class="red">{{ confirmOrder.list.length }}</span>
          <span>门课程</span>
        </div>
      </template>
    </pay-bar>
    <pay-action-sheet
      :showPay="showPay"
      :totalMoney="confirmOrder.totalMoney"
      :remainTime="remainTime"
      @handleCancel="handleCancel"
      @confirmPay="confirmPay"
    ></pay-action-sheet>
    <van-dialog
      v-model="showDialog"
      width="20.19rem"
      confirm-button-text="继续支付"
      confirm-button-color="#F2323A"
      cancel-button-text="放弃"
      cancel-button-color="#999999"
      show-cancel-button
      title="是否放弃本次支付"
      :message="`${dialogRemainTime}内未支付将被取消`"
      @cancel="dialogCancel"
      @confirm="dialogConfirm"
    ></van-dialog>
  </div>
</template>

<script>
import { Sticky, Dialog } from 'vant'
import PayActionSheet from '@/components/pay-action-sheet'
import ListItem from '@/components/listItem'
import PayBar from '@/components/payBar'
import http from '@/api'
import { domainBaseUrl } from '@/utils/BASE'

export default {
  name: 'ConfirmOrder',
  components: {
    'van-sticky': Sticky,
    'pay-action-sheet': PayActionSheet,
    'list-item': ListItem,
    'pay-bar': PayBar,
    [Dialog.Component.name]: Dialog.Component // 必须这样局部注册，否则会调用全局方法
  },
  data() {
    return {
      showPay: false,
      showDialog: false,
      url: '',
      now: null,
      expireTime: null, // 到期时间
      id: null, // 订单 id
      brandWCPayRequestDO: null // JSAPI 支付
    }
  },
  mounted() {
    setInterval(() => {
      this.now = Date.parse(new Date()) / 1000
    }, 1000)
  },
  methods: {
    submitOrder(classIdList) {
      if (this.$store.state.environment === 'WEIXIN-brower') {
        this.createOrder('/activity/api/course/createOrderJSAPI', {
          classIdList,
          tradeType: 'JSAPI',
          openId: this.$store.state.openId,
          referenceId: this.$store.state.shareId || 0
        })
      } else {
        this.createOrder('/activity/api/course/createOrderH5', { classIdList, tradeType: 'MWEB', referenceId: this.$store.state.shareId || 0 })
      }
    },
    createOrder(url, params) {
      http.createOrder(url, params).then(res => {
        this.showPay = true
        const { url, id, expireTime, brandWCPayRequestDO } = res.data
        this.url = url
        this.id = id
        this.expireTime = parseInt(expireTime / 1000)
        this.brandWCPayRequestDO = brandWCPayRequestDO
      })
    },
    confirmPay() {
      if (this.$store.state.environment === 'WEIXIN-brower') {
        const { appId, timeStamp, nonceStr, packageInfo, signType, paySign } = this.brandWCPayRequestDO
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            appId, //公众号名称，由商户传入
            timeStamp, //时间戳，自1970年以来的秒数
            nonceStr, //随机串
            package: packageInfo,
            signType, //微信签名方式：
            paySign //微信签名
          },
          res => {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              this.$toast('支付成功')
              this.$router.replace({ name: 'OrderDetail', query: { id: this.id, showInviteTaskToast: true } })
            } else {
              this.$toast('支付失败，请重试')
            }
          }
        )
      } else {
        const redirect_url = `${domainBaseUrl || this.$store.state.productionLocationOrigin}/#/order-detail?id=${this.id}`
        location.href = `${this.url}&redirect_url=${encodeURIComponent(redirect_url)}`
      }
    },
    handleCancel() {
      this.showDialog = true
    },
    dialogConfirm() {
      this.showDialog = false
    },
    dialogCancel() {
      this.showDialog = false
      this.showPay = false
      this.$router.push({ name: 'OrderDetail', query: { id: this.id } })
    }
  },
  computed: {
    confirmOrder() {
      return this.$store.state.confirmOrder
    },
    remainTime() {
      if (!this.expireTime) return '00:00:00'
      const reamin = this.expireTime - this.now
      const H = parseInt(reamin / 3600) < 10 ? `0${parseInt(reamin / 3600)}` : parseInt(reamin / 3600)
      const M = parseInt((reamin - 3600 * H) / 60) < 10 ? `0${parseInt((reamin - 3600 * H) / 60)}` : parseInt((reamin - 3600 * H) / 60)
      const S = parseInt(reamin - 3600 * H - 60 * M) < 10 ? `0${parseInt(reamin - 3600 * H - 60 * M)}` : parseInt(reamin - 3600 * H - 60 * M)
      return `${H}:${M}:${S}`
    },
    dialogRemainTime() {
      const H = parseInt(this.remainTime.split(':')[0])
      const M = parseInt(this.remainTime.split(':')[1])
      return `${H ? H + '小时' : ''}${M}分钟`
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
      @include font(PingFang SC, 1.3125rem, rgba(51, 51, 51, 1), 500);
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
    .list-item {
      box-sizing: border-box;
      border-bottom: 0.03rem solid rgba(233, 233, 233, 1);
    }
  }
  .total-box {
    @include font(PingFang SC, 0.94rem, rgba(51, 51, 51, 1), 400);
    .red {
      color: #f2323a;
    }
  }
}
</style>