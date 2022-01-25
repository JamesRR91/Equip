import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeReview } from "../../store/review";
import { useHistory, useParams } from "react-router-dom";

export default function EditReview({id}) {
    const dispatch=useDispatch();

    const reviewsObj = useSelector((state) => state.review.entries);
    const reviews=Object.values(reviewsObj);
    const thisReview=reviews.find(review => review.id === id);
    const review=useSelector((state) =>state.review.entries[id])

    const [review_text, setReview]=useState(review?.review_text)
    console.log('THEID', id);
    console.log('THEREV', review);
    console.log('REVIEWS', reviews)
    console.log('OBJ', reviewsObj);
    console.log('THIS', thisReview)

    const handleSubmit=(e) => {
        e.preventDefault();
        const data={
            ...review,
            review_text
        }
        dispatch(changeReview(data))
    }
    return(
        <div className='edit-review-parent'>
            <div className='edit-review'>
                <form className='review-data' onSubmit={handleSubmit}>
                    <label>Your Review: </label>
                    <textarea className='review-data'
                    onChange={(e) => setReview(e.target.value)}
                    value={review_text}
                    placeholder='Tell us more about it'
                    required
                    />
                    <button className='submit-button' type='submit'>Edit</button>
                </form>
            </div>
            </div>
    )
}
