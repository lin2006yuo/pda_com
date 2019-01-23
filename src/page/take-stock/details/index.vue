<template>
    <div class="details" style="height: 100%;">
        <mt-header fixed :title="title">
            <span slot="left" @click="backpath">
                <i class="mintui mintui-back go-back" ></i><span>返回</span>
            </span>
            <button slot="right" v-if="!completeShow&&this.active==='tab-container1'" @click="complete">完成盘点</button>
            <div slot="right" class="partition" @click="chanageState" v-if="this.active==='tab-container2'">盘点路径</div>
        </mt-header>
        <mt-tab-container v-model="active" id="list-container" value="tab-container1" class="pt-lg" style="height: 100%;overflow:hidden;">
            <mt-tab-container-item id="tab-container1">
                <table class="table" width="100%">
                    <thead>
                    <tr  class="all-table">
                        <th>排序</th>
                        <th>货位</th>
                        <th style="font-weight: 300">SKU</th>
                        <th>数量</th>
                        <th>
                            <title-select
                                    width="4.5"
                                    v-model="result"
                                    :selectList="resultList"></title-select>
                        </th>
                    </tr>
                    </thead>
                    <tbody  v-resize="{height:10}">
                    <virtual-list  :start="start" :size="50" :remain="virtualRemain">
                        <tr
                                v-for="(row,index) in stockOrderSortData"
                                :key="row.id"
                                :class="[index===line_now?'height-line':'',(index%2===0&&index!==line_now)?'line-bg':'',(row.status!==8&&index<line_now)||row.status===4||row.status===6?'red':'',row.status===8?'green':'']"
                                @click="get_line(row,index)"
                        >
                            <td width="9%">{{index+1}}</td>
                            <td width="27%">{{row.warehouse_cargo_code}}</td>
                            <td width="26%">{{row.sku}}</td>
                            <td width="15%">{{row.quantity_check}}/{{row.quantity_cargo}}</td>
                            <td width="15%">{{row.status_name}}</td>
                            <td width="4%"><i class="mintui mintui-back back" style="font-size: 17px;"></i></td>
                        </tr>
                    </virtual-list>
                    </tbody>
                </table>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <div class="img_box">
                    <info :warehouse="lineData"></info>
                </div>
                    <form class="form">
                        <line-input
                                :textWidth="22"
                                :inputWidth="75"
                                ref="warehouse_cargo"
                                :inputSelect="cargoSelect"
                                :error-message="warehouse_cargo_error"
                                line-name="货位"
                                @enter-input="cargo_enter"
                                v-model="warehouse_cargo"
                                class="alloc_tion"></line-input>
                        <line-input :textWidth="22" :inputWidth="75" ref="sku" :inputSelect="skuSelect" :error-message="sku_error" line-name="SKU" @enter-input="sku_enter" v-model="sku"></line-input>
                        <line-input :textWidth="22" :inputWidth="75" ref="number" type="number" :min="0" :inputSelect="quantitySelect" :error-message="quantity_error" line-name="数量" v-model="quantity_check"></line-input>
                        <line-input :textWidth="22" :inputWidth="75" ref="remark" :inputSelect="remarkSelect" :error-message="remark_error" line-name="备注" v-model="remark"></line-input>
                        <div class="request_btn request_btn_t" >
                            <request-button :request="make_off">确认盘点</request-button>
                        </div>

                    </form>
            </mt-tab-container-item>
        </mt-tab-container>
        <msgbox-sku ref="sku_goods" v-model="skuShow" :warehouse_id="this.$route.query.warehouse_id" :sku="sku_name"
                    @get-img="getImg" @close-box="close_box"></msgbox-sku>
    </div>
</template>
<style lang="stylus" scoped>
    .take-stock{
        border:1px solid white;
        text-align:center;
        border-radius:8px;
        padding:3px 0;
    }
    .img_box{
        width:320px;
    }
    .title{
        height :30px;
        font-size:2em;
        line-height :30px;
        text-align center;
    }
    .form{
        width :100%;
        text-align :center;
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
        margin: 0px auto;
        padding-left :10px;
    }
    .remark{
        text-align: left;
        padding-left: 2%;
    }
    #tab-container2{
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
    }
    .alloc_tion>.out-box{
        margin-top :0px;
    }
</style>
<script>
    import virtualList from '@/components/virtual-list';
    import { Toast } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    import lineList from '../../../components/line-list.vue';
    import lineTable from '../../../components/line-table.vue';
    import lineInput from '../../../components/line-input.vue';
    import msgboxSku from '../../../components/msgbox-sku.vue';
    import titleSelect from '../../../components/title-select.vue';
    import { Indicator } from 'mint-ui';
    import info from '@/components/info.vue';
    import{api_warehouse_goods_list,api_warehouse_goods_finish,api_warehouse_goods_exists,api_warehouse_goods_check_finish}from '../../../api/warehouse-goods-check';
    /*
     * 后端:刘志勇
     * */
    export default{
        data(){
            return{
                popupVisible:true,
                title:'库存盘点',
                active:'tab-container1',
                selected:'tab1',
                stockOrderData:[],
                orderNumber:'',
                warehouse_cargo:'',
                warehouse_cargo_error:'',
                sku:'',
                sku_error:'',
                quantity_error:'',
                remark_error:'',
                quantity_check:'',
                remark:'',
                quantityCargo:'',
                lineData:[],
                cargoSelect:false,
                skuSelect:false,
                quantitySelect:false,
                remarkSelect:false,
                completeShow:true,
                skuShow:false,
                line_now:0,
                styles:{height:0},
                virtualRemain:11,
                start:0,
                sku_name:'',
                resultList:[],
                result:-1,
                img:''
            }
        },
        mounted(){
            if(this.$route.query.id){
                this.look_list(this.$route.query.id);
                this.title = `${this.$route.query.id} 库存盘点`;
                this.orderNumber = this.$route.query.id;
                let styles = window.getComputedStyle(document.getElementById('list-container'));
                this.styles.height = styles.height;
            }
        },
        methods:{
            backpath(){
                if(this.active==='tab-container2'){
                    this.active='tab-container1'
                } else{
                    this.$router.push({path:'/take-stock',query:{warehouse_id:this.$route.query.warehouse_id}})
                }
            },
            chanageState(){
                this.active='tab-container1'
            },
            getImg(row){
                this.img=row
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
            complete(){
                let id = this.$route.query.id;
                this.$http(api_warehouse_goods_check_finish,id).then(res=>{
                    Toast({
                        message: '操作成功',
                        iconClass: 'mint-toast-icon mintui mintui-success'
                    });
                    this.$router.push({
                        path:"/take-stock",
                        query:{
                            warehouse_id:this.$route.query.warehouse_id
                        }
                    });
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
            },
            get_line(row,num){
                console.log(row,num,'row');
                this.line_now = num;
                this.lineData = {};
                this.lineData = {
                    warehouse_cargo_code:row.warehouse_cargo_code,
                    sku:row.sku,
                    sku_alia:row.sku_alia,
                    quantity_cargo:row.quantity_cargo,
                    sku_id:row.sku_id,
                };
                this.warehouse_cargo = '';
                this.sku = row.quantity_cargo===0?row.sku:'';
                this.quantity_check = '';
                this.remark = '';
                this.active = 'tab-container2';
                this.selected = 'tab2';
            },
            look_list(id){
                this.$http(api_warehouse_goods_list,id).then(res=>{
                    this.stockOrderData = res.details;
                    this.stockOrderData.forEach((row,index)=>{
                        if(row.status===0){
                            row.status_name = '未盘';
                        }
                    });
                    let list = [{label:'盘点结果',value:-1}];
                    this.stockOrderData.forEach(item=>{
                    	if(list.findIndex(r=>r.value === item.status) <= -1){
                            list.push({
                                label:item.status_name,
                                value:item.status
                            });
                        }
                    });
                    this.resultList = list;
                    let find = this.stockOrderData.find(item=>{
                        return item.status ===0;
                    });
                    if(!!find){
                        this.completeShow = true;
                    }
                })
            },
            cargo_enter(){
                this.warehouse_cargo_error = '';
                this.$nextTick(()=>{
                    if(this.warehouse_cargo===''){
                        this.warehouse_cargo_error = `请输入货位`;
                        return ;
                    }
                    let find = this.stockOrderData.find(row=>{
                        return this.warehouse_cargo === row.warehouse_cargo_code;
                    });
                    if(!find){
                        this.warehouse_cargo_error = `货位不在该盘点单中`;
                        this.cargoSelect = true;
                    }else{
                        this.warehouse_cargo_error = '';
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
                this.sku_error = '';
                this.$nextTick(()=>{
                	if(this.sku===''){
                        this.sku_error = `请输入SKU`;
                        return ;
                    }
                    let find = this.stockOrderData.find(row =>{
                        return [row.sku,`${row.sku_id}`,...row.sku_alia,...row.sku_alia_sh].includes(this.sku);
                    });
                    if(!find){
                        this.sku_error = `与实际需要盘点SKU不一致`;
                    }else{
                        this.sku_error = '';
                        if(this.warehouse_cargo===''){
                            this.$refs.warehouse_cargo.$refs.input.select();
                        }else{
                            this.quantitySelect = true;
                            this.$refs.number.$refs.input.select();
                        }

                    }
                });
            },
            make_off(){
                if(!this.warehouse_cargo){
                    this.warehouse_cargo_error = '请输入货位';
                    return ;
                };
                if(!this.sku){
                    this.sku_error = '请输入SKU';
                    return ;
                };
                if(!this.quantity_check){
                    this.quantity_error = '请输入数量';
                    return ;
                };
                let data = {
                    warehouse_goods_check_id:this.$route.query.id,
                    warehouse_cargo_code:this.warehouse_cargo,
                    sku:this.sku,
                    quantity_check:this.quantity_check,
                    remark:this.remark,
                };
                return this.$http(api_warehouse_goods_finish,data).then(res=>{
                    Toast({message:`${this.sku}已盘点`,position: 'top',duration: 1500});
                    this.$refs.warehouse_cargo.$refs.input.select();
                    let now = '';
                    this.stockOrderData.forEach((row,index)=>{
                        if(this.warehouse_cargo === row.warehouse_cargo_code&&([row.sku,`${row.sku_id}`,...row.sku_alia,...row.sku_alia_sh].includes(this.sku))){
                            row.quantity_check = res.data.quantity_check;
                            row.remark = res.data.remark;
                            row.status_name = res.data.status_name;
                            row.status = res.data.status;
                            console.log(row);
                            if(index===this.stockOrderData.length-1){
                                now = 0;
                            }else{
                                now = index+1;
                            }
                        }
                    });
                    this.warehouse_cargo = '';
                    this.quantity_check = '';
                    this.remark = '';
                    console.log('当前行',now);
                    for(let i = now ; i < this.stockOrderData.length; i++){
                        if(this.stockOrderData[i].status !== 0){
                            now = now + 1;
                        }else{
                        	break ;
                        }
                    }
                    this.stockOrderData.forEach((row,index)=>{
                        if(index===now){
                            this.line_now = now;
                            this.lineData = {
                                warehouse_cargo_code:row.warehouse_cargo_code,
                                sku:row.sku,
                                sku_alia:row.sku_alia,
                                quantity_cargo:row.quantity_cargo,
                                sku_id:row.sku_id,
                            };
                            this.sku = row.quantity_cargo===0?row.sku:'';
                        }
                    });
                    let find = this.stockOrderData.find(row=>{
                        return  row.status === 2 || row.status === 0;
                    });
                    if(!find){
                        MessageBox({
                            title: '提示',
                            message: '你已完成盘点',
                            confirmButtonText: `好的，我知道了`
                        });
                        this.$router.push({
                            path:"/take-stock",
                            query:{
                                warehouse_id:this.$route.query.warehouse_id
                            }
                        });
                        return ;
                    }
                    return Promise.resolve()
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
            },
            quantity_cargo(){
                if(this.warehouse_cargo&&this.sku){
                    let data = {
                        warehouse_goods_check_id:this.$route.query.id,
                        warehouse_cargo_code:this.warehouse_cargo,
                        sku:this.sku,
                    };
                    this.$http(api_warehouse_goods_exists,data).then(res=>{
                        let data = res.data;
                        if(!!data){
                            this.quantityCargo = data.quantity_cargo;
                        }else{
                            this.quantityCargo = '';
                        }
                    }).catch(code=>{
                        Toast({message:code.message,position: 'top',duration: 1000});
                        console.log(code.message);
                    });
                }else{
                    this.quantityCargo = '';
                }
            }
        },
        filters:{
            filterStatus(val){
                //0:初始,2:盘点中,3:重盘 4:盘盈,6:盘亏,8:正常
                if(val==='初始'){
                    return '未盘';
                }
            }
        },
        computed:{
            stockOrderSortData(){
                switch (this.result){
                    case -1:
                        return this.stockOrderData;
                    default :
                        return this.stockOrderData.filter(res=>{
                            return `${this.result}`===`${res.status}`;
                        });
                }
            }
        },
        watch:{
            active(val){
                if(val==='tab-container1'){
                    this.selected = 'tab1';
                }else if(val==='tab-container2'){
                    this.selected = 'tab2';
                    this.$nextTick(()=>{
                        this.cargoSelect = true;
                        this.$refs.warehouse_cargo.$refs.input.select();
                    });
                }
            },
            selected(val){
                if(val==='tab2'){
                    this.cargoSelect = true;
                    this.$refs.warehouse_cargo.$refs.input.select();
                    this.stockOrderData.forEach((row,index)=>{
                        if(this.line_now===index){
                            this.lineData = {
                                warehouse_cargo_code:row.warehouse_cargo_code,
                                sku:row.sku,
                                sku_alia:row.sku_alia,
                                quantity_cargo:row.quantity_cargo,
                                sku_id:row.sku_id,
                            }
                        }
                    });
                }
            }
        },
        components:{
            lineList,lineInput,lineTable,virtualList,msgboxSku,titleSelect,
            requestButton:require('@/components/request-button').default,info,
        }
    }
</script>
