<template>
    <!--弹框组件,样式参考Mint UI-->
    <div class="msgbox">
        <div class="mint-msgbox" style="position: absolute; z-index: 2001;max-width: 620px;">
            <i class="iconfont icon-close icon-guanbi" @click="close_box"></i>
            <div class="mint-msgbox-header">
                <div class="mint-msgbox-title">{{titleName}}</div>
            </div>
            <div class="mint-msgbox-content">
                <div class="mint-msgbox-message">
                    <slot></slot>
                </div>
            </div>
            <div class="mint-msgbox-btns">
                <button class="mint-msgbox-btn mint-msgbox-cancel" @click="close_box">取消</button>
                <button class="mint-msgbox-btn mint-msgbox-confirm" @click="submit">确定</button>
            </div>
        </div>
        <div class="v-modal" style="z-index: 2000;"></div>
    </div>
</template>
<style lang="stylus" scoped>
    .mint-msgbox-content {
        padding: 10px 10px;
    }
    .mint-msgbox-btn{
        height :auto;
    }
    table{
        width: 90%;
        margin:0;
        padding:0;
        border-collapse: collapse;
        border-spacing: 0;
        margin: 0 auto;
        th{
            /*background: #eff2f7;*/
        }
        th,td{
            font-size: 1em;
            text-align: center;
            box-sizing: border-box;
            border :1px solid #c8cccf;
        }
    }
</style>
<script>
    import { MessageBox } from 'mint-ui';
    export default{
        data(){
            return{
            }
        },
        methods:{
            close_box(){
                this.$emit('close-box');
            },
            submit(){
                this.$emit('submit');
            },
        },
        props:{
            titleName:{},
        },
        components:{

        }
    }
</script>

