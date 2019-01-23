window.setCache = function(key, value){
    localStorage.setItem(`cache:${key}`, JSON.stringify(value));
};

window.getCache = function(key, def){
    let cache = localStorage.getItem(`cache:${key}`);
    if(cache&&cache!=='undefined'){
        return JSON.parse(cache);
    }else{
        return def;
    }
};

window.delCache = function (key) {
    localStorage.removeItem(`cache:${key}`);
};