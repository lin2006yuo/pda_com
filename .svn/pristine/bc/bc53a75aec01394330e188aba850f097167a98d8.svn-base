<template>
        <div class="take-stock">
            <mt-header fixed title="库存盘点">
                <router-link to="/menu" slot="left">
                    <i class="mintui mintui-back go-back"></i><span>返回</span>
                </router-link>
            </mt-header>
            <div class="pt-lg">
                <table class="table" width="100%">
                    <thead>
                    <tr class="all-table">
                        <th>单号</th>
                        <th width="20%">
                            <title-select
                                    class="title-select"
                                    v-model="checker_name"
                                    @select-change="select_checker"
                                    :selectList="checkerList"></title-select>
                        </th>
                        <th width="20%">
                            <title-select
                                    class="title-select"
                                    v-model="status_name"
                                    @select-change="select_status"
                                    :selectList="statusList"></title-select>
                        </th>
                        <th>创建时间</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody  v-resize="{height:2}">
                        <div v-if="dataShow" class="found">暂无数据</div>
                        <div v-else>
                            <router-link
                                    v-for="(row,index) in stockListData"
                                    :key="row.id"
                                    :class="[index%2===0?'line-bg':'']"
                                    tag="tr"
                                    :to="{path:'/take-stock/details',query:{id:row.id,warehouse_id:row.warehouse_id}}"
                            >
                                <td width="12%">{{row.id}}</td>
                                <td width="30%">{{row.checker_name}}</td>
                                <td width="24%">{{row.status_name}}</td>
                                <td width="28%">{{fmtDate(row.create_time)}}</td>
                                <td width="6%"><i class="mintui mintui-back back" style="font-size: 17px;"></i></td>
                            </router-link>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    </template>
    <style lang="stylus">
        .mint-cell-value{
            width:100%;
        }
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
        .title-select{
            select{
                width :auto;
            }
        }
    </style>
    <script>
        import { Toast } from 'mint-ui';
        import titleSelect from '../../components/title-select.vue';
        import{api_warehouse_goods_check}from '../../api/warehouse-goods-check';
        /*
         * 后端:刘志勇
         * */
        export default{
            data(){
                return{
                    dataShow:false,
                    stockData:[],
                    warehouse_id:'',
                    checker_name:-1,
                    status_name:-1,
                    checkerList:[],
                    statusList:[]
                }
            },
            mounted(){
            	this.warehouse_id = this.$route.query.warehouse_id;
                this.get_warehouse_goods();
                this.checker_name = -1;
                this.status_name = -1;
            },
            methods:{
                select_checker(){

                },
                select_status(){

                },

            	get_warehouse_goods(){
                    let data = {
                        warehouse_id :this.warehouse_id
                    };
                    this.$http(api_warehouse_goods_check,data).then(res=>{
                        if(res.data.length == 0){
                            this.dataShow = true;
                        }else {
                            this.dataShow = false;
                        };
                        this.stockData = res.data;
                        this.stockData.forEach((item,index)=>{
                        	if(item.status === 3 || item.status ===4 || item.status_name === '盘点完成'){
                        		console.log("筛选",item);
                                this.stockData.splice(index,1);
                            }
                        });
                        let ret = [{label:'指定盘点人',value:-1}];
                        this.stockData.forEach(row=>{
                            if(ret.findIndex(r=>r.value === row.checker_id) <= -1){
                                ret.push({
                                    label:row.checker_name,
                                    value:row.checker_id
                                });
                            }
                        });
                        this.checkerList = ret;
                        let status = [{label:'状态',value:-1}];
                        this.stockData.forEach(row=>{
                            if(status.findIndex(r=>r.value === row.status) <= -1){
                                status.push({
                                    label:row.status_name,
                                    value:row.status
                                });
                            }
                        });
                        this.statusList = status;
                        console.log(this.checkerList);
                        console.log(this.statusList);
                    }).catch(code=>{
                        Toast({message:code.message,position: 'top',duration: 1000});
                    });
                },
                fmtDate(obj){
                    let date = new Date(obj*1000);
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    let D = date.getDate() + ' ';
                    let h = date.getHours() + ':';
                    let m = date.getMinutes() + ':';
                    let s = date.getSeconds();
                    return Y+M+D;
                },
            },
            computed:{
                stockListData(){
                    switch (this.checker_name){
                        case -1:
                            if(this.status_name === -1){
                                return this.stockData;
                            }else{
                                return this.stockData.filter(row=>{
                                    return row.status === this.status_name;
                                });
                            }
                        default:
                            if(this.status_name === -1){
                                return this.stockData.filter(row=>{
                                    return row.checker_id === this.checker_name;
                                });
                            }else{
                                return this.stockData.filter(row=>{
                                    return row.checker_id === this.checker_name && row.status === this.status_name;
                                });
                            }
                    }
                }
            },
            components:{
                titleSelect,
            }
        }
    </script>
