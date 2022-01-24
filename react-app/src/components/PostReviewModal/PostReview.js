import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeReview } from '../../store/review';
import { NavLink, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function PostReview({id, setShowModal}){
    const dispatch=useDispatch();
    const history=useHistory();
    const [review_text, setReview]=useState("");
    const sessionUser= useSelector(state => state.session.user);
    const productsObj = useSelector((state) => state.product.inventory);
    const products = Object.values(productsObj);
    const specificProduct=products.find(product => product.id===id)

    console.log('THEID', id);
    console.log('THEUSER',sessionUser.id);
    console.log('ThePROD', products);
    console.log('SPECIFIC', specificProduct);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newReview= {
            review_text,
            user_id:sessionUser.id,
            product_id:id

        };
        dispatch(makeReview(newReview));
        setShowModal(false);
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
