<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-20 16:37:35
--> 
<template>
  <div class="list-page">
    <template v-if="!list.length">
      <van-sticky>
        <div class="title-box van-hairline--bottom">
          <div class="title-box-left">共4门课程</div>
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
            name="1"
            class="check-item"
            :class="{'van-hairline--bottom':index !== list.length}"
            v-for="(item, index) in list"
            :key="item.cartId"
          >
            <list-item :checked="true"></list-item>
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <pay-bar :showCheck="true" :buttonText="payBarButtonText" @checkAll="checkAll"></pay-bar>
    </template>

    <div class="no-list-wrapper" v-else>
      <van-empty :image="require('@/assets/no-list1.png')" description="暂无已选课程" />
    </div>
  </div>
</template>

<script>
import { Empty, Sticky, Checkbox, CheckboxGroup } from 'vant'
import ListItem from '@/components/ListItem'
import PayBar from '@/components/PayBar'

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
      showEdit: true, // 默认是显示编辑
      checked: true
    }
  },
  mounted() {
    this.$refs['CheckboxGroup'].toggleAll(true)
  },
  methods: {
    handleEdit() {
      this.showEdit = !this.showEdit
    },
    onCheckboxGroupChange(names) {},
    checkAll(val) {
      this.checked = val
      this.$refs['CheckboxGroup'].toggleAll(this.checked)
    },
    onSubmit() {}
  },
  computed: {
    payBarButtonText() {
      return this.showEdit ? '去支付' : '删除'
    }
  }
}
</script>

<style lang="scss" scoped>
.list-page {
  width: 100%;
  height: 100%;
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

  .no-list-wrapper {
    width: 100%;
    height: 100%;
    @include flex(center, center, row, nowrap);
  }
}
</style>