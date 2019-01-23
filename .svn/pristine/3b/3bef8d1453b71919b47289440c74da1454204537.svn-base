// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugin';
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/global.js'
import './lib/array';
import Vuex from 'vuex';
Vue.use(Vuex);
import store from './vuex/index.js';
Vue.config.productionTip = false;

Vue.use(MintUI);
/* eslint-disable no-new */

document.addEventListener('deviceready', function() {
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
    });
    console.log('deviceready');
    // window.navigator.splashscreen.hide()
}, false);