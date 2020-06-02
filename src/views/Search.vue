<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-20 09:22:14
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-30 11:09:18
--> 
<template>
  <div class="search-page">
    <div class="title">
      <form action="javascript:return true">
        <van-search
          v-model="keyWord"
          shape="round"
          clearable
          show-action
          autofocus
          placeholder="请输入搜索关键词"
          @search="searchWorld"
          @cancel="cancel"
          @input="handleFieldClick"
          @focus="handleFieldClick"
        >
          <div class="c-img" slot="left-icon">
            <img src="@/assets/images/lesson/search.png" alt />
          </div>
        </van-search>
      </form>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="downPull">
        <div class="curr-list" v-if="classList.length">
          <div class="curr-list-item" v-for="(item,index) in classList" :key="index">
            <list-item :lesson="true" :item="item" @toDetail="toDetail">
              <div slot="lesson" class="join">立即报名</div>
            </list-item>
          </div>
        </div>
        <div class="none-list" v-else>
          <van-empty :image="require('@/assets/no-list1.png')" description="暂无相关搜索课程" />
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 提示内容 -->
    <currTip :repeatShow="repeatShow"></currTip>
  </div>
</template>

<script>
import { Empty, List, PullRefresh, Search, Dialog } from 'vant'
import ListItem from '@/components/listItem'
import CurrTip from '@/components/currTip'
import http from '@/api/index.js'
export default {
  name: 'Search',
  data() {
    return {
      repeatShow: false, //重复报名提示
      keyWord: '', //搜索关键词
      classList: [], //班级列表
      page: 0,
      totalPage: 2,
      loading: false, //是否处于加载中
      finished: true, //是否加载完成
      refreshing: false
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'Lesson') {
      this.keyWord = ''
      this.classList = []
    }
    next()
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: '/lesson-detail', query: { id } })
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
        .catch(err => {})
    },
    applyCourse(e, item) {
      //立即报名
      if (!this.$store.state.token) {
        this.$router.push({ name: 'Login' })
        return
      }
      let params = { id: item.id }
      //立即报名，提交订单
      let info = {
        list: [item],
        classIdList: [item.id],
        totalMoney: item.money
      }
      http
        .applyCourse(params)
        .then(res => {
          if (res.data.status === 3) {
            //该课程已经完成报名
            this.$router.push({ path: '/lesson-detail', query: { id: item.id } })
          } else if (res.data.status === 0 || res.data.status === 1 || res.data.status === 2) {
            //班级或者同类班级已经在选课单内,去提交订单--2
            this.$store.commit('setConfirmOrderList', info)
            this.$router.push({ name: 'ConfirmOrder' })
          } else if (res.data.status === 4) {
            //已报名完成该课程的其他班级--3
            this.repeatShow = true
          } else if (res.data.status === 5) {
            //去支付--5
            // this.$store.commit('setConfirmOrderList', info)
            this.dialog('您已提交该班级报名', "点'去支付'完成报名", '去支付', 'Order', { index: 1 })
          } else if (res.data.status === 6) {
            //去支付--6
            this.dialog('您已提交相同课程报名', "点'去支付'完成报名", '去支付', 'Order', { index: 1 })
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast(err)
        })
    },
    cancel() {
      this.$router.back()
    },
    searchWorld() {
      this.keyWord.length ? this.searchCourseClass() : (this.classList = [])
    },
    searchCourseClass(page = 0) {
      let params = {
        keyword: this.keyWord,
        pageSize: 10,
        pageNum: page
      }
      http.searchCourseClass(params).then(res => {
        if (page == 0) {
          this.classList = res.data.content
          this.totalPage = res.data.totalPages
        } else {
          this.classList = this.classList.concat(res.data.content)
        }
        //加载状态完成
        this.loading = false
        // 数据全部加载完成
        // this.finished = true
        //下拉刷新完成
        this.refreshing = false
      })
    },
    downPull() {
      //上拉加载
      if (this.page > this.totalPage) {
        //  数据全部加载完成，可以弹提示
        this.finished = true
        return
      }
      this.searchCourseClass(this.page)
    },
    onRefresh() {
      //下拉刷新
      // 将 loading 设置为 true，表示处于加载状态,不加载load
      this.loading = true
      // 清空列表数据
      this.classList = []
      this.page = 0
      this.searchCourseClass()
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
  components: {
    'list-item': ListItem,
    'van-list': List,
    'van-pull-refresh': PullRefresh,
    'van-empty': Empty,
    'van-search': Search,
    CurrTip
  }
}
</script>

<style lang="scss">
.search-page {
  width: 100%;
  min-height: 100vh;
  .curr-list {
    margin: 4.375rem 0.9375rem 0 0.9375rem;
    .curr-list-item {
      border-bottom: 0.03rem solid #e9e9e9;
    }
    .join {
      position: absolute;
      bottom: 0.84375rem /* 13.5/16 */;
      right: 0;
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
      text-align: center;
    }
  }
  .none-list {
    margin-top: 4.375rem /* 70/16 */;
    padding-top: 5.625rem /* 90/16 */;
    width: 100%;
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
.van-pull-refresh {
  min-height: 100vh;
}
.van-search {
  width: 100%;
  height: 4.375rem /* 70/16 */;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
  z-index: 1;
  border-bottom: 0.03rem solid #e9e9e9;
  padding: 0.9375rem 0 0.9375rem 0.9375rem;
}
.van-search__content {
  padding-left: 0.9375rem /* 15/16 */;
  height: 100%;
  align-items: center;
}
.c-img {
  width: 1.1875rem /* 19/16 */;
  height: 1.625rem /* 26/16 */;
  margin-right: 0.3125rem;
  display: flex;
  align-items: center;
  & > img {
    width: 1.1875rem;
    height: 1.1875rem;
  }
}
.van-field__right-icon {
  display: flex;
  align-items: center;
  padding: 0 0.9375rem /* 15/16 */;
  .d-img {
    width: 20px;
    height: 20px;
  }
}

.van-cell {
  display: flex;
  align-items: center;
}
.van-field__control {
  font-size: 1.25rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 1.75rem /* 28/16 */;
}
.van-search__action {
  padding: 0 0.9375rem;
  font-size: 1.25rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
</style>