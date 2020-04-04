import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
var VueCookie = require('vue-cookie');

Vue.use(VueCookie);
Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router: new VueRouter(routes)
})