<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-22 09:52:58
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-22 10:10:21
--> 
<template>
    <div class="apply-rule">
        <div class="content" v-html="content"></div>
        <div class="lesson" @click="toLesson">开始报名</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            content: `<div>报名须知</div>`
        }
    },
    methods:{
        toLesson(){
            this.$router.push('/index')
        }
    }
}
</script>

<style lang="scss" scoped>
    .apply-rule{
        margin: 1.25rem /* 20/16 */;
        .content{
            font-size:1.3125rem /* 21/16 */;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(102,102,102,1);
            padding-bottom: 5.625rem /* 90/16 */;
        }
        .lesson{
            height: 3.375rem /* 54/16 */;
            text-align: center;
            line-height: 3.375rem /* 54/16 */;
            position: fixed;
            bottom: 2.1875rem /* 35/16 */;
            left: 2.125rem /* 34/16 */;
            right: 2.125rem /* 34/16 */;
            font-size:1.3125rem /* 21/16 */;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            background:rgba(242,50,58,1);
            border-radius:2.5rem /* 40/16 */;
        }
    }
</style>