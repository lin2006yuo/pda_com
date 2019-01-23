<template>
    <div class="off-shelve">
        <mt-header fixed title="商品移库">
            <router-link to="/menu" slot="left">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </router-link>
            <div slot="right" @click="sku_box">商品信息</div>
        </mt-header>
        <form class="form" style="padding-top:18%;">
            <!--<div v-if="this.info">222</div>-->
            <line-input ref="from_cargo_id" :textWidth="22" :inputWidth="75" :inputSelect="inputSelect" :error-message="from_cargo_error" line-name="原货位" @enter-input="from_cargo_next" v-model="from_cargo_id"></line-input>
            <line-input ref="sku" :textWidth="22" :inputWidth="75" line-name="SKU" :inputSelect="skuSelect" :error-message="sku_error" @enter-input="sku_next" v-model="sku"></line-input>
            <line-input ref="to_cargo_id" :textWidth="22" :inputWidth="75" line-name="新货位" :inputSelect="toCargoSelect" :error-message="to_cargo_error" @enter-input="to_cargo_next" v-model="to_cargo_id"></line-input>
            <line-input ref="quantity" :textWidth="22" :inputWidth="75" line-name="数量" :inputSelect="quantitySelect" :error-message="quantity_error" type="number" v-model="quantity"></line-input>
            <!--<input type="button" value="确认移库" @click="make_shift" class="form_input bg"/>-->
            <div class="request_btn request_btn_t">
                <request-button :request="make_shift">确认移库</request-button>
            </div>
        </form>
        <msgbox-sku v-if="sku!==''" ref="sku_goods" v-model="skuShow" :warehouse_id="this.$route.query.warehouse_id" :sku="sku" @close-box="close_box"></msgbox-sku>
    </div>
</template>
<style lang="stylus" scoped>
    .form{
        width :100%;
        text-align :center;
        padding-top:30%;
    }
    .form_input{
        width: 92%;
        -web-kit-appearance:none;
        -moz-appearance: none;
        display: block;
        font-size:1em;
        height:2.5em;
        border-radius:4px;
        border:1px solid #c8cccf;
        margin: 0 auto;
        padding-left :10px;
    }
    .delete-icon{
        float:left;
        height: 20px;
        width: 20px;
        display: block;
        border-radius: 8px;
        margin-top: 0.7em;
        background:url('../../assets/delete.png') no-repeat ;
    }
    .error{
        height:2.5em;
        line-height:2.5em;
        text-align: left;
        margin-left: 10%;
        color: red;
    }
    .border-red{
        border: 1px solid red;
    }
</style>
<script>
    import { Toast } from 'mint-ui';
    import lineInput from '../../components/line-input.vue';
    import{api_goods_shift} from '../../api/picking-process';
    import msgboxSku from '../../components/msgbox-sku.vue';
    import {mapActions,mapGetters} from 'vuex';
    /*
    * 后端:赖永凤
    * */
    export default{
        data(){
            return{
                from_cargo_id:'',
                to_cargo_id:'',
                sku:'',
                quantity:'',
                inputSelect:false,
                skuSelect:false,
                toCargoSelect:false,
                quantitySelect:false,
                skuShow:false,
                from_cargo_error:'',
                to_cargo_error:'',
                sku_error:'',
                quantity_error:'',
                parms:{}
            }
        },
        mounted(){
            this.inputSelect = true;
            this.parms = {};
        },
        methods:{
            sku_box(){
                if(this.sku!==''){
                    /*使用sku商品信息的弹框组件*/
                    this.skuShow=true;
                    this.$refs.sku_goods.init();
                    this.$refs.sku.$refs.input.select();
                }else {
                    Toast({message:'请输入SKU',position: 'top',duration: 1000});
                }

            },
            close_box(){
            	/*关闭弹框后设置sku的input选中*/
                this.$refs.sku.$refs.input.select();
            },
            from_cargo_next(){
            	/*输入货位后回车触发*/
                this.$nextTick(()=>{
                    let data = {
                        is_pda:1,
                        type:'cargo',
                        cargo_code:this.from_cargo_id,
                        warehouse_id:this.$route.query.warehouse_id,
                    };
                    this.$http(api_goods_shift,data).then(res=>{
                        this.from_cargo_error = ''; /*请求成功后清空货位的错误信息*/
                        this.skuSelect = true; /*请求成功后选中sku的输入框*/
                        this.$refs.sku.$refs.input.select(); /*请求成功后选中sku的输入框*/
                        this.parms.from_cargo_id = res.cargo_id; /*记录参数 from_cargo_id*/
                    }).catch(code=>{
                        this.inputSelect = true; /*选中货位输入框*/
                        this.from_cargo_error = code.message;/*显示报错信息*/
                    })
                });
            },
            sku_next(){
                /*输入SKU后回车触发*/
                this.$nextTick(()=>{
                    let data = {
                        is_pda:1,
                        type:'sku',
                        sku:this.sku,
                        warehouse_id:this.$route.query.warehouse_id,
                    };
                    this.$http(api_goods_shift,data).then(res=>{
                        this.sku_error = '';
                        this.toCargoSelect = true;
                        this.$refs.to_cargo_id.$refs.input.select();
                        this.parms.sku_id = res.sku_id;
                    }).catch(code=>{
                        this.skuSelect = true;
                        this.sku_error = code.message;
                    });
                });
            },
            to_cargo_next(){
                this.$nextTick(()=>{
                    let data = {
                        is_pda:1,
                        type:'cargo',
                        cargo_code:this.to_cargo_id,
                        warehouse_id:this.$route.query.warehouse_id,
                    };
                    this.$http(api_goods_shift,data).then(res=>{
                        this.to_cargo_error = '';
                        this.quantitySelect = true;
                        this.$refs.quantity.$refs.input.select();
                        this.parms.to_cargo_id = res.cargo_id;
                    }).catch(code=>{
                        this.toCargoSelect = true;
                        this.to_cargo_error = code.message;
                    })
                });
            },
            make_shift(){
                if(!this.from_cargo_id){
                    this.from_cargo_error = '请输入原货位';
                    return ;
                }else if(!this.sku){
                    this.sku_error = '请输入SKU';
                    return ;
                }else if(!this.to_cargo_id){
                    this.to_cargo_error = '请输入新货位';
                    return ;
                }else if(!this.quantity){
                    this.quantity_error = '请输入数量';
                    return ;
                }
                console.log(this.parms);
                let data = {
                    warehouse_id:this.$route.query.warehouse_id,
                    from_cargo_id :this.parms.from_cargo_id,
                    sku_id :this.parms.sku_id,
                    to_cargo_id :this.parms.to_cargo_id,
                    from_cargo_code :this.from_cargo_id,
                    to_cargo_code :this.to_cargo_id,
                    sku :this.sku,
                    quantity :this.quantity,
                    is_pda:1,
                };
                return this.$http(api_goods_shift,data).then(res=>{
                    Toast({
                        message: '操作成功',
                        iconClass: 'mint-toast-icon mintui mintui-success'
                    });
                    this.from_cargo_id = '';
                    this.to_cargo_id = '';
                    this.sku = '';
                    this.quantity = '';
                    this.$refs.from_cargo_id.$refs.input.select();
                    return Promise.resolve()
                }).catch(code=>{
                    if(code.message.includes('原货位')){
                        this.inputSelect = true;
                        this.from_cargo_error = code.message;
                    }else if(code.message.includes('SKU')){
                        this.skuSelect = true;
                        this.sku_error = code.message;
                    }else if(code.message.includes('新货位')){
                        this.toCargoSelect = true;
                        this.to_cargo_error = code.message;
                    }else if(code.message.includes('数量')){
                        this.quantity_error = code.message;
                        this.quantitySelect = true;
                    }else{
                        Toast({message:code.message,position: 'top',duration: 1000});
                    }
                })
            }
        },
        computed:{
            ...mapGetters({info:'api/info'}),
        },
        components:{
            lineInput,msgboxSku,
            requestButton:require('@/components/request-button').default,
        }
    }
</script>
