<template>

    <mt-popup
            class="ui-popup"
            v-model="popupVisible"
            position="bottom">
        <div class="dialog">
            <header class="header">
                <span class="_box">已绑定周转箱号 :{{clickIndex}}</span>
                <span class="cancel" @click="close">关闭</span>
            </header>
            <div class="table-box" ref="tab">
                <div class="table">
                    <span v-for="(item,index) in datas" :key="index" ref="item"
                          @click="Isme(item,index)" :style="{color:clickIndex===item.box?`#FFFFFF`:'',background:clickIndex===item.box?`#30B7B1`:''}"
                          :class="{init:clickIndex}"
                          >
                          {{item.box}}
                    </span>
                    <!--#30B7B1-->
                </div>
            </div>
            <div class="foot">
                <span>周转箱号</span>
                <input type="text" ref="newInput" v-model="getInput">
                <button type="button" @click="get_bind_box">确认</button>
                <!--<div class="err" v-if="errmsg">{{errmsg}}</div>-->
            </div>
        </div>
    </mt-popup>

</template>

<script>
    import { Toast } from 'mint-ui';
    import {login} from "@/api/user";
    export default {
        data() {
            return {
                popupVisible:this.value,
                t: 2,
                datas:this.turnover,
                getInput:'',
                errmsg:'',
                clickIndex:null,
            }
        },
        mounted(){
            addEventListener('resize',(event)=>{
                if(!!event&&event.target.innerHeight<400){
                    document.querySelector('.ui-popup').style.height='250px'
                    // this.$refs.pp.style.height=360+'px'
                    this.$refs.tab.style.height=100+'px'
                }else{
                    document.querySelector('.ui-popup').style.height='360px'
                    this.$refs.tab.style.height=192+'px'
                    // this.$refs.pp.style.height=250+'px'
                }
            },false)
        },
        updated(){
           let tab = this.$refs.tab.scrollHeight
           let item = this.$refs.item
           if(tab>192){
             for(let i=0;i<item.length;i++){
                 item[i].style.width=86+'px'
             }
           }
        },
        methods: {
            close(){
                this.popupVisible = false;
            },
            get_bind_box() {
               if(!(/^[0-9]+$/g.test(this.getInput.trim()))){
                   Toast({message: `请输入周转箱号`, position: "top", duration: 1000});
               }else {
                   this.$emit('get_bind_box',this.getInput)
                   this.getInput = '';
               }

            },
            Isme(v,i){
                this.clickIndex=v.box
                this.popupVisible=false
                this.$emit('update:sebox',v.box)
                // console.log(v,'en')
                // console.log(this.selbox)
                if(this.selbox===v.box){
                    console.log(666)
                }
            }
        },
        watch:{
            popupVisible(val){
                this.$emit('input',val)
            },
            value(val){
                if(val){
                    this.$nextTick(()=>{
                        this.$refs.newInput.focus();
                    })
                }
                this.popupVisible = val;

            },
            turnover(val){
                this.datas = val;
            },
            sebox(val){
                console.log('new',val)
                this.clickIndex=val
                console.log(this.clickIndex,'s')
            },
        },
        // props:{
        //     value:Boolean,
        //     turnover:{
        //         type:Array,
        //         default:[]
        //     },
        //     sebox:Number
        // },
        props:['value','turnover','sebox']
    }
</script>

<style scoped>
.cancel{
    color:rgb(33,170,186);
    margin-left:30px;

}
.dialog{
    width: 280px;
    margin: 0 6px;
    display: flex;
    font-size: 14px;
    flex-direction: column;}
.header{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.table-box{
    width: 270px;
    border: 1px solid rgb(228,228,228);
    align-self: flex-end;
    /* display: flex; */
    margin:20px 10px 0 auto;
     height: 192px;
     overflow: auto;
    /* border: 1px solid brown; */
}
.table-box::-webkit-scrollbar-thumb{
    border-radius: 4px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
    background: seagreen;
}
.table{
    display: flex;
    flex-flow: wrap;
}
.table-box .table span{
    border-right: 1px solid rgb(228,228,228);
    border-bottom:  1px solid rgb(228,228,228);
    width: 88px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
}
.foot{
    margin: 20px 0 20px -12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
}
.foot button{
    border: none;
    outline: none;
    height: 24px;
    border-radius: 4px;
    color: white;
    line-height: 24px;
    background: rgb(33, 170, 186);
    text-align: center;
    margin-left: -20px;
}
.foot input{
    border: 1px solid   rgb(33, 170, 186);
    width: 140px;
    outline: none;
    caret-color:  rgb(33, 170, 186);
    padding:4px;
    margin-left: -16px;
}
.err{
    position: absolute;
    font-size: 12px;
    color: red;
}
.init{
    color: #30B7B1;
}
</style>