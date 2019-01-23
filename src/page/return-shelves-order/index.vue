<template>
    <div class="picking-process">
        <mt-header fixed title="重返上架单">
            <router-link to="/menu" slot="left">
                <i class="mintui mintui-back go-back" ></i><span>返回</span>
            </router-link>
            <div slot="right" @click="get_zone" class="partition"><span v-if="!seltitle">分区</span> <span v-if="seltitle">{{seltitle}}</span></div>
        </mt-header>
        <div class="pt-lg">
            <table class="table" width="100%">
                <thead>
                <tr class="all-table">
                    <th>上架单号</th>
                    <th>上架区</th>
                    <th>状&nbsp;&nbsp;态</th>
                    <th>创建人</th>
                    <th></th>
                </tr>
                </thead>
                <tbody  v-resize="{height:2}">
                    <div v-if="dataShow" class="found">暂无数据</div>
                    <div v-else>
                        <tr
                                class="all-table"
                                v-for="(row,index) in pickingData"
                                :key="row.id"
                                :class="[index%2===0?'line-bg':'',status===index?'red':'']"
                                @click="get_picking(row)"
                        >
                            <td width="23%">{{row.id}}</td>
                            <td width="23%">{{row.warehouse_area_code}}</td>
                            <td width="23%">{{row.status_name}}</td>
                            <td width="25%">{{row.creator_name}}</td>
                            <td width="6%"><i class="mintui mintui-back back" style="font-size: 17px;"></i></td>
                        </tr>
                    </div>
                </tbody>
            </table>
        </div>
        <Zone :zone="warehouseAreaList" :wareid.sync="warehouse_area_id" :seltitle="seltitle" @get_wareid="get_wareid"
              v-model="zoneshow"
        ></Zone>
    </div>
</template>
<style lang="stylus" scoped>
    .mint-cell-value{
        width:100%;
    }
</style>
<script>
    import { Toast } from 'mint-ui';
    import{return_shelves} from '../../api/putaway-order';
    import{api_warehouse_area} from '../../api/picking-process';
    import {mapGetters,mapActions} from 'vuex';
    import Zone from '@/components/Zone';
    /*
     * 后端:刘志勇
     * */
    export default{
        data(){
            return{
                dataShow:false,
                warehouse_id:'',
                warehouse_area_id:'全部',
                pickingData:[],
                warehouseAreaList:[],
                zoneshow:false,
                seltitle:null,
            }
        },
        mounted(){
            this.warehouse_id = this.$route.query.warehouse_id;
            this.get_warehouse_area();
        },
        methods:{
            ...mapActions({
                getwarehouse: 'api/getwarehouse',
                setreturnShelvesId:'api/returnShelvesId'
            }),
            get_zone(){
                this.zoneshow=true
            },
            get_wareid(val){
                this.seltitle=val
                console.log(this.seltitle,'title')
            },
            get_warehouse_area(){
                let data = {
                    warehouse_id : this.warehouse_id,
                    status:1,
                    warehouse_area_type:11,
                    sort_operator:1,
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
                    // if(res[0].operator_area === 1){
                    //     this.warehouse_area_id=res[0].code
                    // };
                    this.warehouse_area_id = this.returnShelvesId;
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
                    warehouse_id:this.warehouse_id,
                    warehouse_area_code:this.warehouse_area_id==='全部'?'':selTitle,
                };
                this.$http(return_shelves,data).then(res=>{
                    if(res.data.length == 0){
                        this.dataShow = true;
                    }else {
                        this.dataShow = false;
                    };
                    this.pickingData = res.data;
                    this.pickingData.forEach(data=>{
                        this.$set(data,'warehouse_id',this.warehouse_id);
                    });
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                    console.log(code);
                });
            },
            get_picking(row){
                this.$router.push({
                    path:"/return-shelves-order/detail",
                    query:{
                        id:row.id,
                        warehouse_id:row.warehouse_id
                    }
                });
            }
        },
        computed:{
            ...mapGetters({
                loginInfo:'user/info',
                returnShelvesId:'api/returnShelvesId'
            }),
            status(){
                let find = this.pickingData.findIndex(res=>{
                    return res.creator_id === this.loginInfo.realname&&res.status==='上架中';
                });
                console.log("find",find);
                return find;
            }
        },
        watch:{
            warehouse_area_id(val){
                this.init();
                this.setreturnShelvesId(val);
            }
        },
        components:{
            Zone,
        }
    }
</script>
