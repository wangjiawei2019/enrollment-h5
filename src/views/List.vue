<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-10 14:58:27
--> 
<template>
  <div class="list-page">
    <template v-if="list.length || fullList.length">
      <template v-if="list.length">
        <van-sticky>
          <div class="title-box van-hairline--bottom">
            <div class="title-box-left">共{{ list.length }}门课程</div>
            <div class="title-box-right" @click="handleEdit">{{ showEdit ? '编辑' :'完成' }}</div>
          </div>
        </van-sticky>
        <div class="list-box" :class="{'has-full-list': fullList.length}">
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
          <van-checkbox
            class="check-box"
            slot="check-slot"
            v-model="allChecked"
            checked-color="#f2323a"
            icon-size="1.38rem"
            @click="toggleAll(allChecked)"
          >全选</van-checkbox>
        </pay-bar>
      </template>
      <div class="full-list-wrapper" v-if="fullList.length">
        <div class="full-list-header">
          <div class="left">以下课程已满员</div>
          <div class="right" @click="deleteAllLesson">全部清空</div>
        </div>
        <div
          class="full-list"
          v-for="(item, index) in fullList"
          :class="{'van-hairline--bottom': index !== fullList.length - 1}"
          :key="item.classId"
        >
          <list-item :full="true" :item="item">
            <div class="delete-btn" slot="delete" @click="deleteLesson(item.id)">
              <span>删除课程</span>
            </div>
          </list-item>
        </div>
      </div>
    </template>
    <div class="no-list-wrapper" v-else>
      <van-empty :image="require('@/assets/no-list1.png')" description="暂无已选课程" />
    </div>
    <van-dialog
      v-model="dialogObj.showDialog"
      width="20.19rem"
      confirm-button-text="确定"
      confirm-button-color="#F2323A"
      cancel-button-text="取消"
      cancel-button-color="#999999"
      show-cancel-button
      :title="dialogObj.title"
      @cancel="() => dialogObj.showDialog = false"
      @confirm="dialogConfirm"
    ></van-dialog>
  </div>
</template>

<script>
import { Empty, Sticky, Checkbox, CheckboxGroup, Dialog } from 'vant'
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
    'list-item': ListItem,
    [Dialog.Component.name]: Dialog.Component // 必须这样局部注册，否则会调用全局方法
  },
  data() {
    return {
      list: [],
      fullList: [],
      result: [],
      allChecked: false, // 默认不全选，加载完列表之后手动全选
      showEdit: true, // 默认是显示编辑
      dialogObj: {
        id: null,
        type: '',
        showDialog: false,
        title: ''
      }
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
        this.result = []
        this.getCartList()
      })
    },
    deleteAllLesson() {
      const obj = {
        id: null,
        type: 'deleteAllLesson',
        showDialog: true,
        title: '是否全部清空课程？'
      }
      Object.assign(this.dialogObj, obj)
    },
    deleteLesson(id) {
      const obj = {
        id,
        type: 'deleteLesson',
        showDialog: true,
        title: '是否删除该课程？'
      }
      Object.assign(this.dialogObj, obj)
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
    },
    dialogConfirm() {
      this.$toast(this.dialogObj.type)
      this.dialogObj.showDialog = false
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
  .has-full-list {
    margin-bottom: 0;
  }
  .full-list-wrapper {
    width: 100%;
    margin-bottom: calc(3.63rem + 0.94rem);
    margin-bottom: calc(3.63rem + 0.94rem + constant(safe-area-inset-bottom));
    margin-bottom: calc(3.63rem + 0.94rem + env(safe-area-inset-bottom));
    border-top: 0.63rem solid #f7f7f7;
    @include flex(flex-start, flex-start, column, nowrap);
    .full-list-header {
      width: 100%;
      height: 3.75rem;
      padding: 0 0.94rem;
      border-bottom: 0.03rem solid #e9e9e9;
      box-sizing: border-box;
      @include flex(space-between, center, row, nowrap);
      .left {
        line-height: 3.75rem;
        @include font(PingFang SC, 1.31rem, #999999, 400);
      }
      .right {
        line-height: 3.75rem;
        @include font(PingFang SC, 0.94rem, #333, 400);
      }
    }
    .full-list {
      width: calc(100% - 1.88rem);
      margin: 0 auto;
      @include flex(flex-start, flex-start, column, nowrap);
      .delete-btn {
        margin-top: 0.5rem;
        width: 100%;
        @include flex(flex-end, center, row, nowrap);
        @include font(PingFang SC, 0.94rem, #333, 400);
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