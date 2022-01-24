import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeReview } from '../../store/review';
import { NavLink, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './PostReview.css';

export default function PostReview(){
    const dispatch=useDispatch();
    const history=useHistory();
    const [review_text, setReview]=useState("");
    const sessionUser= useSelector(state => state.session.user);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newReview= {
            review_text
        };
        dispatch(makeReview(newReview));
        history.push('/');
    }

    return (
        <div className='post-review-parent'>
        <div className='post-review'>
            <form className='review-data' onSubmit={handleSubmit}>
                <label>Your Review: </label>
                <textarea className='preview-data'
                onChange={(e) => setReview(e.target.value)}
                value={review_text}
                placeholder='Tell us more about it'
                required
                />
                <button className='submit-button' type='submit'>Create</button>
            </form>
        </div>
        </div>
    )
}
