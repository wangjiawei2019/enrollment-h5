<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-06-04 10:36:57
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-11 15:24:12
--> 
<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <div class="rank-page" v-if="rankList.length">
      <van-sticky>
        <header>
          <span>排名</span>
          <span class="student">学员</span>
          <span>帮助值</span>
        </header>
      </van-sticky>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadList">
        <ul class="list" v-for="(item, index) in rankList" :key="index">
          <li class="list-item">
            <div class="rank" :class="'rank' + (index + 1)">{{(index + 1) > 3 ? (index + 1) : ''}}</div>
            <div class="info">
              <img :src=" item.avatar || '@/assets/images/rank/default.png'" alt="头像" />
              <div class="name van-ellipsis">{{ item.username }}</div>
            </div>
            <div class="number">{{ item.sum }}</div>
          </li>
        </ul>
      </van-list>
    </div>
    <div class="no-list" v-else>
      <van-empty :image="require('@/assets/no-rank.png')">
        <div class="desc" slot="description">
          暂无排名
          <br />去邀请好友
        </div>
      </van-empty>
    </div>
  </van-pull-refresh>
</template>

<script>
import { PullRefresh, List, Sticky, Empty } from 'vant'
import http from '@/api'

export default {
  name: 'Rank',
  components: {
    'van-pull-refresh': PullRefresh,
    'van-list': List,
    'van-empty': Empty,
    'van-sticky': Sticky
  },
  data() {
    return {
      rankList: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageNum: 0
    }
  },
  mounted() {
    this.loadList()
  },
  methods: {
    loadList() {
      this.pageNum++
      const param = {
        pageNum: this.pageNum,
        pageSize: 10
      }
      if (this.refreshing) {
        // 如果属于下拉刷新的话，清空掉列表数据
        this.rankList = []
        this.refreshing = false
      }
      http.getShareRank(param).then(res => {
        const { dataList, total } = res
        this.rankList = this.pageNum === 1 ? dataList : [...this.rankList, ...dataList]
        this.loading = false
        total <= this.pageNum * 10 ? (this.finished = true) : ''
      })
    },
    onRefresh() {
      this.pageNum = 0
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.loadList()
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-page {
  width: 100%;
  .van-pull-refresh {
    min-height: 100vh;
  }
  header {
    width: 100%;
    height: 4.13rem;
    padding: 0 0.94rem;
    box-sizing: border-box;
    border-top: 0.63rem solid #f7f7f7;
    border-bottom: 0.03rem solid #e9e9e9;
    background-color: #fff;
    @include flex(flex-start, center, row, nowrap);
    @include font(PingFang SC, 1.25rem, #666, 400);
    .student {
      flex: 1;
      text-align: center;
    }
  }
  .list {
    width: 100%;
    padding: 0 0.94rem;
    box-sizing: border-box;
    @include flex(flex-start, flex-start, column, nowrap);
    .list-item {
      width: 100%;
      height: 4.4rem;
      box-sizing: border-box;
      border-bottom: 0.03rem solid #e9e9e9;
      @include flex(flex-start, center, row, nowrap);
      .rank {
        width: 2.5rem;
        height: 100%;
        text-align: center;
        background-repeat: no-repeat;
        background-size: 1.5rem 1.44rem;
        background-position: center center;
        @include flex(center, center, row, nowrap);
        @include font(PingFang SC, 1.31rem, #999, 500);
      }
      .rank1 {
        background-image: url('~@/assets/images/rank/one.png');
      }
      .rank2 {
        background-image: url('~@/assets/images/rank/two.png');
      }
      .rank3 {
        background-image: url('~@/assets/images/rank/three.png');
      }
      .info {
        flex: 1;
        width: 13rem;
        margin: 0 1.25rem;
        @include flex(flex-start, center, row, nowrap);
        @include font(PingFang SC, 1.31rem, #333, 400);
        & > img {
          width: 2.5rem;
          height: 2.5rem;
          margin-right: 0.64rem;
          border-radius: 0.3125rem;
        }
      }
      .number {
        width: 3.75rem;
        text-align: center;
        @include font(PingFang SC, 1.31rem, #333, 500);
      }
    }
  }
}
.no-list {
  margin-top: 4.375rem /* 70/16 */;
  padding-top: 5.625rem /* 90/16 */;
  width: 100%;
  /deep/ .van-empty__image {
    width: 12.3rem;
    height: 8.88rem;
  }
  .desc {
    width: 100%;
    text-align: center;
    line-height: 1.66rem;
    @include font(PingFang SC, 1.19rem, #999, 400);
  }
}
</style>