<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-27 19:19:40
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-04 19:14:35
--> 
<template>
  <div class="pop-page">
    <van-popup :value="showPop" overlay-class="pop-overlay" :close-on-click-overlay="false">
      <div class="content-box">
        <slot name="img"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
        <van-button type="danger" @click="handleButtonClick">{{ typeObj[type]['buttonText'] }}</van-button>
      </div>
      <img class="close-box" src="@/assets/images/lesson/close.png" alt @click.stop="close" />
    </van-popup>
  </div>
</template>

<script>
import { Popup, Button } from 'vant'
export default {
  props: {
    showPop: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'qrCode'
    },
    orderId: null
  },
  components: {
    'van-popup': Popup,
    'van-button': Button
  },
  data() {
    return {
      typeObj: {
        qrCode: {
          buttonText: '保存图片',
          buttonClick: 'saveImg'
        },
        InviteTask: {
          buttonText: '领取教材',
          buttonClick: 'InviteTask'
        }
      }
    }
  },
  methods: {
    handleButtonClick() {
      this[this.typeObj[this.type]['buttonClick']]()
    },
    saveImg() {
      this.$toast('长按保存图片')
    },
    InviteTask() {
      this.$router.push({ name: 'InviteTask', query: { shareId: this.$store.state.userId, orderId: this.orderId } })
    },
    close() {
      this.$emit('close', false)
    },
    getBase64Img(url) {
      //网络资源图片转成base64
      //console.log("图片路径",url)
      var canvas = document.createElement('canvas') //创建canvas DOM元素
      var ctx = canvas.getContext('2d')
      return new Promise((reslove, reject) => {
        var img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = function() {
          canvas.height = img.height //指定画板的高度,自定义
          canvas.width = img.width //指定画板的宽度，自定义
          ctx.drawImage(img, 0, 0, img.width, img.height)
          var dataURL = canvas.toDataURL('image/jpeg')
          canvas = null
          reslove(dataURL)
        }
        img.onerror = function(err) {
          reject(err)
        }
        img.src = url
      })
    }
  }
}
</script>

<style lang="scss">
.pop-page {
  .pop-overlay {
    background-color: rgba(0, 0, 0, 0.6) !important;
  }
  .van-popup--center {
    background-color: transparent !important;
    @include flex(flex-start, center, column, nowrap);
  }
  .content-box {
    width: 20.19rem;
    background: #fff;
    border-radius: 0.5rem;
    padding: 0 1.5rem;
    box-sizing: border-box;
    @include flex(flex-start, center, column, nowrap);
    .van-button--danger {
      margin-bottom: 1.56rem;
      width: 100% !important;
      height: 2.81rem !important;
      background: rgba(242, 50, 58, 1) !important;
      border-radius: 1.41rem !important;
      .van-button__text {
        font-size: 1.19rem !important;
        font-weight: 400 !important;
        color: rgba(255, 255, 255, 1) !important;
        line-height: 2.81rem !important;
      }
    }
  }
  .close-box {
    margin-top: 0.94rem;
    width: 2.19rem;
    height: 2.19rem;
  }
}
</style>
