<template>
    <!--数据输入后截取空格后的字符串,尚未开发完整,目前系统未用到该功能-->
    <div class="c-cut-input">
            <input :value="get_data()"
                   @input="(val)=>{set_data(val)}"
                   type="text"
                   ref="input"
                   @keydown="(val)=>{
                   	down_input(val)
                   }"
                   @blur="(val)=>{
                   	blur_change(val)
                   }">
    </div>
</template>
<style lang="stylus" scoped>
    input{
        width: 80%;
        -web-kit-appearance:none;
        -moz-appearance: none;
        display: block;
        font-size:1em;
        height:2em;
        border-radius:4px;
        border:1px solid #c8cccf;
        margin: 0 auto;
        padding-left :10px;
        margin-bottom 20px;
    }
</style>
<script>
    export default {
        data() {
            return {
                data:this.value,
                curData:[],
            }
        },
        mounted(){
            this.curData = [];
        },
        methods:{
            enter_input(){
            	this.$emit('enter-input');
            },
            down_input(val){
            	if(val.key==='Enter'){
            		this.enter_input();
            		return;
                }
            },
            change_input(val){
            	console.log('change_input',val);
            },
            blur_change(val){
                this.$emit('blur-input');
            },
            get_data(){
            	let val= (/\s+/ig).test(this.data)?this.data.split(/\s+/ig)[0]:this.data
            	return val
            },
            set_data(val){
               this.data=val.target.value;
            },
        },
        watch:{
            data(val){
                this.$emit("input",val)
            },
            value(val){
            	this.data=val;
            }
        },
        props:{
            value:{},
        },
        components: {}
    }
</script>
