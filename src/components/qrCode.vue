<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-27 19:19:40
 * @LastEditors: zxk
 * @LastEditTime: 2020-06-02 15:06:21
--> 
<template>
  <van-overlay class="qrCode-page" show>
    <div class="code-box" @click.stop>
      <div class="code-img">
        <img :src="qrCodeUrl" style="webkitTouchCallout: none;" alt="班群二维码" />
      </div>
      <div class="content">
        <div class="con-first">长按识别二维码进群</div>
        <div class="con-second">或点击下方按钮保存</div>
      </div>
      <div class="code-save" @click="saveImg">保存图片</div>
      <div class="code-img2">
        <img :src="qrCodeUrl"  style="webkitTouchCallout: none;" alt="班群二维码" />	
      </div>
    </div>
    <div class="close">
      <img src="@/assets/images/lesson/close.png" alt @click.stop="closeJoin" />
    </div>
  </van-overlay>
</template>

<script>
import { Overlay } from 'vant'
export default {
  props: {
    qrCodeUrl: {
      type: String,
      default: ''
    }
  },

  components: {
    'van-overlay': Overlay
  },
  methods: {
    saveImg() {
      this.$toast('长按保存图片')
    },
    closeJoin() {
      this.$emit('closeQr', false)
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

<style lang="scss" scoped>
.qrCode-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 99;
  .code-box {
    width: 20.1875rem /* 323/16 */;
    height: 21.8125rem /* 349/16 */;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.5625rem /* 9/16 */;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    .code-img {
      // width: 9.375rem /* 150/16 */;
      // height: 9.375rem /* 150/16 */;
      // margin-top: 1.5625rem /* 25/16 */;
      // margin-bottom: 0.9375rem /* 15/16 */;
      border-radius: 5px;
      // overflow: hidden;
      img {
        padding: 1.5625rem 0 0.9375rem 0;
        width: 9.375rem /* 150/16 */;
        height: 9.375rem /* 150/16 */;
      }
    }
    .code-img2 {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 4.375rem /* 70/16 */;
      // bottom: 0;
      left: 0;
      z-index: 99;
      opacity: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      font-size: 1.3125rem /* 21/16 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 2rem /* 32/16 */;
    }
    .code-save {
      margin: 1.5625rem /* 25/16 */ 0;
      width: 17.1875rem /* 275/16 */;
      height: 2.8125rem /* 45/16 */;
      line-height: 2.8125rem /* 45/16 */;
      background: rgba(242, 50, 58, 1);
      border-radius: 1.40625rem /* 22.5/16 */;
      color: #fff;
      text-align: center;
      font-size: 1.1875rem /* 19/16 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .close {
    margin-top: 0.9375rem /* 15/16 */;
    width: 100%;
    text-align: center;
    img {
      width: 2.1875rem /* 35/16 */;
      height: 2.1875rem /* 35/16 */;
    }
  }
}
</style>
