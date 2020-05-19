<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-19 11:15:15
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-19 11:52:42
--> 
<template>
  <div class="curriculums">
    <div class="curr-left">
      <!-- <img src="@/assets/images/lesson/wei.png" alt="" /> -->
    </div>
    <div class="curr-right">
      <div class="title">标题</div>
      <div class="price">
        <span class="number">￥10</span>
        <div class="join">立即报名</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.curriculums {
  display: flex;
  margin: 0 0.9375rem /* 15/16 */;
  padding: 0.9375rem /* 15/16 */ 0;
  border-bottom: 1px solid #e9e9e9;
  .curr-left {
    & > img {
      width: 8.125rem /* 130/16 */;
      height: 5rem /* 80/16 */;
      margin-right: 0.9375rem /* 15/16 */;
    }
  }
  .curr-right {
    width: 12.5rem /* 200/16 */;
    height: 5rem /* 80/16 */;
    display: flex;
    justify-content: space-between;
    flex-flow: column;
    position: relative;
    .price {
      .number {
        height: 1.5625rem /* 25/16 */;
        line-height: 1.5625rem /* 25/16 */;
        text-align: center;
        color: #f2323a;
      }
      .join {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 4rem /* 64/16 */;
        padding: 0.125rem /* 2/16 */ 0.3125rem /* 5/16 */;
        height: 1.3125rem /* 21/16 */;
        font-size: 0.9375rem /* 15/16 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        background: #f2323a;
        border-radius: 0.3125rem /* 5/16 */;
        color: rgba(255, 255, 255, 1);
        line-height: 1.3125rem /* 21/16 */;
      }
    }
  }
}
</style>
