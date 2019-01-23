/**
 * Created by Administrator on 2017/11/30.
 */
import http from '../lib/httpServer';
//获取待上架列表信息---拣货单
export const url_putaway_order = "get|putaway-order";
export const putaway_order = function(data) {
    return http(url_putaway_order, data);
};
//获取待上架列表信息---商品直接上架
export const url_putaway_waiting_goods_list = "get|putaway-waiting-goods";
export const api_putaway_waiting_goods_list = function(data) {
    return http(url_putaway_waiting_goods_list, data);
};
//新添上架单
export const url_putaway_order_create = "post|putaway-order/create";
export const putaway_order_create = function(data) {
    return http(url_putaway_order_create, data);
};
//上架单信息
export const url_putaway_order_read = "get|putaway-order/:id";
export const putaway_order_read = function(id) {
    return http(Url2(url_putaway_order_read,{id:id}));
};
//强制完成上架单
export const url_putaway_order_status = "get|putaway-order/status/:id";
export const putaway_order_status = function(id) {
    return http(Url2(url_putaway_order_status,{id:id}));
};
//上架单上到仓库货位
export const url_putaway_order_save = "post|putaway-order/save";
export const putaway_order_save = function(data) {
    return http(url_putaway_order_save,data);
};
//重返上架--列表
export const url_return_shelves_list = "get|return-shelves/index-group";
export const return_shelves_list = function(data) {
    return http(url_return_shelves_list,data);
};
//重返上架
export const url_return_shelves_save = "post|return-shelves/save";
export const return_shelves_save = function(data) {
    return http(url_return_shelves_save,data);
};
//重返上架单列表
export const url_return_shelves = "get|return-shelves";
export const return_shelves = function(data) {
    return http(url_return_shelves,data);
};
//退货上架单列表
export const url_return_reback_shelves_order = "get|reback-shelves-order";
export const return_reback_shelves_order = function(data) {
    return http(url_return_reback_shelves_order,data);
};
//重返上架单条目信息
export const url_return_shelves_read = "get|return-shelves/:id";
export const api_return_shelves_read = function(id) {
    return http(Url2(url_return_shelves_read,{id:id}));
};
//退货上架单条目信息
export const url_reback_shelves_read = "get|reback-shelves-order/:id";
export const api_reback_shelves_read = function(id) {
    return http(Url2(url_reback_shelves_read,{id:id}));
};
//重返上架单-确认提交
export const url_return_shelves_put = "put|return-shelves/:id";
export const api_return_shelves_put = function(id,data) {
    return http(Url2(url_return_shelves_put,{id:id}),data);
};
//退货上架单-确认提交
export const url_reback_shelves_put = "put|reback-shelves-order/:id";
export const api_reback_shelves_put = function(id,data) {
    return http(Url2(url_reback_shelves_put,{id:id}),data);
};
//根据集包单号交接
export const url_package_collection = "post|package-collection/:code/handover";
export const api_package_collection = function(code) {
    return http(Url2(url_package_collection, {code: code}));
};
//根据箱唛查询待上架单条目信息
export const url_putaway_look_goods = "get|putaway-waiting-goods/goods/:id";
export const api_putaway_look_goods = function(id,data) {
    return http(Url2(url_putaway_look_goods, {id: id}),data);
};
//不经过上架单直接上架
export const url_putaway_waiting_goods = "post|putaway-waiting-goods/update";
export const api_putaway_waiting_goods = function(data) {
    return http(url_putaway_waiting_goods,data);
};
//退货待上架列表
export const url_reback_shelves = "get|reback-shelves";
export const api_reback_shelves = function(data){
    return http(url_reback_shelves,data);
};
//退货待上架保存
export const url_reback_shelves_batch = "post|reback-shelves/batch/save";
export const api_reback_shelves_batch = function(data){
    return http(url_reback_shelves_batch,data);
};
//货位+SKU直接上架
export const url_reback_cargo_sku = "post|putaway-waiting-goods/cargoSkus";
export const api_reback_cargo_sku = function(data){
    return http(url_reback_cargo_sku,data);
};
//SKU上架查询
export const putaway_waiting_goods_cargos = "get|putaway-waiting-goods/cargos/:id";
export const api_putaway_waiting_goods_cargos = function(id,data) {
    return http(Url2(putaway_waiting_goods_cargos,{id: id}),data);
};
//SKU商品信息
export const url_goods_sku_info = "get|goods-sku/info";
export const api_goods_sku_info = function(data) {
    return http(url_goods_sku_info,data);
};
//根据集包单号交接
export const url_package_transit = "post|package-collection/:code/out";
export const api_package_transit = function(code) {
    return http(Url2(url_package_transit, {code: code}));
};

