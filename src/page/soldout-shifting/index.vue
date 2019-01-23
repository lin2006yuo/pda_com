<template>
    <div class="putaway-order pb-lg">
        <mt-header fixed title="移库下架">
            <router-link to="/menu" slot="left">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </router-link>
        </mt-header>
        <div class="pt-lg">
            <table class="table" width="100%">
                <thead>
                <tr class="all-table">
                    <th>移库单号</th>
                    <th>状&nbsp;&nbsp;态</th>
                    <th>操作人</th>
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
                        <td width="38%">{{row.code}}</td>
                        <td width="20%">{{row.status_name}}</td>
                        <td width="35%">{{row.shift_id}}</td>
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
        import { Toast } from 'mint-ui';
        import {api_warehouse_cargo_shifts} from '../../api/soldout-shifting';
        import {api_login_info} from '../../api/user';
        export default{
            data(){
                return{
                    dataShow:false,
                    warehouse_id: 0,
                    pickingData:[],
                    loginInfo:[],
                }
            },
            mounted(){
                this.warehouse_id = this.$route.query.warehouse_id;
                this.init();
            },
            methods:{
                async init() {
                    let data = {
                        warehouse_id: this.warehouse_id,
                        list_type:1
                    };
                    try{
                        this.$http(api_warehouse_cargo_shifts, data).then(res => {
                            if (res.data.length == 0) {
                                this.dataShow = true;
                            } else {
                                this.dataShow = false;
                            }
                            this.pickingData = res.data;
                            this.pickingData.forEach(data => {
                                this.$set(data, 'warehouse_id', this.warehouse_id);
                            });
                        }).catch(code => {
                            console.log(code);
                        });
                    }catch (code) {
                        setTimeout(()=>{this.$router.go(-1)},300)
                        Toast({message:code.message,position: 'top',duration: 1000});
                        return Promise.reject()
                    }
                    const login_info = await this.$http(api_login_info)
                    this.loginInfo = login_info;
                },
                get_picking(row){
                    if(row.status_name === '移位中'){
                        if(row.shift_id !== this.loginInfo.realname){
                            Toast({message:`请处理自己的下架单`,position: 'top',duration: 1500});
                        }else {
                            this.$router.push({
                                path: "/soldout-shifting/details",
                                query: {
                                    id: row.id,
                                    type: row.type,
                                    warehouse_id: row.warehouse_id,
                                }
                            });
                        }
                    }else {
                        this.$router.push({
                            path: "/soldout-shifting/details",
                            query: {
                                id: row.id,
                                type: row.type,
                                warehouse_id: row.warehouse_id,
                            }
                        });
                    }

                }
            },
            components:{

            }
        }
    </script>