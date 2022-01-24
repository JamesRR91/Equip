const LOAD_REVIEWS='reviews/LOAD_REVIEWS';
const LOAD_ONE_REVIEW='/reviews/LOAD_ONE_REVIEW';
const ADD_REVIEW='/reviews/ADD_REVIEW';
const REMOVE_REVIEW='/reviews/REMOVE_REVIEW';
const UPDATE_REVIEW='/reviews/UPDATE_REVIEW';

const loadReviews = (reviews) => {
    return { type: LOAD_REVIEWS, reviews };
};

const loadOneReview = (review) => {
    return {type: LOAD_ONE_REVIEW, review}
}
const addReview = (newReview) => {
    return { type: ADD_REVIEW, newReview };
};

const removeReview = (id) => {
    return { type: REMOVE_REVIEW, id };
};

const updateReview = (id) => {
    return { type: UPDATE_REVIEW, id};
};

export const getAllReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews/');

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews.all_reviews));
        return reviews;
    }
}

export const getOneReview = (id) => async (dispatch) => {
    const response= await fetch (`/api/products/${id}`);

    if(response.ok) {
        const review = await response.json();
        dispatch(loadOneReview(review))
    }
}

export const 
