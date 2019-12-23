import { authHeader } from '../_helpers';
import axios from 'axios';
const url = 'https://coach-api-go.herokuapp.com';

export const reviewsService = {
    postReview,
    updateReview,
    deleteReview
};

async function postReview(review) {
    try {
        const res = await axios({
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            url: url + '/reviews',
            data: JSON.stringify(review)
        });
        const data = handleReview(res);
        console.log(data);
        return data.createdReview;
    } catch (err) {
        console.log(err);
    }
}

async function updateReview(review) {
    try {
        const res = await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            url: url + `/reviews/${review._id}`,
            data: JSON.stringify(review)
        });
        handleReview(res);
        return review;
    } catch (err) {
        console.log(err);
    }
}

async function deleteReview(id) {
    try {
        const res = await axios({
            method: 'DELETE',
            headers: authHeader(),
            url: url + `/reviews/${id}`
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
