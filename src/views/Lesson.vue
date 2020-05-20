<!--
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-18 11:12:49
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-20 13:51:38
--> 
<template>
  <div class="lesson">
    <div class="header">
      <div class="classify" @click="changeClassify">
        <span>{{majorTitle}}</span>
        <img src="@/assets/images/lesson/down.png" alt />
      </div>

      <div class="search">
        <img src="@/assets/images/lesson/search.png" alt />
        <div class="search-ipt">搜索学习课程</div>
      </div>
    </div>
    <div class="class-list" v-show="showClassify">
      <van-tree-select
        @click-nav="selectedClass"
        @click-item="selectedLesson"
        :items="majorList"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
      />
    </div>
    <div class="curr-list" v-if="classList.length">
      <Curriculums v-for="(item,index) in classList" :key="index" :classItem="item"></Curriculums>
    </div>
    <div class="no-list" v-else>
      <van-empty :image="require('@/assets/no-list1.png')" description="暂无相关课程" />
    </div>
    <!-- 提示内容 -->
    <currTip :repeatShow="repeatShow"></currTip>
  </div>
</template>

<script>
import Curriculums from '@/components/curriculums'
import CurrTip from '@/components/currTip'
import { TreeSelect, Empty } from 'vant'
import http from '@/api/index.js'
export default {
  name: 'Lesson',
  data() {
    return {
      repeatShow: false, //重复报名提示
      showClassify: false,  //课程分类
      majorList: [],
      activeId: null,  //课程id
      activeIndex: 0, //专业下标
      majorTitle: '课程分类',
      classList: [],  //班级列表
    }
  },
  methods: {
    changeClassify(){
      this.showClassify = !this.showClassify;
      if(this.showClassify){
        this.getMajorList();
      }
      // console.log("dakai")
    },
    selectedClass(index){
      console.log("选择专业",this.majorList[index])
      let majorItem = this.majorList[index];
      this.majorTitle = majorItem.text;
      this.getClassList(majorItem.id,1);
    },
    selectedLesson(e){
      console.log("选择课程",e);
      let id = this.activeId;
      if(e.text === '全部'){  //课程选择全部，title显示专业类别
        //使用专业id请求
        //id = this.majorList[index].id
      }else{
        this.majorTitle = e.text;
      }
      this.getClassList(id,1);
      this.changeClassify();
    },
    getMajorList(){ //获取课程分类
      http.getMajorList().then(res=>{
        this.majorList = res.data;
        if(!this.activeId){ //第一次进来获取的班级列表
          this.activeId = res.data[0].children[0].id;
        }
        this.getClassList(this.activeId,1);
      })
    },
    getClassList(id,page){  //获取班级列表
      let params = {
        id,
        pageNum: page,
        pageSize: 10
      }
      http.getClassList(params).then(res=>{
        // console.log(res)
        this.classList = res.data;
      })
    }

  },
  mounted(){
    this.getMajorList();
  },
  components: {
    Curriculums,
    CurrTip,
    "van-tree-select":TreeSelect,
    'van-empty': Empty
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
      & > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 5.28125rem /* 84.5/16 */;
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
      width: 11.25rem /* 180/16 */;
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
        width: 8.125rem /* 130/16 */;
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
    position: absolute;
    top: 4.4375rem /* 71/16 */;
    z-index: 99;
    background: rgba(0, 0, 0, 0.6);
  }
  .curr-list {
    margin-top: 4.375rem /* 70/16 */;
  }
  .no-list {
    margin-top: 4.375rem /* 70/16 */;
    padding-top: 2.8125rem /* 45/16 */;
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
  max-height: 3.5rem /* 56/16 */;
  padding: 0.9375rem 2rem 0.9375rem 0;
  margin: 0 0.9375rem /* 15/16 */;
  border-bottom: 1px solid #e9e9e9;
  line-height: 1.75rem /* 28/16 */;
  font-size: 1.25rem /* 20/16 */;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
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
