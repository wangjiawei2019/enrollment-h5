<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-20 09:22:14
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-25 16:47:27
--> 
<template>
  <div class="search-page">
    <div class="title">
      <van-search
        v-model="keyWord"
        shape="round"
        :clearable="false"
        show-action
        autofocus
        placeholder="请输入搜索关键词"
        @search="searchWorld"
        @cancel="cancel"
      >
      <div class="c-img" slot="left-icon">
        <img src="@/assets/images/lesson/search.png" alt />
      </div>
        <img
        slot="right-icon"
          class="d-img"
          v-show="keyWord"
          @click="delWorld"
          src="@/assets/images/lesson/del.png"
          alt
        />
      </van-search>
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

    <!-- 提示内容 -->
    <currTip :repeatShow="repeatShow"></currTip>
  </div>
</template>

<script>
import { Empty, List, PullRefresh, Search } from 'vant'
import Curriculums from '@/components/curriculums'
import CurrTip from '@/components/currTip'
import http from '@/api/index.js'
export default {
  name: 'Search',
  data() {
    return {
      repeatShow: false, //重复报名提示
      keyWord: '', //搜索关键词
      classList: [], //班级列表
      page: 0,
      totalPage: 2,
      loading: false, //是否处于加载中
      finished: true, //是否加载完成
      refreshing: false
    }
  },
  methods: {
    delWorld() {
      this.keyWord = ''
      this.classList = []
    },
    cancel() {
      this.$router.back()
    },
    searchWorld(e) {
      if (this.keyWord.length) {
        this.searchCourseClass()
      } else {
        this.classList = []
      }
    },
    searchCourseClass(page = 0) {
      let params = {
        keyword: this.keyWord,
        pageSize: 10,
        pageNum: page
      }
      http.searchCourseClass(params).then(res => {
        if (page == 0) {
          this.classList = res.data.content
          this.totalPage = res.data.totalPages
        } else {
          this.classList = this.classList.concat(res.data.content)
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
      //上拉加载
      if (this.page > this.totalPage) {
        //  数据全部加载完成，可以弹提示
        this.finished = true
        return
      }
      this.searchCourseClass(this.page)
    },
    onRefresh() {
      //下拉刷新
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
    'van-search': Search,
    Curriculums,
    CurrTip
  }
}
</script>

<style lang="scss">
.search-page {
  width: 100%;
  min-height: 100vh;
  .curr-list {
    margin-top: 4.375rem /* 70/16 */;
  }
  .none-list {
    margin-top: 4.375rem /* 70/16 */;
    padding-top: 5.625rem /* 90/16 */;
    width: 100%;
  }
}
.van-pull-refresh{
  min-height: 100vh;
}
.van-search {
  width: 100%;
  height: 4.375rem /* 70/16 */;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
  z-index: 1;
  border-bottom: 1px solid #e9e9e9;
  padding: .9375rem 0 .9375rem .9375rem; 
}
.van-search__content {
  padding-left: 0.9375rem /* 15/16 */;
  height: 100%;
}
.c-img {
  width: 1.1875rem /* 19/16 */;
  height: 1.625rem /* 26/16 */;
  margin-right: .3125rem;
  display: flex;  
  align-items: center;
  &>img{
    width: 1.1875rem;
    height: 1.1875rem;
  }
}
.van-field__right-icon{
  display: flex;
  align-items: center;
  padding: 0 .9375rem /* 15/16 */;;
  .d-img{
    width: 20px;
    height: 20px;
  }
}
  
.van-cell {
  display: flex;
  align-items: center;
}
.van-field__control{
  font-size: 1.25rem;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.van-search__action{
  padding: 0 .9375rem;
  font-size: 1.25rem;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
</style>