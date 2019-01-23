<template>
    <div class="reback-shelves" style=" height: 100%;">
        <mt-header fixed title="退货上架">
            <span slot="left" @click="backpath">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </span>
            <!--<div slot="right" class="return" @click="changeState" v-if="active==='tab-container2'">退货上架</div>-->
            <div slot="right" @click="get_zone" class="partition" v-if="active==='tab-container1'"><span  v-if="!seltitle">分区</span> <span v-if="seltitle">{{seltitle}}</span></div>
        </mt-header>
        <mt-tab-container v-model="active" id="list-container" value="tab-container1" class="pt-lg" style="height: 100%; overflow: hidden;">
            <mt-tab-container-item id="tab-container1">
                <div>
                    <table class="table" width="100%">
                        <thead>
                        <tr class="all-table">
                            <th>排序</th>
                            <th>货位</th>
                            <th style="font-weight: 300">SKU</th>
                            <th>数量</th>
                        </tr>
                        </thead>
                        <tbody  v-resize="{height:2}">
                            <virtual-list  :start="start" :size="36" :remain="virtualRemain">
                                <div v-if="dataShow" class="found">暂无数据</div>
                                <div v-else>
                                    <tr
                                            v-for="(row,index) in shelvesData"
                                            :key="index"
                                            @click="get_picking(row,index)"
                                            is-link
                                            :class="[index===line_now?'height-line':'',(index%2===0&&index!==line_now)?'line-bg':'',row.line?'red':'']"
                                    >
                                        <td width="14%">{{index+1}}</td>
                                        <td width="34%">{{row.warehouse_cargo_code}}</td>
                                        <td width="34%">{{row.sku}}</td>
                                        <td width="12%">{{row.quantity}}</td>
                                        <td width="6%"><i class="mintui mintui-back back" style="font-size: 17px;"></i></td>
                                    </tr>
                                </div>
                            </virtual-list>
                        </tbody>

                    </table>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <div v-if="imgshow">
                    <info :warehouse="listData"></info>
                </div>
                <form class="form">
                    <line-input ref="warehouse_cargo" :inputSelect="cargoSelect" :error-message="warehouse_cargo_error" line-name="货位" @enter-input="get_next" v-model="warehouse_cargo_code"></line-input>
                    <line-input ref="sku" :inputSelect="skuSelect" :error-message="sku_error" line-name="SKU" @enter-input="sku_enter" v-model="sku"></line-input>
                    <line-input ref="number" type="number" :inputSelect="quantitySelect" :error-message="quantity_error" @enter-input="quantity_enter" @input-change="quantity_change"  line-name="数量" v-model="quantity"></line-input>
                    <div class="request_btn request_btn_t"><request-button :request="return_shelves">确认上架</request-button></div>
                </form>
            </mt-tab-container-item>
        </mt-tab-container>
        <msgbox-sku ref="sku_goods" v-model="skuShow" :warehouse_id="this.$route.query.warehouse_id" :sku="sku_name"
                    @get-img="getImg" @close-box="close_box"></msgbox-sku>
        <Zone v-model="zoneshow" :zone="warehouseAreaList" :seltitle="seltitle" :wareid.sync="warehouse_area_id"
            @get_wareid="get_wareid"
        ></Zone>
    </div>
</template>
<style lang="stylus" scoped>
    .return{
        border:1px solid white;
        text-align:center;
        border-radius:8px;
        padding:3px 0;

    }
    .img_box{
        width:100px;
        height :100px;
        margin:0 auto;
        margin-top :12px;
        img{
            width :100%
            height: 100%
        }
    }
    .table-box{
        width: 100%;
        margin:0;
        padding:0;
        border-collapse: collapse;
        border-spacing: 0;
        margin: 0 auto;
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
    import{api_reback_shelves_batch,api_reback_shelves} from '../../api/putaway-order';
    import{api_warehouse_area} from '../../api/picking-process';
    import RequestButton from "@/components/request-button";
    import info from '@/components/info.vue'
    import Zone from '@/components/Zone.vue'
    import {mapActions,mapGetters} from 'vuex';
    /*
     * 后端:刘志勇
     * */
    export default{
        data(){
            return{
                dataShow:false,
                imgshow:true,
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
                    sku:'',
                    quantity:'',
                    name:'',
                    sku_id:'',
                },
                warehouse_area_id:'全部',
                warehouseAreaList:[],
                styles:{height:0},
                virtualRemain:13.5,
                start:0,
                line_now:'',
                sku_name:'',
                img:'',
                seltitle:'',
                zoneshow:false,
            }
        },
        mounted(){
            this.get_warehouse_area();
            let styles = window.getComputedStyle(document.getElementById('list-container'));
            this.styles.height = styles.height;
        },
        methods:{
            ...mapActions({
                getwarehouse: 'api/getwarehouse',
                setreturnOn:'api/returnOn'
            }),
            get_wareid(val){
                this.seltitle=val;
                console.log(this.seltitle,'title')
            },
            get_zone(){
                this.zoneshow=true
            },
            backpath(){
                if(this.active==='tab-container2'){
                    this.active='tab-container1'
                } else{
                    this.$router.push('/menu')
                }
            },
            changeState(){
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
            get_warehouse_area(){
                let data = {
                    warehouse_id : this.$route.query.warehouse_id,
                    status:1,
                    warehouse_area_type:11,
                    sort_operator:1,
                };
                console.count('get_warehouse_area');
                this.$http(api_warehouse_area,data).then(res=>{
                    this.warehouseAreaList = res;
                    this.warehouseAreaList = this.warehouseAreaList.map(res=>{
                        return {
                            value:res.id,
                            label:res.code,
                        };
                    });
                    this.warehouseAreaList.unshift({value:'',label:'全部'});
                    // if(res[0].operator_area === 1){
                    //     this.warehouse_area_id=res[0].id
                    // }
                    this.warehouse_area_id = this.returnOn;
                    let find = res.find(row=>row.id=== this.warehouse_area_id);
                    if(this.warehouse_area_id != ''){
                        this.seltitle = find.code;
                    }else {
                        this.seltitle = '全部';
                    }
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
            },
            change_warehouse_area(){
                this.init();
            },
            init(){
                let selTitle = this.seltitle === '全部'?'':this.seltitle;
                let data = {
                    warehouse_id :this.$route.query.warehouse_id,
                    warehouse_area_id :this.warehouse_area_id==='全部'?'':selTitle,
                };
                console.count('init');
                this.$http(api_reback_shelves,data).then(res=>{
                    if(res.data.length == 0){
                        this.dataShow = true;
                    }else {
                        this.dataShow = false;
                    }
                    this.shelvesData = res.data;
                    this.shelvesData.forEach((row,index)=>{
                        this.$set(row,'line',false);
                    });
                    this.line_now = 0;
                    this.start = this.line_now;
                }).catch(code=>{
                    setTimeout(()=>{
                        this.$router.push('/menu')
                    },300);
                    Toast({message:code.message,position: 'top',duration: 1000});
                })
            },
            change_tab(){
            	if(this.shelvesData.length===0){
                    Toast({message:`暂无退货待上架的商品`,position: 'top',duration: 1500});
                }else{
                    this.active='tab-container2';
                }
            },
            get_picking(row,index){
                this.listData = {};
                this.quantity = '';
                this.shelvesData.forEach((item, i) => {
                    if (i < index) {
                        item.line = true;
                    } else {
                        item.line = false;
                    }
                    if (row.id === item.id) {
                        this.line_now = i;
                    }
                });
                this.listData = {
                    warehouse_cargo_code: row.warehouse_cargo_code,
                    sku: row.sku,sku_alia:row.sku_alia,
                    quantity: row.quantity,
                    name:row.sku_full_name,
                    sku_id:row.sku_id,
                };
                this.quantity = row.quantity;
                this.cargoSelect = true;
                this.active = 'tab-container2';
                this.selected = 'tab2';
            },
            get_next(){
                this.warehouse_cargo_error = '';
                this.$nextTick(()=>{
                    if(this.warehouse_cargo_code===''){
                        this.warehouse_cargo_error = `请输入货位`;
                        return ;
                    }
                    let find = this.shelvesData.find(res=>{
                        return res.warehouse_cargo_code === this.warehouse_cargo_code;
                    });
                    if(!find){
                        this.cargoSelect = true;
                        this.warehouse_cargo_error = '货位不在退货上架中';
                    }else{
                        if(this.sku===''){
                            this.cargoSelect = false;
                            this.skuSelect = true;
                            this.$refs.sku.$refs.input.select();
                            this.warehouse_cargo_error = '';
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
                    let find = this.shelvesData.find(row =>{
                        return [row.sku,`${row.sku_id}`,...row.sku_alia,...row.sku_alia_sh].includes(this.sku);
                    });
                    if(!find){
                        this.skuSelect = true;
                        this.sku_error = '与实际需要上架SKU不一致';
                    }else{
                        if(this.warehouse_cargo_code===''){
                            this.$refs.warehouse_cargo.$refs.input.select();
                            return ;
                        }
                        this.skuSelect = false;
                        this.quantitySelect = true;
                        this.$refs.number.$refs.input.select();
                        this.sku_error = ''
                    }
                });
            },
            quantity_enter(){
                this.return_shelves();
            },
            quantity_change(){
                let find = this.shelvesData.find(res=>{
                    return ([res.sku,`${res.sku_id}`,...res.sku_alia,...res.sku_alia_sh].includes(this.sku)) && res.warehouse_cargo_code === this.warehouse_cargo_code;
                });
                if(!!find){
                    if(Number(this.quantity) > Number(find.quantity)){
                        this.quantitySelect = true;
                        this.quantity_error = `可上架数量最大为${find.quantity}`;
                    }else if(Number(this.quantity)<=0){
                        this.quantitySelect = true;
                        this.quantity_error = `可上架数量应大于0`;
                    }else{
                        this.quantity_error = ''
                    }
                }
            },
            return_shelves(){
                this.warehouse_cargo_error = '';
                this.sku_error = '';
                this.quantity_error = '';
                if(this.warehouse_cargo_code===''){
                    this.warehouse_cargo_error = '请输入货位';
                    return ;
                }
                if(this.sku===''){
                    this.sku_error = '请输入SKU';
                    return ;
                }
                if(this.quantity===''){
                    this.quantity_error = '请输入数量';
                    return ;
                }
                let warehouse_cargo_code = this.shelvesData.find(res=>{
                    return res.warehouse_cargo_code === this.warehouse_cargo_code;
                });
                if(!warehouse_cargo_code){
                    this.warehouse_cargo_error = '货位不在退货上架中';
                }
                let sku = this.shelvesData.find(res=>{
                    return [res.sku,`${res.sku_id}`,...res.sku_alia,...res.sku_alia_sh].includes(this.sku);
                });
                if(!sku){
                    this.sku_error = '与实际需要上架SKU不一致';
                }
                let id = '';
                let save = this.shelvesData.find(res=>{
                    return res.warehouse_cargo_code === this.warehouse_cargo_code&&([res.sku,`${res.sku_id}`,...res.sku_alia,...res.sku_alia_sh].includes(this.sku));
                });
                if(!!save){
                    id = save.id;
                }else{
                    Toast({message:`请输入正确货位或SKU信息`,position: 'top',duration: 1500});
                    return ;
                }
                let data = {
                    id : id,
                    quantity : this.quantity,
                };
                let param = [];
                param.push(data);
                return this.$http(api_reback_shelves_batch,{data:param}).then(res=>{
                    let del = '';
                    this.shelvesData.forEach((item,index)=>{
                        if(([item.sku,`${item.sku_id}`,...item.sku_alia,...item.sku_alia_sh].includes(this.sku)) && item.warehouse_cargo_code === this.warehouse_cargo_code){
                            item.quantity = Number(item.quantity) - Number(this.quantity);
                            del = index;
                            if(item.quantity===0){
                                this.shelvesData.splice(index,1);
                                if(this.shelvesData.length-1===del){
                                    del = 0;
                                }
                            }
                            this.warehouse_cargo_code = '';
                            this.sku = '';
                            this.quantity = '';
                            this.warehouse_cargo_error = '';
                            this.sku_error = '';
                            this.quantity_error = '';
                            this.$refs.warehouse_cargo.$refs.input.select();
                            Toast({
                                message: '操作成功',
                                iconClass: 'mint-toast-icon mintui mintui-success'
                            });
                        }
                    });
                    this.shelvesData.forEach((row,index)=>{
                        if(index<del){
                            row.line = true;
                        }else{
                            row.line = false;
                        }
                        if(index===del){
                           this.line_now = del;
                            this.listData = {
                                warehouse_cargo_code: row.warehouse_cargo_code,
                                sku: row.sku,sku_alia:row.sku_alia,
                                quantity: row.quantity,
                                name:row.sku_full_name,
                                sku_id:row.sku_id,
                            };
                        }
                    });
                    if(this.shelvesData.length===0){
                        MessageBox({
                            title: '提示',
                            message: '你已全部退货上架',
                            confirmButtonText: `好的，我知道了`
                        });
                        this.selected = 'tab1';
                        this.active = 'tab-container1';
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
        computed:{
            ...mapGetters({
                loginInfo:'user/info',
                returnOn:'api/returnOn'
            })
        },
        watch:{
            'selected'(val){
                if(val==='tab2'){
                    if(this.listData.sku===''){
                        console.log(this.listData);
                        this.selected = 'tab1';
                        this.active = 'tab-container1';
                        return ;
                    }
                    let find = this.shelvesData.find((res,index)=>{
                        return index === this.line_now;
                    });
                    if(!!find){
                        this.listData = {
                            warehouse_cargo_code: find.warehouse_cargo_code,
                            sku: find.sku,sku_alia:find.sku_alia,
                            quantity: find.quantity,
                            name:find.sku_full_name,
                            sku_id:find.sku_id,
                        };
                        this.quantity = find.quantity;
                        this.cargoSelect = true;
                        this.$refs.warehouse_cargo.$refs.input.select();
                    }
                }
            },
            active(val){
                if(val==='tab-container1'){
                    this.selected = 'tab1';
                }else if(val==='tab-container2'){
                    if(!!this.listData.sku===''){
                        console.log(this.listData);
                        this.selected = 'tab1';
                        this.active = 'tab-container1';
                        return ;
                    }
                    this.selected = 'tab2';
                    let find = this.shelvesData.find((res,index)=>{
                        return index === this.line_now;
                    });
                    if(!!find){
                        this.listData = {
                            warehouse_cargo_code: find.warehouse_cargo_code,
                            sku: find.sku,sku_alia:find.sku_alia,
                            quantity: find.quantity,
                            name:find.sku_full_name,
                            sku_id:find.sku_id,
                        };
                        this.quantity = find.quantity;
                        this.$nextTick(()=>{
                            this.cargoSelect = true;
                            this.$refs.warehouse_cargo.$refs.input.select();
                        });
                    }
                }
            },
            warehouse_area_id(val){
                this.init();
                this.setreturnOn(val);
            }
        },
        components:{
            RequestButton,
            lineInput,lineList,lineTable,virtualList,msgboxSku,
            requestButton:require('@/components/request-button').default,info,Zone,
        }
    }
</script>
