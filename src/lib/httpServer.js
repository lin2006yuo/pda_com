import {http} from './http';
import './cache'
import store from '@/vuex';
import { Toast } from 'mint-ui';
const httpServer = async (request, data = {}, header  = {contentType:'application/x-www-form-urlencoded'})=>{
    store.dispatch('loading',true);
    try {
        var awaitHttp = await http(request, data, header);
        return Promise.resolve(awaitHttp)
    }catch (err){
        return Promise.reject(err)
    }finally {
        store.dispatch('loading',false);
    }
};
export default httpServer;