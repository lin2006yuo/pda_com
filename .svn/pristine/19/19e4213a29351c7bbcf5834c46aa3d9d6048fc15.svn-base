
import http from '../lib/httpServer';
export const api_test = function(){
    return http("get|test");
};
//拣货单任务
export const api_picking_manage = function(is_pda){
    return http("get|pickings-manage",is_pda);
};

//拣货单商品信息
export const url_pickings_manage_detail = "get|pickings-manage/:id/detail";
export const api_pickings_manage_detail = function(id,data) {
    return http(Url2(url_pickings_manage_detail, {id: id}), data);
};

//集体下架拣货单
export const url_pickings_manage_complete = "post|pickings-manage/:id/complete";
export const api_pickings_manage_complete = function(id,data) {
    return http(Url2(url_pickings_manage_complete, {id: id}), data);
};

//单个下架拣货单
export const url_pickings_manage_off = "post|pickings-manage/:id/off";
export const api_pickings_manage_off = function(id,data) {
    return http(Url2(url_pickings_manage_off, {id: id}), data);
};
