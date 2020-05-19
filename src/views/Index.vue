<!--
 * @Author: zxk
 * @Date: 2020-05-18 14:01:48
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-19 11:49:44
--> 
<template>
  <div id="index">
    <router-view />
    <van-tabbar v-model="active" active-color="#F2323A" inactive-color="#96A8BB">
      <van-tabbar-item replace v-for="(item, index) in tabList" :key="index" :to="item.path">
        <span>{{ item.text }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Index',
  data() {
    return {
      active: 0,
      tabList: [
        {
          text: '课程',
          path: '/index/lesson',
          icon: {
            active: require('@/assets/images/tab/lesson-red.png'),
            inactive: require('@/assets/images/tab/lesson.png')
          }
        },
        {
          text: '选课单',
          path: '/index/list',
          icon: {
            active: require('@/assets/images/tab/list-red.png'),
            inactive: require('@/assets/images/tab/list.png')
          }
        },
        {
          text: '订单',
          path: '/index/order',
          icon: {
            active: require('@/assets/images/tab/order-red.png'),
            inactive: require('@/assets/images/tab/order.png')
          }
        }
      ]
    }
  },
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  }
}
</script>

<style lang="scss">
</style>
