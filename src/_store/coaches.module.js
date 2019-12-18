import { coachesService, reviewsService } from '../_services';

const state = {
    coaches: {},
    status: {},
    review: {}
};

const actions = {
    getCoaches({ commit }) {
        commit('getCoachesRequest');

        coachesService.getCoaches().then(
            coaches => commit('getCoachesSuccess', coaches),
            error => commit('getCoachesFailure', error)
        );
    },

    postCoach({ commit }, coach) {
        commit('postCoachRequest');

        coachesService.postCoach(coach).then(
            coach => commit('postCoachSuccess', coach),
            error => commit('postCoachFailure', error)
        );
    },

    updateCoach({ commit }, coach) {
        commit('updateRequest', coach._id);
        coachesService.updateCoach(coach).then(
            coach => commit('updateSuccess', coach),
            error =>
                commit('updateFailure', {
                    id: error._id,
                    error: error.toString()
                })
        );
    },

    deleteCoach({ commit }, id) {
        commit('deleteRequest', id);

        coachesService.deleteCoach(id).then(
            coach => commit('deleteSuccess', id),
            error => commit('deleteFailure', { id, error: error.toString() })
        );
    },

    postReview({ commit }, review) {
        commit('postReviewRequest');

        reviewsService.postReview(review).then(
            review => commit('postReviewSuccess', review),
            error => commit('postReviewFailure', error)
        );
    },

    updateReview({ commit }, { coach, review }) {
        commit('updateReviewRequest', coach, review._id);
        reviewsService.updateReview(review).then(
            review =>
                commit('updateReviewSuccess', {
                    coachId: coach,
                    editReview: review
                }),
            error =>
                commit('updateReviewFailure', {
                    id: error._id,
                    error: error.toString()
                })
        );
    },

    deleteReview({ commit }, { coach, _id }) {
        commit('deleteReviewRequest', coach, _id);

        reviewsService.deleteReview(_id).then(
            review =>
                commit('deleteReviewSuccess', { coachId: coach, _id: _id }),
            error =>
                commit('deleteReviewFailure', {
                    _id,
                    error: error.toString()
                })
        );
    }
};

const mutations = {
    getCoachesRequest(state) {
        state.coaches = { loading: true };
    },
    getCoachesSuccess(state, coaches) {
        state.coaches = coaches;
    },
    getAllFailure(state, error) {
        state.coaches = { error: error };
    },
    postCoachRequest(state) {
        state.status = { adding: true };
    },
    postCoachSuccess(state, coach) {
        state.status = { added: true };
        state.coaches.push(coach);
    },
    postCoachFailure(state) {
        state.status = {};
    },
    updateRequest(state, id) {
        // add 'updating:true' property to coach by id
        state.coaches = state.coaches.map(coach =>
            coach._id === id ? { ...coach, updating: true } : coach
        );
    },
    updateSuccess(state, editCoach) {
        state.coaches = state.coaches.map(coach =>
            coach._id === editCoach._id ? { ...coach, ...editCoach } : coach
        );
    },
    updateFailure(state, error) {
        // remove 'updating:true' property and add 'deleteError:[error]' property to coach
        state.coaches = state.coaches.map(coach => {
            if (coach._id === error._id) {
                // make copy of coach without 'updating:true' property
                const { updating, ...coachCopy } = coach;
                // return copy of coach with 'updateError:[error]' property
                return { ...coachCopy, updateError: error };
            }
            return coach;
        });
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to coach being deleted
        state.coaches = state.coaches.map(coach =>
            coach._id === id ? { ...coach, deleting: true } : coach
        );
    },
    deleteSuccess(state, id) {
        // remove deleted coach from state
        state.coaches = state.coaches.filter(coach => coach._id !== id);
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to coach
        state.coaches = state.coaches.map(coach => {
            if (coach._id === id) {
                // make copy of coach without 'deleting:true' property
                const { deleting, ...coachCopy } = coach;
                // return copy of coach with 'deleteError:[error]' property
                return { ...coachCopy, deleteError: error };
            }
            return user;
        });
    },
    postReviewRequest(state) {
        state.review = { adding: true };
    },
    postReviewSuccess(state, review) {
        state.review = { added: true };
        console.log(state.coaches);
        state.coaches = state.coaches.map(coach => {
            if (coach._id === review.coach) {
                coach.reviews.push(review);
            }
            return coach;
        });
        // console.log(state.coaches);
    },
    postReviewFailure(state) {
        state.review = {};
    },
    updateReviewRequest(state, id) {
        // add 'deleting:true' property to coach being deleted
        // state.coaches = state.coaches.map(coach => (coach._id === id ? { ...coach, deleting: true } : coach));
    },
    updateReviewSuccess(state, { coachId, editReview }) {
        // remove deleted coach from state
        // state.coaches = state.coaches.map(coach => (coach._id === editCoach._id ? { ...coach, ...editCoach } : coach));
        state.coaches = state.coaches.map(coach => {
            if (coach._id === coachId) {
                coach.reviews = coach.reviews.map(review =>
                    review._id === editReview._id
                        ? { ...review, ...editReview }
                        : review
                );
            }
            return coach;
        });
    },
    updateReviewFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to coach
        // state.coach = state.coach.map(coach => {
        //   if (coach._id === id) {
        //     // make copy of coach without 'deleting:true' property
        //     const { deleting, ...coachCopy } = coach;
        //     // return copy of coach with 'deleteError:[error]' property
        //     return { ...coachCopy, deleteError: error };
        //   }
        //   return user;
        // });
    },
    deleteReviewRequest(state, id) {
        // add 'deleting:true' property to coach being deleted
        // state.coaches = state.coaches.map(coach => (coach._id === id ? { ...coach, deleting: true } : coach));
    },
    deleteReviewSuccess(state, { coachId, _id }) {
        // remove deleted coach from state
        state.coaches = state.coaches.map(coach => {
            if (coach._id === coachId) {
                coach.reviews = coach.reviews.filter(
                    review => review._id !== _id
                );
            }
            return coach;
        });
    },
    deleteReviewFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to coach
        // state.coach = state.coach.map(coach => {
        //   if (coach._id === id) {
        //     // make copy of coach without 'deleting:true' property
        //     const { deleting, ...coachCopy } = coach;
        //     // return copy of coach with 'deleteError:[error]' property
        //     return { ...coachCopy, deleteError: error };
        //   }
        //   return user;
        // });
    }
};

export const coaches = {
    namespaced: true,
    state,
    actions,
    mutations
};
