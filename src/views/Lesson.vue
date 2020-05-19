<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-19 10:36:27
--> 
<template>
  <div class="home">
    <div class="header">
      <div class="classify">
        <span>课程分类</span>
        <img src="@/images/down.png" alt="" />
      </div>
      <div class="search">
        <img src="@/images/search.png" alt="" />
        <input type="text" placeholder="搜索学习课程" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lesson',
}
</script>

<style lang="scss" scoped>
.home{
  .header{
    height: 4.375rem /* 70/16 */;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .9375rem /* 15/16 */;
    .classify{
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      &>span{
        font-size:1.3125rem /* 21/16 */;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-right: .65625rem /* 10.5/16 */;
      }
      &>img{
        width: .625rem /* 10/16 */;
        height: .46875rem /* 7.5/16 */;
      }
    }
    .search{
      width: 11.25rem /* 180/16 */;
      height: 2.5rem /* 40/16 */;
      padding: 0 .90625rem /* 14.5/16 */;
      &>img{
        width: 1.25rem /* 20/16 */;
        height: 1.25rem /* 20/16 */;
      }
    }
  }
}
</style>
