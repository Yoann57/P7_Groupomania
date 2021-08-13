import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios  from 'axios';

Vue.config.productionTip = false

axios.defaults.withCredentials = true;
axios.defaults.baseUrl = 'http://localhost:3000';

new Vue({
    router,
    store,
    beforeCreate(){
        this.$store.commit('initializeAuth');
    },
    render: h => h(App)
}).$mounth('#app')
