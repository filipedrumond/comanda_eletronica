import Vue from 'vue'
import Router from 'vue-router'
import Home from './vue/Home.vue'
import Login from './vue/Login.vue'
import NotFound from './vue/error/Notfound.vue'

Vue.use(Router);
const router = new Router({
    linkActiveClass: 'link-active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { title: "Home" },
            alias: ['/home'],
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: { title: "Acesso" },
            alias: ['/entrar', '/acesso'],
        },
        {
            path: '**',
            name: '404',
            alias: '/404',
            component: NotFound
        }
    ],
});
router.beforeEach((to, from, next) => {
    if (!to) next("/404");

    document.title = (to.meta.title || "") + " qr comanda"
    next();
    return;
})
export default router;