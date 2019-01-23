<template>
    <!--带确定按钮的输入框组件,通常用于查询-->
    <div class="c-cut-input">
        <form class="form" :style="mt">
            <input type="text" style="display:none;"/>
            <span class="line-text">{{lineName}}</span>
            <input ref="input"
                   :class="[message_error?'border-red':'','form_input']"
                   v-model="input_value"
                   :type="type"
                   @change="input_change"
                   @blur="input_blur"
                   @focus="input_focus"
                   @keyup.13="submit"/>
            <request-button :request="submit" class="form_input bg" style="background-color: rgb(0, 172, 172);border:none;
    color: #fff;width: 15%;padding-left: 0;display: flex;justify-content: center;align-items: center;">确认</request-button>
            <!--<input type="button" :value="valueName" @click="submit" class="form_input bg" style="width: 15%;padding-left: 0;display: inline;"/>-->
            <div class="error"><i class="icon-baocuo iconfont font-red" v-if="message_error"></i><span class="red">{{message_error}}</span></div>
        </form>
    </div>
</template>
<style lang="stylus" scoped>
    .c-cut-input{
        width: 98%;
        text-align: center;
        margin: 0 auto;
        padding: 0 3%;
        font-size :14px;
        .line-text{
            width: 22%;
            display: inline;
            float: left;
            line-height: 2em;
            /*margin-right:1%;*/
        }
        .form{
            width :100%;
            text-align :center;
        }
        .form_input{
            width: 60%;
            float :left;
            -web-kit-appearance:none;
            -moz-appearance: none;
            display block;
            font-size:1em;
            height:2.3em;
            border-radius:4px;
            border:1px solid #c8cccf;
            padding-left :10px;
            margin-right :1%;
        }
        .error{
            text-align: left;
            padding-left: 22%;
            line-height: 2em;
            height: 4em;
        }
        .font-red{
            color: red;
        }
        .border-red{
            border: 1px solid red;
        }
    }

</style>
<script>
    export default {
        data() {
            return {
                input_value:this.value,
                message_error:'',
                timer:null,
                temp:'',
            }
        },
        mounted(){
        },
        methods:{
            submit(val){
                this.$refs.input.blur();
                this.$nextTick(_=>{
                    // this.name=val.target.value;
                    this.name = this.valueName;
                    if(!!this.input_value){
                        if(this.message_error){
                            this.$refs.input.select();
                        }
                        if(this.errorMessage){
                            this.message_error = this.errorMessage;
                            this.$refs.input.select();
                        }
                    }
                    this.$emit('submit');
                });
                if(this.inputFocus){
                    setTimeout(_=>{
                        this.$refs.input.focus();
                    },300);
                }
            },
            input_change(){
            	this.input_value = this.input_value.replace(/(^\s*)|(\s*$)/g,"");
            	this.$emit('input-change');
            },
            input_focus(){
                if(this.input_value){
                    this.$refs.input.select();
                }
            },
            input_blur(){
                if(!this.input_value){
                    this.message_error = '';
                }
                this.$emit('input-blur');
            },
        },
        watch:{
            value(val){
                this.input_value = val;
                this.message_error = '';
            },
            input_value(val){
                this.$emit('input',val)
            },
            inputSelect(val){
            	if(val){
            		this.$refs.input.select();
                }
            },
            errorMessage(val){
            	if(val){
            		this.message_error = val;
                    this.$refs.input.select();
                }else{
                    this.message_error = '';
                }
            }
        },
        props:{
            value:{},
            errorMessage:{},/*显示报错信息*/
            lineName:{},/*input标题*/
            type:{ /*控制inout的类型,默认是text,可传number*/
                type:String,
                default:'text',
            },
            /* inputSelect控制input的选中,但是只能初始时有用,
             现在页面一般这样控制this.$refs.number.$refs.input.select();
             控制选中ref='number'line-input组件里面的input*/
            inputSelect:{
                type:Boolean,
                default:false,
            },
            inputFocus:{ /*控制focus()*/
                type:Boolean,
                default:false,
            },
            valueName:{ /*按钮名称,默认是确认*/
                type:String,
                default:`确认`,
            },
            mt:{
                type:Object,
                default(){
                    return {
                        'margin-top':'5%',
                    }
                }
            }
        },
        components: {
            requestButton:require('./request-button').default,
        }
    }
</script>
