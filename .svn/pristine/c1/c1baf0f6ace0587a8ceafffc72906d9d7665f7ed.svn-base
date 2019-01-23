<template>
    <!--可折叠显示的table显示组件-->
    <div class="c-tab-table" v-if="codeCount>0">
        <div class="card">
            <div :class="['card-head',tagShow?'border-bottom':'' ]" @click="look_tag">{{titleName}}（<span>{{codeCount}}</span>）<i :class="['mintui','mintui-back',tagShow?'ico-up':'ico-down']"></i></div>
            <div v-if="tagShow" class="card-content">
                <table width="100%" class="table">
                    <slot></slot>
                </table>
            </div>
        </div>

    </div>
</template>
<style lang="stylus" scoped>
    .c-tab-table{
        .card{
            width: 90%;
            height :auto;
            text-align: center
            border-radius:4px;
            border: 1px solid #c8cccf;
            margin:0 auto;
        }
        .card-head{
            height: 3em;
            font-size:1em;
            text-align: center
            line-height: 3em;
        }
        .border-bottom{
            border-bottom: 1px solid #c8cccf;
        }
        .ico-down{
            float :right;
            margin-right :5%;
            transform:rotate(270deg);
            -ms-transform:rotate(270deg);
            -moz-transform:rotate(270deg);
            -webkit-transform:rotate(270deg);
            -o-transform:rotate(270deg);
        }
        .ico-up{
            float :right;
            margin-right :5%;
            transform:rotate(90deg);
            -ms-transform:rotate(90deg);
            -moz-transform:rotate(90deg);
            -webkit-transform:rotate(90deg);
            -o-transform:rotate(90deg);
        }
        .card-content{
            width: 100%;
            min-height :3em;
            max-height :25em;
            overflow-y: auto;
            text-align: center;
        }
        thead tr {
            height: 40px
            border-bottom: 1px solid #c8c8c8
        }

    }

</style>
<script>

    export default{
        data(){
            return{
                tagShow:true,
            }
        },
        methods:{
            look_tag(){
                this.tagShow = !this.tagShow;
            },
        },
        props:{
        	titleName:{},/*显示table的标题*/
            codeCount:{}/*显示table的中数据的数量*/
        },
        components:{

        }
    }
</script>

