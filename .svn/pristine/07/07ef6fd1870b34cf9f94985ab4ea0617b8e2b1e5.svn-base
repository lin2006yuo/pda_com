/**
 * Created by Administrator on 2017/12/23.
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = require.context('./modules', false, /([\w]+)\.js/);
const storeModules = {};
modules.keys().forEach(key => {
    const name = /([\w-]+)\.js$/i.exec(key);
    const mod = modules(key);
    storeModules[name[1]] = mod.default || mod;
});

const store = new Vuex.Store({
    modules: storeModules,
    state:{
        loading:false,
    },
    mutations:{
        loading(state, status){
            state.loading = status;
        },
    },
    actions:{
        loading({commit}, status){
            commit('loading', status);
        },
    },
    getters:{
        loading(state){
            return state.loading;
        },
    }
});

export default store;
