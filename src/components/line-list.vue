    <template>
        <!--ul组件,统一样式-->
        <div class="c-line-list">
            <ul class="list-box">
                <slot></slot>
            </ul>
        </div>
    </template>
    <style lang="stylus" scoped>
        .c-line-list{
            height: 3em;
            margin-bottom: 1.5em;
            .list-box {
                width: 90%;
                margin: 0 auto;
            }
            .list-box li{
                height: 3em;
                float: left;
                display: inline;
                border-bottom:1px solid #c8cccf;
                border-top:1px solid #c8cccf;
                border-right:1px solid #c8cccf;
                text-align :center;
                line-height: 3em;
            }
            .list-box li:nth-child(1){
                border-left:1px solid #c8cccf;
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

