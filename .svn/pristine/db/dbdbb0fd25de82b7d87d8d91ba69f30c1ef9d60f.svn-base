<template>
    <div>
        <button @click="add">ADD</button>
        <virtual-list :size="16" :remain="8">
            <div v-for="item in items" :key="item" :attr="item">{{item}}</div>
        </virtual-list>
        <input type="file" capture="camera" accept="image/*"/>
    </div>
</template>

<script>
    import virtualList from '@/components/virtual-list';
    export default {
        name: "test",
        data(){
            return {
                items:[].seq(1, 30)
            }
        },
        methods:{
            add(){
                this.items.push(this.items.length+1);
            }
        },
        computed:{
        },
        components:{
            virtualList
        }
    }
</script>

<style scoped>

</style>