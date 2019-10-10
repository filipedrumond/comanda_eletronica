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
    // linkActiveClass: '-active',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
            alias: '/',
            // meta: { auth: true }
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
            name: 'Mesa',
            component: Cardapio,
            meta: { title: "Mesa" }
        }
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: Login,
        // },
        // {
        //     path: '/logout',
        //     name: 'logout',
        //     alias: ['/Logout', '/exit', '/Exit'],
        //     component: Logout,
        // },
        // {
        //     path: '/signin',
        //     name: 'Cadastrar',
        //     alias: ['/SignIn', '/cadastrar', '/mecadastrar'],
        //     component: SignIn
        // },
        // {
        //     path: '/cad_menu',
        //     name: 'Cadastro Menu',
        //     alias: ['/cadastro_menu', '/CadMenu', "/CadastroMenu"],
        //     component: CadMenu
        // },
    ],
});
router.beforeEach((to, from, next) => {
    var authRequired = to.matched.some((route) => route.meta.auth);
    // var isLogged = Vue.prototype.$session.exists("dadosUsuario");
    // console.log("AUTH >>" + authRequired);
    // console.log("ISLOGGED >>" + isLogged);
    // if (authRequired && !isLogged) {
    //     // Vue.prototype.$route.push({ path: "login" });
    //     next("/login");
    //     return;
    // }
    // if (to.path === "/login" && isLogged) {
    //     next("/");
    //     return;
    // }
    document.title = to.meta.title || "Easy Kitchen"
    next();
    return;
})
export default router;