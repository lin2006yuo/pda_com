<template>
    <div class="return-shelves" style=" height: 100%;">
        <mt-header fixed title="重返上架">
            <router-link to="/menu" slot="left">
                <i class="mintui mintui-back" style="font-size: 17px;"></i><span>返回</span>
            </router-link>
            <div slot="right" v-if="this.active==='tab-container2'">
                分区：<select v-model="warehouse_area_id" @change="change_warehouse_area" style="width: 60px;">
                <option v-for="item in warehouseAreaList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">{{item.label}}</option>
                </select>
            </div>
            <div slot="right" @click="sku_goods()" v-if="this.active==='tab-container1'">商品信息</div>
        </mt-header>
        <mt-tab-container v-model="active" id="list-container"  value="tab-container1" class="pt-lg">
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
                    <line-input ref="sku" :inputSelect="skuSelect" :error-message="sku_error" line-name="SKU" @enter-input="sku_enter" v-model="sku"></line-input>
                    <line-input ref="warehouse_cargo" :inputSelect="cargoSelect" :error-message="warehouse_cargo_error" line-name="货位" @enter-input="get_next" v-model="warehouse_cargo_code"></line-input>
                    <line-input ref="number" type="number" :inputSelect="quantitySelect" :error-message="quantity_error" @enter-input="quantity_enter" @input-change="quantity_change" line-name="数量" v-model="quantity"></line-input>
                    <request-button :request="return_shelves" class="form_input bg">确认上架</request-button>
                </form>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <div>
                    <mt-cell style="position: fixed;z-index: 2;width: 100%;max-width: 640px;">
                        <table class="table-box"><tr><td width="15%">排序</td><td>货位</td><td>SKU</td><td width="15%">数量</td></tr></table>
                    </mt-cell>
                    <virtual-list :start="start" :size="48" :remain="virtualRemain" style="padding-top: 48px;">
                    <mt-cell v-for="(row,index) in shelvesData"
                             :key="index"
                             @click.native="get_picking(row,index)"
                             is-link
                             :class="[index===time_now?'height-line':'',(index%2===0&&index!==time_now)?'line-bg':'']">
                        <table class="table-box">
                            <tr :class="[row.line?'red':'']">
                                <td width="15%">{{index+1}}</td>
                                <td>{{row.warehouse_cargo_code}}</td>
                                <td>{{row.sku}}</td>
                                <td width="15%">{{row.quantity_sum}}</td></tr>
                        </table>
                    </mt-cell>
                    </virtual-list>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <mt-tabbar v-model="selected" :fixed="true">
            <mt-tab-item id="tab1" @click.native.prevent="active='tab-container1'">
                上架
            </mt-tab-item>
            <mt-tab-item id="tab2" @click.native.prevent="change_tab">
                待重返上架
            </mt-tab-item>
        </mt-tabbar>
        <msgbox-sku ref="sku_goods" v-model="skuShow" :sku="sku_name" :warehouse_id="this.$route.query.warehouse_id" @close-box="close_box"></msgbox-sku>
    </div>
</template>
<style lang="stylus" scoped>
    .table-box{
        width: 100%;
        margin:0;
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
    .form{
        width :100%;
        text-align :center;
        padding-top: 3%;
    }
    .form_input{
        width: 92%;
        -web-kit-appearance:none;
        -moz-appearance: none;
        display block;
        font-size:1em;
        height:2.5em;
        border-radius:4px;
        border:1px solid #c8cccf;
        margin: 0 auto;
        padding-left :10px;
    }
</style>
<script>
    import virtualList from '@/components/virtual-list';
    import { Toast } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    import lineInput from '../../components/line-input.vue';
    import lineList from '../../components/line-list.vue';
    import lineTable from '../../components/line-table.vue';
    import msgboxSku from '../../components/msgbox-sku.vue';
    import{return_shelves_save,return_shelves_list} from '../../api/putaway-order';
    import{api_warehouse_area} from '../../api/picking-process';
    import RequestButton from "@/components/request-button";
    /*
     * 后端:刘志勇
     * */
    export default{
        data(){
            return{
                active:'tab-container1',
                selected:'tab1',
                warehouse_cargo_code:'',
                sku:'',
                quantity:'',
                cargoSelect:false,
                skuSelect:false,
                quantitySelect:false,
                skuShow:false,
                quantity_error:'',
                warehouse_cargo_error:'',
                sku_error:'',
                shelvesData:[],
                listData:{
                    warehouse_cargo_code:'',
                    sku:[],
                    quantity:'',
                },
                skuData:[],
                warehouse_area_id:'',
                warehouseAreaList:[],
                time_now:'',
                sku_name:'',
                styles:{height:0},
                virtualRemain:11,
                start:0,
            }
        },
        mounted(){
        	this.get_warehouse_area();
            this.init();
            this.$nextTick(()=>{
                this.skuSelect = true;
                this.$refs.sku.$refs.input.select();
            });
            let styles = window.getComputedStyle(document.getElementById('list-container'));
            this.styles.height = styles.height;
        },
        methods:{
            sku_goods(sku){
                this.sku_name = sku ? sku : this.sku;
                this.$nextTick(()=>{
                    this.skuShow = true;
                    this.$refs.sku_goods.init();
                    this.$refs.sku.$refs.input.select();
                });
            },
            close_box(){
                this.$refs.sku.$refs.input.select();
            },
            get_warehouse_area(){
                let data = {
                    warehouse_id : this.$route.query.warehouse_id,
                    status:1,
                    warehouse_area_type:11,
                };
                this.$http(api_warehouse_area,data).then(res=>{
                    this.warehouseAreaList = res;
                    this.warehouseAreaList = this.warehouseAreaList.map(res=>{
                        return {
                            value:res.id,
                            label:res.code,
                        };
                    });
                    this.warehouseAreaList.unshift({value:'',label:'全部'});
//                    this.warehouse_area_id = this.warehouseAreaList[0].value;
                    this.init();
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
            },
            change_warehouse_area(){
                this.init();
            },
            init(){
                let data = {
                    warehouse_id :this.$route.query.warehouse_id,
                    warehouse_area_id :this.warehouse_area_id,
                };
                this.$http(return_shelves_list,data).then(res=>{
                    this.shelvesData = res.data;
                    this.time_now = 0;
                    this.start = this.line_now;
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                })
            },
            change_tab(){
            	if(this.shelvesData.length===0){
                    Toast({message:`暂无待重返上架的商品`,position: 'top',duration: 1500});
                }else{
                    this.active='tab-container2';
                }
            },
            get_picking(row,index){
                this.listData = {};
                this.skuData = [];
                this.quantity = '';
                this.shelvesData.forEach((item, i) => {
                    if (i < index) {
                        item.line = true;
                    } else {
                        item.line = false;
                    }
                    if (row.id === item.id) {
                        this.time_now = i;
                    }
                });
                this.listData = {
                    warehouse_cargo_code: row.warehouse_cargo_code,
                    sku: [row.sku,...row.sku_alia],
                    quantity: row.quantity_sum,
                };
                this.skuData = [];
                this.skuData.push(this.listData);
                this.quantity = row.quantity_sum;
                this.$nextTick(()=>{
                    this.skuSelect = true;
                    this.$refs.sku.$refs.input.select();
                });
                this.active = 'tab-container1';
                this.selected = 'tab1';
            },
            get_next(){
                this.$nextTick(()=>{
                    if(this.warehouse_cargo_code===''){
                        this.warehouse_cargo_error = `请输入货位`;
                        return ;
                    }else{
                        let find = this.shelvesData.find(res=>{
                            return res.warehouse_cargo_code === this.warehouse_cargo_code;
                        });
                        if(!find){
                            this.cargoSelect = true;
                            this.warehouse_cargo_error = '货位不在重返上架中';
                        }else{
                            this.cargoSelect = false;
                            this.quantitySelect = true;
                            this.$refs.number.$refs.input.select();
                            this.warehouse_cargo_error = '';
                        }
                    }
                });
            },
            sku_enter(){
                this.skuData = [];
                this.sku_error = '';
                this.$nextTick(()=>{
                    if(this.sku===''){
                        this.sku_error = `请输入SKU`;
                        return ;
                    }
                    let data = {
                        warehouse_id:this.$route.query.warehouse_id,
                        warehouse_area_id :this.warehouse_area_id,
                        sku : this.sku,
                    };
                    this.$http(return_shelves_list,data).then(res=>{
                        if(res.data.length>0){
                            res.data.forEach(row=>{
                                this.listData = {
                                    warehouse_cargo_code: row.warehouse_cargo_code,
                                    sku: [row.sku,...row.sku_alia],
                                    quantity: row.quantity_sum,
                                };
                                this.skuData.push(this.listData);
                            });
                            this.quantity = res.data[0].quantity_sum;
                            this.cargoSelect = true;
                            this.$refs.warehouse_cargo.$refs.input.select();
                        }else{
                            this.sku_error = `sku:${this.sku}不在重返上架中`;
                        }
                    }).catch(code=>{
                        this.sku_error = code.message;
                    });
                });
            },
            quantity_enter(){
                this.return_shelves();
            },
            quantity_change(){
                let find = this.skuData.find(res=>{
                    return ([res.sku,`${res.sku_id}`,...res.sku_alia].includes(this.sku))&& res.warehouse_cargo_code === this.warehouse_cargo_code;
                });
                if(!!find){
                    if(Number(this.quantity) > Number(find.quantity)){
                        this.quantitySelect = true;
                        this.quantity_error = `可上架数量最大为${find.quantity}`;
                    }else if(Number(this.quantity)<=0){
                        this.quantitySelect = true;
                        this.quantity_error = `可上架数量应大于0`;
                    }}else{
                        this.quantity_error = ''
                    }
            },
            return_shelves(){
                if(!this.warehouse_cargo_code){
                    this.warehouse_cargo_error = '请输入货位';
                    return ;
                }
                if(!this.sku){
                    this.sku_error = '请输入SKU';
                    return ;
                }
                if(!this.quantity){
                    this.quantity_error = '请输入数量';
                    return ;
                }else if(Number(this.quantity)===0){
                    this.quantity_error = '数量不能为0';
                    return ;
                }
                let data = {
                    warehouse_id:this.$route.query.warehouse_id,
                    warehouse_cargo_code : this.warehouse_cargo_code,
                    quantity : this.quantity,
                    sku : this.sku,
                };
                return this.$http(return_shelves_save,data).then(res=>{
                    this.shelvesData.forEach((item,index)=>{
                        if(([item.sku,`${item.sku_id}`,...item.sku_alia].includes(this.sku))&& item.warehouse_cargo_code === this.warehouse_cargo_code){
                            item.quantity_sum = Number(item.quantity_sum) - Number(this.quantity);
                            if(item.quantity_sum===0){
                                this.shelvesData.splice(index,1);
                            }
                        }
                    });
                    this.skuData = [];
                    this.warehouse_cargo_code = '';
                    this.sku = '';
                    this.quantity = '';
                    this.warehouse_cargo_error = '';
                    this.sku_error = '';
                    this.quantity_error = '';
                    this.$nextTick(()=>{
                        this.skuSelect = true;
                        this.$refs.sku.$refs.input.select();
                    });
                    Toast({
                        message: '操作成功',
                        iconClass: 'mint-toast-icon mintui mintui-success'
                    });
                    if(this.shelvesData.length===0){
                        MessageBox({
                            title: '提示',
                            message: '你已全部重返上架',
                            confirmButtonText: `好的，我知道了`
                        });
                    }
                    return Promise.resolve();
                }).catch((code)=>{
                    if(code.message.includes('大于')){
                        this.quantity_error = code.message;
                    }else{
                        this.quantity_error = '';
                        Toast({message:code.message,position: 'top',duration: 1000});
                    }
                })
            }
        },
        watch:{
            active(val){
                if(val==='tab-container1'){
                    this.selected = 'tab1';
                    this.$nextTick(()=>{
                        this.skuSelect = true;
                        this.$refs.sku.$refs.input.select();
                    });
                }else if(val==='tab-container2'){
                    this.selected = 'tab2';
                    let find = this.shelvesData.find((res,index)=>{
                        return index===this.time_now;
                    });
                    if(!!find){
                        this.listData = {
                            warehouse_cargo_code: find.warehouse_cargo_code,
                            sku: [find.sku,...find.sku_alia],
                            quantity: find.quantity_sum,
                        };
                        this.skuData = [];
                        this.skuData.push(this.listData);
                        this.quantity = find.quantity_sum;
                        this.$nextTick(()=>{
                            this.skuSelect = true;
                            this.$refs.sku.$refs.input.select();
                        });
                    }
                }
            }
        },
        components:{
            RequestButton,
            lineInput,lineList,lineTable,virtualList,msgboxSku,
            requestButton:require('@/components/request-button').default()
        }
    }
</script>
