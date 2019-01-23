<template>
    <div class="picking-process">
        <mt-header fixed title="拣货单任务">
            <router-link to="/menu" slot="left" tag="span">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </router-link>
            <div slot="right" @click="get_zone" class="partition"><span  v-if="!seltitle">分区 </span><span v-if="seltitle">{{seltitle}}</span></div>
        </mt-header>
        <div class="pt-lg">
            <table class="table" width="100%">
                <thead>
                    <tr class="all-table">
                        <th>拣货单号</th>
                        <th>类&nbsp;&nbsp;型</th>
                        <th>日&nbsp;&nbsp;期</th>
                        <th>状&nbsp;&nbsp;态</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-resize="{height:2}">
                    <div v-if="dataShow" class="found">暂无数据</div>
                    <div v-else>
                        <tr
                                class="all-table"
                                v-for="(row,index) in pickingData"
                                :key="row.id"
                                :class="[index%2===0?'line-bg':'',[2,10].includes(row.status)?'red':'']"
                                @click="get_picking(row)"
                        >
                            <td width="22%" class="remark">{{row.id}}<i v-if="row.remark==='特殊渠道'" class="remark-logo">T</i>
                            </td>
                            <td width="22%">{{row.type | type_name}}<i v-if="row.status_more" class="type-more">多</i></td>
                            <td width="28%">{{row.create_time | create_time}}</td>
                            <td width="11%">{{row.status | status_name }}</td>
                            <td width="5%"><i class="mintui mintui-back back" style="font-size: 17px;"></i></td>
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
    .remark {
        .remark-logo {
            display: inline-block;
            border-radius 50%
            color: #ffffff
            background-color: #333;
            width: 15px;
            height: 15px;
            font-size: 12px;
            line-height: 15px;
            text-align: center;
        }
    }

    .type-more {
        display: inline-block;
        border-radius 50%
        color: #ffffff
        background-color: #333;
        width: 15px;
        height: 15px;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
    }

    .mint-cell-value {
        width: 100%;
    }


</style>
<script>
    import {Toast} from 'mint-ui';
    import {api_picking_process, api_warehouse_area} from '../../api/picking-process'
    import {mapGetters, mapActions} from 'vuex';
    import  Zone from '@/components/Zone'
    /*
     * 后端:张文宇
     * */
    export default {
        data() {
            return {
                dataShow:false,
                warehouse_id: 0,
                warehouse_area_id: 0,
                pickingData: [],
                warehouseAreaList: [],
                seltitle:null,
                zoneshow:false
            }
        },
        filters: {
            type_name(type) {
                switch (type) {
                    case 1:
                        return '单品单件';
                    case 2:
                        return '单品多件';
                    case 4:
                        return '多品多件';
                }
            },
            status_name(status) {
                switch (status) {
                    case 1:
                        return '待拣';
                    case 2:
                        return '在拣';
                    case 10:
                        return '在拣';
                }
            },
            create_time(time) {
                time = new Date(time * 1000);
                // return `${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
                let Y = time.getFullYear() + '-';
                let M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '-';
                let D = time.getDate() + ' ';
                let HH = time.getHours() + ':';
                let mm = time.getMinutes();
                return Y+M+D+HH+mm;
            },
        },
        mounted() {
            this.warehouse_id = this.$route.query.warehouse_id;
            this.get_warehouse_area();
        },

        methods: {
            get_zone(){
                    this.zoneshow=true
            },
            get_wareid(val){
                this.seltitle=val
                console.log(this.seltitle,'title')
            },
            ...mapActions({
                getwarehouse: 'api/getwarehouse',
                setlastChangeAreaId:'api/lastChangeAreaId'
            }),
            get_warehouse_area() {
                let data = {
                    warehouse_id: this.warehouse_id,
                    status: 1,
                    warehouse_area_type: 11,
                };
                this.$http(api_warehouse_area, data).then(res => {
                    this.warehouseAreaList = res;
                    this.warehouseAreaList = this.warehouseAreaList.map(res => {
                        return {
                            value: res.id,
                            label: res.code,
                            operator_ids: res.operator_ids
                        };
                    });
                    this.warehouseAreaList.unshift({value: '', label: '全部', operator_ids: []});
                    const currentOperatorArea = this.warehouseAreaList.find(area => {
                        return area.operator_ids.includes(this.userid)
                    });
                    if (currentOperatorArea) {
                        this.warehouse_area_id = currentOperatorArea.value;
                    }else{
                        this.warehouse_area_id = this.lastChangeAreaId;
                        let find = res.find(row=> Number(row.id)===Number(this.warehouse_area_id));
                        if(this.warehouse_area_id != ''){
                            this.seltitle = find.code;
                        }else {
                            this.seltitle = '全部';
                        }

                    }
                }).catch(code => {
                    Toast({message: code.message, position: 'top', duration: 1500});
                });
            },
            init() {
                let data = {
                    warehouse_id: this.warehouse_id,
                    warehouse_area_id: this.warehouse_area_id
                };
                this.$http(api_picking_process, data).then(res => {
                    if(res.length == 0){
                        this.dataShow = true;
                    }else {
                        this.dataShow = false;
                    }
                    this.pickingData = res;
                    this.pickingData.forEach(data => {
                        this.$set(data, 'warehouse_id', this.warehouse_id);
                    });

                }).catch(code => {
                    console.log(code);
                });
            },
            get_picking(row) {
                this.$router.push({
                    path: "/picking-process/details",
                    query: {
                        id: row.id,
                        type: row.type,
                        warehouse_id: row.warehouse_id
                    }
                });
            }
        },
        computed: {
            ...mapGetters({
                info: 'api/info',
                lastChangeAreaId:'api/lastChangeAreaId'
            }),

            userid() {
                return this.info.user_id;
            }
        },
        watch:{
            warehouse_area_id(val){
                this.init();
                this.setlastChangeAreaId(val);
            }
        },
        components: {
            Zone
        }
    }
</script>
