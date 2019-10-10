import Vue from 'vue'
import VueResource from 'vue-resource';
import VueStyleLoader from 'vue-style-loader'
import { SimpleAlerts } from "@filipedp/simple_dialog";
import { SimpleConfirms } from "@filipedp/simple_dialog";
import VueSession from 'vue-session'
import router from './routes'
import App from './App'
var $ = require('jquery');
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
    methods: {
        setTitle: function (title) {
            document.title = title;
        },
        logout: function () {
            this.$session.destroy();
            $("#app").removeClass();
            this.$router.push({ path: "home" });
        },
        login: function (usuario, senha) {
            let url = `${this.db_url}usuarios?email=${usuario}&senha=${senha}`;
            this.$http.get(url).then(
                response => {
                    if (response.body.length !== 1) {
                        this.SimpleAlerts.error({
                            title: "Erro ao logar",
                            text: "Usuario ou senha inválidos"
                        });
                        return;
                    }
                    this.$session.set("dadosUsuario", response.body[0]);
                    if (response.body[0].tema) {
                        $("#app").addClass(response.body[0].tema);
                    }
                    this.$router.push({ path: "/" });
                },
                response => {
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
        }
    }
});
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
