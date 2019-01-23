<template>
    <div class="putaway-order pb-lg">
        <mt-header fixed :title="title">
            <span slot="left" @click="backpath">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </span>
            <div slot="right" class="partition" @click="changeState" v-if="active==='tab-container2'">上架路径</div>
        </mt-header>
        <div style="height: 100%;" id="list-container">
            <mt-tab-container v-model="active" value="tab-container1" style="height: 100%;overflow: hidden;">
                <mt-tab-container-item id="tab-container1" class="pt-lg">
                    <div>
                        <table class="table" width="100%">
                            <thead>
                                <tr class="all-table">
                                    <th>排序</th>
                                    <th>货位</th>
                                    <th>SKU</th>
                                    <th>数量</th>
                                    <th>库存</th>
                                </tr>
                            </thead>
                            <tbody  v-resize="{height:2}">
                            <virtual-list  :start="start" :size="36" :remain="virtualRemain">
                                <tr
                                        class="all-table"
                                        v-for="(row,index) in putawayOrderData"
                                        :key="row.id"
                                        :class="[line_now === index?'height-line':'',(index%2===0&&index!==line_now)?'line-bg':'',`${row.quantity-row.quantity_left}`===`${row.quantity}`?'green':'',(`${row.quantity-row.quantity_left}`!==`${row.quantity}`)&&(index < line_now)?'red':'']"
                                        @click="line_off(row,index)"
                                >
                                    <td>{{row.sort}}</td>
                                    <td width="27%">{{row.warehouse_cargo_code}}</td>
                                    <td width="30%">{{row.sku}}</td>
                                    <td width="14%">{{row.quantity_left}}/{{row.quantity}}</td>
                                    <td width="6%">{{row.quantity}}</td>
                                    <td width="6%"><i class="mintui mintui-back back" style="font-size: 17px;"></i></td>
                                </tr>
                            </virtual-list>
                            </tbody>
                        </table>
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
                                        <td style="width: 30%;">{{listData.warehouse_cargo_code}}</td>
                                        <td style="width: 10%;">{{listData.sort}}</td>
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
        <msgbox-sku ref="sku_goods"
                    v-model="skuShow"
                    :sku="get_sku"
                    :warehouse_id="this.$route.query.warehouse_id"
                    @get-img="getImg"
                    @close-box="close_sku_box"></msgbox-sku>
    </div>
</template>
<style lang="stylus" scoped>
    .path{
        border:1px solid white;
        text-align:center;
        border-radius:8px;
        padding:3px 0;

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
    .content{
        width: 100%;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
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
    import{api_return_shelves_read,api_return_shelves_put,putaway_order_read,putaway_order_save,putaway_order_status,api_putaway_look_goods,api_reback_shelves_read,api_reback_shelves_put} from '../../api/putaway-order';
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
                virtualRemain:13.5,
                start:0,
                detail_id:'',
                img:'',
                get_sku:'',
            }
        },
        mounted(){
            this.combineCodeData = [];
            this.inputSelect = true;
            if(this.$route.query.id){
                this.get_putaway_order(this.$route.query.id);
            }
            let styles = window.getComputedStyle(document.getElementById('list-container'));
            this.styles.height = styles.height;
        },
        methods:{
            backpath(){
                if(this.active==='tab-container2'){
                    this.active='tab-container1'
                }else{
                    this.$router.push({path:'/reback-shelves-order',query:{warehouse_id:this.$route.query.warehouse_id}})
                }
            },
            changeState(){
                this.active='tab-container1'
            },
            getImg(row){
                this.img=row;
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
                console.log('this.skuData',this.skuData);
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
                console.log('1111',item);
            	if(item.quantity_left===0){
                    Toast({message:`SKU: ${item.sku} 已重返上架`,position: 'top',duration: 1500});
                    this.line_now = num+1;
                    return ;
                }
                this.putawayOrderData.forEach((row,index)=>{
                    if(row.id===item.id){
                        this.line_now = index;
                        this.listData.warehouse_cargo_code = row.warehouse_cargo_code;
                        this.listData.sku = [row.sku,...row.sku_alias];
                        this.listData.quantity = row.quantity_left;
                        this.listData.sort = row.sort;
                        this.actual_quantity = row.quantity_left;
                        this.detail_id = row.id;
                        this.warehouse_cargo = '';
                        this.sku = '';
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
                        return res.warehouse_cargo_code === this.warehouse_cargo;
                    });
                    console.log(find);
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
                        return [row.sku,`${row.sku_id}`,...row.sku_alias,...row.sku_alias_sh].includes(this.sku);
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
                    return res.warehouse_cargo_code === this.warehouse_cargo&&([res.sku,`${res.sku_id}`,...res.sku_alias,...res.sku_alias_sh].includes(this.sku));
                });
                if(!!find){
                    if(Number(this.actual_quantity)>Number(find.quantity_left)){
                        this.quantity_error = `可上架数量最大为${find.quantity_left}`;
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
            get_putaway_order(id){
                this.$http(api_reback_shelves_read,id).then(res=>{
                    this.putawayOrderData = res.data.details;
                    this.orderNumber = res.data.id;
                    if(this.putawayOrderData){
                        let i = this.putawayOrderData.findIndex(res=>{
                            return res.quantity_left !== 0;
                        });
                        this.line_now = i;
                        console.log('this.line_now',this.line_now);
                        this.start = this.line_now;
                    }
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                })
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
                let data ={
                    detail_id :this.detail_id,
                    reback_shelves_order_id :this.orderNumber,
                    warehouse_cargo_code :this.warehouse_cargo,
                    sku :this.sku,
                    quantity :this.actual_quantity,
                };
                return this.$http(api_reback_shelves_put,this.orderNumber,data).then(res=>{
                    Toast({message:`${this.sku}已上架`,position: 'top',duration: 1500});
                    this.putawayOrderData.forEach(row=>{
                        if(this.warehouse_cargo=== row.warehouse_cargo_code&&([row.sku,`${row.sku_id}`,...row.sku_alias,...row.sku_alias_sh].includes(this.sku))){
                            row.quantity_left = row.quantity_left - this.actual_quantity;
                        }
                    });
                    let find = this.putawayOrderData.find(res=>{
                        return res.quantity_left!==0;
                    });
                    if(!find){
                        MessageBox({
                            title: '提示',
                            message: '您已全部上架，已完成上架',
                            confirmButtonText: `好的，我知道了`
                        });
                        this.putawayOrderData = [];
                        this.$router.push({
                            path:"/reback-shelves-order",
                            query:{
                                warehouse_id:this.$route.query.warehouse_id
                            }
                        });
                        return ;
                    }else{
                        for(let i = this.line_now; i < this.putawayOrderData.length; i++){
                        	let quantity = this.putawayOrderData[i].quantity - this.putawayOrderData[i].quantity_left;
                            if(quantity === 0){
                                this.line_now = i;
                                this.listData = {
                                    warehouse_cargo_code:this.putawayOrderData[i].warehouse_cargo_code,
                                    sku:[this.putawayOrderData[i].sku,...this.putawayOrderData[i].sku_alias],
                                    sort:this.putawayOrderData[i].sort,
                                    quantity:this.putawayOrderData[i].quantity_left,
                                };
                                this.get_sku = this.putawayOrderData[i].sku;
                                this.detail_id = this.putawayOrderData[i].quantity_left.id;
                                this.warehouse_cargo = '';
                                this.actual_quantity = this.putawayOrderData[i].quantity_left;
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
                                return row.quantity_left !== 0;
                            });
                            this.line_now = index;
                            this.listData = {
                                warehouse_cargo_code:this.putawayOrderData[index].warehouse_cargo_code,
                                sku:[this.putawayOrderData[index].sku,...this.putawayOrderData[index].sku_alias],
                                sort:this.putawayOrderData[index].sort,
                                quantity:this.putawayOrderData[index].quantity_left,
                            };
                            this.get_sku = this.putawayOrderData[index].sku,
                            this.detail_id = this.putawayOrderData[index].id;
                            this.warehouse_cargo = '';
                            this.actual_quantity = this.putawayOrderData[index].quantity_left;
                            this.sku = '';
                            this.cargoSelect = true;
                            this.$refs.warehouse_cargo.$refs.input.select();
                        }
                    }
                    return Promise.resolve()
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
            },
        },
        computed:{
            title(){
                if(this.orderNumber){
                    return `${this.orderNumber}上架单`;
                }

            },
        },
        watch: {
            selected(val){
                if(val==='tab2'){
                    this.putawayOrderData.forEach((row,index)=>{
                        if(index===this.line_now) {
                            this.listData.warehouse_cargo_code = row.warehouse_cargo_code;
                            this.listData.sku = [row.sku,...row.sku_alias];
                            this.listData.quantity = row.quantity_left;
                            this.listData.sort = row.sort;
                            this.actual_quantity = row.quantity_left;
                            this.detail_id = row.id;
                        }
                        this.$nextTick(()=>{
                            this.cargoSelect = true;
                            this.$refs.warehouse_cargo.$refs.input.select();
                        });
                    });
                }
            },
            active(val){
                console.log(val);
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
            tabTable,buttonInput,lineInput,lineList,msgbox,virtualList,lineTable,msgboxSku,
            requestButton:require('@/components/request-button').default,
        }
    }
</script>
