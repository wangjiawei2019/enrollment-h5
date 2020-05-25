<!--
 * @Author: zxk
 * @Date: 2020-05-18 14:01:48
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-25 09:39:36
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
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  },
  mounted() {
    this.active = this.$route.meta.tab
  },
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
  }
}
</script>

<style lang="scss" scoped>
#index {
  display: flex;
  min-height: 100vh;
  box-sizing: border-box;
  // min-height: calc(100vh - 3.63rem);
  // min-height: calc(100vh - 3.63rem - constant(safe-area-inset-bottom));
  // min-height: calc(100vh - 3.63rem - env(safe-area-inset-bottom));
  border-bottom: 0 solid #fff;
  border-color: #fff;
  border-bottom-width: 3.63rem;
  border-bottom-width: calc(3.63rem + constant(safe-area-inset-bottom));
  border-bottom-width: calc(3.63rem + env(safe-area-inset-bottom));

  // margin-bottom: 3.63rem;
  // margin-bottom: calc(3.63rem + constant(safe-area-inset-bottom));
  // margin-bottom: calc(3.63rem + env(safe-area-inset-bottom));
  background-color: #fff;
  overflow: hidden;
}
</style>
