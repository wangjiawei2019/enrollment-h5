<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-19 11:34:22
--> 
<template>
  <div class="lesson">
    <div class="header">
      <div class="classify">
        <span>课程分类</span>
        <img src="@/assets/images/lesson/down.png" alt />
      </div>
      <div class="search">
        <img src="@/assets/images/lesson/search.png" alt />
        <input type="text" placeholder="搜索学习课程" />
      </div>
    </div>
    <div class="curr-list">
      <Curriculums></Curriculums>
    </div>
  </div>
</template>

<script>
import Curriculums from '@/components/Curriculums'
export default {
  name: 'Lesson',
  data() {
    return {}
  },
  components: {
    Curriculums
  }
}
</script>

<style lang="scss" scoped>
.lesson {
  .header {
    height: 4.375rem /* 70/16 */;
    display: flex;
    align-items: center;
    padding: 0 0.9375rem /* 15/16 */;
    border-bottom: 1px solid #e9e9e9;
    .classify {
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      & > span {
        font-size: 1.3125rem /* 21/16 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-right: 0.65625rem /* 10.5/16 */;
      }
      & > img {
        width: 0.625rem /* 10/16 */;
        height: 0.46875rem /* 7.5/16 */;
      }
    }
    .search {
      width: 11.25rem /* 180/16 */;
      height: 2.5rem /* 40/16 */;
      padding: 0 0.90625rem /* 14.5/16 */;
      margin-left: 1.9375rem /* 31/16 */;
      display: flex;
      align-items: center;
      background: #f5f6fa;
      border-radius: 1.25rem /* 20/16 */;
      & > img {
        width: 1.25rem /* 20/16 */;
        height: 1.25rem /* 20/16 */;
        margin-right: 0.59375rem /* 9.5/16 */;
      }
      & > input {
        width: 8.125rem /* 130/16 */;
        height: 100%;
        background: none;
        border: none;
        font-size: 1.25rem /* 20/16 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>
