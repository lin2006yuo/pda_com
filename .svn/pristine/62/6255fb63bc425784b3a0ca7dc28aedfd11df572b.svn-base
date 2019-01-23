<template>
    <div class="outbox">
        <div class="wrap">
            <span class="check">查询类型</span>
            <div class="inputbox">
                <input type="text" value="" v-model="selectitem" @click="check">
            </div>
            <div class="custon-btn" @click="changeState">
                <div class="arrow-down"></div>
            </div>
        </div>
       <transition>
           <mt-popup
                   class="ui-popup"
                   v-model="downshow"
                   style="height:280px"
                   position="center">
               <div class="dialog">
                   <header class="header">
                       查询
                       <span class="close" @click="close">关闭</span>
                   </header>
                   <div class="table-box" ref="tab">
                       <div class="table">
                    <span v-for="(item,index) in data" :key="index" ref="item"
                          @click="select(item,index)" :style="{color:showIndex===index?`#FFFFFF`:'',background:showIndex===index?`#30B7B1`:''}"
                    >
                        {{item.label}}
                    </span>
                           <!--#30B7B1-->
                       </div>
                   </div>
               </div>
           </mt-popup>
            <!--<div class="custon-down" v-if="downshow">
                <div class="item" v-for="(item,index) in data" :key="index" @click="select(item,index)" :style="{background:showIndex===index?'rgb(228,228,228)':null}">
                    <span>{{item.label}}</span>
                </div>
            </div>-->
       </transition>
    </div>
</template>

<script>
//条码 有数据的时候 点击item 触发请求  没有数据的时候 可以选择 不请求
    export default {
        props:['selectList','value','gitinput','mmpshow','getShow'],
        data() {
            return {
                data: this.selectList,
                downshow:false,
                showIndex:null,
                selectitem:'SKU',
                resinput:this.gitinput,
                tabshow:this.mmpshow,
            }
        },
        methods: {
            check(){
                console.log(this.selectitem,456465564465)
                this.$emit('req')
                this.$emit('chufa',this.selectitem)
            },
            close(){
                this.downshow = false;
                this.$emit('close',this.downshow)
                this.$emit('update:getShow',this.downshow)
            },
            changeState() {
                this.downshow=!this.downshow
                this.tabshow=false
                this.$emit('update:mmpshow',this.tabshow)
                this.$emit('update:getShow',this.downshow)
               /* if(this.downshow){
                   let int=this.showIndex ||0
                   this.$nextTick(()=>{
                      this.$refs.dot[int].style.background='pink'
                   })
                //    this.$refs.dot[int].style.background='pink'
                }*/
            },
            select(v,i){
                this.tabshow=true
                this.$emit('update:mmpshow',this.tabshow)
                this.showIndex=i
                this.downshow=false
                this.selectitem=v.label
                //this.$emit('chufa',this.selectitem)
                console.log(this.resinput.length,'len')
                this.$emit('req',v.value)
                this.$emit('chufa',this.selectitem)
                // if(this.resinput.length<=0){
                // this.$emit('req')
                // this.$emit('chufa',this.selectitem)
                // }
                // this.$refs.dot[i].style.background='pink'
            }
        },
        watch:{
            downshow(val){
                if(val){}
            },
            showIndex(val){
                this.showIndex=val
            },
           gitinput(val){
               console.log(49794878)
               this.resinput=val
           }
        },
    }
</script>

<style scoped>
    .dialog{
        width:280px;
        margin: 0 6px;
        display: flex;
        flex-direction: column;
    }
    .header{
        margin-top:20px;
        display: flex;
        justify-content:center;
        align-items: center;
    }
    .table-box{
        width:269px;
        border: 1px solid rgb(228,228,228);
        align-self: flex-start;
        margin: 20px 12px 0 0;
        height: 192px;
        overflow: auto;
    }
    .table{
        display: flex;
        flex-flow: wrap;
        flex-direction: column
    }
    .table-box .table span{
        border-right: 1px solid rgb(228,228,228);
        border-bottom: 1px solid rgb(228,228,228);
        width: inherit;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(12, 12, 12, 0.8);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .close{
        text-align: right;
        color: rgb(48, 183, 177);
        margin-left:50px;
    }

.outbox{
    width: 320px;
/*    position: absolute;
    top: 100px;*/
}
.wrap{
    width: inherit;
    display: flex;
    align-items: center;
}
.check{
    font-size: 13px;
    width: 70px;
    margin-left: 12px;
}
.inputbox{
    width: 180px;
    margin-left: -13px;
}
.inputbox input{
    width: inherit;
    height: 32px;
    outline: none;
    /*border: none;*/
    border: 1px solid #b8bbbf;
    border-radius: 4px;
    text-indent: 4px;
}
.custon-btn{
    width: 50px;
    height: 32px;
    border: 1px solid #b8bbbf;
    margin-left: 3px;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    align-items: center;
}
.arrow-down {
    width:0;
    height:0;
    border-right:8px solid transparent;
    border-left:8px solid transparent;
    border-top:8px solid #b8bbbf;
}
.custon-down{
    width: 180px;
    border: 1px rgb(228, 228, 228) solid;
    margin-left: 70px;
    margin-top: 1px;
    border-radius: 4px;
    height: 80px;
    overflow: auto;
}
.custon-down .item{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(228, 228, 228);
    padding: 0 4px;
}

.dot span{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgb(248, 246, 246);
    display: inline-block;
}
</style>