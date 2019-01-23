/**
 * Created by Administrator on 2017/12/23.
 */
module.exports = {
    namespaced:true,
    state:{
        info:{},
        lastChangeAreaId:getCache('lastChangeAreaId', ''),
        returnShelvesId:getCache('returnShelvesId', ''),
        shelfId:getCache('shelfId', ''),
        returnOn:getCache('returnOn', ''),
    },
    mutations:{
        set_info(state, info){
            state.info = info;
        },
        lastChangeAreaId(state, lastChangeAreaId){
            state.lastChangeAreaId = lastChangeAreaId;
            setCache('lastChangeAreaId', lastChangeAreaId);
        },
        returnShelvesId(state, returnShelvesId){
            state.returnShelvesId = returnShelvesId;
            setCache('returnShelvesId', returnShelvesId);
        },
        shelfId(state, shelfId){
            state.shelfId = shelfId;
            setCache('shelfId', shelfId);
        },
        returnOn(state, returnOn){
            state.returnOn = returnOn;
            setCache('returnOn', returnOn);
        },
    },
    actions:{
        set_info({commit}, info){
            commit('set_info', info);
        },
        lastChangeAreaId({commit}, lastChangeAreaId){
            commit('lastChangeAreaId', lastChangeAreaId);
        },
        returnShelvesId({commit}, returnShelvesId){
            commit('returnShelvesId', returnShelvesId);
        },
        shelfId({commit}, shelfId){
            commit('shelfId', shelfId);
        },
        returnOn({commit}, returnOn){
            commit('returnOn', returnOn);
        },
    },
    getters:{
        info(state){
            console.log(state.info);
            return state.info;
        },
        lastChangeAreaId(state){
            return state.lastChangeAreaId;
        },
        returnShelvesId(state){
            return state.returnShelvesId;
        },
        shelfId(state){
            return state.shelfId;
        },
        returnOn(state){
            return state.returnOn;
        },
    }
};
