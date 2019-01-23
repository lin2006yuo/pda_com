/**
 * Created by Administrator on 2017/12/12.
 */
import http from '../lib/httpServer';
export const url_warehouse_goods_check = "get|warehouse-goods-check";
export const api_warehouse_goods_check = function(data){
    return http(url_warehouse_goods_check,data);
};

export const url_warehouse_goods_list = "get|warehouse-goods-check/:id";
export const api_warehouse_goods_list = function(id){
    return http(Url2(url_warehouse_goods_list,{id:id}));
};
//核查扫描的数据是否存在
export const url_warehouse_goods_exists = "post|warehouse-goods-check/exists";
export const api_warehouse_goods_exists = function(data){
    return http(url_warehouse_goods_exists,data);
};
//盘点单盘点
export const url_warehouse_goods_finish = "post|warehouse-goods-check/save";
export const api_warehouse_goods_finish = function(data){
    return http(url_warehouse_goods_finish,data);
};
//完成单盘点
export const url_warehouse_goods_check_finish = "get|warehouse-goods-check/finish/:id";
export const api_warehouse_goods_check_finish = function(id){
    return http(Url2(url_warehouse_goods_check_finish,{id:id}));
};
//条码信息查询
export const url_barcode_datas = "post|barcode/datas";
export const api_barcode_datas = function(data){
    return http(url_barcode_datas,data);
};
