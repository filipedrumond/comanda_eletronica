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
            DB_LOG: "http://localhost:8020/",
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
        },
        handlerStatusPrato: function (value) {
            switch (value) {
                case 1:
                    return "fa fa-usd";
                case 2:
                    return "fa fa-hourglass-half";
                case 3:
                    return "fa fa-check";
                case 4:
                    return "fa fa-ticket";
                default:
                    return "fa fa-usd";
            }
        },
        handlerStatusPratoStr: function (value) {
            switch (value) {
                case 1:
                    return "Aguardando Pagamento";
                case 2:
                    return "Em Preparo";
                case 3:
                    return "Pronto";
                case 4:
                    return "Finalizado";
                default:
                    return "Aguardando Pagamento";
            }
        },
        handlerStatusPedidotr: function (value) {
            switch (value) {
                case 1:
                    return "Aguardando Pagamento";
                case 2:
                    return "Em Preparo";
                case 3:
                    return "Pronto";
                case 4:
                    return "Finalizado";
                default:
                    return "Aguardando Pagamento";
            }
        },
        handlerStatusPagamentoStr: function (value) {
            switch (value) {
                case 1:
                    return "Aguardando Pagamento";
                case 2:
                    return "Pago com cartão";
                case 3:
                    return "Pago no caixa";
                default:
                    return "Aguardando Pagamento";
            }
        },
        handlerStatusIngredienteStr: function (value) {
            switch (value) {
                case 1:
                    return "Disponível/Checkado";
                case 2:
                    return "Disponível/NaoCheckado";
                case 3:
                    return "Inpisponivel";
                default:
                    return "Disponível/Checkado";
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
        },
        /**
         * 
         * @param {boolean} system Se foi o Sistema que gerou esse log
         * @param {string} action Acao Executa Pelo Usuario
         */
        systemLog: function (system, action) {
            let url = `${this.DB_LOG}log`;


            let hoje = new Date();
            let data = `${hoje.getDate()} - ${hoje.getMonth() +
                1} - ${hoje.getFullYear()}`;
            let hora = `${hoje.getHours()}:${hoje.getMinutes()}`;
            let fuso = hoje
                .toString()
                .match(/\((.*)\)/)
                .pop();
            let usuario = "System";
            if (!system) {
                usuario = `Usuario->${this.$session.get(this.USERNAME)}`;
                let isAdmin = this.$session.has(this.ADMINDATA);
                if (isAdmin) {
                    let adminData = this.$session.get(this.ADMINDATA);
                    usuario = `Admin->${adminData.id} Nome->${adminData.usuario}`
                }
                usuario += `${this.$session.get(this.IDSESSIONNAME)}`;
            }
            let body = {
                usuario: usuario,
                acontecimento: action,
                data: data,
                hora: hora,
                fusoHorario: fuso
            };
            this.$http.post(url, body).then(
                response => {
                    console.log("salvo Log");
                },
                response => {
                    console.log(response);

                    console.log("erro ao fazer Log");
                }
            );

        },
    }
});
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
