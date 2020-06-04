<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-06-04 09:27:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-06-04 15:18:51
--> 
<template>
  <div class="invite-page">
    <div class="header">
      <div class="help-rank">
        <div class="rank-title">
          <div class="title-left">您的帮助值排名</div>
          <div class="title-right" @click="toRank">
            <span>查看排行榜</span>
            <img src="@/assets/images/lesson/right.png" alt />
          </div>
        </div>
        <div class="rank-number">
          第
          <span>199</span>名
        </div>
      </div>
    </div>
    <div class="invite-user">
      <div class="invite-title">
        <div class="title-left">邀请好友报名选课</div>
        <div class="title-right" @click="showShade('rule')">
          <span>领取规则</span>
          <img src="@/assets/images/lesson/right.png" alt />
        </div>
      </div>
      <div class="invite-content">
        <div class="help-number">
          已成功帮助
          <span>999</span>位好友
        </div>
        <div class="invite-share" @click="showShade('share')">点击邀请好友</div>
      </div>
      <div class="invite-tip">
        <div>好友通过分享链接完成报名</div>
        <div>即可领取教科书</div>
      </div>
    </div>
    <div class="invite-footer" @click="editAddress">
      <div class="change-address">修改收货地址</div>
    </div>

    <!-- 分享 -->
    <van-overlay class="shade" v-if="showContent=='share'" @click="changeShow" :show="shadeShow">
      <div class="shade-share">
        <div class="arrows">
          <img src="@/assets/images/lesson/arrows.png" alt />
        </div>
        <div class="share-tip">
          <div class="first-tip">
            1.点击右上角“
            <img src="@/assets/images/lesson/ellipsis.png" alt />
            ”
          </div>
          <div class="second-tip">
            2.选择
            <img src="@/assets/images/lesson/moments.png" alt />
            分享朋友圈
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 规则 -->
    <van-overlay class="shade" v-else :show="shadeShow">
      <div class="shade-rule">
        <div class="rule-card">
          <div class="rule-title">教材领取规则</div>
          <div class="rule-content">
            <div>1、点击“邀请好友”分享给好友，好友完成报名选课缴费后，您即可获赠教科书一本。获赠书籍为您报名课程教科书。</div>
            <div>2、赠送书籍将在报名截止后1-3个工作日内寄出，费用由网上老年大学承担，如被要求收费均为诈骗。</div>
            <div>3、赠送书籍为网上老年大学送给学员的福利，仅有少量名额，先到先得。</div>
            <div>4、本活动最终解释权归网上老年大学所有。</div>
          </div>
        </div>
        <div class="close-img" @click.stop="changeShow">
          <img src="@/assets/images/lesson/close.png" alt />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Overlay } from 'vant'
import store from '@/store'
export default {
  name: 'InviteTask',
  components: {
    'van-overlay': Overlay
  },
  data() {
    return {
      shadeShow: false, //遮罩层的展示
      showContent: 'rule', //展示的内容： 'share'--邀请好友 'rule'--领奖规则
    }
  },
  methods: {
    changeShow() {
      this.shadeShow = !this.shadeShow
    },
    showShade(showContent) {
      if(showContent === 'share'){//分享的时候判断是否app环境下
        var isApp = store.state.terminal  //APP端
        if(isApp === 'App'){
          console.log("app环境下，调用APP的分享方法")
          // window.ReactNativeWebView.postMessage(JSON.stringify({route: 'enrollment'}))
        }else{
          this.showContent = showContent
          this.changeShow()
        }
      }else{
        this.showContent = showContent
        this.changeShow()
      }
      
    },
    toRank(){
      console.log("查看排行榜")
    },
    editAddress(){
      console.log("修改地址")
    }
  }
}
</script>

<style lang="scss">
.invite-page {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  .header {
    // height: 21.875rem /* 350/16 */;
    background: url('~@/assets/images/lesson/active.png') no-repeat;
    background-size: 100%;
    padding-top: 13.125rem /* 210/16 */;
    margin-bottom: 15px;
    .help-rank {
      margin: 0 0.9375rem;
      //   margin: -2.15625rem 0.9375rem 0.9375rem 0.9375rem;
      height: 8.75rem /* 140/16 */;
      background: #fff;
      border-radius: 0.5rem /* 8/16 */;
      .rank-title {
        height: 3.75rem /* 60/16 */;
        border-bottom: 0.03rem solid #e9e9e9;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-left {
          height: 1.84375rem;
          margin-left: 0.9375rem /* 15/16 */;
          font-size: 1.3125rem /* 21/16 */;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 1.84375rem;
        }
        .title-right {
          width: 6.8125rem /* 109/16 */;
          height: 1.875rem /* 30/16 */;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(242, 50, 58, 0.1);
          border-radius: 1.25rem 0px 0px 1.25rem;
          span {
            width: 4.8125rem /* 77/16 */;
            text-align: center;
            font-size: 0.9375rem /* 15/16 */;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(242, 50, 58, 1);
            margin-left: 0.625rem /* 10/16 */;
          }
          img {
            width: 0.4375rem /* 7/16 */;
            height: 0.625rem /* 10/16 */;
            margin-right: 0.625rem /* 10/16 */;
          }
        }
      }
      .rank-number {
        flex: 1;
        height: 5rem /* 80/16 */;
        line-height: 5rem;
        font-size: 1.25rem /* 20/16 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: center;
        span {
          font-size: 1.875rem /* 30/16 */;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(242, 50, 58, 1);
          margin: 0 0.625rem /* 10/16 */;
        }
      }
    }
  }
  .invite-user {
    background: #fff;
    margin: 0 0.9375rem;
    border-radius: 0.5rem /* 8/16 */;
    .invite-title {
      height: 3.75rem /* 60/16 */;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.03rem solid #e9e9e9;
      .title-left {
        height: 1.84375rem;
        margin-left: 0.9375rem /* 15/16 */;
        font-size: 1.3125rem /* 21/16 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1.84375rem;
      }
      .title-right {
        width: 6.8125rem /* 109/16 */;
        height: 1.875rem /* 30/16 */;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(242, 50, 58, 0.1);
        border-radius: 1.25rem 0px 0px 1.25rem;
        span {
          width: 4.8125rem /* 77/16 */;
          text-align: center;
          font-size: 0.9375rem /* 15/16 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(242, 50, 58, 1);
          margin-left: 0.625rem /* 10/16 */;
        }
        img {
          width: 0.4375rem /* 7/16 */;
          height: 0.625rem /* 10/16 */;
          margin-right: 0.625rem /* 10/16 */;
        }
      }
    }
    .invite-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 0.03rem solid #e9e9e9;
      .help-number {
        flex: 1;
        line-height: 1.75rem /* 28/16 */;
        font-size: 1.25rem /* 20/16 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: center;
        margin-bottom: 0.9375rem;
        margin-top: 2.1875rem /* 35/16 */;
        span {
          font-size: 1.875rem /* 30/16 */;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(242, 50, 58, 1);
          margin: 0 0.625rem /* 10/16 */;
        }
      }
      .invite-share {
        width: 16rem /* 256/16 */;
        height: 3.125rem /* 50/16 */;
        background: rgba(242, 50, 58, 1);
        border-radius: 1.71875rem /* 27.5/16 */;
        text-align: center;
        line-height: 3.125rem /* 50/16 */;
        font-size: 1.3125rem /* 21/16 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 1.875rem /* 30/16 */;
      }
    }
    .invite-tip {
      padding: 0.9375rem 1.28125rem /* 20.5/16 */;
      text-align: center;
      div {
        font-size: 19px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
      }
    }
  }
  .invite-footer {
    padding: 0.9375rem;
    .change-address {
      width: 21.5625rem /* 345/16 */;
      height: 3.4375rem /* 55/16 */;
      line-height: 3.4375rem;
      text-align: center;
      background: #fff;
      font-size: 1.3125rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }

  //遮罩提示
  .shade {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
    .shade-share {
      margin-top: 6.4375rem /* 103/16 */;
      .arrows {
        position: absolute;
        top: 1.59375rem /* 25.5/16 */;
        right: 1.5625rem /* 25/16 */;
        img {
          width: 3.25rem /* 52/16 */;
          height: 3rem /* 48/16 */;
        }
      }
      .share-tip {
        padding: 1.5625rem /* 25/16 */;
        // position: absolute;
        // top: 6.46875rem /* 103.5/16 */;
        background: #fff;
        border-radius: 0.5rem /* 8/16 */;
        div {
          height: 1.75rem /* 28/16 */;
          line-height: 1.75rem /* 28/16 */;
          font-size: 1.3125rem /* 21/16 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .first-tip {
          margin-bottom: 0.9375rem;
          img {
            width: 1.40625rem /* 22.5/16 */;
            height: 0.25rem /* 4/16 */;
          }
        }
        .second-tip {
          img {
            width: 1.5rem /* 24/16 */;
            height: 1.5rem;
          }
        }
      }
    }
    .shade-rule {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .rule-card {
        width: 20.1875rem /* 323/16 */;
        height: 22.6875rem /* 363/16 */;
        background: #fff;
        border-radius: 0.5rem /* 8/16 */;
        margin-bottom: 0.9375rem /* 15/16 */;
        .rule-title {
          height: 4.25rem /* 68/16 */;
          line-height: 4.25rem;
          text-align: center;
          font-size: 1.4375rem /* 23/16 */;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }
        .rule-content {
          margin: 0 1.25rem 1.25rem 1.25rem;
          height: 17.25rem /* 276/16 */;
          overflow: hidden;
          overflow-y: auto;
          font-size: 1.3125rem /* 21/16 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 2rem /* 32/16 */;
        }
      }
      .close-img {
        width: 100%;
        text-align: center;
        img {
          width: 2.1875rem /* 35/16 */;
          height: 2.1875rem /* 35/16 */;
        }
      }
    }
  }
}
</style>