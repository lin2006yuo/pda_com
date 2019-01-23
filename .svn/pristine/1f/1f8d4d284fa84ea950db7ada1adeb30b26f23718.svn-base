<template>
    <!--选择组件,用于带选择搜索查询的页面,如库存盘点页面-->
    <div class="c-title-select">
        <select v-model="select"
                class="form_select"
                :style="`width: ${width}em`"
                @change="select_change(select)">
            <i class="iconfont icon-arrLeft-fill"></i>
            <option v-for="item in selectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">{{item.label}}</option>
        </select>
    </div>
</template>
<style lang="stylus" scoped>
    .c-title-select{
        select{
            color: rgb(31, 146, 192);
            border:0;
            font-size 16px;
            text-align: center;
            text-align-last: center;
        }
    }

</style>
<script>
    export default {
        data() {
            return {
                select:this.value,
            }
        },
        mounted(){
        },
        methods:{
            select_change(){
            	this.$emit('select-change');
            },
        },
        watch:{
            value(val){
                this.input_value = val;
            },
            select(val){
                this.$emit('input',val)
            },
        },
        props:{
            value:{},
            selectList:{ /*select选项*/
            	type:Array,
            },
            width:{} /*设置select的width*/
        },
        components: {}
    }
</script>
