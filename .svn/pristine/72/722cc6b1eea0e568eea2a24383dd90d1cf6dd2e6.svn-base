<template>
    <!--sku商品信息的弹框组件,
    使用方法(举例):
    <msgbox-sku ref="sku_goods" v-model="skuShow" :warehouse_id="this.$route.query.warehouse_id" :sku="sku" @close-box="close_box"></msgbox-sku>
    this.skuShow=true; //显示弹框
    this.$refs.sku_goods.init(); //调用 sku_goods组件的init()方法
    this.$refs.sku.$refs.input.select(); //设置当前页面的 ref='sku'的input选中状态,方便用户更换sku查询信息
    使用的mt开头的组件查看Mint UI 框架了解-->
    <div class="msgbox-sku" v-if="boxShow">
        <div class="mint-msgbox" style="position: absolute; z-index: 2001;max-width: 620px;">
            <i class="iconfont icon-close icon-guanbi" @click="close_box"></i>
            <div class="mint-msgbox-header">
                <div class="mint-msgbox-title">{{titleName}}</div>
            </div>
            <div class="mint-msgbox-content">
                <div class="mint-msgbox-message">
                    <mt-navbar v-model="selected" class="mt-mini mb-mini">
                        <mt-tab-item id="tab1" @click.native.prevent="actived='tab-container1'"><span class="tab">详情</span></mt-tab-item>
                        <mt-tab-item id="tab2" @click.native.prevent="select_tab2"><span class="tab">库存</span></mt-tab-item>
                        <mt-tab-item id="tab3" @click.native.prevent="select_tab3"><span class="tab">分区功能</span></mt-tab-item>
                    </mt-navbar>
                    <mt-tab-container v-model="actived">
                        <mt-tab-container-item id="tab-container1">
                            <!--<div style="width: 90%;text-align: center;margin: 0 auto;" v-if="goodsData.thumb">-->
                                <!--<img :src="goodsData.thumb" alt="" style="width: 150px;height: 150px;">-->
                            <!--</div>-->
                            <table style="width: 100%;" class="c-table">
                                <tbody>
                                    <tr><td width="30%">名称</td><td width="70%">{{goodsData.spu_name}}</td></tr>
                                    <tr><td width="30%">属性</td><td width="70%">{{goodsData.name}}</td></tr>
                                    <tr><td width="30%">别名</td><td width="70%">{{goodsData.sku_alias}}</td></tr>
                                </tbody>
                            </table>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="tab-container2">
                            <div v-if="skuData.skuShow">
                                <table style="width: 100%;" class="c-table">
                                    <tbody>
                                        <tr><td width="30%">当前库存</td><td width="70%">{{skuData.warehouse.quantity}}</td></tr>
                                        <tr><td width="30%">可用库存</td><td width="70%">{{skuData.warehouse.available_quantity}}</td></tr>
                                        <tr><td width="30%">待发数量</td><td width="70%">{{skuData.warehouse.waiting_shipping_quantity}}</td></tr>
                                    </tbody>
                                </table>
                                <!--<ui-table class="table-line-color">-->
                                    <!--<tr><th>分区功能</th><th>货位</th><th>当前数</th><th>冻结数</th></tr>-->
                                    <!--<tr v-for="row in skuData.cargo" v-if="skuData.cargo.length>0">-->
                                        <!--<td>{{row.warehouse_area_type}}</td><td>{{row.warehouse_cargo_code}}</td>-->
                                        <!--<td>{{row.quantity}}</td><td>{{row.hold_quantity}}</td></tr>-->
                                    <!--<tr v-if="skuData.cargo.length===0"><td colspan="4">暂无数据</td></tr>-->
                                <!--</ui-table>-->

                            </div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="tab-container3">
                            <div v-if="skuData.skuShow">
                                <table style="width: 100%;" class="c-table">
                                    <thead>
                                    <tr>
                                        <th width="25%;">分区功能</th>
                                        <th width="30%;">货位</th>
                                        <th width="20%;">当前数</th>
                                        <th width="25%;">冻结数</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="row in skuData.cargo" v-if="skuData.cargo.length>0">
                                        <td width="25%;">{{row.warehouse_area_type}}</td>
                                        <td width="30%;">{{row.warehouse_cargo_code}}</td>
                                        <td width="20%;">{{row.quantity}}</td>
                                        <td width="25%;">{{row.hold_quantity}}</td>
                                    </tr>
                                    <tr v-if="skuData.cargo.length===0"><td colspan="4">暂无数据</td></tr>
                                    </tbody>
                                </table>

                            </div>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <slot></slot>
                </div>
            </div>
            <div class="mint-msgbox-btns">
                <button class="mint-msgbox-btn mint-msgbox-cancel" @click="close_box">关闭</button>
            </div>
        </div>
        <div class="v-modal" style="z-index: 2000;"></div>
    </div>
</template>
<style lang="stylus" scoped>
    .msgbox-sku{
        .mint-msgbox{
            width :98%;
        }
        .mint-msgbox-header {
            padding: 2px 0 0;
        }
        .mint-msgbox-content {
            padding: 2px 0px;
        }
        .mint-msgbox-message{
            line-height :1em;
        }
        .mint-msgbox-btns{
            height :2em;
        }
        .mint-msgbox-btn{
            height :auto;
        }
        .tab{
           font-size :1.4em;
        }
        .mint-navbar{
            .mint-tab-item {
               padding:0 0 5px 0;
               font-size: 1em;
            }
        }
        @media screen and (min-width: 400px){
            .tab {
                font-size: 20px!important;
            }
            .mint-msgbox-title{
                font-size:20px;
            }
            .mint-msgbox-btn{
                font-size:20px;
            }
            .c-ui-table {
                table {
                    th,td{
                        font-size:20px;
                    }
                }
            }
        }
    }
</style>
<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import uiTable from '../components/ui-table.vue';
    import { api_goods_sku_info } from '../api/putaway-order';
    import{api_barcode_datas} from '../api/warehouse-goods-check';
    export default{
        data(){
            return{
                boxShow:false,
                titleName:'',
                goodsData:{},
                selected:'tab1',
                actived:'tab-container1',
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
            }
        },
        mounted(){},
        methods:{
            close_box(){
            	/*关闭弹框的操作,样式调整,可滑动屏幕*/
                this.boxShow = false;
                document.body.style.overflow='auto';
                document.documentElement.style.overflow='auto';
                this.$emit('close-box');
            },
            init(){
            	/*默认显示sku的商品信息*/
            	if(this.sku===''){
                    Toast({message:`请输入SKU`,position: 'top',duration: 1500});
                    return ;
                }
                this.boxShow=true;
                this.req()

            },
            req(){
                this.$http(api_goods_sku_info,{sku:this.sku}).then(res=>{
                    this.goodsData = res;
                    this.goodsData.sku_alias = this.goodsData.sku_alias.join(',');

                    this.titleName = `SKU: ${this.goodsData.sku} `;
                    document.body.style.overflow='hidden'; /*样式调整,控制屏幕不可滑动*/
                    document.body.style.height='100%';
                    document.documentElement.style.overflow='hidden';
                    this.selected = 'tab1';
                    this.actived = 'tab-container1';
                    this.$emit('get-img',res.thumb)
                    // this.$emit('getimg',res.thumb)
                    // this.$emit('get-img',res.thumb)
                }).catch(code=>{
                    Toast({message:`SKU: ${this.sku} 暂无商品信息`,position: 'top',duration: 1500});
                });
            },
            select_tab2(){
            	/*切换tab显示sku的库存信息*/
                this.actived='tab-container2';
                this.tab_action();
            },
            select_tab3(){
                /*切换tab显示sku的库存信息*/
                this.actived='tab-container3';
                this.tab_action();
            },
            tab_action(){
                let data = {
                    warehouse_id:this.warehouse_id,
                    barcode_type:'sku',
                    barcode_value:this.sku
                };
                this.$http(api_barcode_datas,data).then(res=>{
                    this.skuData.cargo = res.data.cargo;
                    this.skuData.warehouse = res.data.warehouse;
                    this.skuData.skuShow = true;
                }).catch(code=>{
                    Toast({message:`SKU: ${this.sku} 暂无库存信息`,position: 'top',duration: 1500});
                });
            },
        },
        watch:{
            sku(val){
                this.req()
            },
        },
        props:{
            value:{},
            sku:{},/*sku的值*/
            warehouse_id:{},/*仓库id的值*/
        },
        components:{
            uiTable,
        }
    }
</script>

