import ThemeTest from '../components/helpers/ThemeTest'
import Base from '../components/helpers/Base'

import Vue from 'vue'
import Router from 'vue-router'

// import Login from '../components/Login'
// import Logout from '../components/Logout'
import Home from '../components/Home'
// import SignIn from '../components/SignIn'
// import CadMenu from '../components/CadMenu'
import Cardapio from '../components/Cardapio'
Vue.use(Router);
const router = new Router({
    linkActiveClass: 'link-active',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
            alias: '/',
            // meta: { mesa: true }
        },
        {
            path: '/theme-test',
            name: 'theme-test',
            alias: ['/themeTest', '/themetest', "/theme"],
            component: ThemeTest,
        },

        {
            path: '/base',
            name: 'base',
            component: Base
        },
        {
            path: '/mesa/:idMesa',
            name: 'mesa',
            component: Cardapio,
            meta: { title: "Mesa" }
        },
        {
            path: '/pedido',
            name: 'pedido',
            component: Cardapio,
            meta: { title: "Pedido" }
        },
        {
            path: '/comanda',
            name: 'comanda',
            component: Cardapio,
            meta: { title: "Comanda" }
        },
    ],
});
router.beforeEach((to, from, next) => {
    var mesaRequired = to.matched.some((route) => route.meta.mesa);
    var hasMesa = Vue.prototype.$session.exists("idMesa");
    var hasSession = Vue.prototype.$session.exists("idSession");

    if (mesaRequired && (!hasMesa || !hasSession)) {
        next("/semMesa");
        return;
    }
    if (to.path === "/semMesa" && (hasMesa || hasSession)) {
        next(`/mesa/${Vue.prototype.$session.get("idMesa")}`);
        return;
    }
    document.title = to.meta.title || "Easy Kitchen"
    next();
    return;
})
export default router;