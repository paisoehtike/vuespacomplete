import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
var VueCookie = require('vue-cookie');
const axios = require('axios');

Vue.use(VueCookie);
Vue.use(VueRouter);
Vue.mixin({
    created() {
        if (this.$cookie.get('token') !== null) {
            axios.defaults.headers.common = {
                'Authorization': 'Bearer ' + this.$cookie.get('token')
            }
        }
    },
    data: function() {
        return {
          get base_url() {
            return "https://5bb-lsp-dev.mm-digital-solutions.com/api/";
          }
        }
    }
});

Vue.filter('format-date', function (value) {
    let cuttedValue = value.slice(0, 10);
    return cuttedValue.replace(/-/gi, '/');
});

Vue.filter('format-date-with-time', function (value) {
    let cuttedValue = value.slice(0, 10);
    return cuttedValue.replace(/-/gi, '/') + ' | ' + value.slice(12, 16)
});

Vue.filter('capitalize', function (value) {
    if (value == 'on_call') return value.charAt(0).toUpperCase() + value.charAt(1) + ' ' + value.charAt(3).toUpperCase() + value.slice(4)
    if (typeof(value) !== 'string') return ''
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('passOrFail', function (value) {
    if (value == 'true') return 'Pass'
    return 'Fail'
});

const app = new Vue({
    el: '#app',
    router: new VueRouter(routes)
})