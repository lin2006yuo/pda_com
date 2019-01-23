import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

let routes = [];

const routers = require.context(__dirname + "/router", false, /\.js$/);

routers.keys().forEach(router => {
    routes = [...routes, ...routers(router)];
});

console.log(routes);
export default new Router({
    mode: 'history',
    routes
})
