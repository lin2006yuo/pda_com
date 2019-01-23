
import http from '../lib/httpServer';
export const api_test = function(){
    return http("get|test");
};

//取移库下架列表信息
export const api_warehouse_cargo_shifts = function(data){
    return http("get|warehouse-cargo-shift/list",data);
};

//查看移库下架单
export const url_warehouse_cargo_shift_detail = "get|warehouse-cargo-shift/detail";
export const api_warehouse_cargo_shift_detail = function(data) {
    return http(url_warehouse_cargo_shift_detail, data);
};

//移库下架
export const url_warehouse_cargo_shift_unshelves = "put|warehouse-cargo-shift/unshelves";
export const api_warehouse_cargo_shift_unshelves = function(data) {
    return http(url_warehouse_cargo_shift_unshelves, data);
};