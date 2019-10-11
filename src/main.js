import Vue from 'vue'
import VueResource from 'vue-resource';
import VueStyleLoader from 'vue-style-loader'
import { SimpleAlerts } from "@filipedp/simple_dialog";
import { SimpleConfirms } from "@filipedp/simple_dialog";
import VueSession from 'vue-session'
import router from './routes'
import App from './App'
var $ = require('jquery');
require('bootstrap/js/dist/collapse');

window.$ = $;

Vue.use(VueSession);
Vue.use(VueResource);
Vue.use(VueStyleLoader);

Vue.config.productionTip = false;
/* global mixin */
Vue.mixin({
    data: function () {
        return {
            db_url: "http://localhost:8015/",
            defaultPath: "#/",
            SimpleAlerts: SimpleAlerts,
            SimpleConfirms: SimpleConfirms,
        }
    },
    filters: {
        toReal: function (value) {
            return "R$ " + value.toFixed(2);
        },
        handleStatusItem: function (value) {
            switch (value) {
                case 1:
                    return "fa fa-check";
                case 2:
                    return "fa fa-clock-o";
                case 3:
                    return "fa fa-times";
                default:
                    return "fa fa-times";
            }
        },
        handleStatusMesa: function (value) {
            switch (value) {
                case 1:
                    return "fa fa-check";
                case 2:
                    return "fa fa-clock-o";
                case 3:
                    return "fa fa-times";
                default:
                    return "fa fa-times";
            }
        }
    },
    methods: {
        setTitle: function (title) {
            document.title = title;
        },
    }
});
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
