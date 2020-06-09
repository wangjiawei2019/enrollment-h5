<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-28 17:27:45
 * @LastEditors: wjw
 * @LastEditTime: 2020-06-09 11:46:03
--> 
<template>
  <div class="address-page">
    <van-form @submit="onSubmit" @failed="failed" :show-error-message="false">
      <van-field
        v-model="userGoodsAddress.username"
        clearable
        name="username"
        maxlength="8"
        :border="false"
        label="收货人*"
        label-class="desc"
        label-width="6.8rem"
        placeholder="请填写"
        :rules="[{ required: true, message: '请填写收货人' }]"
        @input="handleFieldClick"
        @focus="handleFieldClick"
      />
      <van-field
        v-model="userGoodsAddress.mobile"
        clearable
        name="mobile"
        maxlength="11"
        :border="false"
        type="tel"
        label="手机号码*"
        label-class="desc"
        label-width="6.8rem"
        placeholder="请填写"
        :rules="[{ required:true, pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请填写正确的手机号码' }]"
        @input="handleFieldClick"
        @focus="handleFieldClick"
      />
      <van-field
        name="area"
        type="textarea"
        rows="1"
        autosize
        :value="areaInput"
        readonly
        :border="false"
        label="所在地区*"
        label-class="desc"
        label-width="6.8rem"
        placeholder="请选择"
        right-icon="arrow"
        :rules="[{ required:true, message: '请选择所在地区' }]"
        @click="() => {showArea = true}"
      />
      <van-popup v-model="showArea" round position="bottom">
        <van-area
          :area-list="areaList"
          item-height="49.5"
          :value="areaPicker"
          @confirm="confirmArea"
          @cancel="() => {showArea = false}"
        />
      </van-popup>
      <van-field
        v-model="userGoodsAddress.address"
        clearable
        name="address"
        maxlength="36"
        :border="false"
        type="textarea"
        rows="2"
        autosize
        label="详细地址*"
        label-class="desc"
        label-width="6.8rem"
        placeholder="请填写"
        :rules="[{ required: true, message: '请填写详细地址' }]"
        @input="handleFieldClick"
        @focus="handleFieldClick"
      />
      <div class="btn-box">
        <van-button round block type="info" native-type="submit">确认</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Popup, Area, Button, Icon } from 'vant'
import http from '@/api'
import areaList from '@/utils/area.js'

export default {
  components: {
    'van-form': Form,
    'van-field': Field,
    'van-popup': Popup,
    'van-area': Area,
    'van-button': Button,
    'van-icon': Icon
  },
  data() {
    return {
      userGoodsAddress: null,
      showArea: false,
      area: null, //
      areaList: areaList
    }
  },
  created() {
    if (this.$store.state.userGoodsAddress) {
      const userGoodsAddress = Object.assign({}, this.$store.state.userGoodsAddress)
      const { provinceId, cityId, areaId } = userGoodsAddress
      const tempProvince = { code: userGoodsAddress.provinceId, name: areaList.province_list[userGoodsAddress.provinceId] }
      const tempCity = { code: userGoodsAddress.cityId, name: areaList.city_list[userGoodsAddress.cityId] }
      const tempArea = { code: userGoodsAddress.areaId, name: areaList.county_list[userGoodsAddress.areaId] }
      this.userGoodsAddress = userGoodsAddress
      this.area = [tempProvince, tempCity, tempArea]
    } else {
      this.userGoodsAddress = { mobile: this.$store.state.mobile }
    }
    this.userGoodsAddress = this.$store.state.userGoodsAddress ? this.$store.state.userGoodsAddress : { mobile: this.$store.state.mobile }
  },
  methods: {
    onSubmit(e) {
      const params = {
        id: this.userGoodsAddress.id,
        username: e.username,
        mobile: e.mobile,
        provinceId: this.area[0].code,
        cityId: this.area[1].code,
        areaId: this.area[2].code,
        address: e.address,
        status: 1
      }
      const method = this.$store.state.userGoodsAddress ? 'updateGoodsAddress' : 'setGoodsAddress'
      http[method](params).then(res => {
        this.$toast('提交成功')
        setTimeout(() => {
          this.$router.back()
        }, 1500)
      })
    },
    failed(errorInfo) {
      const { errors, values } = errorInfo
      this.$toast(`${errors[0].message}`)
    },
    confirmArea(e) {
      this.area = e
      this.showArea = false
    },
    handleFieldClick() {
      this.$nextTick(() => {
        // 手动更改 icon 样式
        const clear = document.getElementsByClassName('van-field__clear')[0] || null
        const img = document.createElement('img')
        img.src = require('@/assets/images/lesson/del.png')
        if (clear) {
          clear.childNodes.length < 2 && clear.appendChild(img) // 保证不重复添加 img 标签
        }
      })
    }
  },
  computed: {
    areaInput() {
      if (!this.area) return ''
      return `${this.area[0].name} ${this.area[1].name} ${this.area[2].name}`
    },
    areaPicker() {
      if (!this.area) return '110101'
      return this.area[2].code
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
    // van-cell
    .van-cell {
      padding: 1.03rem 0 !important;
      border-bottom: 0.03rem solid rgba(233, 233, 233, 1) !important;
      box-sizing: border-box !important;
      align-items: flex-start !important;
    }
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
  .van-field__clear::before {
    content: '' !important;
  }
  .van-field__clear {
    width: 1.25rem !important;
    height: 1.25rem !important;
    & > img {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>