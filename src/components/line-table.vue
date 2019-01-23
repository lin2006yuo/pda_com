<template>
    <!--列表条目组件,用于数据条目或详情页-->
    <div class="c-line-table">
        <!--<ul class="list-box">-->
            <slot></slot>
        <!--</ul>-->
    </div>
</template>
<style lang="stylus" scoped>
    .c-line-table{
        table{
            width: 284px;
            padding:0;
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0 auto 1rem ;
            tr{
                border :1px solid #c8cccf;
                th,td{
                    font-size: 13px;
                    padding: 0 1%;
                    max-height :24px;
                    text-align: center;
                    box-sizing: border-box;
                    overflow: scroll;
                    border-right:1px solid #c8cccf;
                }
                td:last-of-type{
                    border-right:none;
                }
            }

        }
    }

</style>
<script>

    export default{
        data(){
            return{

            }
        },
        components:{

        }
    }
</script>

