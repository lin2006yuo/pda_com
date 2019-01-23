    <template>
        <!--table显示组件,统一样式,条码查询页面使用-->
        <div class="c-ui-table">
            <table>
                <slot></slot>
            </table>
        </div>
    </template>
    <style lang="stylus" scoped>
        .c-ui-table{
            table{
                width: 96%;
                margin:0;
                padding:0;
                border-collapse: collapse;
                margin: 5px auto;
                tr{
                    height: 32px !important;
                }
                th,td{
                    font-size: 1em;
                    padding: 0 1%;
                    height: 1.5em;
                    line-height:1em;
                    text-align: center;
                    box-sizing: border-box;
                    border :1px solid #c8cccf;
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

