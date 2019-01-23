<template>
    <div class="off-shelve">
        <mt-header fixed title="商品上架">
            <span slot="left" @click="handleClick">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </span>
            <!--<div slot="right" @click="sku_goods()" v-if="this.active==='tab-container1'" class="wait">待上架</div>-->
            <div slot="right"  class="partition" @click="skip">待上架</div>
        </mt-header>
        <mt-tab-container v-model="active" id="list-container" value="tab-container1" class="pt-lg">
            <mt-tab-container-item id="tab-container1">
                <form class="form">
                    <line-table>
                        <table>
                            <tr v-for="(list,item) in skuData" :key="item">
                                <td style="width: 50%">
                                    <div style="line-height: 1.5em;">
                                        <span class="blue" v-for="(sku,index) in list.sku" :key="index" @click="sku_goods(sku)">{{sku}}<br></span>
                                    </div>
                                </td>
                                <td style="width: 35%">{{list.warehouse_cargo_code}}</td>
                                <td style="width: 15%">{{list.quantity}}</td>
                            </tr>
                        </table>
                    </line-table>
                    <line-input ref="sku"
                                @click.stop
                                @keyup.stop
                                @keydown.stop
                                :textWidth="22"
                                :inputWidth="75"
                                line-name="SKU"
                                all
                                :inputSelect="skuSelect"
                                :error-message="sku_error"
                                @enter-input="sku_next"
                                v-model="sku">
                    </line-input>
                    <div class="text">
                        <div class="line-text" v-if="cargo">
                            <span>参考货位</span>
                            <span class="line-box">{{cargo}}</span>
                        </div>
                    </div>
                    <line-input
                                ref="warehouse_cargo"
                                :textWidth="22"
                                :inputWidth="75"
                                line-name="上架货位"
                                spe
                                :inputSelect="cargoSelect"
                                :error-message="cargo_error"
                                @enter-input="cargo_next"
                                v-model="warehouse_cargo"></line-input>
                    <div v-if="batchData.length>0">
                        <select-list
                            style="margin-top: 17px;"
                            ref="batch_id"
                            :textWidth="18"
                            :inputWidth="79"
                            v-model="batch_id"
                            lineName="批次"
                            @select-change="select_change"
                            :selectList="batchData"></select-list>
                    </div>
                    <line-input ref="quantity"
                                :textWidth="22"
                                :inputWidth="75"
                                line-name="数量"
                                all
                                :inputSelect="quantitySelect"
                                :error-message="quantity_error"
                                type="number"
                                v-model="quantity"
                                @enter-input="make_putaway"></line-input>
                    <div class="line-button">
                        <div class="request_btn request_btn_t mt-lg">
                            <request-button :request="make_putaway">确认上架</request-button>
                        </div>
                    </div>
                </form>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <div>
                    <mt-cell style="position: fixed;z-index: 2;width: 100%;max-width: 640px;">
                        <table class="table-box">
                            <tr class="all-table">
                                <td>排序</td>
                                <td>货位</td>
                                <td>SKU</td>
                                <td>数量</td>
                            </tr>
                        </table>
                    </mt-cell>
                    <virtual-list :start="start" :size="48" :remain="virtualRemain" style="padding-top: 48px;">
                        <mt-cell v-for="(row,index) in goodsData"
                                 :class="[index%2===0?'line-bg':'']"
                                 :key="index">
                            <table class="table-box">
                                <tr class="all-table">
                                    <td width="13%">{{index+1}}</td>
                                    <td width="30%">{{row.warehouse_cargo_id}}</td>
                                    <td width="30%">{{row.sku}}</td>
                                    <td width="15%">{{row.quantity}}/{{row.waiting_quantity}}</td></tr>
                            </table>
                        </mt-cell>
                    </virtual-list>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--<mt-tabbar v-model="selected" :fixed="true">-->
            <!--<mt-tab-item id="tab1" @click.native.prevent="active='tab-container1'">-->
                <!--上架-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="tab2" @click.native.prevent="change_tab">-->
                <!--待上架-->
            <!--</mt-tab-item>-->
        <!--</mt-tabbar>-->
        <msgbox-sku ref="sku_goods" v-model="skuShow" :sku="sku_name" :warehouse_id="this.$route.query.warehouse_id" @close-box="close_box"></msgbox-sku>
    </div>
</template>
<style lang="stylus" scoped>
    .wait{
        border-radius 10px;
        border 1px solid white;
        padding 2px 0;
        line-height :15px;
        text-align center;
        font-size: 10px;
    }
    .table-box{
        width: 100%;
        padding:0;
        border-collapse: collapse;
        border-spacing: 0;
        margin: 0 auto;
        th{
            /*background: #eff2f7;*/
        }
        th,td{
            font-size: 1em;
            height: 26px;
            text-align: center;
            box-sizing: border-box;
        }
    }
    .text{
        width: 100%;
        text-align: center;
        margin: 17px 0 auto;
        padding: 0 1%;
        .line-text{
            height: 2em;
            font-size :14px;
            text-align: left;
            .line-box{
                margin-left :4%;
            }
        }
    }

    .form{
        width :100%;
        text-align :center;
        padding-top: 9px;
    }
    .form_input{
        /*width: 90%;*/
        -web-kit-appearance:none;
        -moz-appearance: none;
        display: block;
        /*font-size:1em;*/
        /*height:2.5em;*/
        /*border-radius:4px;*/
        border:1px solid #c8cccf;
        margin: 0 auto;
        padding-left :10px;
        width: 240px !important;
        height: 24px !important;
        margin-top: 10px !important;
        border-radius: 10px !important;
        font-size: 12px !important;
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
    import virtualList from '@/components/virtual-list';
    import { Toast } from 'mint-ui';
    import lineInput from '../../components/line-input.vue';
    import lineList from '../../components/line-list.vue';
    import lineTable from '../../components/line-table.vue';
    import uiTable from '../../components/ui-table.vue';
    import lineSelect from '../../components/line-select.vue';
    import msgboxSku from '../../components/msgbox-sku.vue';
    import{api_putaway_waiting_goods,api_putaway_look_goods,api_putaway_waiting_goods_cargos,
        api_reback_cargo_sku,api_putaway_waiting_goods_list} from '../../api/putaway-order';
    /*
     * 后端:刘志勇
     * */
    export default{
        data(){
            return{
                warehouse_cargo:'',
                sku:'',
                quantity:'',
                inputSelect:false,
                skuSelect:false,
                cargoSelect:false,
                quantitySelect:false,
                skuShow:false,
                cargo_error:'',
                sku_error:'',
                quantity_error:'',
                id:'',
                batch_id:'',
                cargo:'',
                batchData:[],
                radio:'',
                cargoData:[],
                goodsData:[],
                order_id:'',
                active:'tab-container1',
                selected:'tab1',
                styles:{height:0},
                virtualRemain:11,
                start:0,
                time_now:'',
                sku_name:'',
                listData:{},
                skuData:[],
                cargo_data:[]
            }
        },
        mounted(){
            this.init();
            this.inputSelect = true;
            this.$refs.sku.$refs.input.select();
            let styles = window.getComputedStyle(document.getElementById('list-container'));
            this.styles.height = styles.height;
        },
        methods:{
            handleClick(){
                if(this.active==='tab-container2'){
                    this.selected='tab1'
                    this.active='tab-container1'

                }else{
                    this.$router.push('/menu')
                }
            },
            skip(){
                if(this.active==='tab-container1'){
                    this.active="tab-container2"
                    this.selected="tab2"
                }else{
                    this.selected="tab1"
                    this.active="tab-container1"
                }
            },
            init(){
                let data = {
                    warehouse_id :this.$route.query.warehouse_id,
                    status :0,
                    warehouse_area_type :11,
                    page :1,
                    pageSize :100,
                };
                this.$http(api_putaway_waiting_goods_list,data).then(res=>{
                    console.log(res);
                    this.goodsData = res.data;
                    this.time_now = 0;
                    this.start = this.line_now;
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                    setTimeout(()=>this.$router.go(-1),300)
                })
            },
            change_tab(){
                if(this.goodsData.length===0){
                    Toast({message:`暂无待上架的商品`,position: 'top',duration: 1500});
                }else{
                    this.active='tab-container2';
                }

            },
            sku_goods(sku){
                this.sku_name = sku ? sku : this.sku;
                this.$nextTick(()=>{
                    this.skuShow=true;
                    this.$refs.sku_goods.init();
                    this.$refs.sku.$refs.input.select();
                });
            },
            close_box(){
                this.$refs.sku.$refs.input.select();
            },
            select_change(val){
                let find  = this.batchData.find((res,index)=>{
                	return index === val;
                });
                if(!!find){
                    // console.log('find',find);
                    let order = this.cargoData.find((res,index)=>{
                        if(index === val){
                            return `${res.purchase_order_id}/${res.batch_id}` === find.label&&res.purchase_order_id===find.purchase_order_id&&([res.sku,`${res.sku_id}`,...res.sku_alia].includes(this.sku));
                        }
                    });
                    if(!!order){
                    	console.log('order',order);
                        this.quantity = order.waiting_quantity;
                        this.order_id = order.id;
                        // console.log('this.order_id',this.order_id);
                    }
                }
            },
            cargo_next(){
                this.$nextTick(()=>{
                    if(!this.warehouse_cargo){
                        this.cargo_error = '请输入货位';
                        this.sku_error = '';
                        return ;
                    }else{
                    	if(this.cargo_data.includes(this.warehouse_cargo)){
                            this.cargo_error = '';
                            this.quantitySelect = true;
                            this.$refs.quantity.$refs.input.select();
                        }else{
                            this.cargo_error = '货位与参考货位不一致';
                            this.sku_error = '';
                            return ;
                        }
                    }
                });
            },
            sku_next(){
                console.log(`sku-next`);
                this.batchData = [];
                this.cargo = '';
                this.warehouse_cargo = '';
                this.quantity = '';
                this.quantity_error = '';
                this.cargo_error = '';
                this.sku_error = '';
                this.$nextTick(()=>{
                    if(this.sku===''){
                        this.sku_error = '请输入SKU';
                        return ;
                    }
                    if(this.sku.length<4){
                        this.sku_error = 'SKU至少为4个字符';
                        return ;
                    }
                    this.$http(api_putaway_waiting_goods_cargos,this.sku,{warehouse_id:this.$route.query.warehouse_id}).then(res=>{
                        this.cargoData = res.data;
                        this.batchData = this.cargoData.map((row,index)=>{
                            return {
                                value:index,
                                label:`${row.purchase_order_id}/${row.batch_id}`,
                                purchase_order_id:row.purchase_order_id,
                                create_time:(new Date(row.create_time*1000)).toLocaleDateString(),
                            }
                        });
                        this.batch_id = 0;
                        this.quantity = this.cargoData[0].waiting_quantity;
                        this.order_id = this.cargoData[0].id;
                        console.log('this.batch_id',this.batch_id);
                        console.log('this.order_id',this.order_id);
                        console.log('this.quantity',this.quantity);
                        let cargo = this.cargoData.map(row=>{
                            return row.warehouse_cargo_id
                        });
                        this.cargo = [...new Set(cargo)];
                        this.cargo_data = window.clone(this.cargo);
                        this.cargo = this.cargo.join(',');
                        this.sku_error = '';
                        this.cargoSelect = true;
                        this.$refs.warehouse_cargo.$refs.input.select();
                    }).catch(code=>{
                        this.sku_error = code.message;
                    });
                });

            },
            make_putaway(){
                if(!this.sku){
                    this.sku_error = '请输入SKU';
                    return ;
                }
                if(!this.warehouse_cargo){
                    this.cargo_error = '请输入货位';
                    this.sku_error = '';
                    return ;
                }
                if(!this.quantity){
                    this.cargo_error = '';
                    this.quantity_error = '请输入数量';
                    return ;
                }
                let find = this.cargoData.find(res=>{
                    let sku_code = [res.sku,`${res.sku_id}`];
                    if(res.sku_alia){
                    	if(res.sku_alia_sh){
                            sku_code = [res.sku,`${res.sku_id}`,...res.sku_alia,...res.sku_alia_sh];
                        }else{
                            sku_code = [res.sku,`${res.sku_id}`,...res.sku_alia];
                        }
                    }
                    console.log('sku_code',sku_code);
                    return res.warehouse_cargo_id === this.warehouse_cargo&&(sku_code.includes(this.sku));
                });
                if(!!find){
                    console.log("find",find);
                    console.log(Number(this.quantity));
                    console.log(Number(find.waiting_quantity));
                    if(Number(this.quantity)>Number(find.waiting_quantity)){
                        this.quantity_error = `可上架数量最大为${find.waiting_quantity}`;
                        return ;
                    }
                }
                console.log('批次',this.batch_id);
                let data = {
                    warehouse_id: this.$route.query.warehouse_id,
                    warehouse_cargo_code:this.warehouse_cargo,
                    sku:this.sku,
                    quantity:this.quantity,
                    id:this.order_id
                };
                console.log('data',data);
                return this.$http(api_reback_cargo_sku,data).then(res=>{
                    if(res.flag===2){
                        Toast({
                            message: '操作成功',
                            iconClass: 'mint-toast-icon mintui mintui-success'
                        });
                        let index = this.goodsData.findIndex(row=>{
                        	// console.log('row.id',row.id);
                        	// console.log('this.order_id',this.order_id);
                        	return row.id === this.order_id;
                        });
                        this.goodsData.splice(index,1);
                        this.warehouse_cargo = '';
                        this.sku = '';
                        this.quantity = '';
                        this.quantity_error = '';
                        this.sku_error = '';
                        this.cargo_error = '';
                        this.batchData = [];
                        this.cargo = '';
                        this.skuSelect = true;
                        this.$refs.sku.$refs.input.select();
                    }else if(res.flag===1){
                        console.log(res.data);
                        if(res.data.length===1){
                            res.data.forEach(row=>{
                                this.id = row.id;
                                this.quantity_error = `可上架数量最大为${row.waiting_quantity}`;
                            });
                        }else{
                            this.batchData = this.cargoData.map((row,index)=>{
                                return {
                                    value:index,
                                    label:row.batch_id,
                                    purchase_order_id:row.purchase_order_id,
                                }
                            });
                        }
                    }
                    return Promise.resolve();
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
            }
        },
        watch:{
            active(val){
                if(val==='tab-container1'){
                    this.selected = 'tab1';
                    this.$nextTick(()=>{
                    	if(!this.sku){
                            this.skuSelect = true;
                            this.$refs.sku.$refs.input.select();
                        }else{
                            this.$refs.warehouse_cargo.$refs.input.select();
                        }
                    });
                }
            }
        },
        components:{
            lineInput,lineList,uiTable,lineSelect,msgboxSku,virtualList,lineTable,
            requestButton:require('@/components/request-button').default,
            selectList:require('./select-list').default,
        }
    }
</script>
