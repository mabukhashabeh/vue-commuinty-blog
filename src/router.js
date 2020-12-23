import Vue from 'vue'
import Router from 'vue-router'

import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/signup',
            component: Signup
        },
        {
            path: '/home',
            component: Home
        }
    ]
})

export default router;