<template>
    <div class="pick-details pb-lg">
        <mt-header fixed :title="`PL${this.pickingNumber} 移库下架单`">
            <span slot="left" @click="backpath">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </span>
            <div slot="right" class="partition" @click="changeState" v-if="active==='tab-container1'||active==='tab-container3'">下架路径</div>
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
                                            :selectList="quantityList"></title-select>
                                </td>
                            </tr></table>
                    </mt-cell>
                    <virtual-list :start="start" :size="48" :remain="virtualRemain">
                        <div v-for="(row,index) in detailsSortData" :key="row.rindex" @click="get_line(row,index)">
                            <table>
                                <tr class="all-table"
                                    :class="[(`${row.unshelf}`!==`${row.quantity}`)&&(index < line_now) ?'red':'',`${row.unshelf}`===`${row.quantity}`?'green':'']">
                                    <td style="width: 10%">{{index+1}}</td>
                                    <td style="width: 30%">{{row.old_cargo_code}}</td>
                                    <td style="width: 30%">{{row.sku}}</td>
                                    <td style="width: 15%">{{row.unshelf}}/{{row.quantity}}</td>
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

                    <div class="outbox">
                        <line-input ref="warehouse_cargo" class="line-input"
                                    :inputSelect="cargoSelect"
                                    :error-message="warehouse_cargo_error"
                                    line-name="货位"
                                    @enter-input="cargo_enter"
                                    v-model="warehouse_cargo"></line-input>
                        <line-input ref="sku"
                                    :inputSelect="skuSelect"
                                    :error-message="sku_error"
                                    line-name="SKU"
                                    @enter-input="sku_enter"
                                    v-model="sku"></line-input>
                        <line-input ref="number"
                                    v-model="unshelf"
                                    :inputSelect="quantitySelect"
                                    :error-message="unshelf_error"
                                    line-name="数量"
                                    @input-change="get_unshelf_error(unshelf)"
                                    @enter-input="make_off"
                                    :disabled="isDisabled"></line-input>
                        <div class="request_btn request_btn_t" v-if="imgshow">
                            <request-button v-if="active==='tab-container3'" :request="make_off">确认下架
                            </request-button>
                        </div>
                    </div>
                </form>
            </mt-tab-container-item>
        </mt-tab-container>
        <msgbox-sku ref="sku_goods"
                    v-model="skuShow"
                    :sku="sku_name"
                    :warehouse_id="this.$route.query.warehouse_id"
                    @close-box="close_box"></msgbox-sku>
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
            th,td{
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
            & tr td {
                height 24px;
                font-size 12px
            }
        }
    }
</style>
<script>
    import {api_warehouse_cargo_shift_detail,api_warehouse_cargo_shift_unshelves} from '../../api/soldout-shifting';
    import virtualList from '@/components/virtual-list';
    import titleSelect from '@/components/title-select.vue';
    import  info from '@/components/info';
    import lineInput from '@/components/line-input.vue';
    import msgboxSku from '@/components/msgbox-sku.vue';
    import {Toast,MessageBox} from 'mint-ui';
    const ToastMessage = function(message){
        return Toast(message);
    };
    export default {
        data() {
            return {
                pickingNumber:'',
                active:'tab-container2',
                selected:'tab2',
                detailsData:[],
                line_now:0,
                quantityList:[
                    {label:'数量',value:-1},
                    {label:'不相等',value:0},
                    {label:'相等',value:1},
                ],
                quantity:-1,
                start:0,
                virtualRemain:11,
                lineData:{},
                sku:'',
                imgshow:true,
                warehouse_cargo:'',
                warehouse_cargo_error:'',
                cargoSelect:false,
                skuSelect:false,
                sku_error:'',
                unshelf:'',
                quantitySelect:false,
                unshelf_error:'',
                skuShow:false,
                sku_name:'',
                isDisabled:true
            }
        },
        mounted(){
            this.pickingNumber = this.$route.query.id;
            this.get_details(this.$route.query.id);
        },
        methods:{
            backpath(){
                if(this.active==='tab-container3'){
                    this.active='tab-container2'
                } else{
                    this.$router.push({path:'/soldout-shifting',query:{warehouse_id:this.$route.query.warehouse_id}})
                }
            },
            changeState(){
                this.active='tab-container2'
            },
            get_details(orderId){
                let data ={
                    id:orderId,
                    list_type:1,
                }
                this.$http(api_warehouse_cargo_shift_detail,data).then(res=>{
                    this.detailsData = res.data.map((row,index)=>{
                        return Object.assign(row, {rindex:index})
                    });
                    this.line_now = this.detailsData.findIndex(row =>{
                        this.old_cargo_id = row.old_cargo_id
                        return row.unshelf === 0;
                    });
                    if(this.line_now <= 0){
                        this.line_now = 0;
                    }
                    this.start = this.line_now;
                })
            },
            get_line(item,num){
                this.line_now = num;
                this.detailsData.forEach((row,index)=>{
                    if(num===index){
                        this.lineData = {
                            warehouse_cargo_code:row.old_cargo_code,
                            sku:row.sku,
                            id:row.id,
                            sku_alia:row.sku_alia,
                            quantity:row.quantity,
                            sku_id:row.sku_id,
                            name:row.spu_name,
                        };
                        this.alias_list=row.alias_list
                        this.sku = '';
                        this.warehouse_cargo = row.old_cargo_code;
                        this.unshelf = row.quantity - row.unshelf;
                        this.skuSelect = false;
                        this.$nextTick(()=>{
                            this.skuSelect = true;
                            this.$refs.sku.$refs.input.select();
                        });
                        this.active = 'tab-container3';
                        this.selected = 'tab3';
                    }
                });
            },
            cargo_enter(){
                this.$nextTick(()=>{
                    let find = this.detailsData.find(res=>{
                        return this.warehouse_cargo === res.old_cargo_code;
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
            get_unshelf_error(val){
                if(val){
                    let find = this.detailsData.find(row=>{
                        return this.warehouse_cargo === row.warehouse_cargo&&([row.sku,`${row.sku_id}`,...row.alias,...row.alias_show].includes(this.sku));
                    });
                    if(!!find){
                        if(Number(this.unshelf) > Number(find.quantity)){
                            this.unshelf_error = `可下架数量最大为${find.quantity}`;
                            this.quantitySelect = true;
                        }else{
                            this.unshelf_error = '';
                        }
                    }else{
                        this.unshelf_error = '';
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
                if(this.unshelf===''){
                    this.unshelf_error = `请输入数量`;
                    this.quantitySelect = true;
                    return ;
                }
                if(this.unshelf){
                    if (!(/(^[0-9]*[1-9][0-9]*$)/.test(this.unshelf))){
                        this.unshelf_error = `请输入正确的数量`;
                        return ;
                    }
                };
                let data ={
                    detail_id:this.lineData.id,
                    sku:this.sku,
                    warehouse_cargo_code:this.warehouse_cargo,
                    quantity: this.unshelf,
                };
                return this.$http(api_warehouse_cargo_shift_unshelves,data).then(res=>{
                    this.$refs.sku.$refs.input.select();
                    ToastMessage({message:`${this.sku}已下架`,position: 'top',duration: 1500});
                    if(res.message.includes(`已完成下架`)){
                        MessageBox({
                            title: '提示',
                            message: '您已全部下架，已完成拣货',
                            confirmButtonText: `好的，我知道了`
                        });
                        this.$router.push({
                            path:"/soldout-shifting",
                            query:{
                                warehouse_id:this.$route.query.warehouse_id
                            }
                        });
                        return;
                    }else{
                        let detail = this.detailsData[this.line_now];
                        detail.unshelf = this.unshelf;
                        for(let i = this.line_now; i < this.detailsData.length; i++){
                            if(this.detailsData[i].unshelf === 0){
                                this.line_now = i;
                                this.lineData = {
                                    warehouse_cargo:this.detailsData[i].old_cargo_code,
                                    sku:this.detailsData[i].sku,
                                    id:this.detailsData[i].id,
                                    sku_alia:this.detailsData[i].sku_alia,
                                    quantity:this.detailsData[i].quantity,
                                    name:this.detailsData[i].spu_name,
                                };
                                this.sku = '';
                                this.warehouse_cargo = this.detailsData[i].old_cargo_code;
                                this.unshelf = this.detailsData[i].quantity;
                                break;
                            }else{
                                this.line_now = this.detailsData.length;
                            }
                        }
                        if(this.line_now===this.detailsData.length){
                            let index = this.detailsData.findIndex(row =>{
                                return row.unshelf === 0;
                            });
                            this.line_now = index;
                            this.lineData = {
                                warehouse_cargo:this.detailsData[index].old_cargo_code,
                                sku:this.detailsData[index].sku,
                                id:this.detailsData[index].id,
                                sku_alia:this.detailsData[index].sku_alia,
                                quantity:this.detailsData[index].quantity,
                                name:this.detailsData[index].spu_name,
                            };
                            this.sku = '';
                            this.warehouse_cargo = this.detailsData[index].old_cargo_code;
                            this.unshelf = this.detailsData[index].quantity;
                        }
                    }
                    return Promise.resolve();
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1500});
                });
            },
            close_box(){
                this.$refs.sku.$refs.input.select();
            },
            sku_box(sku){
                this.sku_name = sku ? sku : this.sku;
                this.$nextTick(()=>{
                    this.skuShow=true;
                    this.$refs.sku_goods.init();
                    this.$refs.sku.$refs.input.select();
                });
            },
        },
        computed:{
            detailsSortData(){
                switch (this.quantity){
                    case -1:
                        return this.detailsData;
                    case 0 :
                        return this.detailsData.filter(res=>{
                            return `${res.unshelf}`!==`${res.quantity}`;
                        });
                    case 1 :
                        return this.detailsData.filter(res=>{
                            return `${res.unshelf}`===`${res.quantity}`;
                        });
                }
            }
        },
        components: {
            titleSelect,virtualList,info,lineInput,msgboxSku,
            requestButton:require('@/components/request-button').default,
        }
    }
</script>