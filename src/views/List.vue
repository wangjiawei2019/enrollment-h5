<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-22 18:57:45
--> 
<template>
  <div class="list-page">
    <template v-if="list.length">
      <van-sticky>
        <div class="title-box van-hairline--bottom">
          <div class="title-box-left">共{{ list.length }}门课程</div>
          <div class="title-box-right" @click="handleEdit">{{ showEdit ? '编辑' :'完成' }}</div>
        </div>
      </van-sticky>
      <div class="list-box">
        <van-checkbox-group
          class="wrapper"
          ref="CheckboxGroup"
          v-model="result"
          icon-size="1.38rem"
          checked-color="#f2323a"
          @change="onCheckboxGroupChange"
        >
          <van-checkbox
            :name="item.classId"
            class="check-item"
            v-for="(item, index) in list"
            :class="{'van-hairline--bottom': index !== list.length - 1}"
            :key="item.classId"
          >
            <list-item :checked="true" :item="item"></list-item>
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <pay-bar
        :buttonText="payBarButtonText"
        :totalMoney="totalMoney(result)"
        :result="result"
        @goPay="goPay"
        @deleteOrder="deleteOrder"
      >
        <template v-slot:check-slot>
          <van-checkbox
            class="check-box"
            v-model="allChecked"
            checked-color="#f2323a"
            icon-size="1.38rem"
            @click="toggleAll(allChecked)"
          >全选</van-checkbox>
        </template>
      </pay-bar>
    </template>
    <div class="no-list-wrapper" v-else>
      <van-empty :image="require('@/assets/no-list1.png')" description="暂无已选课程" />
    </div>
  </div>
</template>

<script>
import { Empty, Sticky, Checkbox, CheckboxGroup } from 'vant'
import ListItem from '@/components/listItem'
import PayBar from '@/components/payBar'
import http from '@/api'

export default {
  name: 'List',
  components: {
    'van-empty': Empty,
    'van-sticky': Sticky,
    'van-checkbox': Checkbox,
    'van-checkbox-group': CheckboxGroup,
    'pay-bar': PayBar,
    'list-item': ListItem
  },
  data() {
    return {
      list: [],
      result: [],
      allChecked: false, // 默认不全选，加载完列表之后手动全选
      showEdit: true // 默认是显示编辑
    }
  },
  mounted() {
    this.getCartList().then(() => {
      this.list.length && this.toggleAll(true)
    })
  },
  methods: {
    getCartList() {
      return http.getCartList().then(res => {
        this.list = Array.isArray(res.data) ? res.data : []
      })
    },
    handleEdit() {
      this.showEdit = !this.showEdit
      this.toggleAll(this.showEdit)
    },
    onCheckboxGroupChange(names) {
      this.allChecked = names.length === this.list.length
    },
    toggleAll(val) {
      this.$refs['CheckboxGroup'].toggleAll(val)
    },
    deleteOrder() {
      const cartIdList = []
      this.result.map(i => {
        cartIdList.push(this.list.filter(v => v.classId === i)[0].cartId)
      })
      http.cancelApplyCourse({ cartIdList }).then(res => {
        this.getCartList()
      })
    },
    goPay() {
      if (this.result.length) {
        let info = { list: [], classIdList: this.result, totalMoney: this.totalMoney(this.result) }
        this.result.map(i => {
          info.list.push(this.list.filter(v => v.classId === i)[0])
        })
        this.$store.commit('setConfirmOrderList', info)
        this.$router.push({ name: 'ConfirmOrder' })
      } else {
        this.$toast('请选择订单')
      }
    }
  },
  computed: {
    payBarButtonText() {
      return this.showEdit ? '去支付' : '删除'
    },
    totalMoney() {
      return result => {
        let total = 0
        result.map(i => {
          total = total + this.list.filter(v => v.classId === i)[0].money
        })
        return total.toFixed(2) * 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-page {
  width: 100%;
  flex: 1;
  .title-box {
    width: 100%;
    height: 3.75rem;
    background-color: #fff;
    padding: 0 0.94rem;
    box-sizing: border-box;
    @include flex(space-between, center, row, nowrap);
    .title-box-left {
      height: 100%;
      line-height: 3.75rem;
      @include font(PingFang SC, 1.31rem, rgba(51, 51, 51, 1), 500);
    }
    .title-box-right {
      height: 100%;
      line-height: 3.75rem;
      @include font(PingFang SC, 1.25rem, rgba(51, 51, 51, 1), 400);
    }
  }
  .list-box {
    width: 100%;
    margin-bottom: calc(3.63rem + 0.94rem);
    margin-bottom: calc(3.63rem + 0.94rem + constant(safe-area-inset-bottom));
    margin-bottom: calc(3.63rem + 0.94rem + env(safe-area-inset-bottom));
    @include flex(flex-start, flex-start, column, nowrap);
    .wrapper {
      width: calc(100% - 1.88rem);
      margin: 0 auto;
      @include flex(flex-start, flex-start, column, nowrap);
      .check-item {
        flex: 1;
        width: 100%;
        @include flex(flex-start, center, row, nowrap);
      }
    }
  }
  .check-box {
    flex: 1;
  }

  .no-list-wrapper {
    width: 100%;
    height: 100%;
    @include flex(center, center, row, nowrap);
  }
}
</style>