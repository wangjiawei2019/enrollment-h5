<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-22 18:46:28
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
            <div class="item-wrapper" v-for="bItem in listObj[index]" :key="bItem.id">
              <div
                class="title-box"
                @click="() => {$router.push({name:'OrderDetail',query:{id:bItem.id}})}"
              >
                <template v-if="bItem.status === 1">
                  <div>{{ countDown(bItem) }}分钟后将自动取消</div>
                </template>
                <template v-else>
                  <div>{{ transTime(bItem.createTime) }}</div>
                </template>
                <div class="status">{{ statusText[bItem.status] }}</div>
              </div>
              <div
                class="wrap"
                v-for="sItem in bItem.classListDTOList"
                :key="sItem.id"
                @click="() => {$router.push({name:'OrderDetail',query:{id:bItem.id}})}"
              >
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
              <div class="btn-box">
                <template v-if="bItem.status === 1">
                  <van-button color="#333" plain @click="cancelOrder(bItem.id)">取消订单</van-button>
                  <van-button type="danger" @click="payOrder(bItem)">去支付</van-button>
                </template>
                <van-button color="#333" plain v-else @click="deleteOrder(bItem.id)">删除订单</van-button>
              </div>
            </div>
          </div>
          <div class="no-list-wrapper" v-else>
            <van-empty :image="require('@/assets/no-list1.png')" description="暂无订单" />
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
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
import ListItem from '@/components/listItem'
import http from '@/api'
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
    setInterval(() => {
      this.now = Date.parse(new Date()) / 1000
    }, 1000)
    this.getOrderList()
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
    cancelOrder(id, e) {
      console.log('cancelOrder -> id,e', id, e)
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
      console.log('payOrder -> item', item)
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
        this.getOrderList()
      })
    }
  },
  computed: {
    countDown() {
      return item => {
        const val = (item.endTime - this.now) / 60
        if (Math.ceil(val) <= 0) {
          item.status = 3
          return 0
        } else {
          return Math.ceil(val)
        }
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
    // box-sizing: border-box;
    // min-height: calc(100% - 6.57rem);
    // min-height: calc(100% - 6.57rem - constant(safe-area-inset-bottom));
    // min-height: calc(100% - 6.57rem - env(safe-area-inset-bottom));
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
        border-bottom: 0.03rem solid #e9e9e9;
        line-height: 3.75rem;
        box-sizing: border-box;
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
      .btn-box {
        width: 100%;
        height: 5rem;
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