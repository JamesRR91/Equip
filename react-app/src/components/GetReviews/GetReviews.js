import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import reviewReducer, { getAllReviews } from '../../store/review';
import { NavLink, useParams } from 'react-router-dom';
import { getProducts } from '../../store/products';
import './GetReviews.css';

export default function GetReviews({id}){
    const dispatch= useDispatch();
    const reviewsObj = useSelector((state) => state.review.entries);
    const reviews = Object.values(reviewsObj);
    const filteredReviews=reviews.filter(review => review.product_id===id)
    useEffect(() => {
      dispatch(getAllReviews(id));
  }, [dispatch]);
    return(
        <div className="get-reviews-parent">
            {reviews?.length ? reviews.map(({ id, review_text, user_id, product_id}) => (
              <div className='review' key={id}>
                <div className='review_text'>
                  {review_text}
                </div>
                <div>
                 {user_id}
                </div>
                  {product_id}
              </div>
            )): <div className='no-review-parent'><h3 className='no-review'>This product has no review, be the first!</h3></div>}

        </div>
    )
}
