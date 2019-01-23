<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">拣货单号</th>
            <th scope="col">类型</th>
            <th scope="col">日期</th>
            <th scope="col">状态</th>
        </tr>
        </thead>
        <tbody>
        <!--<tr-->
                <!--v-for="(row,index) in pickingData"-->
                <!--:key="row.id"-->
                <!--:class="[index%2===0?'line-bg':'',row.status===2?'red':'']"-->
                <!--@click="get_picking(row)"-->
        <!--&gt;-->
            <!--<td class="remark">-->
                <!--{{row.id}}-->
                <!--<i v-if="row.remark==='特殊渠道'" class="remark-logo">T</i>-->
                <!--&lt;!&ndash;<i class="remark-logo">U</i>&ndash;&gt;-->
            <!--</td>-->
            <!--<td>-->
                <!--{{row.type | type_name}}-->
                <!--<i v-if="row.status_more" class="type-more">多</i>-->
            <!--</td>-->
            <!--<td>-->
                <!--{{row.create_time | create_time}}-->
            <!--</td>-->
            <!--<td>-->
                <!--{{row.status | status_name}}-->
            <!--</td>-->
        <!--</tr>-->
        </tbody>
    </table>
</template>
<style lang="stylus" scoped>

</style>
<script>

    export default {
        name: "",
        data() {
            return {}
        },
        computed: {},
        filters: {},
        mounted() {
        },
        methods: {},
        watch: {},
        props: {},
        components: {}
    }
</script>
