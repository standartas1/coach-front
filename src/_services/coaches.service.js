import { authHeader } from '../_helpers';
import axios from 'axios';
const url = 'https://coach-api-go.herokuapp.com';

export const coachesService = {
    getCoaches,
    getCoachById,
    postCoach,
    updateCoach,
    deleteCoach
};

async function getCoaches() {
    try {
        const res = await axios({
            method: 'GET',
            url: url + '/coaches'
        });
        const data = handleReview(res);

        return data.coaches;
    } catch (err) {
        console.log(err);
    }
}

async function postCoach(coach) {
    try {
        const res = await axios({
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            url: url + '/coaches',
            data: JSON.stringify(coach)
        });
        const data = handleReview(res);
        console.log(data);
        return data.createdCoach;
    } catch (err) {
        console.log(err);
    }
}

async function getCoachById(id) {
    try {
        const res = await axios({
            method: 'GET',
            headers: authHeader(),
            url: url + `/users/${id}`
        });
        const data = handleReview(res);

        return data;
    } catch (err) {
        console.log(err);
    }
}

async function updateCoach(coach) {
    try {
        const res = await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            url: url + `/coaches/${coach._id}`,
            data: JSON.stringify(coach)
        });
        handleReview(res);
        console.log(coach);
        return coach;
    } catch (err) {
        console.log(err);
    }
}

async function deleteCoach(id) {
    try {
        const res = await axios({
            method: 'DELETE',
            headers: authHeader(),
            url: url + `/coaches/${id}`
        });
        return handleReview(res);
    } catch (err) {
        console.log(err);
    }
}

function handleReview(review) {
    const data = review.data;
    if (review.request.readyState !== 4) {
        if (review.status === 401) {
            // auto logout if 401 review returned from api
            logout();
            location.reload(true);
        } else if (review.status === 400) {
            alert('Something went wrong');
        }

        const error = (data && data.message) || review.statusText;
        return Promise.reject(error);
    }

    return data;
}
