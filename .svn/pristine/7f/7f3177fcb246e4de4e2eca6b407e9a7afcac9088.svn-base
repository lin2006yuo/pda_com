<template>
    <div class="mass-zone pb-lg">
        <mt-header fixed title="集结管理">
            <span slot="left" @click="handleClick">
                <i class="mintui mintui-back go-back"></i><span>返回</span>
            </span>
            <div class="btns" slot="right" >
                <button v-if="this.active=='tab-container2'" @click="changeState">分拣集结</button>
                <button v-else @click="changeState">集结区管理</button>
            </div>
        </mt-header>
        <mt-tab-container v-model="active" class="pt-lg">
            <mt-tab-container-item id="tab-container1">
                <div>
                    <button-input :mt="{'margin-top':'20px'}" ref="turnover_box_id" lineName="周转箱号" :input-select="inputSelect" :error-message="errorMessage" v-model="turnover_box_id" @submit="submit"></button-input>
                    <table class="mass-table" v-if="massData.mass_sequence_number">
                        <tr><td colspan="2" :class="[massData.is_finish?'green':'red']">{{massData.mass_sequence_number}}</td></tr>
                        <tr><td>{{massData.is_finish | filterFinish}}</td><td>{{massData.mass_box_count}}/{{massData.total_box_count}}</td></tr>
                    </table>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <div>
                    <ul class="mass-box">
                        <li v-for="row in massListData"
                            :class="[row.work_status===1?'bg-red':'',row.work_status===2?'green':'']"
                            @click="look_mass(row.id)">
                            {{row.sequence_number}} <span v-if="row.mass_box_count">({{row.mass_box_count}}/{{row.total_box_count}})</span></li>
                    </ul>
                </div>
            </mt-tab-container-item>

        </mt-tab-container>
        <!--<mt-tabbar v-model="selected" :fixed="true">-->
            <!--<mt-tab-item id="tab1" @click.native.prevent="active='tab-container1'">-->
                <!--分拣集结-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="tab2" @click.native.prevent="active='tab-container2'">-->
                <!--集结区管理-->
            <!--</mt-tab-item>-->
        <!--</mt-tabbar>-->
    </div>
</template>
<style lang="stylus" scoped>
    .mass-box{
        width :100%;
        li{
            width: 33.33%;
            height: 3em;
            float: left;
            display: inline;
            border-bottom:1px solid #c8cccf;
            border-right:1px solid #c8cccf;
            text-align :center;
            line-height: 3em;
        }
        li:nth-child(3n+4){
            border-left:1px solid #c8cccf;
        }
        li:first-child{
            border-left:1px solid #c8cccf;
        }
    }
    .bg-red{
        color :#fff;
        background-color :red;
    }
    .green{
        color :#fff;
        background-color :green;
    }
    .font-green{
        color :green;
    }
    .font-red{
        color :red;
    }
    .mass-table{
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
            text-align: center;
            box-sizing: border-box;
            border :1px solid #c8cccf;
        }
    }
    .btns{
        button{
            color #666;
            background :#fff
            font-size:14px;
            border-radius :4px;
            outline: none;
        }
    }
</style>
<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import { InfiniteScroll } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import buttonInput from '../../components/button-input.vue';
    import { api_turnover_box_mass,api_mass_zone_lists,api_mass_zone } from '../../api/mass-zone';
    /*
     * 后端:赖永凤
     * */
    export default{
        data(){
            return{
                selected:'tab1',
                active:'tab-container1',
                turnover_box_id:'',
                loading:false,
                massData:{},
                massTable:{},
                massListData:[],
                errorMessage:'',
                inputSelect:false,
            }
        },
        mounted(){
            this.init();
            this.errorMessage = '';
        },
        methods:{
            handleClick(){
                if(this.active==='tab-container2'){
                    console.log('111:',this.active);
                    this.selected='tab1'
                    this.active='tab-container1'
                }else{
                    console.log(5555)
                    this.$router.push('/menu')
                }
            },
            changeState(){
               if(this.selected==='tab1'){
                   this.selected='tab2'
                   this.active='tab-container2'
               }else{
                   this.selected='tab1'
                   this.active='tab-container1'
               }
            },
            init(){
                if(!!this.$route.query.selected){
                    this.selected = this.$route.query.selected;
                }
                if(!!this.$route.query.active){
                    this.active = this.$route.query.active;
                }
                let warehouse_id = this.$route.query.warehouse_id;
                this.$http(api_mass_zone_lists,{warehouse_id:warehouse_id}).then(res=>{
                    this.massListData = res;
                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
                this.inputSelect = true;
            },
            submit(){
                this.$nextTick(()=>{
                    if(this.turnover_box_id===''){
                        this.errorMessage = '周转箱号不能为空';
                        return ;
                    }
                    let data ={
                        warehouse_id : this.$route.query.warehouse_id,
                        turnover_box_num:this.turnover_box_id
                    };
                    this.$http(api_turnover_box_mass,data).then(res=>{
                        if(res.is_finish===1){
                            Toast({message:`集结完成`,position: 'top',duration: 1500});
                        }
                        this.errorMessage = '';
                        this.massData = res;
                    }).catch(code=>{
                        this.errorMessage = code.message;
                        this.massData = '';
                    });
                });
            },
            look_mass(id){
                Indicator.open();
                this.$http(api_mass_zone,id).then(res=>{
                    this.massTable = res;
                    let status = this.work_status(this.massTable.work_status);
                    console.log(status);
                    let html = `<div id="taskForm" style="width:100%; height:100%;overflow:hidden;">
                    <div class="mini-panel-table" >
                    <p style="width:100%;text-align: center;">${status}</p>
                    <table style="width:100%;text-align: center;" cellpadding="0" cellspacing="0">
                    <tr><td colspan="4">装箱单号（${this.massTable.mass_box_count}/${this.massTable.total_box_count})</td></tr>
                    <tr><td colspan="4" style="border:1px solid #999;border-radius:3px;"><ul style="width: 100%; display: flex;flex-flow: row wrap;">${this.massTable.boxes.map(row=>
                        `<li style="padding: 0 5px 0 5px;" class="${row.is_mass===1?'font-green':'font-red'}">${row.box_num}</li>`
                    ).join('')}</ul></td></tr>
                    </table></div></div>`;
                    Indicator.close();
                    if(this.massTable.work_status===0){
                        console.log(this.massTable.work_status,'tttt')
                        Toast({message:`空置中`,position: 'top',duration: 500});
                    }else{
                        MessageBox({
                            title: `集结区${this.massTable.sequence_number}详情`,
                            message: html,
                            showModal: false,
                            confirmButtonText:'关闭',
                            callback: function (action) {
                            }
                        });
                    }

                }).catch(code=>{
                    Toast({message:code.message,position: 'top',duration: 1000});
                });
            },
            work_status(val){
                switch (val){
                    case 0:
                        return `空置`;
                        break;
                    case 1:
                        return `集结中`;
                        break;
                    case 2:
                        return `集结完成`;
                        break;
                }
            }
        },
        filters:{
            filterFinish(val){
                switch (val){
                    case 0:
                        return `集结中`;
                        break;
                    case 1:
                        return `集结完成`;
                        break;
                }
            }
        },
        watch:{
            'turnover_box_id'(val){
                if(!val){
                    this.massData = {};
                }
            },
            selected(val){
                console.log("turnover",val);
                if(val==='tab1'){
                    this.$nextTick(()=>{
                        this.inputSelect = true;
                        this.$refs.turnover_box_id.$refs.input.select();
                    });
                }
            },
            active(val){
                if(val==='tab-container1'){
                    this.selected = 'tab1';
                }else if(val==='tab-container2'){
                    this.selected = 'tab2';
                    this.init();
                }
            }
        },
        components:{
            buttonInput,
        }
    }
</script>
