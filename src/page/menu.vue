<template>
    <div class="menu">
        <mt-header title="" class="menu_head">
            <div slot="left" class="box-img"><img src="../assets/logo.png" alt="" class="img-logo"></div>
            <div slot="right">
                <select v-model="warehouse_id" @change="change_warehouses($event.target.value)">
                    <option v-for="item in warehouses"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">{{item.label}}
                    </option>
                </select>
            </div>
        </mt-header>
        <div class="menu_content">
            <ul class="menu-box">
                <li v-for="menu in menus" @click="tag(menu.path,warehouse_id)">
                    <a>
                        <img :src="menu.icon" alt="" class="iconfont icons">
                        <span>{{menu.name}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="menu_foot" @click="exits">
            <router-link to="" tag="span">退出登录</router-link>
            <img src="../assets/exit.png" alt="">
        </div>
    </div>
</template>
<style lang="stylus">
    .box-img {
        line-height: 2em;
    }

    .img-logo {
        height: 2em;
        display: block;
    }

    .menu-box {
        width: 100%;
        li {
            width: 33.33%;
            cursor pointer;
            float: left;
            display: inline;
            text-align: center;
            margin: 2px 0 0px;
            transition background-color 1s;
            &:active {
                background-color: rgba(0, 0, 0, .03);
            }
            a {
                font-size: 14px;
                display: flex;
                flex-direction: column;
                align-items: center;
                span {
                    margin: 6px 0;
                }
                i {
                    &:before {
                        font-size: 28px;
                    }
                }
            }
        }
        a {
            display: block;
            color: #333;
        }
    }

    .menu {
        user-select none
        display: flex;
        flex-direction: column;
        height: 100%;
        .icons {
            width: 30px;
            height: 30px;
        }

        .menu_content {
            flex: 1;
        }
        .menu_foot {
            padding: 10px 25px;
            font-size: 14px;
            color: rgb(51, 51, 51);
            background-color: rgba(0, 0, 0, .04);
            display: flex;
            align-items: center;
            justify-content space-between
            img {
                width: 20px;
                height: 20px;
            }
        }
        .box-img {
            img {
                height: 1.6em;
                display: block;
                margin-left: 8px;
            }
        }
        select {
            option {
                font-size: 13px;
            }
        }
    }
</style>
<script>
    import {entrepot_picking, api_login_info} from "../api/user";
    import {mapActions} from "vuex";
    import {MessageBox} from "mint-ui";
    import {Toast} from "mint-ui";
    import {menu} from './menu'
    import {make_auth} from '../auth'
    import Zone from '@/components/Zone'

    export default {
        data() {
            return {
                warehouse_id: 2,
                warehouses: [],
                num: "",
                menus: menu,
                ZoNe:'',
            };
        },
        mounted() {
            this.init();
            make_auth().then(() => {
                this.$http(api_login_info).then(res => {
                    this.set_info(res);
                });
            });
        },
        methods: {
            ...mapActions({set_info: "api/set_info"}),
            tag(path, warehouse_id) {
                this.$router.push({path: path, query: {warehouse_id: warehouse_id}})
            },
            change_warehouses(val){
                let current_warehouses = this.warehouses.find(row=>row.value === Number(val))
                sessionStorage.setItem('current_warehouses',JSON.stringify(current_warehouses));
            },
            init(){
                let arr = localStorage.getItem('warehouseData');
                let warehouseData = JSON.parse(arr);
                if(!warehouseData || !warehouseData.length){
                    this.warehouses_init();
                }else{
                    this.warehouses = warehouseData;
                    if(!!sessionStorage.getItem('current_warehouses')){
                        let cur = JSON.parse(sessionStorage.getItem('current_warehouses'));
                        this.warehouse_id = cur.value;
                    }
                }
            },
            warehouses_init() {
                this.$http(entrepot_picking).then(res => {
                    this.warehouses = res.map(item => {
                        return {label: item.name, value: item.id};
                    });
                    let str = JSON.stringify(this.warehouses);
                    localStorage.setItem('warehouseData',str);
                }).catch(code => {
                    Toast({message: code.message, position: "top", duration: 1500});
                    this.$router.push({
                        path: "/"
                    });
                });
            },
            exits() {
                MessageBox.confirm(`是否确定退出账号？`, 'RondaFul').then(action => {
                        this.$router.push({
                            path: "/"
                        });
                    }).catch(code => {
                        Toast({message: `已取消操作`, position: "top", duration: 1500});
                    });
            }
        },
        components: {Zone}
    };
</script>
