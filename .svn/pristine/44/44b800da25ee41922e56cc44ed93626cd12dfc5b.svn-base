<template>
    <div class="p-index">
        <mt-header fixed title="条码查询">
            <router-link to="/menu" slot="left">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </router-link>
        </mt-header>
        <div class="pt-lg self">
            <line-input ref="barcode"
                        :focusState="focusState"
                        :textWidth="22"
                        :inputWidth="75"
                        :input-select="inputSelect"
                        :error-message="barcode_value_error"
                        line-name="条码"
                        @input-change="input_change"
                        @enter-input="barcode_value_enter"
                        @focus="focus($event)"
                        v-model="barcode_value"
                        :putInput.sync="getinput"
                        :checkType="barcode_type"
                        :get.sync="getshow"
                        close-select="closeSelect"
                        >
            </line-input>
            <!-- <line-select
                    :sty_text="{'font-size':'13px'}"
                    :sty="{'width':'231px','height':'26px'}"
                    v-model="barcode_type"
                    lineName="查询类型"
                    @select-change="select_change"
                    :selectList="barcodeTypeList">
            </line-select> -->
            <selectDown :selectList="barcodeTypeList"
                        @chufa="select_change"
                        v-model="barcode_type"
                        @req="barcode_value_enter"
                        :gitinput="getinput"
                        class="mt-lg"
                        :mmpshow.sync="skuData.skuShow"
                        :getShow.sync="getshow"
                        @close="closeSelect"
            >

            </selectDown>
            <div v-if="skuData.skuShow">
                <ui-table >
                    <tr><td>SKU</td><td><span class="blue" @click="sku_goods(skuData.warehouse.sku)">{{skuData.warehouse.sku}}</span></td></tr>
                    <tr><td>当前库存</td><td>{{skuData.warehouse.quantity}}</td></tr>
                    <tr><td>可用库存</td><td>{{skuData.warehouse.available_quantity}}</td></tr>
                    <tr><td>待发数量</td><td>{{skuData.warehouse.waiting_shipping_quantity}}</td></tr>
                </ui-table>
                <ui-table class="table-line-color">
                    <tr><th>分区功能</th><th>货位</th><th>当前数</th><th>冻结数</th></tr>
                    <tr v-for="row in skuData.cargo" v-if="skuData.cargo.length>0">
                        <td>{{row.warehouse_area_type}}</td><td>{{row.warehouse_cargo_code}}</td>
                        <td>{{row.quantity}}</td><td>{{row.hold_quantity}}</td></tr>
                    <tr v-if="skuData.cargo.length===0" ><td colspan="4"  style="width: 100% !important">暂无数据</td></tr>
                </ui-table>
            </div>
            <div v-else-if="collectionData.collectionShow">
                <ui-table class="mb-sm">
                    <tr><td>集包单号</td><td><span>{{collectionData.code}}</span></td></tr>
                    <tr><td>状态</td><td><span>{{collectionData.status_txt}}</span></td></tr>
                    <tr><td>邮寄方式</td><td><span>{{collectionData.shipping_name}}</span></td></tr>
                    <tr><td>包裹数量(kg)</td><td><span>{{collectionData.package_count}}</span></td></tr>
                    <tr><td>包裹重量(kg)</td><td><span>{{collectionData.package_weight}}</span></td></tr>
                    <tr><td>集包袋重量(kg)</td><td><span>{{collectionData.collect_weight}}</span></td></tr>
                    <tr><td>集包重量(kg)</td><td><span>{{collectionData.weight}}</span></td></tr>
                    <tr><td>差异重量</td><td><span>{{collectionData.diff_weight}}</span></td></tr>
                </ui-table>
            </div>
            <div v-else-if="turnoverData.turnoverShow">
                <ui-table class="mb-sm">
                    <tr><td>周转箱号（颜色）</td><td><span>{{turnoverData.color}}</span></td></tr>
                    <tr><td>状态</td><td><span>{{turnoverData.work_status}}</span></td></tr>
                    <tr><td>类型</td><td><span>{{turnoverData.type}}</span></td></tr>
                    <tr><td>拣货/上架单号</td><td><span>{{turnoverData.picking_code}}</span></td></tr>
                    <tr><td>集结区号</td><td><span>{{turnoverData.mass_zone_num}}</span></td></tr>
                </ui-table>
            </div>
            <div v-else-if="warehouseCargoData.warehouseCargoShow">
                <ui-table class="mb-sm">
                    <tr><td>货位号</td><td><span>{{warehouseCargoData.code}}</span></td></tr>
                    <tr><td>分区</td><td>{{warehouseCargoData.warehouse_area}}</td></tr>
                    <tr><td>分区功能</td><td>{{warehouseCargoData.warehouse_area_type}}</td></tr>
                    <tr><td>货架</td><td>{{warehouseCargoData.warehouse_shelf_code}}</td></tr>
                </ui-table>
                <ui-table class="table-line-color">
                    <tr><th>SKU</th><th>当前数</th><th>冻结数</th></tr>
                    <tr v-for="row in warehouseCargoData.sku_list" v-if="warehouseCargoData.sku_list.length>0">
                        <td class="blue" @click="sku_goods(row.sku)">{{row.sku}}</td>
                        <td>{{row.quantity}}</td><td>{{row.hold_quantity}}</td></tr>
                    <tr v-if="warehouseCargoData.sku_list.length===0"><td colspan="4" style="width: 100% !important">暂无数据</td></tr>
                </ui-table>
            </div>
            <div v-else-if="packageData.packageShow">
                <ui-table class="mb-sm">
                    <tr><td>包裹号</td><td><span>{{packageData.number}}</span></td></tr>
                    <tr><td>订单号</td><td><span>{{packageData.order_number}}</span></td></tr>
                    <tr><td>邮寄方式</td><td><span>{{packageData.shipping_name}}</span></td></tr>
                    <tr><td>拣货单(状态)</td><td><span>{{packageData.picking_status}}</span></td></tr>
                    <tr><td>集包单(状态)</td><td><span>{{packageData.package_collection_status}}</span></td></tr>
                    <tr><td>国家</td><td><span>{{packageData.country_code}}</span></td></tr>
                    <tr><td>发货时间</td><td><span>{{fiterDate(packageData.shipping_time)}}</span></td></tr>
                </ui-table>
            </div>
            <div v-else-if="shippingMarkData.shippingMarkShow">
                <ui-table class="mb-sm">
                    <tr><td>上架标签</td><td><span>{{shippingMarkData.shipping_mark}}</span></td></tr>
                    <tr><td>批次</td><td><span>{{shippingMarkData.batch_id}}</span></td></tr>
                    <tr><td>采购单号</td><td><span>{{shippingMarkData.purchase_order_code}}</span></td></tr>
                    <tr><td>SKU</td><td><span class="blue" @click="sku_goods(shippingMarkData.sku)">{{shippingMarkData.sku}}</span></td></tr>
                    <tr><td>货位</td><td><span>{{shippingMarkData.warehouse_cargo_id}}</span></td></tr>
                    <tr><td>类型</td><td><span>{{shippingMarkData.warehouse_area_type}}</span></td></tr>
                    <tr><td>总数量</td><td><span>{{shippingMarkData.quantity}}</span></td></tr>
                    <tr><td>上架数量</td><td><span>{{shippingMarkData.waiting_quantity}}</span></td></tr>
                    <tr><td>状态</td><td><span>{{shippingMarkData.status}}</span></td></tr>
                </ui-table>
            </div>
        </div>
        <msgbox-sku ref="sku_goods" v-model="skuShow" :sku="sku_name" :warehouse_id="this.$route.query.warehouse_id" @close-box="close_box"></msgbox-sku>
    </div>
</template>
<style lang="stylus" scoped>
    .table-line-color{
        table {
            tr:nth-child(2n){
               background-color: #fcfcfc;
            }
        }
    }
</style>
<script>
    import lineSelect from '../../components/line-select.vue';
    import lineInput from '../../components/line-input.vue';
    import uiTable from '../../components/ui-table.vue';
    import msgboxSku from '../../components/msgbox-sku.vue';
    import { Indicator } from 'mint-ui';
    import{api_barcode_datas}from '../../api/warehouse-goods-check';
    import selectDown from'@/components/select-down'
    /*
     * 后端:刘志勇
     * */
    export default{
        data(){
            return{
                focusState:false,
                getshow:null,
                getinput:'',
                barcode_type:'sku',
                barcode_value:'',
                barcode_value_error:'',
                inputSelect:false,
                barcodeTypeList:[
                    {label:'SKU',value:'sku'},
                    {label:'集包单号',value:'package_collection'},
                    {label:'周转箱号',value:'turnover_box'},
                    {label:'货位号',value:'warehouse_cargo_code'},
                    {label:'包裹号',value:'package'},
                    {label:'上架标签',value:'shipping_mark'},
                ],
                skuData:{
                    skuShow:false,
                    cargo:[],
                    warehouse:{
                        sku:'',
                        quantity:'',
                        available_quantity:'',
                        waiting_shipping_quantity:'',
                    }
                },
                collectionData:{
                    collectionShow:false,
                },
                turnoverData:{
                    turnoverShow:false,
                },
                warehouseCargoData:{
                    warehouseCargoShow:false,
                },
                packageData:{
                    packageShow:false,
                },
                shippingMarkData:{
                    shippingMarkShow:false,
                },
                sku_name:'',
                skuShow:false
            }
        },
        mounted(){
            this.inputSelect = true;
        },
        // updated(){
        //     this.getshow=this.show
        //     console.log(this.getshow,'getshow')
        // },
        watch:{
            'skuData.skuShow':function(val){
                console.log('skuData.skuShow',val);
            },
        },
        computed:{
          show(){
              return this.skuData.skuShow
          }
        },
        methods:{
            sku_goods(sku){
                this.sku_name=sku;
                this.$nextTick(()=>{
                    this.skuShow=true;
                    this.$refs.sku_goods.init();
                });
            },
            close_box(){
                this.$refs.barcode.$refs.input.select();
            },
            barcode_value_enter(val){
                //  console.log(this.barcode_value,'enterbb')
            	/*根据输入条码来显示对应条码请求后端返回的信息*/
                this.$nextTick(()=>{
                    if(!this.barcode_value){
                        this.barcode_value_error = '请输入条码';
                        this.inputSelect = true;
                        return ;
                    }
                    this.barcode_type = !!val?val:'sku';
                    let data ={
                        warehouse_id :this.$route.query.warehouse_id,
                        barcode_type:this.barcode_type,
                        barcode_value:this.barcode_value,
                    };
                    //console.log(data.barcode_value,'enteraaa')
                    // Indicator.open();
                    this.$http(api_barcode_datas,data).then(res=>{
                        console.log('wocaonimabide')
                        if(this.barcode_type==='sku'){
                            this.barcode_value_error = '';
                            this.skuData.cargo = res.data.cargo;
                            this.skuData.warehouse = res.data.warehouse;
                            this.skuData.skuShow = true;
                        }else if(this.barcode_type==='package_collection'){
                            this.collectionData = res.data;
                            this.collectionData.collectionShow = true;
                        }else if(this.barcode_type==='turnover_box'){
                            this.turnoverData = res.data;
                            this.turnoverData.turnoverShow = true;
                        }else if(this.barcode_type==='warehouse_cargo_code'){
                            this.warehouseCargoData = res.data;
                            this.warehouseCargoData.warehouseCargoShow = true;
                        }else if(this.barcode_type==='package'){
                            this.packageData = res.data;
                            this.packageData.packageShow = true;
                        }else if(this.barcode_type==='shipping_mark'){
                            this.shippingMarkData = res.data;
                            this.shippingMarkData.shippingMarkShow = true;
                        }
                        this.$refs.barcode.$refs.input.select();
                        // Indicator.close();
                    }).catch(code=>{
                        console.log(code,'code587')
                        Indicator.close();
                        this.barcode_value_error = code.message;
                        this.$refs.barcode.$refs.input.select();
                    });
                });
            },
            closeSelect(val){
                this.focusState = true;
                console.log(val,'5555')
            },
            select_change(){
                console.log('chufaselect')
            	/*查询类型改变后初始化页面*/
                this.$refs.barcode.$refs.input.select();
                this.barcode_value_error = '';
                //this.barcode_value = '';
                this.skuData.skuShow = false;
                this.collectionData.collectionShow = false;
                this.turnoverData.turnoverShow = false;
                this.warehouseCargoData.warehouseCargoShow = false;
                this.packageData.packageShow = false;
                this.shippingMarkData.shippingMarkShow = false;
            },
            input_change(val){
                /*输入条码改变后,初始化页面*/
                if(!val){
                    this.barcode_value_error = '';
                    this.skuData.skuShow = false;
                    this.collectionData.collectionShow = false;
                    this.turnoverData.turnoverShow = false;
                    this.warehouseCargoData.warehouseCargoShow = false;
                    this.packageData.packageShow = false;
                    this.shippingMarkData.shippingMarkShow = false;
                }
            },
            fiterDate(obj){
            	/*时间戳---时间格式的转化*/
                let date = new Date(obj*1000);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                return Y+M+D+h+m+s;
            },
        },
        components:{
            lineSelect,lineInput,uiTable,msgboxSku,selectDown
        }
    }
</script>
