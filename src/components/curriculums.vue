<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-19 11:15:15
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-27 14:44:53
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
import http from '@/api'
import { Dialog } from 'vant';
export default {
  props: {
    classItem: Object
  },
  methods: {
    dialog(title,message,text,name,query={}){
      Dialog.confirm({
          title,
          message,
          confirmButtonText: text,
          confirmButtonColor: '#F2323A',
          cancelButtonColor: '#999999'
        }).then(res=>{
          this.$router.push({name,query})
        })
        .catch(err=>{
          console.log('取消',err)
        })
    },
    applyCourse() {
      let params = { id: this.classItem.id }
      //立即报名，提交订单
      let info = info = {
        list:[this.classItem],
        classIdList: [this.classItem.id],
        totalMoney: this.classItem.money
      }
      http.applyCourse(params).then(res=>{
        if(res.data.status === 3){  //该课程已经完成报名
          this.toDetail()
        }else if(res.data.status === 0 || res.data.status === 1 || res.data.status === 2){  //班级或者同类班级已经在选课单内,去提交订单--2
          this.$store.commit('setConfirmOrderList', info)
          this.$router.push({name: 'ConfirmOrder'})
        }else if(res.data.status === 4){  //已报名完成该课程的其他班级--3
          this.repeatShow = true
        }else if(res.data.status === 5){  //去支付--5 
          // this.$store.commit('setConfirmOrderList', info)
          this.dialog('您已提交该班级报名','点\'去支付\'完成报名','去支付','Order',{index:1})
        }else if(res.data.status === 6){  //去支付--6
          // info = {
          //   list:[res.data.classDetail],
          //   classIdList: [res.data.classDetail.classId],
          //   totalMoney: res.data.classDetail.money
          // }
          // this.$store.commit('setConfirmOrderList', info)
          this.dialog('您已提交相同课程报名','点\'去支付\'完成报名','去支付','Order',{index:1})
        }
      })
      .catch(err=>{
        console.log(err)
        this.$toast(err)
      })
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
