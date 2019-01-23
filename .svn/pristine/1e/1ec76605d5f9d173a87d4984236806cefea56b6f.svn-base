<template>
    <div class="out-box">
        <div class="img">
            <img :src="img" alt="">
        </div>
        <div class="right">
            <div class="right-tion" v-if="warehouse.name">
                <span>品名：</span>
                <div class="descrip-tion">
                    <span>{{warehouse.name}}</span>
                </div>
            </div>
            <div class="mg">
                <span>货位：</span>
                <span v-if="warehouse.warehouse_cargo">{{warehouse.warehouse_cargo}}</span>
                <span v-else>{{warehouse.warehouse_cargo_code}}</span>
            </div>
            <div class="mg spe" @click="sku_box">
                <div class="row">
                    <span>SKU：</span>
                    <div class="row-column">
                        <a href="javascript:;">{{warehouse.sku}}</a>
                        <span v-for="(alia,i) in warehouse.sku_alia" :key="i">
                            <a href="javascript:;" style="text-decoration:none">{{alia}}</a>
                        </span>
                    </div>
                </div>
            </div>
            <div class="mg">
                <span>数量：</span>
                <span v-if="warehouse.quantity">{{warehouse.quantity}}</span>
                <span v-if="warehouse.quantity_cargo">{{warehouse.quantity_cargo}}</span>
            </div>
        </div>
        <slot></slot>
        <msgboxSku ref="sku_goods"
                   v-model="skuShow" :sku="warehouse.sku"
                   :warehouse_id="this.$route.query.warehouse_id" @get-img="get_img"></msgboxSku>
    </div>
</template>

<script>
    import  msgboxSku from '@/components/msgbox-sku'
    export default {
        data(){
            return {
                warehouseData:[],
                sku:'',
                skuShow:false,
                img:'',
            }
        },
        mounted(){
            if(!!sessionStorage.getItem('this-img')){
                this.img = sessionStorage.getItem('this-img');
            }
        },
        methods: {
            sku_box() {
                this.skuShow=true;
                this.$refs.sku_goods.init();
            },
            get_img(img){
                this.img=img;
                sessionStorage.setItem('this-img',this.img);
            }
        },
        watch:{
            warehouse(val){
                this.warehouseData = JSON.parse(JSON.stringify(val));
                this.sku = this.warehouseData.sku;
                if(!val.sku_id){
                    this.img = '';
                }
            }
        },
        props:['warehouse'],
        components:{
            msgboxSku
        }
    }
</script>

<style scoped>
    .sku_name{
        margin-left: 7px;
    }
.out-box{
    width: 320px;
    display: flex;
    padding: 10px 8px 0px 10px;
    box-sizing: border-box;
}
.img{
    width: 110px;
    height: 110px;
}
.img img{
    width: 100%;
    height: 100%;
}
.right{
    font-size: 14px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
}
.right div.mg{
    margin-top: 8px;
}
.row{
    display: flex;
    flex-direction: row;
}
.row-column{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.right div span{
    height: 21px;
}
.right div.spe a{
    color: rgb(31, 146, 192);
    text-decoration: underline;
}
.descrip-tion{
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    width:130px;
    margin-bottom: 3px;
}
.right-tion{
    display: flex
}
</style>