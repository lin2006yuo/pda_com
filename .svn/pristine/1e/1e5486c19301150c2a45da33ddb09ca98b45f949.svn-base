<template>
    <!--操作页面的选择组件-->
    <div class="c-line-select">
        <span class="line-text" :style="`width:${textWidth}%;`">{{lineName}}</span>
        <!--<input type="text" v-model="">-->
        <!--<mt-actionsheet-->
                <!--:actions="actions"-->
                <!--v-model="sheetVisible">-->
        <!--</mt-actionsheet>-->
        <select v-model="select"
                class="form_select"
                :style="`width:${inputWidth}%;`"
                @change="select_change(select)">
            <i class="select_i"></i>
            <option v-for="item in selectList"
                    :key="item.value"
                    :label="`${item.label}\t\t\t(${item.create_time})`"
                    :value="item.value">{{item.label}}</option>
        </select>
        <i class="select_icon">&lt;</i>
        <div style="clear: both;"></div>
    </div>
</template>
<style lang="stylus" scoped>
    .c-line-select{
        position:relative;
        width: 98%;
        text-align: center;
        margin: 5% auto;
        padding: 0 3%;
        .select_icon{
            position: absolute;
            transform: rotate(-90deg);
            right: 30px;
            top: 5px;
            color: #999;
        }
        .line-text{
            line-height:2em;
            display: inline;
            float: left;
            font-size :14px;
            margin-right:1%;
        }
        .form_select{
            position:relative;
            float :left;
            -web-kit-appearance:none;
            -moz-appearance: none;
            display: inline;
            font-size:1em;
            height:2em;
            border-radius:3px;
            border:1px solid #c8cccf;
            margin: 0 auto;
            padding-left :3px;
            option{
                font-size:11px !important;
            }
        }
    }

</style>
<script>
    export default {
        data() {
            return {
                select:this.value,
                actions:[111],
                sheetVisible:false,
            }
        },
        mounted(){
        },
        methods:{
            select_change(select){
                console.log('select',select);
                this.$emit('select-change',select);
            },
        },
        watch:{
            value(val){
                this.select = val;
            },
            select(val){
                this.$emit('input',val)
            },
        },
        props:{
            value:{},
            selectList:{ /*select选项*/
                type:Array,
            },
            lineName:{},/*select标题*/
            textWidth:{ /*标题width*/
                type:Number,
                default:22,
            },
            inputWidth:{ /*select的width*/
                type:Number,
                default:75,
            },
        },
        components: {}
    }
</script>
