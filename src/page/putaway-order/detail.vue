<template>
    <div class="putaway-order pb-lg">
        <mt-header fixed :title="title">
            <span slot="left" @click="backpath">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </span>
            <div slot="right" v-if="active==='tab-container2'" class="partition" @click="changeState">上架路径</div>
            <request-button slot="right" v-if="putawayOrderDataShow&&active==='tab-container1'" :request="complete" class="partition">完成上架</request-button>
            <request-button slot="right" v-if="butShow&&!putawayOrderDataShow" :request="all_submit"  class="partition">生成上架单</request-button>
        </mt-header>
        <div v-if="putawayOrderDataShow" style="height: 100%;" id="list-container">
            <mt-tab-container v-model="active" value="tab-container1">
                <mt-tab-container-item id="tab-container1" class="pt-lg">
                    <div>
                        <mt-cell style="position: fixed;z-index: 2;width: 100%;max-width: 640px;">
                            <table>
                                <tr class="all-table">
                                    <td>排序</td>
                                    <td>货位</td>
                                    <td>SKU</td>
                                    <td>数量</td>
                                </tr>
                            </table>
                        </mt-cell>
                        <virtual-list :start="start" :size="48" :remain="virtualRemain" style="padding-top: 50px;">
                            <div v-for="(row,index) in putawayOrderData"
                                 :key="row.id">
                                <mt-cell :class="[line_now === index?'height-line':'',(index%2===0&&index!==line_now)?'line-bg':'']"
                                         @click.native="line_off(row,index)">
                                    <table>
                                        <tr :class="[`${row.actual_quantity}`===`${row.quantity}`?'green':'',(`${row.actual_quantity}`!==`${row.quantity}`)&&(index < line_now)?'red':'']">
                                            <td width="12%">{{row.sequence_number}}</td>
                                            <td width="35%">{{row.warehouse_cargo_id}}</td>
                                            <td width="35%">{{row.sku}}</td>
                                            <td width="17%">{{row.actual_quantity}}/{{row.quantity}}</td></tr>
                                    </table>
                                </mt-cell>
                            </div>
                        </virtual-list>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container2">
                    <div v-if="putawayOrderData" class="content">
                        <div class="img_box">
                            <img :src="img" alt="">
                        </div>
                        <form class="form">
                            <line-table>
                                <table>
                                    <tr>
                                        <td style="width: 30%;">{{listData.warehouse_cargo_id}}</td>
                                        <td style="width: 10%;">{{listData.sequence_number}}</td>
                                        <td style="width: 50%;">
                                            <div style="line-height: 1.5em;">
                                                <span class="blue" v-for="(sku,index) in listData.sku" :key="index" @click="sku_box(sku)">{{sku}}<br></span>
                                            </div>
                                        </td>
                                        <td width="10%">{{listData.quantity}}</td>
                                    </tr>
                                </table>
                            </line-table>
                            <line-input ref="warehouse_cargo" :inputSelect="cargoSelect" :error-message="cargo_error" line-name="货位" @enter-input="cargo_enter" v-model="warehouse_cargo"></line-input>
                            <line-input ref="sku" :inputSelect="skuSelect" :error-message="sku_error" line-name="SKU" @enter-input="sku_enter" v-model="sku"></line-input>
                            <line-input ref="number" type="number" :inputSelect="quantitySelect" :error-message="quantity_error" line-name="数量" v-model="actual_quantity" @enter-input="quantity_enter"></line-input>
                            <div class="request_btn request_btn_t">
                                <request-button :request="make_off">确认上架</request-button>
                            </div>
                        </form>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div v-else>
            <div class="content">
                <button-input :mt="{'margin-top':'11%'}" ref="combine_code" lineName="SKU" :inputSelect="inputSelect" :error-message="errorMessage" v-model="combine_code" @submit="submit">

                </button-input>
                <tab-table titleName="SKU列表" :code-count="combineCodeDataLength">
                    <thead>
                        <tr>
                            <th width="24%">SKU</th>
                            <th width="24%">货位</th>
                            <th width="28%">编号</th>
                            <th width="16%">数量</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row,item) in combineCodeData" :key="item" >
                        <td width="24%">{{row.sku}}</td>
                        <td width="24%">{{row.warehouse_cargo_id}}</td>
                        <td width="28%">{{row.sequence_number}}</td>
                        <td width="16%">{{row.waiting_quantity}}</td>
                    </tr>
                    </tbody>
                </tab-table>
            </div>
            <msgbox v-if="showBox" :titleName="`${this.combine_code}扫描结果`" @close-box="close_box" @submit="submit_msgbox">
                <table class="putaway-table">
                    <tr class="all-table">
                        <td @click="select_all">
                            <input type="checkbox" v-model="select_show">
                        </td>
                        <td>批次</td>
                        <td>采购单ID</td>
                        <td>数量</td>
                    </tr>
                    <tr class="all-table" v-for="(row,item) in skuData" :key="item">
                        <td @click="select_check(row)"><input type="checkbox" v-model="row.show"></td>
                        <td>{{row.batch_id}}</td>
                        <td>{{row.purchase_order_id}}</td>
                        <td>{{row.waiting_quantity}}</td>
                    </tr>
                </table>
                <p class="red" v-if="skuMessage&&box_message">{{box_message}}</p>
            </msgbox>
        </div>
        <msgbox-sku ref="sku_goods"
                    v-model="skuShow"
                    :sku="get_sku"
                    :warehouse_id="this.$route.query.warehouse_id"
                    @get-img="getImg"
                    @close-box="close_sku_box"></msgbox-sku>
    </div>
</template>
<style lang="stylus" scoped>
    .content{
        width: 100%;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
    }
    .img_box{
        width:122px;
        height :122px;
        margin:0 auto;
        margin-top :18px;
        img{
            width :100%
            height: 100%
        }
    }
    .title{
        height :30px;
        font-size:1.5em;
        line-height :30px;
        text-align center;
    }
    .form{
        width :100%;
        text-align :center;
        padding-top:5%;
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
    .mint-cell-value{
        width:100%;
    }
    table{
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
        min-height:3em;
        max-height :17em;
        overflow-y: auto;
        text-align: center;
        ul{
            li{
                float :left;
                line-height: 1.5em;
                margin: 1em;
            }
        }
    }
    .putaway-table{
        tr{
            td{
                border:none;
            }
        }
    }
    .mt-tab-item{
        padding: 8px 0;
        .mt-tab-item-span{
            font-size: 14px
        }
    }
</style>
<script>
    import virtualList from 'vue-virtual-scroll-list';
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import tabTable from '../../components/tab-table.vue';
    import buttonInput from '../../components/button-input.vue';
    import lineInput from '../../components/line-input.vue';
    import lineTable from '../../components/line-table.vue';
    import lineList from '../../components/line-list.vue';
    import msgbox from '../../components/msgbox.vue';
    import msgboxSku from '../../components/msgbox-sku.vue';
    import{putaway_order_create,putaway_order_read,putaway_order_save,putaway_order_status,api_putaway_look_goods} from '../../api/putaway-order';
    import RequestButton from "@/components/request-button";
    /*
     * 后端:刘志勇
     * */
    export default{
        data(){
            return{
                combine_code:'',
                index:0,
                combineCodeData:[],
                dataList:[{
                    sku:'000'
                }],
                active:'tab-container1',
                selected:'tab1',
                putawayOrderData:[],
                orderNumber:'',
                warehouse_cargo:'',
                sku:'',
                actual_quantity:'',
                butShow:false,
                putawayOrderDataShow:false,
                inputSelect:false,
                cargoSelect:false,
                skuSelect:false,
                quantitySelect:false,
                skuShow:false,
                errorMessage:'',
                sku_error:'',
                cargo_error:'',
                quantity_error:'',
                listData:{},
                showBox:false,
                select_show:false,
                skuData:[],
                box_message:'',
                line_now:0,
                styles:{height:0},
                virtualRemain:10,
                start:0,
                get_sku:'',
                putaway_waiting_goods_id:'',
                img:'',
            }
        },
        mounted(){
            this.combineCodeData = [];
            this.putawayOrderDataShow = false;
            this.inputSelect = true;
            if(this.$route.query.id){
                this.get_putaway_order(this.$route.query.id);
            }
            if(this.putawayOrderDataShow === false){
                this.inputSelect = true;
            }else{
                let styles = window.getComputedStyle(document.getElementById('list-container'));
                this.styles.height = styles.height;
            }
        },
        methods:{
            backpath(){
                if(this.active==='tab-container2'){
                    this.active="tab-container1"
                }else{
                    this.$router.push({path:'/putaway-order',query:{warehouse_id:this.$route.query.warehouse_id}})
                }
            },
            sku_box(sku){
                this.$nextTick(()=>{
                    this.skuShow = true;
                    this.$refs.sku_goods.init();
                    this.$refs.sku.$refs.input.select();
                });
            },
            close_sku_box(){
                this.$refs.sku.$refs.input.select();
            },
            select_all(){
            	this.select_show = !this.select_show;
                this.skuData.forEach(row=>{
                    if(this.select_show){
                        row.show = true;
                    }else{
                        row.show = false;
                    }
                });
            },
            getImg(row){
                this.img=row
            },
            changeState(){
                this.active='tab-container1'
            },
            select_check(row){
                row.show=!row.show;
                let find = this.skuData.find(res=>{
                	return res.show ===false;
                });
                if(!find){
                    this.select_show = true;
                }else{
                    this.select_show = false;
                }
            },
            line_off(item,num){
                if(item.actual_quantity!==0){
                    Toast({message:`${item.sku}已上架`,position: 'top',duration: 1500});
                    return ;
                }
                this.putawayOrderData.forEach((row,index)=>{
                    if(row.id===item.id){
                        this.line_now = index;
                        this.listData.warehouse_cargo_id = row.warehouse_cargo_id;
                        this.listData.sku = [row.sku,...row.sku_alia];
                        this.listData.quantity = row.quantity;
                        this.listData.sequence_number = row.sequence_number;
                        this.actual_quantity = row.quantity;
                        this.warehouse_cargo = '';
                        this.sku = '';
                        this.putaway_waiting_goods_id = row.putaway_waiting_goods_id;
                        this.active = 'tab-container2';
                        this.selected = 'tab2';
                        this.get_sku = row.sku;
                    }
                });

            },
            cargo_enter(){
                this.$nextTick(()=>{
                    if(this.warehouse_cargo===''){
                        this.cargo_error = `请输入货位`;
                        return ;
                    }
                    let find = this.putawayOrderData.find(res=>{
                        return res.warehouse_cargo_id === this.warehouse_cargo;
                    });
                    if(!find){
                        this.cargo_error = `货位不在上架单列表中`;
                        this.cargoSelect = true;
                    }else{
                        this.cargo_error = '';
                    	if(this.sku===''){
                            this.skuSelect = true;
                            this.$refs.sku.$refs.input.select();
                        }else{
                            this.quantitySelect = true;
                            this.$refs.number.$refs.input.select();
                        }

                    }
                });
            },
            sku_enter(){
                this.$nextTick(()=>{
                    this.sku_error = '';
                    let find = this.putawayOrderData.find(row =>{
                        return [row.sku,`${row.sku_id}`,...row.sku_alia,...row.sku_alia_sh].includes(this.sku);
                    });
                    if(!find){
                        this.sku_error = `与实际需要上架SKU不一致`;
                        this.skuSelect = true;
                    }else{
                    	if(this.warehouse_cargo===''){
                            this.$refs.warehouse_cargo.$refs.input.select();
                        }else{
                            this.quantitySelect = true;
                            this.$refs.number.$refs.input.select();
                        }
                        this.sku_error = '';
                        this.skuSelect = false;
                    }
                });
            },
            quantity_enter(){
                let find = this.putawayOrderData.find(res=>{
                    return res.warehouse_cargo_id === this.warehouse_cargo&&([res.sku,`${res.sku_id}`,...res.sku_alia,...res.sku_alia_sh].includes(this.sku));
                });
                if(!!find){
                    if(Number(this.actual_quantity)>Number(find.quantity)){
                        this.quantity_error = `可上架数量最大为${find.quantity}`;
                        return ;
                    }else{
                        this.quantity_error = '';
                        this.make_off();
                    }
                }else{
                    this.quantity_error = '';
                    this.make_off();
                }
            },
            submit(){
                if(this.combine_code===''){
                    this.errorMessage = `SKU不能为空`;
                    return ;
                }
                this.skuData = [];
                this.errorMessage = '';
                this.box_message = '';
                this.$http(api_putaway_look_goods,this.combine_code,{warehouse_id:this.$route.query.warehouse_id}).then(res=>{
                    if(res.data.length>1){
                        this.skuData = res.data;
                        this.skuData.forEach(row=>{
                            this.$set(row,'show',false);
                        });
                        this.showBox = true;
                        this.select_show = false;
                        return ;
                    }
                    res.data.forEach(row=>{
                        let find = this.combineCodeData.findIndex(item=>{
                            return item.id === row.id;
                        });
                        if(find===-1){
                            this.index = this.index+1;
                            let index = this.index;
                            let data = {
                                sequence_number:index,
                                waiting_quantity:row.waiting_quantity,
                                sku:row.sku,
                                warehouse_cargo_id:row.warehouse_cargo_id,
                                id:row.id,
                            };
                            this.combineCodeData.unshift(data);
                            this.butShow = true;
                            this.combine_code = '';
                            this.inputSelect = true;
                            this.errorMessage = '';
                        }else{
                            this.inputSelect = true;
                            this.errorMessage = `${this.combine_code}已重复添加`;
                        }
                    });
                }).catch(code=>{
                    this.inputSelect = true;
                    this.errorMessage = code.message;
                });

            },
            close_box(){
                this.showBox = false;
                this.combine_code = '';
                this.inputSelect = true;
                this.$refs.combine_code.$refs.input.select();
                this.errorMessage = '';
            },
            submit_msgbox(){
            	let box = this.skuData.find(res=>{
            		return  res.show===true;
                });
            	if(!box){
            		this.box_message = `请至少选择一个`;
//                    Toast({message:`请至少选择一个`,position: 'top', className: 'icon-index',duration: 1500});
                    return ;
                }
                this.showBox = false;
                this.skuData.forEach(row=>{
                	if(row.show){
                        let find = this.combineCodeData.findIndex(item=>{
                            return item.id === row.id;
                        });
                        if(find===-1){
                            this.index = this.index+1;
                            let index = this.index;
                            let data = {
                                sequence_number:index,
                                waiting_quantity:row.waiting_quantity,
                                sku:row.sku,
                                warehouse_cargo_id:row.warehouse_cargo_id,
                                id:row.id,
                            };
                            this.combineCodeData.unshift(data);
                            this.butShow = true;
                            this.combine_code = '';
                            this.inputSelect = true;
                            this.$refs.combine_code.$refs.input.select();
                            this.errorMessage = '';
                        }else{
                            this.inputSelect = true;
                            this.errorMessage = `${this.combine_code}已重复添加`;
                        }
                    }
                });

            },
            all_submit(){
                let data = this.combineCodeData.map(row=>{
                    return {
                        id:row.id,
                        sequence_number:row.sequence_number,
                    }
                });
                return this.$http(putaway_order_create,{data:data}).then(res=>{
                    this.orderNumber = res.data.id;
                    this.butShow = false;
                    this.putawayOrderDataShow = true;
                    if(res.message.includes('操作成功')){
                        Toast({message:`已生成上架单`,position: 'top',duration: 1500});
                    }
                    this.putawayOrderData = res.data.details;
                    let i = this.putawayOrderData.findIndex(row=>{
                        return row.actual_quantity === 0;
                    });
                    this.line_now = i;
                    return Promise.resolve()
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
            },
            get_putaway_order(id){
                this.$http(putaway_order_read,id).then(res=>{
                    this.putawayOrderData = res.details;
                    this.orderNumber = res.id;
                    if(this.putawayOrderData){
                        this.putawayOrderDataShow = true;
                        let i = this.putawayOrderData.findIndex(res=>{
                            return res.actual_quantity === 0;
                        });
                        this.line_now = i;
                        this.start = this.line_now;
                    }else{
                        this.putawayOrderDataShow = false;
                    }

                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                })
            },
            complete(){
                let find = this.putawayOrderData.find(res=>{
                    return res.actual_quantity === 0;
                });
                if(!!find){
                    return MessageBox.confirm('你还有未上架的商品，确定要完成上架？').then(action => {
                        return this.$http(putaway_order_status,this.orderNumber).then(res=>{
                            Toast({
                                message: '操作成功',
                                iconClass: 'mint-toast-icon mintui mintui-success'
                            });
                        }).catch(code=>{
                            Toast({message:code.message,position: 'top',duration: 1000});
                        });
                        return Promise.resolve()
                    }).catch(code=>{
                        Toast({message:`已取消操作`,position: 'top',duration: 1500});
                    });
                    return Promise.resolve()
                }else{
                    MessageBox({
                        title: '提示',
                        message: '您已全部上架，已完成上架',
                        confirmButtonText: `好的，我知道了`
                    });
                }

            },
            make_off(){
                if(this.warehouse_cargo===''){
                    this.cargo_error = `请输入货位`;
                    this.cargoSelect = true;
                    return ;
                }else if(this.sku===''){
                    this.sku_error = `请输入SKU`;
                    this.skuSelect = true;
                    return ;
                }else if(this.actual_quantity===''){
                    this.quantity_error = `请输入数量`;
                    this.quantitySelect = true;
                    return ;
                }
                let find = this.putawayOrderData.find(res=>{
                    return res.sku === this.sku;
                });
                let data ={
                    putaway_order_id :this.orderNumber,
                    warehouse_cargo_id :this.warehouse_cargo,
                    sku :this.sku,
                    actual_quantity :this.actual_quantity,
                    putaway_waiting_goods_id:find.putaway_waiting_goods_id,

                };
                return this.$http(putaway_order_save,data).then(res=>{
                    Toast({message:`${this.sku}已上架`,position: 'top',duration: 1500});
                    this.putawayOrderData.forEach(row=>{
                        if(this.warehouse_cargo=== row.warehouse_cargo_id&&([row.sku,`${row.sku_id}`,...row.sku_alia,...row.sku_alia_sh].includes(this.sku))){
                            row.actual_quantity = this.actual_quantity;
                        }
                    });
                    let find = this.putawayOrderData.find(res=>{
                        return res.actual_quantity===0;
                    });
                    if(res.message.includes(`已完成上架`)){
                        MessageBox({
                            title: '提示',
                            message: '您已全部上架，已完成上架',
                            confirmButtonText: `好的，我知道了`
                        });
                        this.putawayOrderData = [];
                        this.$router.push({
                            path:"/putaway-order",
                            query:{
                                warehouse_id:this.$route.query.warehouse_id
                            }
                        });
                        return ;
                    }else{
                        for(let i = this.line_now; i < this.putawayOrderData.length; i++){
                            if(this.putawayOrderData[i].actual_quantity === 0){
                                this.line_now = i;
                                this.listData = {
                                    warehouse_cargo_id:this.putawayOrderData[i].warehouse_cargo_id,
                                    sku:[this.putawayOrderData[i].sku,...this.putawayOrderData[i].sku_alia],
                                    sequence_number:this.putawayOrderData[i].sequence_number,
                                    quantity:this.putawayOrderData[i].quantity,
                                };
                                this.get_sku = this.putawayOrderData[i].sku;
                                this.warehouse_cargo = '';
                                this.actual_quantity = this.putawayOrderData[i].quantity;
                                this.sku = '';
                                this.cargoSelect = true;
                                this.$refs.warehouse_cargo.$refs.input.select();
                                break;
                            }else{
                                this.line_now = this.putawayOrderData.length;
                            }
                        }
                        if(this.line_now===this.putawayOrderData.length){
                            let index = this.putawayOrderData.findIndex(row =>{
                                return row.actual_quantity === 0;
                            });
                            this.line_now = index;
                            this.listData = {
                                warehouse_cargo_id:this.putawayOrderData[index].warehouse_cargo_id,
                                sku:[this.putawayOrderData[index].sku,...this.putawayOrderData[index].sku_alia],
                                sequence_number:this.putawayOrderData[index].sequence_number,
                                quantity:this.putawayOrderData[index].quantity,
                            };
                            this.get_sku = this.putawayOrderData[index].sku,
                            this.warehouse_cargo = '';
                            this.actual_quantity = this.putawayOrderData[index].quantity;
                            this.sku = '';
                            this.cargoSelect = true;
                            this.$refs.warehouse_cargo.$refs.input.select();
                        }
                    }
                    return Promise.resolve();
                }).catch(code=>{
                    console.log(code,'code');
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
            },
        },
        computed:{
            skuMessage(){
                let find = this.skuData.find(res=>{
                    return  res.show===true;
                });
                if(!!find){
                	return false;
                }else{
                    return true;
                }
            },
            combineCodeDataLength(){
                return this.combineCodeData.length;
            },
            title(){
                if(this.orderNumber){
                    return `${this.orderNumber}上架单`;
                }else{
                    return `创建上架单`;
                }

            },
            sequenceNumber(){
                if(this.warehouse_cargo){
                    let find = this.putawayOrderData.find(res=>{
                        return this.warehouse_cargo === res.warehouse_cargo_id;
                    });
                    if(!!find){
                        return find.sequence_number;
                    }else{
                        return '';
                    }
                }else{
                    return '';
                }
            }
        },
        watch: {
            selected(val){
                if(val==='tab1'){
                    if(this.putawayOrderData){
                        let find = this.putawayOrderData.find(res=>{
                            return  res.actual_quantity===0;
                        });
                        if(!find){
                            this.putawayOrderData = [];
                        }
                    }else{
                        if(this.putawayOrderDataShow === false){
                            this.inputSelect = true;
                        }
                    }
                }else if(val==='tab2'){
                    this.putawayOrderData.forEach((row,index)=>{
                        if(index===this.line_now) {
                            this.listData.warehouse_cargo_id = row.warehouse_cargo_id;
                            this.listData.sku = [row.sku,...row.sku_alia];
                            this.listData.quantity = row.quantity;
                            this.listData.sequence_number = row.sequence_number;
                            this.actual_quantity = row.quantity;
                        }
                        this.$nextTick(()=>{
                            this.cargoSelect = true;
                            this.$refs.warehouse_cargo.$refs.input.select();
                        });
                    });
                }
            },
            active(val){
                if(val==='tab-container1'){
                    this.selected = 'tab1';
                }else if(val==='tab-container2'){
                    this.selected = 'tab2';
                    this.cargoSelect = true;
                    this.$refs.warehouse_cargo.$refs.input.select();
                }
            }
        },
        components:{
            RequestButton,
            tabTable,buttonInput,lineInput,lineList,msgbox,virtualList,lineTable,msgboxSku,
            requestButton:require('@/components/request-button').default,
        }
    }
</script>
