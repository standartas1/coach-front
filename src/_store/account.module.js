import VueJwtDecode from 'vue-jwt-decode';
import { userService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
if (user !== null) {
    const decoded = VueJwtDecode.decode(user.token);
    user._id = decoded.userId;
    user.name = decoded.name;
    user.role = decoded.role;
}
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: {} };

const actions = {
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });

        userService.login(email, password).then(
            user => {
                const decoded = VueJwtDecode.decode(user.token);
                commit('loginSuccess', user);
                if (decoded.role === 'Administrator') {
                    router.push('/admin');
                } else if (decoded.role === 'User') {
                    router.push('/user');
                }
            },
            error => {
                commit('loginFailure', error);
                dispatch('alert/error', error, { root: true });
            }
        );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user).then(
            user => {
                commit('registerSuccess', user);
                router.push('/login');
            },
            error => {
                dispatch('alert/error', error, { root: true });
            }
        );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };

        const decoded = VueJwtDecode.decode(user.token);
        user._id = decoded.userId;
        user.name = decoded.name;
        user.role = decoded.role;
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = { registered: true };
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
