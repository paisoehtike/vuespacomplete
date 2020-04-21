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

const app = new Vue({
    el: '#app',
    router: new VueRouter(routes)
})