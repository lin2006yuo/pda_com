module.exports = {
    namespaced:true,
    state:{
        info:{}
    },
    mutations:{
        set_info(state, info){
            state.info = info;
        }
    },
    actions:{
        set_info({commit}, info){
            console.log("set_info",info);
            commit('set_info', info);
        }
    },
    getters:{
        info(state){
            return state.info;
        },
        userid(state){
            return state.info.user_id;
        }
    }
};
