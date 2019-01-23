import Vue from 'vue';
import Loading from '../components/loading';
const LoadingClass = Vue.extend(Loading);
export default (Vue)=>{

    Vue.mixin({
        beforeCreate(){
            this.$loading = () =>{
                if(!this.$root.loading){
                    let loading = new LoadingClass();
                    loading.$mount('');
                    document.body.appendChild(loading.$el);
                    this.$root.loading = loading;
                }
                const closeLoading = () =>{
                    console.log(this.$root);
                    if(this.$root.loading){
                        document.body.removeChild(this.$root.loading.$el);
                        this.$root.loading = null;
                    }
                };
                setTimeout(closeLoading, 700);
                return {
                    close(ms){
                        setTimeout(() =>{
                            closeLoading();
                        }, ms)
                    }
                }
            }
        }
    })
}