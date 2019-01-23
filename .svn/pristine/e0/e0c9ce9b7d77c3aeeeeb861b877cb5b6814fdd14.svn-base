/**
 * Created by RondaFul on 2017/10/17.
 */

window.clone=function (obj) {
    if(null === obj){
        return obj;
    }
    if(obj instanceof Date){
        return new Date(obj.getTime());
    }
    if(obj instanceof Array){
        return obj.map(row => clone(row));
    }
    if(obj instanceof Object){
        let ret = {};
        Object.keys(obj).forEach(key =>{
            ret[key] = clone(obj[key]);
        });
        return ret;
    }
    return obj;
};
window.objlength=function (obj) {
    let length=0;
    for (let i in obj){
        if(obj.hasOwnProperty(i)){
            length++
        }
    }
    return length;
};

