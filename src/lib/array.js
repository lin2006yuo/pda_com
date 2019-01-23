String.prototype.trim=function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

Array.prototype.seq = function(b, e){
    let ret = [];
    for(b; b < e; b++){
        ret.push(b);
    }
    return ret;
};