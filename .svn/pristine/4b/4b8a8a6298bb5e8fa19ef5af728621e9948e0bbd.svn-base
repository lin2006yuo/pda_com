<template>
    <div class="putaway-order pb-lg">
        <mt-header fixed title="调拨拣货">
            <router-link to="/menu" slot="left">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </router-link>
        </mt-header>
        <div class="pt-lg">
            <table class="table" width="100%">
                <thead>
                    <tr class="all-table">
                        <th>拣货单号</th>
                        <th>日&nbsp;&nbsp;期</th>
                        <th>状&nbsp;&nbsp;态</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-resize="{height:2}">
                    <div v-if="dataShow" class="found">暂无数据</div>
                    <div v-else>
                        <tr class="all-table"
                            v-for="(row,index) in pickingData"
                            :key="row.id"
                            :class="[index%2===0?'line-bg':'',[2,10].includes(row.status)?'red':'']"
                            @click="get_picking(row)">
                            <td>{{row.order_code}}</td>
                            <td>{{row.create_time | create_time}}</td>
                            <td>{{row.status_name}}</td>
                            <td width="5%"><i class="mintui mintui-back back" style="font-size: 17px;"></i></td>
                        </tr>
                    </div>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style lang="stylus">

</style>
<script>
    import {api_picking_manage} from '../../api/pickings-manage'
    export default {
        data() {
            return {
                dataShow:false,
                pickingData:[],
                warehouse_id: 0,
                is_pda:1,
            }
        },
        mounted(){
            this.warehouse_id = this.$route.query.warehouse_id;
            this.init();
        },
        methods: {
            init(){

                this.$http(api_picking_manage,{is_pda:this.is_pda, warehouse_id:this.warehouse_id}).then(res=>{
                    if(res.data.length == 0){
                        this.dataShow = true;
                    }else {
                        this.dataShow = false;
                    }
                    this.pickingData = res.data;
                    this.pickingData.forEach(data => {
                        this.$set(data, 'warehouse_id', this.warehouse_id);
                    });
                }).catch(code => {
                    console.log(code);
                });
            },
            get_picking(row){
                this.$router.push({
                    path: "/pickings-manage/details",
                    query: {
                        id: row.id,
                        type: row.type,
                        warehouse_id: row.warehouse_id,
                    }
                });
            }
        },
        filters: {
            create_time(time){
                time = new Date(time * 1000);
                let Y = time.getFullYear() + '-';
                let M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '-';
                let D = time.getDate() + ' ';
                let HH = time.getHours() + ':';
                let mm = time.getMinutes();
                return Y+M+D+HH+mm;
            }
        },
        components: {
            requestButton:require('@/components/request-button').default,
        }
    }
</script>