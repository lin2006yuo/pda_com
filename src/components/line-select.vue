<template>
    <!--操作页面的选择组件-->
    <div class="c-line-select">
        <span class="line-text"
              :style="sty_text">{{lineName}}
        </span>
        <select v-model="select"
                class="form_select"
                :style="sty"
                @change="select_change(select)"
                v-if="lineName!=='箱号'"
        >
            <i class="select_i"></i>
            <option v-for="item,index in selectList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
            >{{item.label}}
            </option>
        </select>
        <input type="text" class="xhbox" v-else v-model="box" @focus="selectbox">
        <i class="icon_down" :style="{'right':iconRight}"></i>
    </div>
</template>
<style lang="stylus">
        .c-line-select{
            position:relative;
            width: 90%;
            display :flex;
            align-items :center;
            /*padding-right:20px;*/
            margin:6px 0;
            padding: 5px 0px 5px 10px;
            font-size :14px;
            .line-text{
                width: 23%;
                min-width 23%;
                text-align: right;
                padding-right: 5%;
                font-size: 14px;
            }
            .form_select{
                position:relative;
                height:24px;
                width :230px;
                /*flex:1;*/
                margin-left :-10px;
                padding: 2px 5px;
                border-radius 3px;
                border:1px solid rgba(0,0,0,.25);
                outline none;
                font-size :inherit;

            }
            .xhbox{
                border 1px solid rgba(0,0,0,0.25);
                width: 130px;
                height: 30px;
                margin-left: 6px;
                border-radius:3px;
                padding :0 0 0 6px;
            }
            .icon_down{
                position: absolute;
                top: 13%;
                right: 25px;
                width: 25px;
                height: 25px;
                background-position center ;
                background-image url("../assets/down.png")
            }
        }

</style>
<script>
    export default {
        data() {
            return {
                select:this.value,
                copyshow:this.boxShow
            }
        },
        mounted(){
            
        },
        methods:{
            select_change(select){
            	// console.log('select',select);
            	this.$emit('select-change',select);
            },
            selectbox(){
                this.copyshow=true
                this.$emit('update:boxShow',this.copyshow)
            }
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
            box:{},
            boxShow:{},
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
            sty:{
                type:Object,
                default(){
                    return{
                        "width":"230px"
                    }
                }
            },
            sty_text:{
                type:Object,
                default(){
                    return{
                        'font-size':'14px'
                    }
                }
            },
            iconRight:{
                default(){
                    return '25px'
                }
            }
        },
        components: {}
    }
</script>
