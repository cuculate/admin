window.Vue = require('vue');


import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
require('./assets/css/app.scss');

Vue.use(VueRouter);

import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';

Vue.filter('numFormat', numFormat(numeral));

import VueAxios from 'vue-axios';
import axios from 'axios';
import Snotify from 'vue-snotify';
import "vue-snotify/styles/material.css";

window.toastr = require('toastr')
Vue.use(Snotify)
Vue.use(VueAxios, axios);

import Vuelidate from 'vuelidate';

Vue.use(Vuelidate)

import routes from "./router/routes";

const router = new VueRouter({mode: 'history', routes});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if ( requiresAuth && ! store.getters.isLoggedIn) {
        next('/login');
    } else if (to.path === '/login' && store.getters.isLoggedIn) {
        next('/');
    } else {
        next();
    }
})

axios.interceptors.response.use(null, (error) => {
    if(error.response.status === 401) {
        store.dispatch('logout');
        router.push('/login');
    }

    return Promise.reject(error);
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/dist/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/dist/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/dist/drivers/router/vue-router.2.x.js'),
});


import Vuex from 'vuex';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Vuex);