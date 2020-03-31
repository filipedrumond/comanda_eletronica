import Vue from 'vue'
import router from './router';
import App from './App';
import VueResource from 'vue-resource';
require("./helpers/bodyClass")($);

Vue.use(VueResource);
new Vue({
    el: '#vue-app',
    router,
    components: { App },
    template: '<App/>',
});