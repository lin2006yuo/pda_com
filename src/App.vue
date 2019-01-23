<template>
    <div id="app">
        <router-view/>
        <loading v-if="loading"></loading>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from "vuex";
    import {make_auth} from './auth'
    import {api_login_info} from './api/user'
    import loading from '@/components/loading'
    export default {
        name: 'app',
        computed:{
            ...mapGetters(['loading'])
        },
        mounted(){
            make_auth().then(() => {
                this.$http(api_login_info).then(res => {
                    this.set_info(res);
                });
            });
        },
        methods:{
            ...mapActions({set_info: "api/set_info"}),
        },
        components:{loading},
    }
</script>

<style lang="stylus">
    @import '/css/global.css';
    @import '/css/global_g.styl'
    @import 'css/variable.styl'
    html,body,#app {
        margin:0;
        padding:0;
        width :100%;
        height :100%;
    }
    @media screen and (min-width: 960px){
        html,body,#app {
            margin:0 auto;
            padding:0;
            width :640px;
            height :100%;
        }
        #app{
            /*border: 1px solid #CDCDCD;*/
        }
        .mint-header.is-fixed {
            width: 640px;
            margin: 0 auto;
            top: 0;
            right: 0;
            left: 0;
            position: fixed;
            z-index: 1;
        }
        .mint-tabbar.is-fixed {
            width: 640px;
            margin: 0 auto;
            right: 0;
            bottom: 0;
            left: 0;
            position: fixed;
            z-index: 1;
        }
    }
    *{
        box-sizing border-box
    }
</style>
