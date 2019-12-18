import Vue from 'vue';
import Router from 'vue-router';
import VueJwtDecode from 'vue-jwt-decode';
import { Role } from './role';
import { userService } from '../_services/user.service';

import HomePage from '../components/home/HomePage';
import LoginPage from '../components/login/LoginPage';
import RegisterPage from '../components/register/RegisterPage';
import AdminPage from '../components/admin/AdminPage';
import UserPage from '../components/user/UserPage';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage },
        {
            path: '/admin',
            component: AdminPage,
            meta: { authorize: [Role.Administrator] }
        },
        {
            path: '/user',
            component: UserPage,
            meta: { authorize: [Role.User] }
        },
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },

        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    const { authorize } = to.meta;
    const currentUser = userService.currentUserValue;

    if (authorize) {
        if (currentUser !== null) {
            const decoded = VueJwtDecode.decode(currentUser.token);
            if (!decoded.role || decoded.exp < Date.now() / 1000) {
                // not logged in so redirect to login page with the return url
                return next({ path: '/login', query: { returnUrl: to.path } });
            }

            // check if route is restricted by role
            if (authorize.length || decoded.exp < Date.now() / 1000) {
                if (!authorize.includes(decoded.role)) {
                    // role not authorised so redirect to home page
                    if (decoded.role === 'User') {
                        return next({ path: '/user' });
                    } else if (decoded.role === 'Administrator') {
                        return next({ path: '/admin' });
                    }
                    return next({ path: '/' });
                }
            }
        } else {
            return next({ path: '/login', query: { returnUrl: to.path } });
        }
    }

    if (to.path === '/' && currentUser !== null) {
        const decoded = VueJwtDecode.decode(currentUser.token);
        if (decoded.role === 'User') {
            return next({ path: '/user' });
        } else if (decoded.role === 'Administrator') {
            return next({ path: '/admin' });
        }
    }

    next();
});
