<!--
 * @Author: zxk
 * @Date: 2020-05-18 14:01:20
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-27 09:47:57
--> 
<template>
  <div id="login">
    <div class="login-logo">
      <img class="logo" src="@/assets/images/lesson/logo.png" alt="logo" />
      <span class="login-text">网上老年大学</span>
    </div>
    <div class="login-info">
      <div class="writeInfo">
        <div class="icon-ipt">
          <img src="@/assets/images/lesson/phone.png" alt="logo" />
        </div>
        <div class="phone-ipt">
          <input type="text" maxlength="11" placeholder="请输入手机号" v-model="phone" />
        </div>
      </div>
      <div class="writeInfo">
        <div class="icon-code">
          <img src="@/assets/images/lesson/security.png" alt="logo" />
        </div>
        <div class="auth-code">
          <input minlength="4" maxlength="4" type="text" placeholder="请输入验证码" v-model="smsCode" />
        </div>
        <div class="send-code count-down" v-if="sendcode">重新发送({{sendcode}}s)</div>
        <div class="send-code" @click.prevent="sendCode" v-else>获取验证码</div>
      </div>
    </div>
    <div class="btn">
      <div class="submit" @click="userLogin">确认</div>
    </div>
  </div>
</template>

<script>
import http from '@/api/index.js'
import store from '@/store'
export default {
  name: 'Login',
  data() {
    return {
      sendcode: 0, //倒计时
      phone: '',
      smsCode: '' //验证码
    }
  },
  methods: {
    sendCode() {
      //获取验证码
      let that = this
      if (/^[1]([3-9])[0-9]{9}$/.test(this.phone)) {
        that.sendsms()
      } else {
        this.$toast('手机号码格式错误')
      }
    },
    sendsms() {
      let that = this;
      let timer = null;
      const TIME_COUNT = 60
      //发送验证码
      let params = {
        phone: that.phone
      }
      http
        .sendsms(params)
        .then(res => {
          this.$toast.success('验证码已发送');
          that.sendcode = TIME_COUNT
          timer = setInterval(() => {
            if (that.sendcode > 0 && that.sendcode <= TIME_COUNT) {
              that.sendcode--
            } else {
              clearInterval(timer)
              timer = null
            }
          }, 1000)
        })
        .catch(err => {
          this.$toast.fail(err)
        })
    },
    getReadStatus(){
      http.getReadStatus().then(res=>{
        if(res.data){
          this.$router.push({ path: '/index/lesson' })
        }else{
          this.$router.push({ path: '/apply-rule' })
        }
      })
    },
    login() {
      let params = {
        phone: this.phone,
        code: this.smsCode
      }
      http
        .login(params)
        .then(res => {
          //存一下token，看是否要去报名须知
          store.commit('setToken', res.data)
          this.getReadStatus()
        })
        .catch(err => {
          this.$toast(err)
          console.log(err)
        })
    },
    userLogin() {
      let tip = null
      if (this.phone === '') {
        tip = '手机号不能为空'
      } else if (this.smsCode === '') {
        tip = '验证码不能为空'
      } else if (this.smsCode.length != 4) {
        tip = '验证码格式不正确'
      }
      if (tip) {
        this.$toast(tip)
        return
      }
      this.login()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-bottom: 3.125rem /* 50/16 */;
  .logo {
    width: 4.6875rem /* 75/16 */;
    height: 4.6875rem /* 75/16 */;
    margin-top: 3.125rem /* 50/16 */;
    margin-bottom: 1.25rem /* 20/16 */;
  }
  .login-text {
    font-size: 1.3125rem /* 21/16 */;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
}

.login-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  .writeInfo {
    width: 17.1875rem /* 275/16 */;
    height: 3.4375rem /* 55/16 */;
    // line-height: 3.4375rem;
    background: rgba(245, 246, 250, 1);
    border-radius: 1.71875rem /* 27.5/16 */;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 1.875rem /* 30/16 */ 0.9375rem /* 15/16 */ 1.875rem;
    padding: 0 1.25rem /* 20/16 */;
    .icon-ipt,
    .icon-code{
      width: 0.9375rem /* 15/16 */;
      height: 1.375rem /* 22/16 */;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .icon-code {
      width: 1.1875rem /* 19/16 */;
    }
    .phone-ipt,
    .auth-code {
      flex: 1;
      padding: .625rem /* 10/16 */;
      font-size:1.4375rem /* 23/16 */;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:2.03125rem /* 32.5/16 */;
      &>input{
        width: 100%;
        border: none;
        background: none;
        padding: 0;
      }
    }
    .auth-code {
      width: 8.96875rem /* 143.5/16 */;
      position: relative;
    }
    .send-code {
      position: relative;
      // width: 6.375rem /* 102/16 */;
      height: 100%;
      line-height: 3.4375rem;
      font-size: 0.9375rem /* 15/16 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(242, 50, 58, 1);
      text-align: center;
    }
    .send-code::before {
      content: '';
      position: absolute;
      top: 1.09375rem /* 17.5/16 */;
      width: 1px;
      left: -0.625rem /* 10/16 */;
      height: 1.25rem /* 20/16 */;
      background: #bebec0;
    }
    .count-down {
      color: #999999;
    }
  }
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  .submit {
    width: 19.6875rem /* 315/16 */;
    height: 3.4375rem /* 55/16 */;
    line-height: 3.4375rem /* 55/16 */;
    background: #f2323a;
    margin: 1.25rem /* 20/16 */ 1.875rem /* 30/16 */;
    border-radius: 1.71875rem /* 27.5/16 */;
    text-align: center;
    // 字体样式
    font-size: 1.3125rem /* 21/16 */;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
