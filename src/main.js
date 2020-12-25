import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'

import VueDisqus from 'vue-disqus'

import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(VueDisqus, {
    shortname: 'vue-community-blog'
})

Vue.use(wysiwyg, {});

Vue.use(VueNoty, {
    timeout: 1500,
    progressBar: true,
    layout: 'bottomRight'
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
