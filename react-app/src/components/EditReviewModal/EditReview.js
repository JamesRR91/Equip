import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeReview } from "../../store/review";

export default function EditReview({id, setShowModal}) {
    const dispatch=useDispatch();
    const review=useSelector((state) =>state.review.entries[id])

    const [review_text, setReview]=useState(review?.review_text)

    const handleSubmit=(e) => {
        e.preventDefault();
        const data={
            ...review,
            review_text
        }
        dispatch(changeReview(data));
        setShowModal(false);
    }
    return(
        <div className='edit-product-form-container'>
                <form className='product-data' onSubmit={handleSubmit}>
                    <label>Your Review: </label>
                    <textarea className='product-data'
                    onChange={(e) => setReview(e.target.value)}
                    value={review_text}
                    placeholder='Tell us more about it'
                    required
                    />
                    <button className='modal-button' type='submit'>Edit</button>
                </form>
            </div>
    )
}
