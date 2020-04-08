import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
var VueCookie = require('vue-cookie');
const axios = require('axios');

Vue.use(VueCookie);
Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router: new VueRouter(routes),
    created() {
        if (this.$cookie.get('token') !== null) {
            axios.defaults.headers.common = {
                'Authorization': 'Bearer ' + this.$cookie.get('token')
            }
        }
    }
})