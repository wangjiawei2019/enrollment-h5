<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-20 09:22:14
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-21 17:07:42
--> 
<template>
  <div class="search-page">
    <div class="title">
        <div class="search">
            <img class="s-img" src="@/assets/images/lesson/search.png" alt />
            <input class="search-ipt" type="text" placeholder="搜索学习课程" v-model="keyWorld" />
            <img v-show="keyWorld" @click="delWorld" class="d-img" src="@/assets/images/lesson/del.png" alt="" />
        </div>
        <div class="cancel" @click="cancel">取消</div>
    </div>
    <div class="curr-list"  v-if="searchList.length">
        <Curriculums></Curriculums>
    </div>
    <div class="none-list" v-else>
      <van-empty :image="require('@/assets/no-list1.png')" description="暂无相关搜索课程" />
    </div>

    <!--
      <div style="margin-left: 100px">
        <button style="width: 200px;height: 50px;border-radius: 10px">支付</button>
    </div>
    -->

    <!-- 提示内容 -->
    <currTip :repeatShow="repeatShow"></currTip>
  </div>
</template>

<script>
import { Empty } from 'vant';
import Curriculums from '@/components/curriculums';
import CurrTip from '@/components/currTip';
export default {
  name: 'Search',
  data() {
    return {
      repeatShow: false,  //重复报名提示
      searchList: [],     //搜索列表
      keyWorld: '',       //搜索关键词
    }
  },
  methods:{
    delWorld(){
      this.keyWorld = ''
    },
    cancel(){
      this.$router.back();
    }
  },
  components:{
    'van-empty': Empty,
    Curriculums,
    CurrTip
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  .title{
    height: 4.375rem /* 70/16 */;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .9375rem /* 15/16 */;
    .search {
        flex: 1;
        // width: 16.25rem /* 260/16 */;
        height: 2.5rem /* 40/16 */;
        padding: 0 .9375rem;
        display: flex;
        align-items: center;
        background: #f5f6fa;
        border-radius: 1.25rem /* 20/16 */;
        position: relative;
        .s-img{
        width: 1.1875rem /* 19/16 */;
        height: 1.1875rem /* 19/16 */;
        margin-right: 0.59375rem /* 9.5/16 */;
        }
        .d-img{
          position: absolute;
          right: .9375rem /* 15/16 */;
          width: 1.25rem /* 20/16 */;
          height: 1.25rem /* 20/16 */;
        }
        .search-ipt {
          // width: 11.5625rem /* 185/16 */;
          flex:1;
          height: 2.5rem /* 40/16 */;
          line-height: 2.5rem /* 40/16 */;
          background: none;
          border: none;
          font-size: 1.25rem /* 20/16 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
    }
    .cancel{
      margin-left: .9375rem /* 15/16 */;
      font-size:1.25rem /* 20/16 */;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
  }
  .curr-list {
    margin-top: 4.375rem /* 70/16 */;
  }
  .none-list {
    margin-top: 4.375rem /* 70/16 */;
    padding-top: 5.625rem /* 90/16 */;
    width: 100%;
  }
}
</style>