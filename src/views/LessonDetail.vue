<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-22 11:41:33
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-29 16:43:51
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
          <div class="count">{{detail.num}}人已报名</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="text">课程详情</div>
      <div class="detail-info" v-html="detail.classInfo"></div>
    </div>

    <div class="footer" v-if="detail.flag" @click="controlQr">报名完成，进入班群</div>
    <div class="footer" v-else>
      <div class="left" @click="applyCourse">加入选课单</div>
      <div class="right" @click="applyCourse($event,true)">立即报名</div>
    </div>

    <!-- 二维码 -->
    <qr-code v-if="joinClass" @closeQr="closeQr" :qrCodeUrl="detail.qrcode"></qr-code>
    <!-- 提示内容 -->
    <currTip :repeat-show="repeatShow" :class-name="className" @changeShow="changeShow"></currTip>
  </div>
</template>

<script>
import http from '@/api'
import store from '@/store'
import currTip from '@/components/currTip'
import QrCode from '@/components/qrCode'
import { Dialog } from 'vant'
export default {
  name: 'LessonDetail',
  data() {
    return {
      id: 0,
      detail: {},
      repeatShow: false, //重复报名提示
      className: '啥啥班级',
      joinClass: false, //加入班群二维码显示
      qrCodeUrl: ''
    }
  },
  components: {
    currTip,
    'qr-code': QrCode
  },
  mounted() {
    this.id = this.$route.query.id
    this.getClassDetail(this.id)
  },
  beforeDestroy(){
    Dialog.close()
  },
  methods: {
    controlQr() {
      this.joinClass = true
    },
    closeQr(flag) {
      this.joinClass = flag
    },
    // toAPP(){ //进入班群
    //   var u = navigator.userAgent
    //   var isWeixin = u.toLowerCase().indexOf('micromessenger') !== -1; // 微信内
    //   var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    //   var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //   var isApp = store.state.terminal  //APP端
    //   if(isWeixin) {
    //     alert('请在浏览器上打开')
    //   }else{
    //     //如果是在APP环境下
    //     if(isApp === 'App'){
    //       console.log('APP环境下',isApp)
    //       window.ReactNativeWebView.postMessage(JSON.stringify({route: 'enrollment'}))
    //     }else{
    //       console.log("浏览器环境下")
    //       location.href = 'j24swr://https://appxw.jinlingkeji.cn/?type=ENROLLMENT'
    //       setTimeout(function(){
    //         let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden ||window.document.webkitHidden
    //         if(typeof hidden =="undefined" || hidden ==false){
    //           window.location.href ="https://appxw.jinlingkeji.cn/share.html"
    //         }
    //       }, 2000)
    //     }
    //   }
    // },
    changeShow(flag) {
      this.repeatShow = flag
    },
    getClassDetail(id) {
      http[this.token ? 'getClassDetailInner' : 'getClassDetail']({ id }).then(res => {
        this.detail = res.data
        document.title = res.data.name
      })
    },
    dialog(title, message, text, name, query = {}) {
      Dialog.confirm({
        title,
        message,
        confirmButtonText: text,
        confirmButtonColor: '#F2323A',
        cancelButtonColor: '#999999'
      })
        .then(res => {
          this.$router.push({ name, query })
        })
        .catch(err => {
          console.log('取消', err)
        })
    },
    applyCourse(e, flag = false) {
      if(!this.$store.state.token){
        this.$router.push({name: 'Login'})
        return 
      }
      //flag==true: 立即报名
      let params = { id: this.detail.id }
      //立即报名，提交订单
      let info = {
        list: [this.detail],
        classIdList: [this.detail.id],
        totalMoney: this.detail.money
      }
      http
        .applyCourse(params)
        .then(res => {
          if (res.data.status === 0) {
            //成功--1
            if (flag) {
              this.$store.commit('setConfirmOrderList', info)
              this.$router.push({ name: 'ConfirmOrder' })
            } else {
              this.$toast('成功添加到选课单')
            }
          } else if (res.data.status === 1) {
            //课程已经在选课单内,去选课单--2
            if (flag) {
              this.$store.commit('setConfirmOrderList', info)
              this.$router.push({ name: 'ConfirmOrder' })
            } else {
              this.dialog('该课程已经在选课单内', '请勿重复添加', '进入选课单', 'List')
            }
          } else if (res.data.status === 2) {
            //选课单里有相似课程，去选课单--4
            if (flag) {
              this.$store.commit('setConfirmOrderList', info)
              this.$router.push({ name: 'ConfirmOrder' })
            } else {
              this.dialog('选课单内已有相同课程', '相同课程只能报一个班级', '进入选课单', 'List')
            }
          } else if (res.data.status === 3) {
            this.$toast(res.data.msg)
          } else if (res.data.status === 4) {
            //已报名该课程的其他班级--3
            this.className = res.data.className
            this.repeatShow = true
          } else if (res.data.status === 5) {
            //去支付--5
            this.dialog('您已提交该班级报名', "点'去支付'完成报名", '去支付', 'Order', { index: 1 })
          } else if (res.data.status === 6) {
            //去支付--6
            this.dialog('您已提交相同课程报名', "点'去支付'完成报名", '去支付', 'Order', { index: 1 })
          }
        })
        .catch(err => {
          this.$toast(err)
        })
    }
  },
  computed: {
    token() {
      return store.state.token
    }
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
        margin-bottom: 0.3125rem /* 5/16 */;
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
        margin-bottom: 0.875rem /* 14/16 */;
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
    font-size: 21px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 5.625rem /* 90/16 */;
    .text {
      margin-bottom: 0.625rem /* 10/16 */;
    }
    .detail-info {
      font-size: 19px;
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
    left: 0.9375rem /* 15/16 */;
    right: 0.9375rem /* 15/16 */;
    display: flex;
    align-items: center;
    border-radius: 1.71875rem /* 27.5/16 */;
    overflow: hidden;
    font-size: 21px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: #f2323a;
    text-align: center;
    justify-content: center;
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