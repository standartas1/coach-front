import { userService } from '../_services';

const state = {
    all: {},
    user: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        userService.getAll().then(
            users => commit('getAllSuccess', users),
            error => commit('getAllFailure', error)
        );
    },

    getById({ commit }, id) {
        commit('getByIdRequest');

        userService.getById(id).then(
            user => {
                commit('getByIdSuccess', user);
            },
            error => commit('getByIdFailure', error)
        );
    },

    update({ commit }, user) {
        commit('updateRequest', user._id);
        userService.update(user).then(
            user => commit('updateSuccess', user),
            error =>
                commit('deleteFailure', {
                    id: user._id,
                    error: error.toString()
                })
        );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        userService.delete(id).then(
            user => commit('deleteSuccess', id),
            error => commit('deleteFailure', { id, error: error.toString() })
        );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    getByIdRequest(state, id) {
        // add 'loading:true' property to user by id
        state.all.items = state.all.items.map(user =>
            user._id === id ? { ...user, loading: true } : user
        );
    },
    getByIdSuccess(state, user) {
        state.user = user.user;
    },
    getByIdFailure(state, error) {
        state.user = { error };
    },
    updateRequest(state, id) {
        // add 'updating:true' property to user by id
        state.all.items = state.all.items.map(user =>
            user._id === id ? { ...user, updating: true } : user
        );
    },
    updateSuccess(state, editUser) {
        state.all.items = state.all.items.map(user =>
            user._id === editUser._id ? { ...user, ...editUser } : user
        );
    },
    updateFailure(state, error) {
        // remove 'updating:true' property and add 'deleteError:[error]' property to user
        state.all.items = state.all.items.map(user => {
            if (user._id === id) {
                // make copy of user without 'updating:true' property
                const { updating, ...userCopy } = user;
                // return copy of user with 'updateError:[error]' property
                return { ...userCopy, updateError: error };
            }
            return user;
        });
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user._id === id ? { ...user, deleting: true } : user
        );
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user._id !== id);
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        state.all.items = state.items.map(user => {
            if (user._id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        });
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};
