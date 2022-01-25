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

export const getAllReviews = (product_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${product_id}`);

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

export const makeReview = (newReview) => async(dispatch) => {
    const response = await fetch('/api/reviews/new', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newReview)
    })

    const review = await response.json();

    if (response.ok) {
        dispatch(addReview(review));
        return review;
    }
}

export const deleteReview = (id) => async(dispatch) => {
    const response = await fetch (`api/reviews/${id}`, {
        method: 'delete'
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(removeReview(review.id))
    }
}

export const changeReview = (data) => async(dispatch) => {
    const response = await fetch( `/api/reviews/${data.id}/edit`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(updateReview(data));
        return data;
    }
}

const initialState = { entries: {} };

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS: {
            const newState= {...state, entries: {} };
            for (let i = 0; i< action.reviews.length; i++) {
                let review = action.reviews[i];
                newState.entries[review.id]=review;
            }
            return newState;
        };
        case ADD_REVIEW: {
            const newState = { ...state, entries: { ...state.entries, [action.newReview.id]: action.newReview } };
            return newState;
        };
        case REMOVE_REVIEW: {
            const newState = { ...state, entries: {...state.entries } };
            delete newState.entries[action.id];
            return newState;
        };
        case UPDATE_REVIEW: {
            const newState= { ...state, entries: {...state.entries, [action.review.id]: action.review } };
            return newState;
        };
        default:
            return state;
    }
};

export default reviewReducer;
