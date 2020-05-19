<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-19 10:42:30
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-19 11:32:19
--> 
<template>
  <div class="no-list">
    <img src="@/assets/no-list1.png" alt="暂无列表" class="no-list-img" />
    {{ desc }}
  </div>
</template>

<script>
export default {
  props: ['desc']
}
</script>

<style lang="scss" scoped>
.no-list {
  width: 14.75rem;
  line-height: 1.6875rem;
  @include flex(center, center, column, nowrap);
  @include font(PingFang SC, 1.1875rem, rgba(153, 153, 153, 1), 400);
  .no-list-img {
    width: 100%;
    height: 8.875rem;
    margin-bottom: 0.3125rem;
  }
}
</style>