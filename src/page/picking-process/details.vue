<template>
    <div class="pick-details pb-lg">
        <mt-header fixed :title="`PL${this.pickingNumber} 拣货单任务`">
            <span slot="left" @click="backpath">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </span>
            <div slot="right" class="partition" @click="changeState" v-if="active==='tab-container1'||active==='tab-container3'">拣货路径</div>
            <request-button  slot="right" v-if="active==='tab-container2'" :request="complete" :sty="{'border': '1px solid #fff','color': '#666','margin-left':' 5px',
            'background-color': '#fff','padding':'3px 2px','border-radius':'4px'}">拣货完成</request-button>
        </mt-header>
        <mt-tab-container v-model="active" id="list-container" class="pt-lg" style="height: 100%;">
            <mt-tab-container-item id="tab-container2">
                <div>
                    <mt-cell>
                        <table>
                            <tr class="all-table">
                                <td>排序</td>
                                <td>货位</td>
                                <td>SKU</td>
                            <td>
                                <title-select
                                    width="3"
                                    v-model="quantity"
                                    @select-change="select_quantity"
                                    :selectList="quantityList"></title-select>
                            </td>
                        </tr></table>
                    </mt-cell>
                    <virtual-list :start="start" :size="48" :remain="virtualRemain">
                        <div v-for="(row,index) in detailsSortData" :key="row.rindex" @click="get_line(row,index)">
                                <table>
                                    <tr class="all-table"
                                        :class="[(`${row.picking_quantity}`!==`${row.quantity}`)&&(index < line_now) ?'red':'',`${row.picking_quantity}`===`${row.quantity}`?'green':'']">
                                        <td style="width: 10%">{{index+1}}</td>
                                        <td style="width: 30%">{{row.warehouse_cargo}}</td>
                                        <td style="width: 30%">{{row.sku}}</td>
                                        <td style="width: 15%">{{row.picking_quantity}}/{{row.quantity}}</td>
                                    </tr>
                                </table>
                        </div>
                    </virtual-list>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container3">
                <div class="skued" v-if="imgshow">
                    <info :warehouse="lineData"></info>
                </div>
                <form class="form">
                    <div v-if="orderListData.length>0" class="mb-sm" style="margin-top: -10px;">
                        <ui-table>
                            <tr><th style="width: 20%">编号</th><th style="width: 20%">数量</th><th style="width: 60%">跟踪号</th></tr>
                        </ui-table>
                        <ui-table v-for="(data,index) in orderListData" :key="index">
                                <tr>
                                    <td  style="width: 20%">{{data.number}}</td>
                                    <td style="width: 20%">{{data.sku_quantity}}</td>
                                    <td style="width: 60%">{{data.shipping_number}}</td>
                                </tr>
                                <tr><td colspan="3" style="text-align: left;">备注:{{data.note}}</td></tr>
                        </ui-table>
                    </div>
                    <div class="outbox">
                        <div v-if="orderListData.length===0" style="display: flex;align-items: center; height:26px;">
                            <line-select
                                    ref="turnover_box"
                                    v-model="turnover_box"
                                    lineName="箱号"
                                    :sty="{'width':'130px','margin-left':'10px'}"
                                    iconRight="14px"
                                    @select-change="select_box"
                                    :selectList="turnoverBoxList"
                                    :box.sync="turnover_box"
                                    :box-show.sync="tabshow"
                            ></line-select>
                            <div class="xbtn" @click="bd">绑箱</div>
                        </div>
                        <line-input ref="warehouse_cargo" class="line-input"
                                    :inputSelect="cargoSelect"
                                    :error-message="warehouse_cargo_error"
                                    line-name="货位"
                                    @enter-input="cargo_enter"
                                    v-model="warehouse_cargo"></line-input>
                        <line-input ref="sku"
                                    :inputSelect="skuSelect"
                                    :error-message="sku_error"
                                    :skuf="turnover_box"
                                    :skufocus="tabshow"
                                    line-name="SKU"
                                    @enter-input="sku_enter"
                                    v-model="sku"></line-input>
                        <line-input ref="number"
                                    v-model="picking_quantity"
                                    :inputSelect="quantitySelect"
                                    :error-message="picking_quantity_error"
                                    line-name="数量"
                                    @input-change="get_picking_quantity_error(picking_quantity)"
                                    @enter-input="make_off"></line-input>
                        <div class="request_btn request_btn_t" v-if="imgshow">
                            <request-button v-if="active==='tab-container3'" :request="make_off">确认下架
                            </request-button>
                        </div>
                    </div>
                </form>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--<div style="position: absolute;left: 0;right: 0;bottom: 20px;">-->
            <!--<div class="request_btn request_btn_t" v-if="imgshow">-->
                <!--<request-button style="margin-top:-6px;"-->
                                <!--v-if="active==='tab-container3'" :request="make_off">确认下架-->
                <!--</request-button>-->
            <!--</div>-->
        <!--</div>-->
        <msgbox-sku ref="sku_goods" v-model="skuShow" :sku="sku_name" :warehouse_id="this.$route.query.warehouse_id" @close-box="close_box" @get-img="get_img"></msgbox-sku>
        <tab v-model="tabshow"
             @get_bind_box="get_bind_box"
             :turnover="turnoverBoxData"
             :sebox.sync="turnover_box"
        ></tab>
    </div>
</template>
<style lang="stylus">
    .allsty{
        color:#898989;
    }
    .path{
        border:1px solid white;
        text-align:center;
        border-radius:8px;
        padding:3px 0;

    }
    .pick-details{
        .way{
            margin-left:10px;
            font-size:15px;
        }
        .c-ui-table{
            table{
                width:95%;
            }
        }
        .content{
            width: 100%;
            margin: 50% auto;
            line-height: 100px;
            text-align: center;
            overflow: hidden;
        }
        .mint-cell-value{
            width:100%;
        }
        table{
            width: 100%;
            padding:0;
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0 auto;
            th{
                /*background: #eff2f7;*/
            }
            th,td{
                /*color:#898989;*/
                /*width 17%;*/
                font-size: 1em;
                height: 26px;
                line-height: 1em;
                text-align: center;
                box-sizing: border-box;
            }
        }

        .form{
            width :284px;
            margin 0 auto;
            text-align :center;
            padding-top: 5%;
            //margin-bottom 40px;
        }
        .form_input{
            width: 92%;
            -web-kit-appearance:none;
            -moz-appearance: none;
            display: inline;
            font-size:1em;
            height:2.5em;
            border-radius:4px;
            border:1px solid #c8cccf;
            margin: 0 auto;
            padding-left :10px;
        }
        .form_select{
            width: 70%;
            -web-kit-appearance:none;
            -moz-appearance: none;
            display: inline;
            font-size:1em;
            height:2.5em;
            border-radius:4px;
            border:1px solid #c8cccf;
            margin: 0 auto;
            padding-left :10px;
        }
        .select_i:after{
            content: "";
            height: 100%;
            width: 0;
            display: inline-block;
            vertical-align: middle;
        }
        .select_i{
            position: absolute;
            width: 35px;
            height: 100%;
            right: 0;
            color: #c0ccda;
            font-size: 1.2rem;
            transition: transform .3s;
            transform: translateY(-50%) rotate(180deg);
            line-height: 16px;
            top: 50%;
            cursor: pointer;
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
        .turnover-table{
            width: 90%;
            margin:0;
            padding:0;
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0 auto;
            th{
                /*background: #eff2f7;*/
            }
            th,td{
                width :33%;
                font-size: 1em;
                height: 26px;
                text-align: center;
                box-sizing: border-box;
                border :1px solid #c8cccf;
            }
        }
        .line-input{
            width:284px;
            margin-top:20px;
        }
        .xbtn{
            padding: 3px 0;
            margin-right: 20px;
            width: 90px;
            border 1px solid rgb(11,232,239);
            border-radius:3px;
            color black;
            display flex;
            align-items center;
            justify-content center;
            font-size:15px;
        }
        .outbox{
            margin-top: -8px;
        }
        .tab2{
            height 27px;
            display:flex;
            .pick-path{
                height:inherit;
                width :129px;
                flex:none !important;
            }
        }
        .mint-tabbar .mint-tab-item.is-selected{
            background :rgb(48,192,187) !important;
        }
        .skued{
            width:320px;
            margin-bottom :10px;
        }
        .skued img{
            width :100%;
            height:100%
        }
        .container3{
            margin-top 100px;
            /*width 284px*/
            & tr td {
                height 24px;
                font-size 12px
            }
        }
    }
</style>
<script>
    import virtualList from '@/components/virtual-list';
    import lineInput from '../../components/line-input.vue';
    import lineList from '../../components/line-list.vue';
    import lineTable from '../../components/line-table.vue';
    import buttonInput from '../../components/button-input.vue';
    import lineSelect from '../../components/line-select.vue';
    import msgboxSku from '../../components/msgbox-sku.vue';
    import uiTable from '../../components/ui-table.vue';
    import titleSelect from '../../components/title-select.vue';
    import {Toast,MessageBox} from 'mint-ui';
    import  info from '@/components/info';
    import tab from '@/components/tab'
    import{api_picking_process_details,api_picking_process_bind,api_picking_process_off,api_picking_process_complete} from '../../api/picking-process';

    const ToastMessage = function(message){
        return Toast(message);
    };
    /*
     * 后端:张文宇
     * */
    export default{
        data(){
            return{
                tabshow:false,
                img:'',
                imgshow:true,
                sure:true,
                active:'tab-container2',
                selected:'tab2',
                detailsData:[],
                lineData:{},
                warehouse_cargo:'',
                sku:'',
                sku_id:'',
                picking_quantity:'',
                turnover:'',
                turnover_box:'',
                picking_quantity_error:'',
                warehouse_cargo_error:'',
                sku_error:'',
                pickingNumber:'',
                turnoverBoxData:[],
                cargoSelect:false,
                skuSelect:false,
                quantitySelect:false,
                inputSelect:false,
                skuShow:false,
                errorMessage:'',
                line_now:0,
                styles:{height:0},
                virtualRemain:11,
                start:0,
                sku_name:'',
                orderListData:[],
                quantity:-1,
                alias_list:[],
                quantityList:[
                    {label:'数量',value:-1},
                    {label:'不相等',value:0},
                    {label:'相等',value:1},
                ],
                _tabshow:false,
            }
        },
        mounted(){
            window.addEventListener('resize', (event)=> {
               if(event.target.innerHeight<=400){
                   this.imgshow=false
               }else {
                   this.imgshow=true
               }
            })
            this.pickingNumber = this.$route.query.id;
            this.get_details(this.$route.query.id);
            let styles = window.getComputedStyle(document.getElementById('list-container'));
            this.styles.height = styles.height;

            // this.virtualRemain = Math.ceil((parseInt(this.styles.height)-44) / 48);
        },
        methods:{
            tab_show(){

            },
            get_bind_box(val){
                this.turnover = val
                this.get_bind()
            },
            bd(){
                // this.active='tab-container1'
                this.tabshow=true
            },
            backpath(){
                // this.$router.push({path:'/picking-process',query:{warehouse_id:this.$route.query.warehouse_id}})
                if(this.active==='tab-container3'){
                    this.active='tab-container2'
                } else{
                    this.$router.push({path:'/picking-process',query:{warehouse_id:this.$route.query.warehouse_id}})
                }
            },
            changeState(){
                this.active='tab-container2'
            },
            select_quantity(){

            },

            sku_box(sku){
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
            get_img(img){
                this.img=img
            },
            tab_click(){
                if(this.active==='tab-container3'){
                    this.make_off()
                }
                if(this.turnoverBoxData.length===0||this.orderListData.length===0){
                    ToastMessage({message:`请绑定周转箱号领取任务`,position: 'top',duration: 1500});
                    this.active = 'tab-container1';
                    this.selected = 'tab1';
                    // console.log('type',this.$route.query.type);
                }else{
                    // let find = this.turnoverBoxData.find(res=>{
                		// return res.status === 1;
                    // });
                    // console.log('find',find);
                    // if(!!find){
                    //     this.turnover_box = find.box;
                    //     console.log(this.turnover_box);
                    // }
                    this.active='tab-container3';
                    this.$nextTick(()=>{
                        this.skuSelect = true;
                        this.$refs.sku.$refs.input.select();
                    });
                }
            },
            cargo_enter(){
                this.$nextTick(()=>{
                    let find = this.detailsData.find(res=>{
                        return this.warehouse_cargo === res.warehouse_cargo;
                    });
                    if(!find){
                        this.warehouse_cargo_error = `货位不在该拣货单中`;
                        this.cargoSelect = true;
                    }else{
                        this.warehouse_cargo_error = '';
                        this.skuSelect = true;
                        this.$refs.sku.$refs.input.select();
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
                    /*扫描SKU验证,判断this.sku是否匹配sku,sku_id,alias(别名),alias_show(赛和别名)*/
                    let find = this.detailsData.find(row =>{
                        return [row.sku,`${row.sku_id}`,...row.alias,...row.alias_list].includes(this.sku);
                    });
                    if(!find){
                        this.sku_error = `与实际需要下架SKU不一致`;
                    }else{
                        this.sku_error = '';
                        this.quantitySelect = true;
                        this.$refs.number.$refs.input.select();/*选中ref='number'line-input组件里面的input*/
                    }
                });
            },
            get_picking_quantity_error(val){
                if(val){
                    let find = this.detailsData.find(row=>{
                        return this.warehouse_cargo === row.warehouse_cargo&&([row.sku,`${row.sku_id}`,...row.alias,...row.alias_show].includes(this.sku));
                    });
                    if(!!find){
                    	if(Number(this.picking_quantity) > Number(find.quantity)){
                            this.picking_quantity_error = `可下架数量最大为${find.quantity}`;
                            this.quantitySelect = true;
                        }else{
                            this.picking_quantity_error = '';
                        }
                    }else{
                        this.picking_quantity_error = '';
                    }
                }
            },
            make_off(){
                if(this.warehouse_cargo===''){
                    this.warehouse_cargo_error = `请输入货位`;
                    this.cargoSelect = true;
                    return ;
                }
                if(this.sku===''){
                    this.sku_error = `请输入SKU`;
                    this.skuSelect = true;
                    return ;
                }
                if(this.picking_quantity===''){
                    this.picking_quantity_error = `请输入数量`;
                    this.quantitySelect = true;
                    return ;
                }
                if(this.picking_quantity){
                    if (!(/(^[0-9]*[1-9][0-9]*$)/.test(this.picking_quantity))){
                        this.picking_quantity_error = `请输入正确的数量`;
                        return ;
                    }
                }
                if(!this.turnover_box || this.turnover_box === ''){
                    return ToastMessage('没有绑定周装箱');
                }
                // let msg = [...this.alias_list,...new Array(this.lineData.sku)];
                // if(!msg.includes(this.sku)){
                //     ToastMessage({message:`扫描的SKU与需下架的不一致`,position: 'top',duration: 1500});
                //     return ;
                // }
                let id = this.$route.query.id;
                let warehouse_id = this.$route.query.warehouse_id;
                let data ={
                    warehouse_id:warehouse_id,
                    turnover_box:this.turnover_box,
                    warehouse_cargo: this.warehouse_cargo,
                    sku: this.sku,
                    picking_quantity: this.picking_quantity,
                    sku_id:this.lineData.sku_id
                };
                return this.$http(api_picking_process_off,id,data).then(res=>{
                    this.$refs.sku.$refs.input.select();
                    ToastMessage({message:`${this.sku}已下架`,position: 'top',duration: 1500});
                    if(res.message.includes(`已完成拣货`)){
                        MessageBox({
                            title: '提示',
                            message: '您已全部下架，已完成拣货',
                            confirmButtonText: `好的，我知道了`
                        });
                        this.$router.push({
                            path:"/picking-process",
                            query:{
                                warehouse_id:this.$route.query.warehouse_id
                            }
                        });
                        return;
                    }else{
                    	let detail = this.detailsData[this.line_now];
                    	detail.picking_quantity = this.picking_quantity;
                    	for(let i = this.line_now; i < this.detailsData.length; i++){
                            if(this.detailsData[i].picking_quantity === 0){
                            	this.line_now = i;
                                this.lineData = {
                                    warehouse_cargo:this.detailsData[i].warehouse_cargo,
                                    sku:this.detailsData[i].sku,
                                    sku_alia:this.detailsData[i].alias,
                                    quantity:this.detailsData[i].quantity,
                                    name:this.detailsData[i].name,
                                };
                                this.sku = '';
                                this.warehouse_cargo = this.detailsData[i].warehouse_cargo;
                                this.picking_quantity = this.detailsData[i].quantity;
                                this.orderListData = this.detailsData[i].order_list;
                            	break;
                            }else{
                                this.line_now = this.detailsData.length;
                            }
                        }
                        if(this.line_now===this.detailsData.length){
                            let index = this.detailsData.findIndex(row =>{
                                return row.picking_quantity === 0;
                            });
                            this.line_now = index;
                            this.lineData = {
                                warehouse_cargo:this.detailsData[index].warehouse_cargo,
                                sku:this.detailsData[index].sku,
                                sku_alia:this.detailsData[index].alias,
                                quantity:this.detailsData[index].quantity,
                                name:this.detailsData[index].name,
                            };
                            this.sku = '';
                            this.warehouse_cargo = this.detailsData[index].warehouse_cargo;
                            this.picking_quantity = this.detailsData[index].quantity;
                            this.orderListData = this.detailsData[index].order_list;
                        }
                    }
                    return Promise.resolve();
                }).catch(code=>{
                    if(code.message.includes('货位')){
                        this.warehouse_cargo_error = code.message;
                    }else if(code.message.includes('SKU')){
                        this.sku_error = code.message;
                    }else if(code.message.includes('数量')){
                        this.picking_quantity_error = code.message;
                    }else{
                        // ToastMessage({message:code.message,position: 'top',duration: 1500});
                    }
                });
            },
            get_details(orderId){
                this.$http(api_picking_process_details,orderId).then(res=>{
                    this.detailsData = res.data.map((row,index) =>{
                        return Object.assign(row, {rindex:index})
                    });
                    this.line_now = this.detailsData.findIndex(row =>{
                    	return row.picking_quantity === 0;
                    });
                    if(this.line_now <= 0){
                        this.line_now = 0;
                    }
                    this.start = this.line_now;
                    let i = this.line_now;
                    this.lineData = {
                        warehouse_cargo:this.detailsData[i].warehouse_cargo,
                        sku: this.detailsData[i].sku,sku_alia:this.detailsData[i].alias,
                        quantity:this.detailsData[i].quantity,
                        name:this.detailsData[i].name,
                    };
                    this.sku = '';
                    this.warehouse_cargo = this.detailsData[i].warehouse_cargo;
                    this.picking_quantity = this.detailsData[i].quantity;
                    this.orderListData = this.detailsData[i].order_list;
                    let first = this.detailsData[0] || {turnover_box:[]};
                    if(first.turnover_box.length>0){
                        this.sku_id=res.data[0].sku_id
                        this.$nextTick(function () {
                            this.sku_id=res.data[0].sku_id
                            this.active='tab-container3'
                        })
                        this.turnoverBoxData = first.turnover_box.map((row,index) =>{
                            return {
                                box:Number(row.turnover_box_id),
                                status:index===0?1:0
                            }
                        });
                        console.log('this.turnover_box',typeof(this.turnover_box));
                        if(this.turnover_box == ''){
                            // this.tabshow=true;
                            ToastMessage({message:'请绑定周转箱',position: 'top',duration: 1500});
                        }
                        //经理说切换拣货单的时候，绑箱要清空重新选择。(如需不清空解开以下内容)
                        // if(this.turnoverBoxData.length>0 && this.turnover_box ===''){
                        //     this.turnover_box = this.turnoverBoxData[0].box;
                        // }
                        // this.caluc_turnover_box();
                    }else{
                        this.$nextTick(()=>this.active='tab-container2')
                        this.caluc_turnover_box(true);
                    }
                }).catch(code=>{
                    toast.close();
                    console.log(code);
                    // ToastMessage({message:code.message,position: 'top',duration: 1500});
                });
            },
            get_line(item,num){
                this._tabshow=true
                if(`${item.picking_quantity}`===`${item.quantity}`){
                    ToastMessage({message:`${item.sku}已下架`,position: 'top',duration: 1500});
                    return ;
                }
                this.orderListData = [];
                this.line_now = num;
                this.detailsData.forEach((row,index)=>{
                    if(num===index){
                        this.lineData = {
                            warehouse_cargo:row.warehouse_cargo,
                            sku:row.sku,sku_alia:row.alias,
                            quantity:row.quantity,
                            sku_id:row.sku_id,
                            name:row.name,
                        };
                        this.alias_list=row.alias_list
                        this.sku = '';
                        this.warehouse_cargo = row.warehouse_cargo;
                        this.picking_quantity = row.quantity - row.picking_quantity;
                        this.orderListData = row.order_list;
                        this.skuSelect = false;
                        this.$nextTick(()=>{
                            this.skuSelect = true;
                            this.$refs.sku.$refs.input.select();
                        });
                        this.active = 'tab-container3';
                        this.selected = 'tab3';
                        //this._tabshow=true
                    }
                });
            },
            caluc_turnover_box(boolean){
                let cache = localStorage.getItem('cache:picking-box');
                if(!boolean && cache){
                    cache = JSON.parse(cache);
                    if(String(cache.pickingNumber) === String(this.pickingNumber)){
                        this.turnover_box = cache.box;
                    }else{
                        localStorage.removeItem('cache:picking-box');
                    }
                }else{
                    localStorage.removeItem('cache:picking-box');
                }
            },
            select_box(val){
                this.turnoverBoxData.forEach(row=>{
                    if(row.box===val){
                        row.status = 1;
                    }else{
                        row.status = 0;
                    }
                });
            },
            get_bind(){
                let id = this.$route.query.id;
                let type = this.$route.query.type;
                let data ={
                    type:type,
                    turnover:this.turnover
                };
                this.$nextTick(()=>{
                    if(this.turnover===''){
                        this.errorMessage = '';
                        this.errorMessage = `周转箱号不能为空`;
                        return ;
                    }
                    if(this.detailsData[0].turnover_box.includes(data.turnover)){
                        console.log(99999)
                    }
                    this.$http(api_picking_process_bind,id,data).then(res=>{
                        this.turnoverBoxData.forEach(row=>{
                            row.status = 0;
                        });
                        this.turnoverBoxData.push({box:this.turnover,status:1});
                        this.$refs.turnover_box.select = this.turnover;
                        ToastMessage({message:res.message,position: 'top',duration: 1500});
                        this.inputSelect = true;
                        this.turnover = '';
                        this.errorMessage = '';
                        this.$nextTick(()=>{
                            this.active = 'tab-container3';
                            this.$nextTick(()=>{
                                this.$refs.sku.$refs.input.select();
                            });
                        });
                        this.tabshow = false;
                    }).catch(code=>{
                        Toast({message:code.message,position: 'top',duration: 1000})
                        this.errorMessage = '';
                        this.inputSelect = true;
                        this.errorMessage = code.message;
                        if(code.message.includes('不能重复绑定')){
                            ToastMessage({message:'周转箱已绑定拣货单,不能重复绑定',position: 'top',duration: 1500});
                            // this.errorMessage = `周转箱已绑定拣货单,不能重复绑定`;
                        }
                    });
                });

            },
            complete(){
                let id = this.$route.query.id;
                return this.$http(api_picking_process_complete,id,{confirm :0}).then(res=>{
                    MessageBox({
                        title: '提示',
                        message: '您已全部下架，已完成拣货',
                        confirmButtonText: `好的，我知道了`
                    });
                    this.$router.push({
                        path:"/picking-process",
                        query:{
                            warehouse_id:this.$route.query.warehouse_id
                        }
                    });
                }).catch(code=>{
                    MessageBox.confirm(`${code.message}`).then(action => {
                        this.$http(api_picking_process_complete,id,{confirm :1}).then(res=>{
                            ToastMessage({
                                message: '操作成功',
                                iconClass: 'mint-ToastMessage-icon mintui mintui-success'
                            });
                            this.$router.push({
                                path:"/picking-process",
                                query:{
                                    warehouse_id:this.$route.query.warehouse_id
                                }
                            });
                        }).catch(code=>{
                            console.log(code)
                            // ToastMessage({message:code.message,position: 'top',duration: 1500});
                        });
                        return Promise.resolve();
                    }).catch(code=>{
                        ToastMessage({message:`已取消操作`,position: 'top',duration: 1500});
                        return Promise.resolve();
                    });
                });
            }
        },
        computed:{
            turnoverBoxNumber(){
                if(!!this.turnoverBoxData){
                    return this.turnoverBoxData.length;
                }else{
                    return `0`;
                }
            },
            turnoverBoxList(){
            	return this.turnoverBoxData.map(row =>{
            		return {
            			label:Number(row.box),
            			value:Number(row.box),
                    }
                })
            },
            detailsSortData(){
            	switch (this.quantity){
                    case -1:
                    	return this.detailsData;
                    case 0 :
                    	return this.detailsData.filter(res=>{
                    		return `${res.picking_quantity}`!==`${res.quantity}`;
                        });
                    case 1 :
                    	return this.detailsData.filter(res=>{
                    		return `${res.picking_quantity}`===`${res.quantity}`;
                        });
                }
            }
        },
        watch: {
            turnover_box(val){
                localStorage.setItem('cache:picking-box', JSON.stringify({pickingNumber:this.pickingNumber, box:val}));
            },
       /*     selected(val){
                if(val==='tab1'){
                    this.inputSelect = true;
                    this.$refs.turnover.$refs.input.select();
                }else if(val==='tab3'){
                	if(this.warehouse_cargo){
                        this.skuSelect = true;
                        this.$refs.sku.$refs.input.select();
                    }else{
                        this.cargoSelect = true;
                    }
                }
            },*/
            active(val){
                switch (val){
                    case 'tab-container1':
                        if(this.turnoverBoxData.length===0){
                            this.selected = 'tab1';
                            this.$nextTick(()=>{
                                this.inputSelect = true;
                                // this.$refs.turnover.$refs.input.select();
                            });
                        }
                        if(this.orderListData.length===0){
                            this.selected = 'tab1';
                            this.$nextTick(()=>{
                                this.inputSelect = true;
                                // this.$refs.turnover.$refs.input.select();
                            });
                        }else{
                            ToastMessage({message:`含备注单不需要绑定周转箱号`,position: 'top',duration: 1500});
                            this.active = 'tab-container2';
                            this.selected = 'tab2';
                        }
                        break;
                    case 'tab-container2':
                        this.selected = 'tab2';
                        break;
                    case 'tab-container3':
                        if(this.turnoverBoxData.length===0&&this.orderListData.length===0){
                            // this.tabshow=true
                            ToastMessage({message:`请绑定周转箱`,position: 'top',duration: 1500});
                            this.active = 'tab-container3';
                            this.selected = 'tab3';
                            this.inputSelect = true;
                            // this.$refs.turnover.$refs.input.select();
                        }else{
                            this.selected = 'tab3';
                            if(this.warehouse_cargo){
                                this.skuSelect = true;
                                this.$refs.sku.$refs.input.select();
                            }else{
                                this.cargoSelect = true;
                            }
                        }
                        break;
                    default:
                        console.error(`not support ${val}`)
                }
            },
            turnoverBoxData(val){
                this.active = 'tab-container2';
                this.selected = 'tab2';
            },
        },
        components:{
            virtualList,lineList,lineInput,buttonInput,lineSelect,lineTable,msgboxSku,uiTable,titleSelect,
            requestButton:require('@/components/request-button').default,
            info,tab,
        }
    }
</script>
