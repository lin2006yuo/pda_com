<template>
        <div class="off-shelve">
            <mt-header fixed title="商品下架">
                <router-link to="/menu" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
            <form class="form" style="padding-top:30%;">
                <!--<cut-input ref="warehouse_cargo" @enter-input="get_next" @blur-input="blur_input" v-model="warehouse_cargo" @change_input="get_next"></cut-input>-->
                <input type="text" ref="warehouse_cargo" autofocus="autofocus" placeholder="货位" v-model="warehouse_cargos" @keyup.13="get_next" :class="['form_input',warehouse_cargo_error?'border-red':'']"/>
                <div class="error"><i class="delete-icon" v-if="warehouse_cargo_error"></i><span>{{warehouse_cargo_error}}</span></div>
                <input type="text" placeholder="SKU" ref="sku" @keyup.13="sku_enter" v-model="sku" :class="['form_input',sku_error?'border-red':'']"/>
                <div class="error"><i class="delete-icon" v-if="sku_error"></i><span>{{sku_error}}</span></div>
                <input type="text" ref="number" placeholder="数量"  v-model="picking_quantity" :class="['form_input',picking_quantity_error?'border-red':'']"/>
                <div class="error"><i class="delete-icon" v-if="picking_quantity_error"></i><span>{{picking_quantity_error}}</span></div>
                <!--<input type="button" value="下架" @click="make_off_shelve" class="form_input bg"/>-->
                <request-button :request="make_off_shelve" class="form_input bg">下架</request-button>
            </form>
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
            background:url('../../../assets/delete.png') no-repeat ;
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
        import cutInput from '../../../components/cut-input.vue';
        import{api_picking_process_off_shelve} from '../../../api/picking-process';
        export default{
            data(){
                return{
                    warehouse_cargo:'',
                    warehouse_cargos:'',
                    sku:'',
                    picking_quantity:'',
                    picking_quantity_error:'',
                    warehouse_cargo_error:'',
                    sku_error:'',
                }
            },
            mounted(){
//                this.$refs.warehouse_cargo.input.select();
            },
            methods:{
                get_next(){
                    this.$nextTick(()=>{
                        if(!this.warehouse_cargo_error){
                            this.$refs.sku.select();
                        }
                    });
                },
                blur_input(){
                	console.log("test")
                    this.sku= "";
                },
                sku_enter(){
                    this.$nextTick(()=>{
                        if(!this.sku_error){
                            this.$refs.number.select();
                        }
                    });
                },
                get_warehouse_cargo_error(val){
                    if(val){
                        let find = this.detailsData.find(row=>{
                            return this.warehouse_cargo === row.warehouse_cargo;
                        });
                        if(!find){
                            this.warehouse_cargo_error = `货位不在该上架单中`
                        }else{
                            this.warehouse_cargo_error = '';
                        }
                    }
                },
                get_sku_error(val){
                    if(val){
                        let find = this.detailsData.find(row=>{
                            return this.sku === row.sku;
                        });
                        if(!find){
                            this.sku_error = `与实际需要上架SKU不一致`
                        }else{
                            this.sku_error = '';
                        }
                    }
                },
                get_picking_quantity_error(val){
                    if(val){
                        let find = this.detailsData.find(row=>{
                            if(this.warehouse_cargo === row.warehouse_cargo&&this.sku === row.sku){
                                console.log(this.picking_quantity);
                                console.log(row.quantity);
                                return Number(this.picking_quantity) > Number(row.quantity);
                            }
                        });
                        if(find){
                            console.log(this.picking_quantity);
                            console.log(find.quantity);
                            this.picking_quantity_error = `数量大于上架单数量`
                        }else{
                            this.picking_quantity_error = '';
                        }
                    }
                },
                make_off_shelve(){
                    if(!this.warehouse_cargo){
                        this.warehouse_cargo_error = '请输入货位';
                        return ;
                    }else if(!this.sku){
                        this.sku_error = '请输入SKU';
                        return ;
                    }else if(!this.picking_quantity){
                        this.picking_quantity_error = '请输入数量';
                        return ;
                    }
                	let data = {
                        warehouse_id:this.$route.query.warehouse_id,
                        warehouse_cargo :this.warehouse_cargo,
                        sku :this.sku,
                        picking_quantity :this.picking_quantity,
                    };
                    return this.$http(api_picking_process_off_shelve,data).then(res=>{
                        Toast({
                            message: '操作成功',
                            iconClass: 'mint-toast-icon mintui mintui-success'
                        });
                        return Promise.resolve();
                    }).catch(code=>{
                        if(code.message.includes('货位')){
                            this.warehouse_cargo_error = code.message;
//                            this.$refs.warehouse_cargo.input.select();
                        }else if(code.message.includes('SKU')){
                            this.sku_error = code.message;
                            this.$refs.sku.select();
                        }else if(code.message.includes('数量')){
                            this.picking_quantity_error = code.message;
                            this.$refs.number.select();
                        }else{
                            Toast({message:code.message,position: 'top',duration: 1500});
                        }
                    })
                }
            },
            components:{
                cutInput,
                requestButton:require('@/components/request-button').default()
            }
        }
    </script>
