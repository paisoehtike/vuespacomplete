import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
var VueCookie = require('vue-cookie');

Vue.use(VueCookie);
Vue.use(VueRouter);

Vue.filter('format-date', function (value) {
    let cuttedValue = value.slice(0, 10);
    return cuttedValue.replace(/-/gi, '/');
});

const app = new Vue({
    el: '#app',
    router: new VueRouter(routes)
})