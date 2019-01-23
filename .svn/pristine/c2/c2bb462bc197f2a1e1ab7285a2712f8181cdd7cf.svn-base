/**
 * Created by Administrator on 2017/11/29.
 */
import http from '../lib/httpServer';
//周转箱集结
export const url_turnover_box_mass = "put|turnover-box/mass";
export const api_turnover_box_mass = function(data) {
    return http(url_turnover_box_mass,data);
};
//集结区列表管理
export const url_mass_zone_lists = "get|mass-zone/lists";
export const api_mass_zone_lists = function(data) {
    return http(url_mass_zone_lists,data);
};
//获取集结区信息
export const url_mass_zone = "get|mass-zone/:id";
export const api_mass_zone = function(id) {
    return http(Url2(url_mass_zone, {id: id}));
};
