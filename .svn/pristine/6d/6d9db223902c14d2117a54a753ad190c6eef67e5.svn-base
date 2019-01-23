
import http from '../lib/httpServer';

//取移库上架列表信息
export const api_warehouse_cargo_shifts = function(data){
    return http("get|warehouse-cargo-shift/list",data);
};

//查看移库上架单
export const url_warehouse_cargo_shift_detail = "get|warehouse-cargo-shift/detail";
export const api_warehouse_cargo_shift_detail = function(data) {
    return http(url_warehouse_cargo_shift_detail, data);
};

//移库上架
export const url_warehouse_cargo_shift_shelves = "put|warehouse-cargo-shift/shelves";
export const api_warehouse_cargo_shift_shelves = function(data) {
    return http(url_warehouse_cargo_shift_shelves, data);
};
