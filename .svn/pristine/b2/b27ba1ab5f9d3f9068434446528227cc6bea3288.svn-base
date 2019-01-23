<template>
    <div class="putaway-order pb-lg">
        <mt-header fixed title="集包中转出库">
            <router-link to="/menu" slot="left">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </router-link>
        </mt-header>
        <div class="content">
            <button-input :mt="{'margin-top':'33px'}"
                          lineName="集包单号"
                          :inputSelect="inputSelect"
                          :error-message="errorMessage"
                          v-model="code"
                          @submit="submit">
            </button-input>
            <tab-table titleName="已出库单号" :code-count="codeCount">
                <tr><td>集包单号</td><td>邮寄方式</td></tr>
                <tr v-for="(row,index) in codeData" :key="index"><td>{{row.code}}</td><td>{{row.shipping_method}}</td></tr>
            </tab-table>
        </div>
    </div>
</template>
<style lang="stylus" scoped>

</style>
<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import tabTable from '../../components/tab-table.vue';
    import buttonInput from '../../components/button-input.vue';
    import{api_package_transit} from '../../api/putaway-order';

    /*
     * 后端:詹熏欣
     * */
    export default {
        data() {
            return {
                code:'',
                tagShow:false,
                inputSelect:false,
                codeData:[],
                errorMessage:''
            }
        },
        mounted(){
            this.inputSelect = true;
            this.errorMessage = '';
        },
        methods:{
            look_tag(){
                this.tagShow = !this.tagShow;
            },
            submit(){
                this.$nextTick(()=>{
                    if(this.code===''){
                        this.errorMessage = '';
                        this.errorMessage = `集包单号不能为空`;
                        return ;
                    }
                    this.$http(api_package_transit,this.code).then(res=>{
                        Toast({message:res.message,position: 'top',duration: 1000});
                        let data = {
                            code: this.code,
                            shipping_method:res.shipping_method
                        };
                        this.codeData.unshift(data);
                        this.inputSelect = true;
                        this.code = '';
                        this.errorMessage = '';
                    }).catch(code=>{
                        this.errorMessage = '';
                        this.inputSelect = true;
                        this.errorMessage = code.message;
                    });
                });
            }
        },
        computed:{
            codeCount(){
                let length = this.codeData.length;
                return length;
            }
        },
        watch: {
            selected(val){
                if(val==='tab1'){
                    this.tagShow = false;
                }
            }
        },
        components: {
            tabTable,buttonInput
        }
    }
</script>
