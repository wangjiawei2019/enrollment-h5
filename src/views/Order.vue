<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-21 17:09:44
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
        <template v-if="listObj[index].length">
          <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <div>订单</div>
          </van-pull-refresh>
        </template>
        <div class="no-list-wrapper" v-else>
          <van-empty :image="require('@/assets/no-list1.png')" description="暂无订单" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Empty, PullRefresh, Tabs, Tab } from 'vant'
import http from '@/api'

export default {
  name: 'Order',
  components: {
    'van-empty': Empty,
    'van-pull-refresh': PullRefresh,
    'van-tabs': Tabs,
    'van-tab': Tab
  },
  data() {
    return {
      active: 0,
      tabList: ['全部订单', '已支付', '已完成'],
      isLoading: false,
      listObj: {
        0: [], // 全部订单
        1: [], // 已支付
        2: [] // 已完成
      }
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    onRefresh() {},
    getOrderList() {
      http.getOrderList({ status: this.active }).then(res => {
        this.listObj[this.active] = Array.isArray(res.data) ? res.data : []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-page {
  width: 100%;
  flex: 1;
  .no-list-wrapper {
    width: 100%;
    height: 100%;
    padding-top: 5.625rem;
    @include flex(center, center, row, nowrap);
  }
}
</style>