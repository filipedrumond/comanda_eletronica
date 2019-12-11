import Vue from 'vue'
import VueResource from 'vue-resource';
import VueStyleLoader from 'vue-style-loader';
import VueCookies from 'vue-cookies';
import VueSession from 'vue-session';
import router from './routes';
import App from './App';

import mixVariables from './mixins/mixVariables';
import mixFilters from './mixins/mixFilters';
import mixMethods from './mixins/mixMethods';

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
Vue.mixin(mixVariables);
Vue.mixin(mixFilters);
Vue.mixin(mixMethods);

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});