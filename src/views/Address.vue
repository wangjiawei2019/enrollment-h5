<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-28 17:27:45
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-28 21:01:33
--> 
<template>
  <div class="address-page">
    <van-form @submit="onSubmit" @failed="failed" :show-error-message="false">
      <van-field
        v-model="courseClassAddress.username"
        name="username"
        maxlength="8"
        :border="false"
        label="收货人*"
        label-class="desc"
        label-width="6.8rem"
        placeholder="请填写"
        :rules="[{ required: true, message: '请填写收货人' }]"
      />
      <van-field
        v-model="courseClassAddress.mobile"
        name="mobile"
        :border="false"
        type="tel"
        label="手机号码*"
        label-class="desc"
        label-width="6.8rem"
        placeholder="请填写"
        :rules="[{ required: true,pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请填写手机号码' }]"
      />
      <van-field
        v-model="courseClassAddress.address"
        name="address"
        :border="false"
        type="textarea"
        rows="2"
        autosize
        label="详细地址*"
        label-class="desc"
        label-width="6.8rem"
        placeholder="请填写"
        :rules="[{ required: true, message: '请填写详细地址' }]"
      />
      <div class="btn-box">
        <van-button round block type="info" native-type="submit">确认</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button } from 'vant'
import http from '@/api'

export default {
  components: {
    'van-form': Form,
    'van-field': Field,
    'van-button': Button
  },
  data() {
    return {
      courseClassAddress: Object.assign({}, this.$store.state.courseClassAddress)
    }
  },
  methods: {
    onSubmit(e) {
      const params = {
        orderId: this.courseClassAddress.orderId,
        username: e.username,
        mobile: e.mobile,
        address: e.address
      }
      http.setOrderAddress(params).then(res => {
        this.$toast('提交成功')
        setTimeout(() => {
          this.$router.back()
        }, 1500)
      })
    },
    failed(errorInfo) {
      const { errors, values } = errorInfo
      this.$toast(`${errors[0].message}`)
    }
  }
}
</script>

<style lang="scss">
.address-page {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 0.94rem;
  display: flex;
  .van-form {
    flex: 1;
    @include flex(flex-start, flex-start, column, nowrap);
    .btn-box {
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      padding-bottom: 1.84rem;
      @include flex(flex-end, center, column, nowrap);
    }
  }
  .desc {
    line-height: 1.84rem;
    @include font(PingFang SC, 1.31rem, #333, 400);
  }
  .van-field__control {
    font-size: 1.19rem !important;
    font-family: PingFang SC !important;
    font-weight: 400 !important;
    line-height: 1.84rem !important;
  }
  .van-button--info {
    // position: fixed;
    // left: 50%;
    // bottom: 1.84rem;
    // transform: translateX(-50%);
    // width: calc(100% - 1.88rem) !important;
    height: 3.44rem !important;
    border-radius: 1.72rem !important;
  }
}
</style>