import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

const user = localStorage.getItem('authUser')

new Vue({
    router,
    data: {
        authUser: user ? {user: JSON.parse(user)} : {}
    },
    render: h => h(App),
}).$mount('#app')
