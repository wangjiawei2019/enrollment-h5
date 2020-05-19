<!--
 * @Author: zxk
 * @Date: 2020-05-18 14:01:48
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-19 10:04:41
--> 
<template>
  <div id="index">
    <router-view />
    <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  name: 'Index',
  data() {
    return {
      active: 0,
    };
  },
  components:{
    'van-tabbar':Tabbar,
    'van-tabbar-item':TabbarItem
  }
}
</script>

<style lang="scss">
</style>
