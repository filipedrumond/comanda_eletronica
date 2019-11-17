import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import Sair from '../components/Sair'
import Cardapio from '../components/Cardapio'
import Pedido from '../components/Pedido'

import AdminLogin from '../components/admin/Login'
import AdminHome from '../components/admin/Home'
import AdminPedido from '../components/admin/Pedido'


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
            path: '/sair',
            name: 'sair',
            component: Sair,
            // meta: { mesa: true }
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
            component: Pedido,
            meta: { title: "Pedido" }
        },
        {
            path: '/comanda',
            name: 'comanda',
            component: Cardapio,
            meta: { title: "Comanda" }
        },
        {
            path: '/admin/login',
            name: 'Login',
            component: AdminLogin,
        },
        {
            path: '/admin/home',
            name: 'AdminHome',
            component: AdminHome,
        },
        {
            path: '/admin/pedido',
            name: 'AdminPedido',
            component: AdminPedido,
        },

    ],
});
router.beforeEach((to, from, next) => {
    var mesaRequired = to.matched.some((route) => route.meta.mesa);
    var hasMesa = Vue.prototype.$session.exists("idMesa");
    var hasSession = Vue.prototype.$session.exists(Vue.prototype.IDSESSIONNAME);

    var isAdmin = Vue.prototype.$session.has(Vue.prototype.ADMINDATA);

    $("body").removeClass("admin");
    if (isAdmin) {
        $("body").addClass("admin");
    }
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
window.$VUEROUTER = router;
export default router;