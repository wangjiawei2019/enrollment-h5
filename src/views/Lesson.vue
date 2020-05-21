<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-21 17:21:46
--> 
<template>
  <div class="lesson">
    <div class="header">
      <div class="classify" @click="changeClassify">
        <span>{{majorTitle}}</span>
        <img src="@/assets/images/lesson/down.png" alt />
      </div>

      <div class="search" @click="toSearch">
        <img src="@/assets/images/lesson/search.png" alt />
        <div class="search-ipt">搜索学习课程</div>
      </div>
    </div>
    <div class="class-list" v-show="showClassify">
      <van-tree-select
        @click-nav="selectedClass"
        :items="majorList"
        :main-active-index.sync="majorIndex"
      >
        <div slot="content">
          <div
            :class="['van-tree-select__item',{'van-tree-select__item--active':item.id==courseId}]"
            @click="selectedCourse(item)"
            v-for="(item,index) in courseList"
            :key="index"
          >
            <div class="van-ellipsis">{{item.text}}</div>
            <img v-show="item.id==courseId" src="@/assets/images/lesson/selected.png" alt />
          </div>
        </div>
      </van-tree-select>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div class="curr-list" v-if="false">
          <Curriculums v-for="(item,index) in classList" :key="index" :classItem="item"></Curriculums>
        </div>
        <div class="no-list" v-else>
          <van-empty :image="require('@/assets/no-list1.png')" description="暂无相关课程" />
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 提示内容 -->
    <currTip :repeatShow="repeatShow"></currTip>
  </div>
</template>

<script>
import Curriculums from '@/components/curriculum'
import CurrTip from '@/components/currTip'
import { TreeSelect, Empty, List, PullRefresh } from 'vant'
import http from '@/api/index.js'
export default {
  name: 'Lesson',
  data() {
    return {
      repeatShow: false, //重复报名提示
      showClassify: false, //课程分类
      majorList: [], //专业分类
      courseList: [], //课程分类
      courseId: 0, //课程id
      majorIndex: 0, //专业下标
      majorTitle: '课程分类',
      // classList: [],  //班级列表
      classList: [
        {
          id: 1,
          name: '计算机一班',
          subtitle: '学会修电脑的必备之路',
          image: 'https://xiehui-guanwang.obs.cn-north-1.myhuaweicloud.com:443/uploads/images/20190815%5Ca6dbd1bf97aeb528e2aa6964fb2ab468.jpg',
          money: 0.09,
          num: 500
        },
        {
          id: 1,
          name: '计算机一班',
          subtitle: '学会修电脑的必备之路',
          image: 'https://xiehui-guanwang.obs.cn-north-1.myhuaweicloud.com:443/uploads/images/20190815%5Ca6dbd1bf97aeb528e2aa6964fb2ab468.jpg',
          money: 0.09,
          num: 500
        },
        {
          id: 1,
          name: '计算机一班',
          subtitle: '学会修电脑的必备之路',
          image: 'https://xiehui-guanwang.obs.cn-north-1.myhuaweicloud.com:443/uploads/images/20190815%5Ca6dbd1bf97aeb528e2aa6964fb2ab468.jpg',
          money: 0.09,
          num: 500
        },
        {
          id: 1,
          name: '计算机一班',
          subtitle: '学会修电脑的必备之路',
          image: 'https://xiehui-guanwang.obs.cn-north-1.myhuaweicloud.com:443/uploads/images/20190815%5Ca6dbd1bf97aeb528e2aa6964fb2ab468.jpg',
          money: 0.09,
          num: 500
        },
        {
          id: 2,
          name: '网络一班',
          subtitle: '成为网管的必备之路',
          image: 'https://xiehui-guanwang.obs.cn-north-1.myhuaweicloud.com:443/uploads/images/20190821%5Cdfbe7e4e1f142cde7c6f2dd7e2ef0327.png',
          money: 0.01,
          num: 324
        },
        {
          id: 16,
          name: '算法与数据结构一班',
          subtitle: '算法与数据结构一班副标题',
          image: 'https://hwcdn.jinlingkeji.cn/uploads/images/efac154b0f3bd4b1a2cf764b5e3ae31f.jpg',
          money: 0.01,
          num: 100
        },
        {
          id: 17,
          name: '计算机原理一班',
          subtitle: '计算机原理班级副标题',
          image: 'https://hwcdn.jinlingkeji.cn/uploads/images/abb969f74e0c7f0d7dfd2008a61042a5.jpg',
          money: 0.1,
          num: 100
        },
        {
          id: 18,
          name: '这次不学草书了',
          subtitle: '不学草书副标题',
          image: 'https://hwcdn.jinlingkeji.cn/uploads/images/c919839ee5eaadfb5e8192be231af077.jpg',
          money: 0.0,
          num: 12
        }
      ],
      page: 1,
      totalPage: 1,
      list: [],
      loading: false, //是否处于加载中
      finished: false, //是否加载完成
      refreshing: false
    }
  },
  methods: {
    toSearch() {
      this.$router.push({ path: '/search' })
    },
    changeClassify() {
      //课程分类组件展示
      this.showClassify = !this.showClassify
    },
    selectedClass(index) {
      //选择专业
      console.log('选择专业', this.majorList[index])
      let majorItem = this.majorList[index]
      let text = majorItem.text
      if (majorItem.text === '全部') {
        text = '课程分类'
      }
      this.majorTitle = text
      this.getCourseList()
    },
    selectedCourse(item, flag = false) {
      //选择课程
      let major = this.majorList[this.majorIndex]
      this.courseId = item.id
      let text = item.text
      if (item.text === '全部') {
        text = major.text === '全部' ? '课程分类' : major.text
      }
      this.majorTitle = text
      this.showClassify = flag
      let id = {
        majorId: major.id,
        courseId: item.id
      }
      this.getClassList(id)
    },
    getMajorList() {
      //获取课程分类初始列表
      http.getMajorList().then(res => {
        this.majorList = res.data.majorNodeDTOS
        this.courseList = res.data.courseNodeDTOS
      })
    },
    getCourseList() {
      //获取课程分类
      let params = {
        id: this.majorList[this.majorIndex].id
      }
      http.getCourseList(params).then(res => {
        this.courseList = res.data
        this.selectedCourse(res.data[0], true)
      })
    },
    getClassList(id, page = 1) {
      //获取班级列表
      let { majorId, courseId } = id
      let params = {
        majorId,
        courseId,
        pageNum: page
      }
      http.getClassList(params).then(res => {
        if (page == 1) {
          this.classList = res.data
          this.page++
        } else {
          this.classList = this.classList.concat(res.data)
        }
        this.refreshing = false
        // 数据全部加载完成
        this.finished = true
        //加载状态结束
        this.loading = false
      })
    },
    init() {
      let id = {
        majorId: 0,
        courseId: 0
      }
      this.getMajorList()
      this.getClassList(id)
    },
    onLoad() {
      console.log('上拉加载')
      if (this.page >= this.totalPage) {
        this.finished = true
        return
      }
      let id = {
        majorId: this.majorList[this.majorIndex],
        courseId: this.courseId
      }
      this.getClassList(id, 2)
    },
    onRefresh() {
      console.log('下拉刷新')
      // 将 loading 设置为 true，表示处于加载状态,不加载load
      this.loading = true
      // 清空列表数据
      this.classList = []
      this.page = 1
      // 重新加载数据
      let id = {
        majorId: this.majorList[this.majorIndex].id,
        courseId: this.courseId
      }
      this.getClassList(id, 1)
    }
  },
  mounted() {
    this.init()
  },
  components: {
    Curriculums,
    CurrTip,
    'van-tree-select': TreeSelect,
    'van-empty': Empty,
    'van-list': List,
    'van-pull-refresh': PullRefresh
  }
}
</script>

<style lang="scss" scoped>
.lesson {
  flex: 1;
  .header {
    height: 4.375rem /* 70/16 */;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 0.9375rem /* 15/16 */;
    border-bottom: 1px solid #e9e9e9;
    z-index: 1;
    .classify {
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      width: 6.875rem /* 110/16 */;
      & > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1.3125rem /* 21/16 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-right: 0.65625rem /* 10.5/16 */;
      }
      & > img {
        width: 0.625rem /* 10/16 */;
        height: 0.46875rem /* 7.5/16 */;
      }
    }
    .search {
      flex: 1;
      // width: 11.25rem /* 180/16 */;
      height: 2.5rem /* 40/16 */;
      padding: 0 0.90625rem /* 14.5/16 */;
      margin-left: 1.9375rem /* 31/16 */;
      display: flex;
      align-items: center;
      background: #f5f6fa;
      border-radius: 1.25rem /* 20/16 */;
      & > img {
        width: 1.25rem /* 20/16 */;
        height: 1.25rem /* 20/16 */;
        margin-right: 0.59375rem /* 9.5/16 */;
      }
      .search-ipt {
        // width: 8.125rem /* 130/16 */;
        height: 2.5rem /* 40/16 */;
        line-height: 2.5rem /* 40/16 */;
        background: none;
        border: none;
        font-size: 1.25rem /* 20/16 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }

  .class-list {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 4.4375rem /* 71/16 */;
    z-index: 99;
    background: rgba(0, 0, 0, 0.6);
  }
  .curr-list {
    margin-top: 4.375rem /* 70/16 */;
  }
  .no-list {
    margin-top: 4.375rem /* 70/16 */;
    padding-top: 5.625rem /* 90/16 */;
    width: 100%;
  }
}

//TreeSelect
//左侧样式重写
.van-tree-select {
  height: 27.5rem /* 440/16 */ !important;
}
.van-tree-select__nav {
  background: rgba(247, 247, 247, 1);
}
.van-sidebar-item {
  width: 100%;
  // width: 8.125rem /* 130/16 */;
  padding: 0.875rem /* 14/16 */ 0.9375rem /* 15/16 */;
  font-size: 1.25rem /* 20/16 */;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.van-sidebar-item--select {
  color: #f2323a;
}
.van-sidebar-item--select::before {
  height: 1.5625rem /* 25/16 */;
}

//超出省略改成多行省略
.van-ellipsis {
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* autoprefixer: off */
}
//右侧列表样式重写
.van-tree-select__item {
  display: flex;
  align-items: center;
  position: relative;
  max-height: 3.5rem /* 56/16 */;
  padding: 0.9375rem 2rem 0.9375rem 0;
  margin: 0 0.9375rem /* 15/16 */;
  border-bottom: 1px solid #e9e9e9;
  line-height: 1.75rem /* 28/16 */;
  font-size: 1.25rem /* 20/16 */;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  & > img {
    width: 1.125rem /* 18/16 */;
    height: 0.8125rem /* 13/16 */;
    position: absolute;
    right: 0;
  }
}
.van-tree-select__item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  width: 13.75rem /* 220/16 */;
  height: 0.9375rem /* 15/16 */;
}
.van-tree-select__item--active {
  color: rgba(242, 50, 58, 1);
}
.van-tree-select__selected {
  font-weight: bold;
  right: 0.90625rem /* 14.5/16 */;
}
</style>
