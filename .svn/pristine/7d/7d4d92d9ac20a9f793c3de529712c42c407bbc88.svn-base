<template>
    <!--操作页面的输入组件-->
    <div class="c-cut-input" @keyup.stop>
        <div class="out-box">
            <span class="line-text" :class="{special:spe}">{{lineName}}</span>
            <!--<span :class="{lineText:all}">{{lineName}}</span>-->
            <!--<span :class="{special:spe}">上架货位</span>-->
            <input ref="input"
                   :class="[error_number?'border-red':'']"
                   v-model.trim="input_value"
                   :type="type"
                   v-bind="$props"
                   @change="input_change"
                   @blur="input_blur"
                   @focus="input_focus($event)"
                   @keyup.enter.stop.prevent="enter_input"
                   @input="inputs"
                   />
            <div class="error">
                <i class="icon-baocuo iconfont red" v-if="error_number"></i>
                <span class="error-red">{{error_number}}</span>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    .c-cut-input{
        .out-box{
            position:relative;
            width: 100%;
            display :flex;
            align-items :center;
            padding-right:20px;
            margin:20px 0 0 0;
            .line-text{
                width: 23%;
                min-width 23%;
                text-align: right;
                padding-right: 7%;
                font-size: 14px;
            }
            .error{
                position:absolute;
                top: 90%;
                left: 22%;
                .error-red{
                    color:red;
                    font-size:13px;
                    flex:1;
                }
            }
            input{
                height:32px;
                flex:1;
                padding: 2px 5px;
                border-radius 3px;
                border:1px solid rgba(0,0,0,.25);
                outline none;
            }
        }
    }
    .special{
        width: 23%;
        min-width 23%;
        text-align: right;
        padding-right: 4% !important;
        font-size: 14px;
    }
</style>
<script>
    export default {
        data() {
            return {
                input_value:this.value,
                error_number:'',
                timer:null,
                temp:'',
                Imgshow:this.imgShow,
            }
        },
        computed:{

        },
       updated(){
       },
        methods:{
            inputs(){
                 this.$emit('update:putInput',this.input_value)
            },
            enter_input(event){
                event.stopPropagation();
                console.log(event);
                console.log(`enter-input`);
                this.$refs.input.blur();
                this.name=event.target.value;
                console.log(this.name,'aaaabbb')
                this.$emit('update:putInput',this.name)
                if(!!this.input_value){
                    if(this.error_number){
                        this.$refs.input.select();
                    }else if(this.errorMessage){
                        this.error_number = this.errorMessage;
                        this.$refs.input.select();
                    }
                }
                this.$emit('enter-input');
                if(this.inputFocus){
                    setTimeout(_=>{
                        this.$refs.input.focus();
                    },300);
                }
            },
            input_change(){
                this.input_value = this.input_value.replace(/(^\s*)|(\s*$)/g,"");
            	if(this.input_value){
                    if(this.type==='number'&&Number(this.input_value)<=0){
                    	if(this.min===0){
                    		console.log(`可以输入0`);
                        }else{
                            this.error_number = `请输入大于0的数值`;
                        }
                    }
                }
            	this.$emit('input-change');
            },
            input_blur(){
                // this.Imgshow=true
                // this.$emit('update:imgShow',this.Imgshow)
                // console.log(this.Imgshow,'shiqu')
                if(!this.input_value){
                    // this.error_number = '';
                    console.count()
                }
                this.$emit('input-blur');
            },
            input_focus(event){
                // this.Imgshow=false
                // // console.log(this.Imgshow,'huoqu')
                // this.$emit('update:imgShow',this.Imgshow)
                if(this.input_value){
                    event.target.select();
                }
            },
        },
        watch:{
            focusState(val){
               if(val){
                   this.$refs.input.focus();
               }
            },

            skufocus(){
                this.$refs.input.focus();
            },
            skuf(){
                this.$refs.input.focus();
            },
            value(val){
                this.input_value = val;
                this.error_number = '';
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
            		this.error_number = val;
                    this.$refs.input.select();
                }else{
                    this.error_number = '';
                }
            },
//            'error_number'(val){
//            	if(val){
//            		console.log(`error`,val);
//                    this.$refs.input.select();
//                }
//            }
        },
        props:{
            focusState:{
                type:Boolean,
                default:false
            },
            get:{},
            skufocus:{},
            skuf:{},
            all:{
                type:Boolean,
            },
            spe:{
                type:Boolean,
            },
            value:{},
            errorMessage:{ /*显示报错信息*/
                type:String,
                default:'',
            },
            lineName:{},/*input标题*/
            min:{},/*控制0的输入*/
            type:{ /*控制inout的类型,默认是text,可传number*/
                type:String,
                default:'text',
            },
            /* inputSelect控制input的选中,但是只能初始时有用,
            现在页面一般这样控制this.$refs.number.$refs.input.select();
            控制选中ref='number'line-input组件里面的input*/
            inputSelect:{
                type:Boolean,
                default:true,
            },
            inputFocus:{ /*控制focus()*/
                type:Boolean,
                default:false,
            },
            textWidth:{ /*设置标题的width*/
                type:Number,
                default:12,
            },
            inputWidth:{ /*设置input的width*/
                type:Number,
                default:86,
            },
            disabled: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        components: {}
    }
</script>
