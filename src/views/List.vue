<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-19 16:32:36
--> 
<template>
  <div class="list-page">
    <div class="no-list-wrapper" v-if="!list.length">
      <van-empty :image="require('@/assets/no-list1.png')" description="暂无已选课程" />
    </div>
  </div>
</template>

<script>
import { Empty } from 'vant'
export default {
  name: 'List',
  components: { 'van-empty': Empty },
  data() {
    return {
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
.list-page {
  flex: 1;
  .no-list-wrapper {
    width: 100%;
    height: 100%;
    @include flex(center, center, row, nowrap);
  }
}
</style>