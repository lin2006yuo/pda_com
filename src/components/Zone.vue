<template>
    <mt-popup
            class="ui-popup"
            v-model="popupVisible"
            position="bottom">
        <div class="dialog">
            <header class="header">
                分区: {{areashow.label}}
                <span class="close" @click="close">关闭</span>
            </header>

            <div class="table-box" ref="tab">
                <div class="table">
                    <span v-for="(item,index) in zone" :key="index" ref="item"
                          @click="Isme(item,index)"
                          :style="{color:clickIndex===index?`#FFFFFF`:'',background:clickIndex===index?`#30B7B1`:''}"
                          :class="{init:clickIndex}"
                          >
                        {{item.label}}
                    </span>
                    <!--#30B7B1-->
                </div>
            </div>
        </div>
    </mt-popup>

</template>

<script>
    import { Toast } from 'mint-ui';
    //import {login} from "@/api/user";
    export default {
        data() {
            return {
                popupVisible:this.value ,
                t: 2,
                datas:this.turnover,
                clickIndex:null,
                areashow:'',
                xz:this.wareid,
                sellable:null,
                area:[],
                findvalue:''
            }
        },
        updated(){
            console.log('this.zone',this.zone)
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
                this.popupVisible=false
            },
            Isme(v,i){
                this.clickIndex=i
                this.areashow=v
                this.$emit('update:sebox',v.box)
                this.xz=v.value
                this.sellable=v.label
                this.popupVisible=false
                this.$emit('update:wareid',this.xz)
                 this.$emit('get_wareid',this.sellable)
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
                this.popupVisible = val;
            },
            turnover(val){
                this.datas = val;
            },
            sebox(val){
                this.clickIndex=val
            },
            seltitle(val){
                let index = this.zone.findIndex(item =>item.label === val);
                this.clickIndex = index;
            }
        },
        // props:{
        //     value:Boolean,
        //     turnover:{
        //         type:Array,
        //         default:[]
        //     },
        //     sebox:Number
        // },
        props:['value','turnover','sebox','zone','sel','wareid','seltitle']
    }
</script>

<style scoped>
.close {
    color:rgb(48, 183, 177);
    margin-left:40px;
}
.dialog{
    display: flex;
    flex-direction: column;
}
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
    margin: 8px auto 0 auto;
    height: 192px;
    overflow: auto;
}
.table{
    display: flex;
    flex-flow: wrap;
}
.table-box .table span{
    border-right: 1px solid rgb(228,228,228);
    border-bottom:  1px solid rgb(228,228,228);
    width: 89px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
}
.table-box .table span:nth-child(3n){
    border-right: none;
}
.init{
    color: #30B7B1;
}
.mint-popup-bottom{
        border-radius: 4px;
        height: 255px;
         width: 285px;
        transform: translate3d(-50%, -45%, 0)
}
</style>