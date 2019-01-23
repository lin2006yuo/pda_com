
function  url_refresh(router){
    let routerPath=(router&&router.path)?router.path:'/dashboard';
    let params = router.query ?
        typeof router.query==='object'?(`?${obj2url(router.query)}`)
            :(`?${router.query}`)
        : "";
    routerPath = routerPath+params;
    window.history.pushState(routerPath,routerPath,routerPath);
}
export default function(Vue){
    const plugin = {
        install(Vue, option){
            Vue.mixin({
                beforeCreate(){
                    this.$reqKey = (key, val) =>{
                        if(val === undefined){
                            return this.$store.getters['request-api-state/getReqKey'](key);
                        }else{
                            this.$store.dispatch('request-api-state/setReqKey', {key, val});
                        }
                    };
                    this.$http = (api, ...datas) =>{
                        let call = null;
                        switch (typeof api){
                            case 'function':
                                call= api.call(this,...datas);
                                console.log("call LLLL",call);
                                break;
                            case 'object':
                                call = api;
                                break;
                            default:
                                console.error(api);
                        }
                        if(!call){
                            console.error(api);
                        };
                        return call.catch((code, status)=>{
                            if(code.message==='请先登录...'){
                                this.$router.replace('/');
                            }
                            if(401 === status || code.message === 'Error: Token is not valid'){//登录码已失效了.
                                this.$router.replace('/');
                                quit();
                                code.message = "请登录";
                                return Promise.reject(code);
                            }else{
                                return Promise.reject(code);
                            }
                        });
                    };
                    this.$open=(route)=>{
                        this.$store.dispatch('menu-nav/nav_open', route);
                    }
                    this.$openNew=(route)=>{
                        Object.assign(route,{close:true});
                        let find=this.$store.state['menu-nav'].navs.find(row=>row.id===route.id);
                        !find&&this.$store.dispatch("menu-nav/add_nav",route);
                        this.$store.dispatch("menu-nav/route",route.id);
                        url_refresh(route)
                    }
                }
            })
        }
    };
    Vue.use(plugin);
};
