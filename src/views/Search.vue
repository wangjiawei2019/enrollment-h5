<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-20 09:22:14
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-21 18:56:56
--> 
<template>
  <div class="search-page">
    <div class="title">
      <div class="search">
        <img class="s-img" src="@/assets/images/lesson/search.png" alt />
        <input class="search-ipt" type="text" placeholder="搜索学习课程" @blur="searchWorld" v-model="keyWord" />
        <img
          v-show="keyWord"
          @click="delWorld"
          class="d-img"
          src="@/assets/images/lesson/del.png"
          alt
        />
      </div>
      <div class="cancel" @click="cancel">取消</div>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="downPull">
        <div class="curr-list" v-if="classList.length">
          <Curriculums v-for="(item,index) in classList" :key="index" :classItem="item"></Curriculums>
        </div>
        <div class="none-list" v-else>
          <van-empty :image="require('@/assets/no-list1.png')" description="暂无相关搜索课程" />
        </div>
      </van-list>
    </van-pull-refresh>

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
import { Empty, List, PullRefresh } from 'vant'
import Curriculums from '@/components/curriculums'
import CurrTip from '@/components/currTip'
import http from '@/api/index.js'
export default {
  name: 'Search',
  data() {
    return {
      repeatShow: false, //重复报名提示
      keyWord: '', //搜索关键词
      classList: [],  //班级列表
      page: 0,
      totalPage: 2,
      list: [],
      loading: false, //是否处于加载中
      finished: true, //是否加载完成
      refreshing: false
    }
  },
  methods: {
    delWorld() {
      this.keyWord = ''
    },
    cancel() {
      this.$router.back()
    },
    searchWorld(){
      if(this.keyWord.length){
        this.searchCourseClass()
      }
    },
    searchCourseClass(page=0){
      let params = {
        keyword: this.keyWord,
        pageSize: 10,
        pageNum: page
      }
      http.searchCourseClass(params).then(res=>{
        if(page == 0){
          this.classList = res.data.content
          this.totalPage = res.data.totalPages
        }else{
          this.classList = this.classList.concat(res.data.content);
        }
        //加载状态完成
        this.loading = false
        // 数据全部加载完成
        // this.finished = true
        //下拉刷新完成
        this.refreshing = false
      })
    },
    downPull() {
      console.log('上拉加载')
      if (this.page > this.totalPage) {
        //  数据全部加载完成，可以弹提示
        this.finished = true
        return
      }
      this.searchCourseClass(this.page)
    },
    onRefresh() {
      console.log('下拉刷新')
      // 将 loading 设置为 true，表示处于加载状态,不加载load
      this.loading = true
      // 清空列表数据
      this.classList = []
      this.page = 0
      this.searchCourseClass()
    }
  },
  components: {
    'van-list': List,
    'van-pull-refresh': PullRefresh,
    'van-empty': Empty,
    Curriculums,
    CurrTip
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  min-height: 100vh;
  .title {
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
    padding: 0 0.9375rem /* 15/16 */;
    z-index: 1;
    .search {
      flex: 1;
      // width: 16.25rem /* 260/16 */;
      height: 2.5rem /* 40/16 */;
      padding: 0 0.9375rem;
      display: flex;
      align-items: center;
      background: #f5f6fa;
      border-radius: 1.25rem /* 20/16 */;
      position: relative;
      .s-img {
        width: 1.1875rem /* 19/16 */;
        height: 1.1875rem /* 19/16 */;
        margin-right: 0.59375rem /* 9.5/16 */;
      }
      .d-img {
        position: absolute;
        right: 0.9375rem /* 15/16 */;
        width: 1.25rem /* 20/16 */;
        height: 1.25rem /* 20/16 */;
      }
      .search-ipt {
        // width: 11.5625rem /* 185/16 */;
        flex: 1;
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
    .cancel {
      margin-left: 0.9375rem /* 15/16 */;
      font-size: 1.25rem /* 20/16 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
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