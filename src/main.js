import Vue from 'vue'
import VueResource from 'vue-resource';
import VueStyleLoader from 'vue-style-loader'
import VueCookies from 'vue-cookies'
import { SimpleAlerts } from "@filipedp/simple_dialog";
import { SimpleConfirms } from "@filipedp/simple_dialog";
import { SimpleFormAlerts } from "@filipedp/simple_dialog";
import VueSession from 'vue-session'
import router from './routes'
import App from './App'
var $ = require('jquery');
require('bootstrap/js/dist/collapse');
require('jquery-mask-plugin');


window.$ = $;
window.VUE = Vue;

Vue.use(VueSession);
Vue.use(VueResource);
Vue.use(VueStyleLoader);
Vue.use(VueCookies);

Vue.config.productionTip = false;
/* global mixin */
Vue.mixin({
    data: function () {
        return {
            DB_CARDAPIO: "http://localhost:8015/",
            DB_DINAMICO: "http://localhost:8016/",
            DB_STATUS: "http://localhost:8017/",
            DB_PAGAMENTOS: "http://localhost:8018/",
            DB_ADMIN: "http://localhost:8019/",
            IDSESSIONNAME: "idSession",
            ADMINDATA: "dadosAdmin",
            DEFAULTPATH: "#/",
            USERNAME: "nome",

            SimpleAlerts: SimpleAlerts,
            SimpleConfirms: SimpleConfirms,
            SimpleFormAlerts: SimpleFormAlerts,
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
        endSession: function () {
            if (this.$session.exists()) {
                this.$session.destroy();
            }
            this.$router.push({ path: "home" });
        }
    }
});
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
