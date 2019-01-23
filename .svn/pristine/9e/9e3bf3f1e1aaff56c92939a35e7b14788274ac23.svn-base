
import http from '../lib/httpServer';
export const api_test = function(){
  return http("get|test");
};
//拣货单任务
export const api_picking_process = function(data){
  return http("get|picking-process",data);
};

//分区列表
export const api_warehouse_area = function(data){
  return http("get|warehouse-area/lists",Object.assign({sort_operator:1},data));
};

//拣货单任务详情
export const url_picking_process_details = "get|picking-process/:id/details";
export const api_picking_process_details = function(id,data) {
    return http(Url2(url_picking_process_details, {id: id}), data);
};
//绑定周装箱
export const url_picking_process_bind = "post|picking-process/:id/bind";
export const api_picking_process_bind = function(id,data) {
    return http(Url2(url_picking_process_bind, {id: id}), data);
};
//拣货单商品下架
export const url_picking_process_off = "post|picking-process/:id/off";
export const api_picking_process_off = function(id,data) {
    return http(Url2(url_picking_process_off, {id: id}), data);
};
//导航商品下架
export const url_picking_process_off_shelve = "post|picking-process/off-shelve";
export const api_picking_process_off_shelve = function(data) {
    return http(url_picking_process_off_shelve, data);
};
//完成拣货
export const url_picking_process_complete = "post|picking-process/:id/complete";
export const api_picking_process_complete = function(id,data) {
    return http(Url2(url_picking_process_complete, {id: id}), data);
};
//商品移库接口
export const url_goods_shift = "post|warehouse-cargo-goods/shift";
export const api_goods_shift = function(data) {
    return http(url_goods_shift,data);
};
