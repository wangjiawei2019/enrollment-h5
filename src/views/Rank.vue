<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-06-04 10:36:57
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-04 16:19:48
--> 
<template>
  <div class="rank-page">
    <van-sticky>
      <header>
        <span>排名</span>
        <span class="student">学员</span>
        <span>帮助值</span>
      </header>
    </van-sticky>
    <ul class="list">
      <li class="list-item">
        <div class="rank rank1"></div>
        <div class="info">
          <img src="../assets/images/rank/default.png" alt="头像" />
          <div class="name van-ellipsis">啦啦啦啦啦啦啦啦绿绿</div>
        </div>
        <div class="number">999+</div>
      </li>
      <li class="list-item">
        <div class="rank rank2"></div>
        <div class="info">
          <img src="../assets/images/rank/default.png" alt="头像" />
          <div class="name van-ellipsis">啦啦啦啦啦啦啦啦绿绿</div>
        </div>
        <div class="number">999+</div>
      </li>
      <li class="list-item">
        <div class="rank rank3"></div>
        <div class="info">
          <img src="../assets/images/rank/default.png" alt="头像" />
          <div class="name van-ellipsis">啦啦啦啦啦啦啦啦绿绿</div>
        </div>
        <div class="number">999+</div>
      </li>
      <li class="list-item">
        <div class="rank">4</div>
        <div class="info">
          <img src="../assets/images/rank/default.png" alt="头像" />
          <div class="name van-ellipsis">啦啦啦啦啦啦啦啦绿绿</div>
        </div>
        <div class="number">999+</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Sticky } from 'vant'

export default {
  name: 'Rank',
  components: {
    'van-sticky': Sticky
  }
}
</script>

<style lang="scss" scoped>
.rank-page {
  width: 100%;
  border-top: 0.63rem solid #f7f7f7;
  box-sizing: border-box;
  header {
    width: 100%;
    height: 3.5rem;
    padding: 0 0.94rem;
    box-sizing: border-box;
    border-bottom: 0.03rem solid #e9e9e9;
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
        max-width: 13rem;
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
</style>