
import Vue from 'vue';

const plugins = require.context(__dirname+'/plugin', false, /\.js$/);
plugins.keys().forEach(plugin =>{
    plugin = plugins(plugin);
    switch (plugin.constructor.name){
        case 'Function':
            plugin(Vue);
            break;
        case 'Object':
            plugin.default(Vue);
            break;
    }

});

