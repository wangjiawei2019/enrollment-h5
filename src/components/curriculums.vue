<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-19 11:15:15
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-22 18:14:45
--> 
<template>
  <div class="curriculums" @click="toDetail">
    <div class="curr-left">
      <img :src="classItem.image || require('@/assets/site.png')" :alt="classItem.name" />
    </div>
    <div class="curr-right">
      <div class="title" v-html="classItem.name"></div>
      <div class="subtitle" v-html="classItem.subtitle"></div>
      <div class="price">
        <span class="number">￥{{classItem.money}}</span>
        <div class="join" @click.stop="applyCourse">立即报名</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import http from '@/api'
export default {
  props: {
    classItem: Object
  },
  methods: {
    applyCourse() {
      let params = {
        id: this.classItem.id
      }
      this.$emit('changeShow',true)
      console.log(params)
      // http.applyCourse(params).then(res=>{
      //   console.log("报名成功",res)
      // })
      // .catch(err=>{
      //   console.log(err)
      //   Toast(err)
      // })
      // Toast('本期招生已截止');
    },
    toDetail(){
      this.$router.push({path:'/lesson-detail',query:{id:this.classItem.id}})
    }
  }
}
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
    // width: 12.5rem /* 200/16 */;
    flex: 1;
    height: 5rem /* 80/16 */;
    display: flex;
    justify-content: space-between;
    flex-flow: column;
    position: relative;
    .title {
      line-height: 1.5625rem /* 25/16 */;
      font-size: 1.3125rem /* 21/16 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .subtitle {
      height: 1.5625rem /* 25/16 */;
      font-size: 0.9375rem /* 15/16 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 1.5625rem /* 25/16 */;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price {
      margin-top: 0.4375rem /* 7/16 */;
      .number {
        height: 1.5625rem /* 25/16 */;
        line-height: 1.5625rem /* 25/16 */;
        text-align: center;
        color: #f2323a;

        font-size: 1.1875rem /* 19/16 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(242, 50, 58, 1);
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
