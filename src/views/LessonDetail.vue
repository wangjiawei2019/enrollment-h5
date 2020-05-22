<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-22 11:41:33
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-22 17:34:16
--> 
<template>
    <div class="detail-page">
        <div class="header">
            <img class="detail-img" :src="detail.image || require('@/assets/site.png')" alt="" />
            <div class="info">
                <div class="name">{{detail.name}}</div>
                <div class="subtitle">{{detail.subtitle}}</div>
                <div class="msg">
                    <div class="price">
                        <span>￥</span>
                        <span>{{detail.money}}</span>
                    </div>
                    <div class="join">{{detail.num}}人已报名</div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="text">课程详情</div>
            <div class="detail-info" v-html="detail.classInfo"></div>
        </div>
        <div class="footer">
            <div class="left">加入选课单</div>
            <div class="right">立即报名</div>
        </div>
    </div>
</template>

<script>
import http from '@/api';
export default {
    name: 'LessonDetail',
    data(){
        return {
            id:0,
            detail: {}
        }
    },
    methods:{
        getClassDetail(id){
            http.getClassDetail({id}).then(res=>{
                this.detail = res.data
                document.title = res.data.name
            })
        }
    },
    mounted(){
        this.id = this.$route.query.id
        this.getClassDetail(this.id)
    }
}
</script>

<style lang="scss" scoped>
.detail-page{
    .header{
        .detail-img{
            width: 100%;
            height: 13.125rem /* 210/16 */;
        }
        .info{
            padding: .9375rem /* 15/16 */;
            background: #fff;
            border-bottom: .625rem solid #F7F7F7;
            
            .name{
                margin-bottom: .625rem /* 10/16 */;
                font-size:1.4375rem /* 23/16 */;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .subtitle{
                font-size:1.3125rem /* 21/16 */;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(102,102,102,1);
                margin-bottom: 1rem /* 16/16 */;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .msg{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .price{
                    span{
                        font-size:1.875rem /* 30/16 */;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(242,50,58,1);
                    }
                    &>span:first-child{
                        font-size: .9375rem /* 15/16 */;
                    }
                }
                .count{
                    font-size:.9375rem /* 15/16 */;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:#666;
                }
            }
        }
    }
    .content{
        padding: .9375rem /* 15/16 */;
        font-size:1.3125rem /* 21/16 */;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        margin-bottom: 5.625rem /* 90/16 */;
        .text{
            margin-bottom: .625rem /* 10/16 */;
        }
        .detail-info{
            font-size:1.1875rem /* 19/16 */;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:1.875rem /* 30/16 */;
        }
    }
    .footer{
        height: 3.4375rem /* 55/16 */;
        position: fixed;
        bottom: 2.1875rem /* 35/16 */;
        left: 1.875rem /* 30/16 */;
        right: 1.875rem /* 30/16 */;
        display: flex;
        align-items: center;
        border-radius: 1.71875rem /* 27.5/16 */;
        overflow: hidden;
        font-size:1.3125rem /* 21/16 */;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        &>div{
            width: 50%;
            height: 3.4375rem;
            line-height: 3.4375rem /* 55/16 */;
            text-align: center;
        }
        .left{
            
            background: #FE9B02;
            border-radius:1.71875rem  0  0  1.71875rem ;
        }
        .right{
            background: #F2323A;
            border-radius:  0 1.71875rem 1.71875rem 0;
        }
    }
}
    
</style>