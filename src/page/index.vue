<template>
    <div class="login">
        <div style="height:70px"><img src="../assets/logo_n.png" alt="" style="padding-top: 20px;width: 140px;"></div>
        <form class="form">
            <div class="relatived">
                <input ref="input" placeholder="输入账号" type="text" v-model="account" class="form_input" required/>
                <label class="icon_account"></label>
            </div>
            <div class="relatived">
                <input type="password" placeholder="输入密码"  v-model="password" class="form_input" required/>
                <label class="icon_password"></label>
            </div>
            <div class="relatived">
                <input type="text" @keyup.13="login"  placeholder="输入验证码" v-model="authcode" class="form_input yzm" style="padding-right: 95px;" required/>
                <label class="icon_authcode"></label>
                <img class="auth-code fr" @click="refresh_authcode" :src="authCode">
            </div>
            <div class="request_btn" style="padding-left: 20px;    padding-right: 12px;">
                <div @click="login" class="ui_btn">登陆</div>
            </div>
            <!--<request-button :request="login" class="form_input" loading-text="请求登录中...">登陆</request-button>-->
        </form>
        <div class="footer-img" ref="keyboard"></div>
    </div>
</template>
<style lang="stylus" scoped>
    .self{
        width: 200px !important;
        margin-left: -30px !important;
        height: 32px !important;
    }
    .login{
        display: flex;
        flex-direction column;
        height :100%;
        width :100%;
        overflow-x: hidden;
        overflow-y: auto;
        text-align :center;
        position:relative;
        .form{
            flex :1;
            width :100%;
            padding: 20px 45px 0 45px ;
            text-align :center;
            .icon_account{
                background-image: url("../assets/account_o.png")
            }
            .icon_password{
                background-image: url("../assets/password_o.png")
            }
            .icon_authcode{
                background-image: url("../assets/authcode_o.png")
            }
        }
        .relatived{
            position:relative
            label{
                position: absolute;
                left: 20px;
                top: 5px;
                width:26px;
                height:30px;
                background-repeat: no-repeat;
                background-position: center;
                background-size 70%;
            }
            img{
                position: absolute;
                top: -4px;
                right: 24px;
                display: flex;
            }
            &:nth-child(3){
                margin-bottom:30px;
            }
        }
        .form_input{
            width: 84%;
            -web-kit-appearance:none;
            -moz-appearance: none;
            display block;
            height:2em;
            margin: 0 auto;
            margin-bottom :21px;
            border-bottom:1px solid rgba(0,0,0,.2);
            padding:22px 30px 14px;
            transition all .8s;
            color:#4c4a4a;
            &:focus{
                outline:none;
                border-bottom:1px solid #0be8ef;
                &+label{
                    color:red;
                    &.icon_account{
                        background-image: url("../assets/account_n.png")
                    }
                    &.icon_password{
                        background-image: url("../assets/password_n.png")
                    }
                    &.icon_authcode{
                        background-image: url("../assets/authcode_n.png")
                    }
                }
            }
        }
        .cl{
            width: 84%;
        }
        .auth-code{
            width :30%;
            height: 2em;
            display: inline;
        }
        .footer-img{
            height: 120px;
            /*background: url(/img/login_f.d3f549b.png) 100% 100%/100% no-repeat;*/
            background: url('../assets/login_f.png') 58% 194%/100% no-repeat;
        }

    }

</style>
<script>
    import Vue from 'vue';
    import {api_login_info,login,api_permission} from '../api/user';
    import {set_authorization} from '../auth';
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return{
                account:'',
                password:'',
                authcode:'',
                authCode:'',
                captcha:'',
            }
        },
        mounted(){
            this.refresh_authcode();
            // this.$refs.input.select();
        },
        methods:{
            login(){
                // this.$router.replace('/menu');
                if(/^[0-9a-z]{2,4}$/i.test(this.authcode)){
                    return this.$http(login, {
                        username: this.account,
                        password: this.password,
                        code: this.authcode,
                        captcha: this.captcha,
                    }).then(succ => {
                        set_authorization(succ.token);
                        this.$router.replace('/menu');
                        return Promise.resolve();
                    }).catch(code => {
                        Toast({message:code.message,position: 'top',duration: 1000});
                    });
                }else{
                    Toast({message:'验证码格式不正确',position: 'top',duration: 1500});
                }
            },
            refresh_authcode(){
                fetch(`${baseUrl}/login/code`, {
                    mode: 'cors'
                }).then((res) => {
                    this.captcha = res.headers.get('Captcha');
                    res.blob().then((myBlob) => {
                        this.authCode = URL.createObjectURL(myBlob);
                    });

                });
            },
        },
        components:{
            requestButton:require('@/components/request-button').default,
        }
    }
</script>
