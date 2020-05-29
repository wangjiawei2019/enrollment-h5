<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-22 14:50:38
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-29 17:33:42
--> 
<template>
  <div class="order-detail-page" v-if="detail">
    <header :class="{green:detail.status === 2}">
      <img class="header-icon" :src="statusText[detail.status].icon" />
      <div class="desc-box">
        <span class="title">{{ statusText[detail.status].title }}</span>
        <span class="subtitle">{{ statusText[detail.status].subtitle }}</span>
      </div>
    </header>
    <section>
      <div class="title-box">订单信息</div>
      <div class="wrap" v-for="item in detail.classListDTOList" :key="item.classId">
        <list-item :item="item">
          <template v-slot:button>
            <div
              class="join-button-box"
              v-if="item.status === 2"
              @click="() =>{qrCodeUrl = item.qrcode}"
            >
              <img src="@/assets/images/order/class.png" alt class="join-icon" />
              <span class="text">进入班群</span>
              <van-icon name="arrow" color="#999999" size="1rem" />
            </div>
          </template>
        </list-item>
      </div>
      <div class="total-box">
        <div>合计：</div>
        <div class="price">
          <span>￥</span>
          <span>{{ detail.sum }}</span>
        </div>
      </div>
    </section>
    <div class="address-box" v-if="courseClassAddress">
      <div class="title-box">收货地址</div>
      <div class="desc-box desc-box1">
        <span class="left">收货人</span>
        <span class="right">{{ courseClassAddress.username }}</span>
      </div>
      <div class="desc-box">
        <span class="left">手机号码</span>
        <span class="right">{{ courseClassAddress.mobile }}</span>
      </div>
      <div class="desc-box desc-box3">
        <span class="left">详细地址</span>
        <span class="right">{{ courseClassAddress.address }}</span>
      </div>
    </div>
    <div class="time-box">
      <div class="title-box">订单时间</div>
      <div class="time-wrap">
        <div class="time time1">
          <span class="left">创建时间</span>
          <span class="right">{{ transTime(detail.createTime) }}</span>
        </div>
        <div
          class="time time2"
          v-if="detail.status === 2 || detail.status === 3|| detail.status === 4"
        >
          <span class="left">支付时间</span>
          <span class="right">{{ transTime(detail.transactionTime) }}</span>
        </div>
      </div>
    </div>
    <footer v-if="detail.status !== 2">
      <template v-if="detail.status === 1">
        <van-button color="#666" plain @click="cancelOrder(detail.id)">取消订单</van-button>
        <van-button type="danger" @click="payOrder(detail)">去支付</van-button>
      </template>
      <van-button color="#666" plain v-else @click="deleteOrder(detail.id)">删除订单</van-button>
    </footer>
    <footer v-else>
      <van-button type="danger" @click="editAddress">{{ courseClassAddress ? '修改地址' : '填写地址' }}</van-button>
    </footer>
    <pay-action-sheet
      :showPay="actionSheetObj.showPay"
      :totalMoney="actionSheetObj.totalMoney"
      :remainTime="remainTime"
      @handleCancel="handleCancel"
      @confirmPay="confirmPay"
    ></pay-action-sheet>
    <van-dialog
      v-model="dialogObj.showDialog"
      width="20.19rem"
      :confirm-button-text="dialogObj['confirm-button-text']"
      confirm-button-color="#F2323A"
      :cancel-button-text="dialogObj['cancel-button-text']"
      cancel-button-color="#999999"
      show-cancel-button
      :title="dialogObj.title"
      :message="dialogObj.message"
      @cancel="dialogCancel"
      @confirm="dialogConfirm"
    ></van-dialog>
    <qr-code v-if="qrCodeUrl" @closeQr="() => { qrCodeUrl = '' }" :qrCodeUrl="qrCodeUrl"></qr-code>
  </div>
</template>

<script>
import { Icon, Dialog, Button } from 'vant'
import PayActionSheet from '@/components/pay-action-sheet'
import ListItem from '@/components/listItem'
import QrCode from '@/components/qrCode'
import http from '@/api'
import { domainBaseUrl } from '@/utils/BASE'
import { toYMDHMS } from '@/utils/filters'

export default {
  name: 'OrderDetail',
  components: {
    'van-icon': Icon,
    'van-button': Button,
    'list-item': ListItem,
    'qr-code': QrCode,
    'pay-action-sheet': PayActionSheet,
    [Dialog.Component.name]: Dialog.Component // 必须这样局部注册，否则会调用全局方法
  },
  data() {
    return {
      detail: null,
      brandWCPayRequestDO: null,
      courseClassAddress: null,
      now: null,
      actionSheetObj: { showPay: false, totalMoney: '', expireTime: 0, id: null, url: '', brandWCPayRequestDO: {} },
      dialogObj: {
        id: null,
        type: '',
        showDialog: false,
        'confirm-button-text': '',
        'cancel-button-text': '',
        title: '',
        message: ''
      },
      qrCodeUrl: ''
    }
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      http.getOrderDetail({ id: this.id }).then(res => {
        const { orderListDTO, courseClassAddress, brandWCPayRequestDO } = res.data
        const temp = { orderId: orderListDTO.id }
        !courseClassAddress.mobile && Object.assign(temp, { mobile: this.$store.state.mobile })
        this.detail = orderListDTO
        this.courseClassAddress = courseClassAddress
        this.brandWCPayRequestDO = brandWCPayRequestDO
        this.$store.commit('setCourseClassAddress', Object.assign(courseClassAddress ? courseClassAddress : {}, temp))
        if (this.detail.status === 1) {
          // 待支付需要计算倒计时
          setInterval(() => {
            this.now = Date.parse(new Date()) / 1000
            if (this.now >= this.detail.expireTime) {
              this.detail.status = 6
              this.dialogCancel()
              this.$toast('您的订单已超时')
            }
          }, 1000)
        }
      })
    },
    cancelOrder(id) {
      const obj = {
        id,
        type: 'cancelOrder',
        showDialog: true,
        'confirm-button-text': '确定取消',
        'cancel-button-text': '暂不取消',
        title: '是否取消该订单',
        message: '取消后无法恢复，需重新选课'
      }
      Object.assign(this.dialogObj, obj)
    },
    payOrder(item) {
      const obj = {
        showPay: true,
        totalMoney: item.sum,
        expireTime: item.expireTime,
        id: item.id,
        url: item.url,
        brandWCPayRequestDO: this.brandWCPayRequestDO
      }
      Object.assign(this.actionSheetObj, obj)
    },
    deleteOrder(id) {
      const obj = {
        id,
        type: 'deleteOrder',
        showDialog: true,
        'confirm-button-text': '删除',
        'cancel-button-text': '取消',
        title: '是否删除订单',
        message: '订单删除后将不可恢复'
      }
      Object.assign(this.dialogObj, obj)
    },
    confirmPay() {
      if (this.$store.state.environment === 'WEIXIN-brower') {
        const { appId, timeStamp, nonceStr, packageInfo, signType, paySign } = this.actionSheetObj.brandWCPayRequestDO
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
              this.dialogCancel()
              this.getOrderDetail()
            } else {
              this.$toast('支付失败，请重试')
            }
          }
        )
      } else {
        const redirect_url = `${domainBaseUrl}/#/order-detail?id=${this.actionSheetObj.id}`
        location.href = `${this.actionSheetObj.url}&redirect_url=${encodeURIComponent(redirect_url)}`
      }
    },
    handleCancel() {
      const obj = {
        type: 'cancelPay',
        showDialog: true,
        'confirm-button-text': '继续支付',
        'cancel-button-text': '放弃',
        title: '是否放弃本次支付',
        message: `${this.dialogRemainTime}内未支付将被取消`
      }
      Object.assign(this.dialogObj, obj)
    },
    dialogCancel() {
      this.dialogObj.showDialog = false
      this.actionSheetObj.showPay = false
    },
    dialogConfirm() {
      this.dialogObj.type !== 'cancelPay' &&
        http[this.dialogObj.type]({ id: this.dialogObj.id }).then(res => {
          this.$router.replace({ name: 'Order', query: { index: 2 } })
        })
    },
    editAddress() {
      this.$router.push({ name: 'Address' })
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    },
    remainTime() {
      if (!this.now || this.now >= this.detail.expireTime) return '00:00:00'
      const reamin = this.detail.expireTime - this.now
      const H = parseInt(reamin / 3600) < 10 ? `0${parseInt(reamin / 3600)}` : parseInt(reamin / 3600)
      const M = parseInt((reamin - 3600 * H) / 60) < 10 ? `0${parseInt((reamin - 3600 * H) / 60)}` : parseInt((reamin - 3600 * H) / 60)
      const S = parseInt(reamin - 3600 * H - 60 * M) < 10 ? `0${parseInt(reamin - 3600 * H - 60 * M)}` : parseInt(reamin - 3600 * H - 60 * M)
      return `${H}:${M}:${S}`
    },
    dialogRemainTime() {
      const H = parseInt(this.remainTime.split(':')[0])
      const M = parseInt(this.remainTime.split(':')[1])
      return `${H ? H + '小时' : ''}${M}分钟`
    },
    statusText() {
      if (!this.detail) return []
      return [
        { title: '', subtitle: '' },
        { title: '待支付', subtitle: `${this.dialogRemainTime}后自动取消`, icon: require('@/assets/images/order/count-down.png') },
        { title: '已完成', subtitle: '订单完成，进入班群一起学习吧~', icon: require('@/assets/images/order/success.png') },
        { title: '已完成', subtitle: '订单完成，进入班群一起学习吧~', icon: require('@/assets/images/order/success.png') },
        { title: '已关闭', subtitle: '退款完成', icon: require('@/assets/images/order/cancel.png') },
        { title: '已关闭', subtitle: '您已取消该订单', icon: require('@/assets/images/order/cancel.png') },
        { title: '已关闭', subtitle: '超时自动取消', icon: require('@/assets/images/order/cancel.png') }
      ]
    },
    transTime() {
      return time => {
        return toYMDHMS(time)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-detail-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f7f7f7;
  @include flex(flex-start, flex-start, column, nowrap);
  & > header {
    width: 100%;
    height: 5.53rem;
    box-sizing: border-box;
    background: linear-gradient(314deg, rgba(255, 62, 56, 1) 0%, rgba(255, 128, 87, 1) 100%);
    @include flex(flex-start, center, row, nowrap);
    .header-icon {
      width: 2.19rem;
      height: 2.19rem;
      margin-left: 1.88rem;
      margin-right: 0.94rem;
    }
    .desc-box {
      flex: 1;
      @include flex(space-between, flex-start, column, nowrap);
      .title {
        line-height: 2.03rem;
        @include font(PingFang SC, 1.44rem, #fff, 500);
      }
      .subtitle {
        margin-top: 0.31rem;
        line-height: 1.31rem;
        @include font(PingFang SC, 0.94rem, #fff, 400);
      }
    }
  }
  & > .green {
    background: linear-gradient(314deg, rgba(36, 179, 114, 1) 0%, rgba(36, 179, 167, 1) 100%);
  }
  .title-box {
    width: 100%;
    box-sizing: border-box;
    border-bottom: 0.03rem solid #e9e9e9;
    line-height: 3.63rem;
    @include font(PingFang SC, 1.25rem, #333, 500);
  }
  & > section {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.94rem;
    border-bottom: 0.63rem solid #f7f7f7;
    background-color: #fff;
    @include flex(flex-start, flex-start, column, nowrap);

    .wrap {
      width: 100%;
      border-bottom: 0.03rem solid #e9e9e9;
      box-sizing: border-box;
      .join-button-box {
        width: 100%;
        height: 3rem;
        margin-bottom: 0.94rem;
        background: rgba(247, 247, 247, 1);
        border-radius: 0.5rem;
        box-sizing: border-box;
        padding: 0 0.94rem;
        @include flex(flex-start, center, row, nowrap);
        .join-icon {
          width: 1.38rem;
          height: 1.25rem;
        }
        .text {
          flex: 1;
          margin-left: 0.63rem;
          @include font(PingFang SC, 1.19rem, rgba(102, 102, 102, 1), 400);
        }
      }
    }
    .total-box {
      width: 100%;
      height: 3.75rem;
      line-height: 3.75rem;
      @include flex(space-between, flex-start, row, nowrap);
      @include font(PingFang SC, 0.94rem, #333, 400);
      .price {
        color: #f2323a;
        font-weight: 500;
        & span:nth-child(1) {
          line-height: 4.07rem;
        }
        & span:nth-child(2) {
          line-height: 3.75rem;
          font-size: 1.31rem;
        }
      }
    }
  }

  & > .time-box {
    width: 100%;
    padding: 0 0.94rem;
    background-color: #fff;
    border-bottom: 0.63rem solid #f7f7f7;
    margin-bottom: 4.4rem;
    box-sizing: border-box;
    @include flex(flex-start, flex-start, column, nowrap);
    & > .time-wrap {
      padding: 0.94rem 0;
      box-sizing: border-box;
      .time {
        width: 100%;
        @include flex(flex-start, center, row, nowrap);
        .left,
        .right {
          line-height: 1.66rem;
          @include font(PingFang SC, 1.19rem, rgba(153, 153, 153, 1), 400);
        }
        .right {
          margin-left: 0.63rem;
          color: #333;
        }
      }
      .time2 {
        margin-top: 0.31rem;
      }
    }
  }
  & > .address-box {
    width: 100%;
    padding: 0 0.94rem;
    background-color: #fff;
    border-bottom: 0.63rem solid #f7f7f7;
    box-sizing: border-box;
    @include flex(flex-start, flex-start, column, nowrap);
    .desc-box {
      width: 100%;
      margin-top: 0.63rem;
      @include flex(flex-start, flex-start, row, nowrap);
      .left {
        flex: 0 0 6rem;
        line-height: 1.66rem;
        @include font(PingFang SC, 1.19rem, #999, 400);
      }
      .right {
        line-height: 1.66rem;
        @include font(PingFang SC, 1.19rem, #333, 400);
      }
    }
    .desc-box1 {
      margin-top: 0.94rem;
    }
    .desc-box3 {
      margin-bottom: 0.94rem;
    }
  }
  & > footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4.38rem;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 0.94rem;
    border-top: 0.03rem solid #e9e9e9;
    @include flex(flex-end, center, row, nowrap);
    .van-button--danger {
      font-size: 1.19rem !important;
    }
    button {
      margin-left: 0.91rem;
      width: 6rem !important;
      height: 2.5rem !important;
      border-radius: 0.31rem !important;
    }
  }
}
</style>