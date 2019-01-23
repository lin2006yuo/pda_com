<template>
    <div class="ui_btn btn"
         @click.stop="click"
         :disabled="disabled"
         :style="sty">
        <slot v-if="!getReqKey"></slot>
        <template v-else>{{loadingText}}
        </template>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "request-button",
        data() {
            return {}
        },
        created() {
        },
        methods: {
            ...mapActions({
                setReqKey__: 'request-api-state/setReqKey'
            }),
            setReqKey(bool) {
                this.setReqKey__({key: this.rkey, val: bool});
            },
            click() {
                if (!this.getReqKey) {
                    this.setReqKey(true);
                    if (this.request) {
                        let res = this.request();
                        if (res !== undefined) {
                            switch (res.constructor.name) {
                                case 'Promise':
                                    res.then(res => {
                                        this.setReqKey(false);
                                    }).catch(fail => {
                                        this.setReqKey(false);
                                    });
                                    break;
                                default:
                                    console.error(`request-button :request not result Promise`);
                                    console.error(res)
                            }
                        } else {
                            console.warn(`request-button :request return undefined`);
                            this.setReqKey(false);
                        }
                    } else {
                        this.$emit('click');
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                getReqKey__: 'request-api-state/getReqKey'
            }),
            getReqKey() {
                return this.getReqKey__(this.rkey);
            },
            rkey() {
                return this.reqKey || this._uid;
            }
        },
        watch: {
            value(val) {
                this.setReqKey(val);
            },
            getReqKey(val) {
                this.$emit('input', val);
            }
        },
        props: {
            //el-button type
            type: {
                default() {
                    return 'primary';
                }
            },
            //可以不写
            value: {},
            //点击请求的回调函数，函数返回Promse
            request: {
                type: Function
            },
            //api请求时的按钮text
            loadingText: {
                default() {
                    return '请求中...'
                }
            },
            disabled: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            reqKey: {
                type: String
            },
            sty:{
                type:Object,
                default (){
                    return {
                        "color": "#26a2ff",
                        "background-color":"#ffffff",
                    }
                }
            }
        }
    }
</script>
