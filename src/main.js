import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from "./router";

import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'

Vue.use(VueNoty, {
    timeout: 1500,
    progressBar: true,
    layout: 'topRight'
})
Vue.config.productionTip = false

const user = localStorage.getItem('authUser')

new Vue({
    router,
    data: {
        authUser: user ? JSON.parse(user) : {}
    },
    render: h => h(App),
}).$mount('#app')
