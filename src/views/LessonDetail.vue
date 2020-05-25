<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-22 11:41:33
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-25 15:43:32
--> 
<template>
  <div class="detail-page">
    <div class="header">
      <img class="detail-img" :src="detail.image || require('@/assets/site.png')" alt />
      <div class="info">
        <div class="name">{{detail.name}}</div>
        <div class="subtitle">{{detail.subtitle}}</div>
        <div class="msg">
          <div class="price">
            <span>￥</span>
            <span>{{detail.money}}</span>
          </div>
          <div class="join">{{detail.num}}人已报名</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="text">课程详情</div>
      <div class="detail-info" v-html="detail.classInfo"></div>
    </div>
    <div class="footer">
      <div class="left" @click="applyCourse">加入选课单</div>
      <div class="right">立即报名</div>
    </div>
    <!-- 提示内容 -->
    <currTip :repeat-show="repeatShow" :class-name="className" @changeShow="changeShow"></currTip>
  </div>
</template>

<script>
import http from '@/api'
import CurrTip from '@/components/currTip'
import { Dialog } from 'vant';
export default {
  name: 'LessonDetail',
  data() {
    return {
      id: 0,
      detail: {},
      repeatShow: false, //重复报名提示
      className: '啥啥班级'
    }
  },
  components:{
    CurrTip
  },
  methods: {
    changeShow(flag){
      this.repeatShow = flag
    },
    getClassDetail(id) {
      http.getClassDetail({ id }).then(res => {
        this.detail = res.data
        document.title = res.data.name
      })
    },
    dialog(title,message,text,path){
      Dialog.confirm({
          title,
          message,
          confirmButtonText: text,
          confirmButtonColor: '#F2323A',
          cancelButtonColor: '#999999'
        }).then(res=>{
          console.log('确认',res)
          this.$router.push(path)
        })
        .catch(err=>{
          console.log('取消',err)
        })
    },
    applyCourse() {
      let params = {
        id: this.detail.id
      }
    //   this.$emit('changeShow', true)
      console.log(params)
      http.applyCourse(params).then(res=>{
        console.log("报名成功",res)
        this.$toast()
      })
      .catch(err=>{
        console.log('catch',err)
        //购物车里有，去选课单
        //this.dialog('您已提交该班级报名','点击"去支付"完成报名','去支付','/index/list')
        //订单里有相似或者是相同的课程,去订单
        //this.dialog('您已提交该班级报名','点击"去支付"完成报名','去支付','/index/order')
        //相同课程不同班级已经完成报名，提示我知道了
        // this.repeatShow = true
        
      })
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getClassDetail(this.id)
  }
}
</script>

<style lang="scss" scoped>
.detail-page {
  .header {
    .detail-img {
      width: 100%;
      height: 13.125rem /* 210/16 */;
    }
    .info {
      padding: 0.9375rem /* 15/16 */;
      background: #fff;
      border-bottom: 0.625rem solid #f7f7f7;

      .name {
        height: 2.03125rem /* 32.5/16 */;
        line-height: 2.03125rem /* 32.5/16 */;
        margin-bottom: .3125rem /* 5/16 */;
        font-size: 1.4375rem /* 23/16 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .subtitle {
        height: 1.875rem /* 30/16 */;
        line-height: 1.875rem /* 30/16 */;
        font-size: 1.3125rem /* 21/16 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-bottom: .875rem /* 14/16 */;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .msg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          span {
            font-size: 1.875rem /* 30/16 */;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(242, 50, 58, 1);
          }
          & > span:first-child {
            font-size: 0.9375rem /* 15/16 */;
          }
        }
        .count {
          font-size: 0.9375rem /* 15/16 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666;
        }
      }
    }
  }
  .content {
    padding: 0.9375rem /* 15/16 */;
    font-size: 1.3125rem /* 21/16 */;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 5.625rem /* 90/16 */;
    .text {
      margin-bottom: 0.625rem /* 10/16 */;
    }
    .detail-info {
      font-size: 1.1875rem /* 19/16 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 1.875rem /* 30/16 */;
    }
  }
  .footer {
    height: 3.4375rem /* 55/16 */;
    position: fixed;
    bottom: 2.1875rem /* 35/16 */;
    left: .9375rem /* 15/16 */;
    right: .9375rem /* 15/16 */;
    display: flex;
    align-items: center;
    border-radius: 1.71875rem /* 27.5/16 */;
    overflow: hidden;
    font-size: 1.3125rem /* 21/16 */;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    & > div {
      width: 50%;
      height: 3.4375rem;
      line-height: 3.4375rem /* 55/16 */;
      text-align: center;
    }
    .left {
      background: #fe9b02;
      border-radius: 1.71875rem  0  0  1.71875rem;
    }
    .right {
      background: #f2323a;
      border-radius: 0 1.71875rem 1.71875rem 0;
    }
  }
}
</style>