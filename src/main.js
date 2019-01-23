// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugin';
import App from './App.vue'
import router from './router'
import './lib/cache';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/global.js'
import './lib/array';
import Vuex from 'vuex';
import {resize} from './directives/resize'
resize(Vue)
Vue.use(Vuex);
import store from './vuex/index.js';
Vue.config.productionTip = false;
Vue.config.devtools = true;
import Tap from './lib/tap';
Vue.use(Tap);
Vue.use(MintUI);
router.beforeEach((to, from, next) => {
    if('test' in to.query){
        console.log(111,to.query);
        const vconsole = require('./vconsole.min').VConsole;
        new vconsole();
    }
    next()
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
