<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-22 14:50:38
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-22 17:34:14
--> 
<template>
  <div class="order-detail-page" v-if="detail">
    <header :class="{green:detail.status === 2}">
      <img class="header-icon" src="@/assets/images/order/success.png" />
      <div class="desc-box">
        <span class="title">{{ statusText[detail.status] }}</span>
        <span class="subtitle">订单完成，进入班群一起学习吧~</span>
      </div>
    </header>
    <section>
      <div class="title-box">订单信息</div>
      <div class="wrap" v-for="item in detail.classListDTOList" :key="item.classId">
        <list-item :item="item">
          <template v-slot:button>
            <div class="join-button-box">
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
    <div class="time-box">
      <div class="title-box">订单时间</div>
      <div class="time time1">
        <span class="left">创建时间</span>
        <span class="right">{{ transTime(detail.createTime) }}</span>
      </div>
      <div class="time time2">
        <span class="left">支付时间</span>
        <span class="right">2020-05-13 13:20:59</span>
      </div>
    </div>
    <footer v-if="detail.status !== 2">
      <template v-if="detail.status === 1">
        <van-button color="#333" plain @click="cancelOrder(detail.id)">取消订单</van-button>
        <van-button type="danger" @click="payOrder(detail)">去支付</van-button>
      </template>
      <van-button color="#333" plain v-else @click="deleteOrder(detail.id)">删除订单</van-button>
    </footer>
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
import { Icon, Dialog, Button } from 'vant'
import ListItem from '@/components/listItem'
import http from '@/api'
import { toYMDHMS } from '@/utils/filters'

export default {
  name: 'OrderDetail',
  components: {
    'van-icon': Icon,
    'van-button': Button,
    'list-item': ListItem,
    [Dialog.Component.name]: Dialog.Component // 必须这样局部注册，否则会调用全局方法
  },
  data() {
    return {
      detail: null,
      statusText: ['', '待支付', '已完成', '已关闭'],
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
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      http.getOrderDetail({ id: this.id }).then(res => {
        this.detail = res.data
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
      const totalMoney = item.sum
      const list = item.classListDTOList
      const classIdList = []
      list.map(i => {
        classIdList.push(i.classId)
      })
      this.$store.commit('setConfirmOrderList', { classIdList, list, totalMoney })
      this.$router.push({ name: 'ConfirmOrder' })
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
    dialogCancel() {
      this.dialogObj.showDialog = false
    },
    dialogConfirm() {
      http[this.dialogObj.type]({ id: this.dialogObj.id }).then(res => {
        this.$router.replace({ name: 'Order' })
      })
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    },
    // countDown() {
    //   return item => {
    //     const val = (item.endTime - this.now) / 60
    //     if (Math.ceil(val) <= 0) {
    //       item.status = 3
    //       return 0
    //     } else {
    //       return Math.ceil(val)
    //     }
    //   }
    // },
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
  flex: 1;
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
    border-top: 0.63rem solid #f7f7f7;
    box-sizing: border-box;
    @include flex(flex-start, flex-start, column, nowrap);
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
    .time1 {
      margin-top: 0.94rem;
    }
    .time2 {
      margin-bottom: 0.94rem;
    }
  }
  & > footer {
    width: 100%;
    height: 4.38rem;
    background-color: #fff;
    border-top: 0.63rem solid #f7f7f7;
    box-sizing: border-box;
    padding: 0 0.94rem;
    @include flex(flex-end, center, row, nowrap);
    button {
      margin-left: 0.91rem;
      width: 6rem !important;
      height: 2.5rem !important;
      border-radius: 0.31rem !important;
    }
  }
}
</style>