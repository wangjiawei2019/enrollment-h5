<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-30 10:42:54
--> 
<template>
  <div class="order-page">
    <van-tabs
      v-model="active"
      swipeable
      animated
      sticky
      color="#F2323A"
      line-width="1.56rem"
      line-height="0.19rem"
      title-active-color="#F2323A"
      title-inactive-color="#999999"
    >
      <van-tab v-for="(item, index) in tabList" :key="index" :title="item">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <div class="list-box" v-if="listObj[index].length">
            <div
              class="item-wrapper"
              v-for="bItem in listObj[index]"
              @click="handleClick(bItem.id)"
              :key="bItem.id"
            >
              <div class="title-box">
                <template v-if="bItem.status === 1">
                  <div>{{ countDown(bItem) }}分钟后将自动取消</div>
                </template>
                <template v-else>
                  <div>{{ transTime(bItem.createTime) }}</div>
                </template>
                <div class="status">{{ statusText[bItem.status] }}</div>
              </div>
              <div class="wrap" v-for="sItem in bItem.classListDTOList" :key="sItem.id">
                <list-item :item="sItem"></list-item>
              </div>
              <div
                class="total-box"
                @click="() => {$router.push({name:'OrderDetail',query:{id:bItem.id}})}"
              >
                <div>合计：</div>
                <div class="price">
                  <span>￥</span>
                  <span>{{ bItem.sum }}</span>
                </div>
              </div>
              <div class="btn-box" v-if="bItem.status !== 2">
                <template v-if="bItem.status === 1">
                  <van-button color="#333" plain @click="cancelOrder($event, bItem.id)">取消订单</van-button>
                  <van-button type="danger" @click="payOrder($event, bItem)">去支付</van-button>
                </template>
                <van-button color="#333" plain v-else @click="deleteOrder($event, bItem.id)">删除订单</van-button>
              </div>
            </div>
          </div>
          <div class="no-list-wrapper" v-else>
            <van-empty :image="require('@/assets/no-list1.png')" description="暂无订单" />
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <pay-action-sheet
      :showPay="actionSheetObj.showPay"
      :totalMoney="actionSheetObj.totalMoney"
      :remainTime="remainTime(actionSheetObj.expireTime)"
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
  </div>
</template>

<script>
import { Empty, PullRefresh, Tabs, Tab, Dialog, Button } from 'vant'
import PayActionSheet from '@/components/pay-action-sheet'
import ListItem from '@/components/listItem'
import http from '@/api'
import { domainBaseUrl } from '@/utils/BASE'
import { toYMDHM } from '@/utils/filters'

export default {
  name: 'Order',
  components: {
    'van-empty': Empty,
    'van-pull-refresh': PullRefresh,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-button': Button,
    'list-item': ListItem,
    'pay-action-sheet': PayActionSheet,
    [Dialog.Component.name]: Dialog.Component // 必须这样局部注册，否则会调用全局方法
  },
  data() {
    return {
      now: Date.parse(new Date()) / 1000,
      active: 0,
      tabList: ['全部订单', '待支付', '已完成'],
      isLoading: false,
      listObj: {
        0: [], // 全部订单
        1: [], // 待支付
        2: [] // 已完成
      },
      statusText: ['', '待支付', '已完成', '已关闭', '已关闭', '已关闭', '已关闭'],
      actionSheetObj: { showPay: false, totalMoney: '', expireTime: 0, id: null, url: '', brandWCPayRequestDO: {} },
      dialogObj: {
        id: null,
        type: '',
        showDialog: false,
        'confirm-button-text': '',
        'cancel-button-text': '',
        title: '',
        message: ''
      }
    }
  },
  mounted() {
    const { index } = this.$route.query
    index ? (this.active = parseInt(index)) : this.getOrderList() // 从别的页面跳转过来
    setInterval(() => {
      this.now = Date.parse(new Date()) / 1000
      if (this.now >= this.actionSheetObj.expireTime && this.actionSheetObj.showPay) {
        this.dialogCancel()
        this.$toast('您的订单已超时')
        this.getOrderList()
      }
    }, 1000)
  },
  methods: {
    onRefresh() {
      this.getOrderList()
    },
    getOrderList() {
      http.getOrderList({ status: this.active }).then(res => {
        this.isLoading = false
        this.listObj[this.active] = Array.isArray(res.data) ? res.data : []
      })
    },
    handleClick(id) {
      this.$router.push({ name: 'OrderDetail', query: { id } })
    },
    cancelOrder(e, id) {
      e.stopPropagation()
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
    payOrder(e, item) {
      e.stopPropagation()
      const obj = {
        showPay: true,
        totalMoney: item.sum,
        expireTime: item.expireTime,
        id: item.id,
        url: item.url,
        brandWCPayRequestDO: item.brandWCPayRequestDO
      }
      Object.assign(this.actionSheetObj, obj)
    },
    deleteOrder(e, id) {
      e.stopPropagation()
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
              this.$router.replace({ name: 'OrderDetail', query: { id: this.actionSheetObj.id } })
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
          this.getOrderList()
        })
    }
  },
  computed: {
    remainTime() {
      return expireTime => {
        if (!expireTime) return '00:00:00'
        const reamin = expireTime - this.now
        const H = parseInt(reamin / 3600) < 10 ? `0${parseInt(reamin / 3600)}` : parseInt(reamin / 3600)
        const M = parseInt((reamin - 3600 * H) / 60) < 10 ? `0${parseInt((reamin - 3600 * H) / 60)}` : parseInt((reamin - 3600 * H) / 60)
        const S = parseInt(reamin - 3600 * H - 60 * M) < 10 ? `0${parseInt(reamin - 3600 * H - 60 * M)}` : parseInt(reamin - 3600 * H - 60 * M)
        return `${H}:${M}:${S}`
      }
    },
    dialogRemainTime() {
      const H = parseInt(this.remainTime(this.actionSheetObj.expireTime).split(':')[0])
      const M = parseInt(this.remainTime(this.actionSheetObj.expireTime).split(':')[1])
      return `${H ? H + '小时' : ''}${M}分钟`
    },
    countDown() {
      return item => {
        const val = (item.endTime - this.now) / 60
        return Math.ceil(val)
      }
    },
    transTime() {
      return time => {
        return toYMDHM(time)
      }
    }
  },
  watch: {
    active(nVal, oVal) {
      this.getOrderList(nVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-page {
  width: 100%;
  flex: 1;
  .list-box {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    // box-sizing: border-box;
    // height: calc(100% - 6.57rem);
    // height: calc(100% - 6.57rem - constant(safe-area-inset-bottom));
    // height: calc(100% - 6.57rem - env(safe-area-inset-bottom));
    // border-color: #fff;
    // border-width: 3.63rem;
    // border-width: calc(3.63rem + constant(safe-area-inset-bottom));
    // border-width: calc(3.63rem + env(safe-area-inset-bottom));
    @include flex(flex-start, flex-start, column, nowrap);
    .item-wrapper {
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 0.94rem;
      border-bottom: 0.6rem solid #f7f7f7;
      @include flex(flex-start, flex-start, column, nowrap);
      &:nth-child(1) {
        border-top: 0.6rem solid #f7f7f7;
      }
      .title-box {
        width: 100%;
        height: 3.19rem;
        border-bottom: 0.03rem solid #e9e9e9;
        @include flex(space-between, center, row, nowrap);
        @include font(PingFang SC, 0.94rem, #333, 400);
        .status {
          color: #f2323a;
        }
      }
      .wrap {
        width: 100%;
        border-bottom: 0.03rem solid #e9e9e9;
        box-sizing: border-box;
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
      .btn-box {
        width: 100%;
        height: 5rem;
        border-top: 0.03rem solid #e9e9e9;
        box-sizing: border-box;
        @include flex(flex-end, center, row, nowrap);
        .van-button {
          margin-left: 0.91rem;
        }
        .van-button--danger {
          width: 6rem !important;
          height: 2.56rem !important;
          border-radius: 0.31rem !important;
          font-size: 1.19rem !important;
          line-height: 1.66rem !important;
        }
      }
    }
  }
  .no-list-wrapper {
    width: 100%;
    height: 100%;
    padding-top: 5.625rem;
    @include flex(center, flex-start, row, nowrap);
  }
}
</style>