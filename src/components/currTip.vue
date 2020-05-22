<!--
 * @Github: https://github.com/IdlerHub
 * @Author: zxk
 * @Date: 2020-05-19 14:34:41
 * @LastEditors: zxk
 * @LastEditTime: 2020-05-22 15:49:37
--> 
<template>
    <van-overlay class="curr-tip"  :show="repeatShow" @click="iknow">
        <div class="tip-box" @click.stop>
            <div class="content">
                <div>您已完成以下班级报名</div>
                <div>"{{className}}"</div>
                <div>相同课程请勿重复报名</div>
            </div>
            <div class="know" @click.stop="iknow">我知道了</div>
        </div>
    </van-overlay>
</template>

<script>
import { Overlay } from 'vant';
export default {
    props:{
        repeatShow:Boolean,
        className: {
            type:String,
            default: '相似班级'
        }
    },
    components:{
        'van-overlay':Overlay
    },
    methods:{
        iknow(){
            this.$emit('changeShow',false)
        }
    }
}
</script>

<style lang="scss" scoped>
.curr-tip{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    .tip-box{
        width: 20.1875rem /* 323/16 */;
        height: 13.5rem /* 216/16 */;
        background: #fff;
        border-radius: .5rem /* 8/16 */;
        .content{
            margin: 1.5625rem /* 25/16 */ 1.1875rem /* 19/16 */;
            font-size:1.3125rem /* 21/16 */;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height: 2rem /* 32/16 */;
            text-align: center;
        }
        .know{
            margin: 0 1.5rem /* 24/16 */;
            width:17.1875rem /* 275/16 */;
            height:2.8125rem /* 45/16 */;
            background:rgba(242,50,58,1);
            border-radius:1.40625rem /* 22.5/16 */;
            text-align: center;
            font-size:1.1875rem /* 19/16 */;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:2.8125rem /* 45/16 */;
        }
    }
}
    
</style>