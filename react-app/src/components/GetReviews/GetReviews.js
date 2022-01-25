import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import reviewReducer, { getAllReviews } from '../../store/review';
import { NavLink, useParams } from 'react-router-dom';
import { getProducts } from '../../store/products';
import PostReview from '../PostReviewModal/PostReview';
import EditReviewModal from '../EditReviewModal';
import './GetReviews.css';

export default function GetReviews({id}){
    const dispatch= useDispatch();
    const sessionUserCheck=useSelector((state) => state.session.user);
    const reviewsObj = useSelector((state) => state.review.entries);
    const thisReview=reviewsObj[id];
    const reviews = Object.values(reviewsObj);
    const filteredReviews=reviews.filter(review => review.product_id===id)

//     let sessionLinks;
// if(sessionUserCheck?.id===thisReview?.user_id) {
//     sessionLinks = (
//         <div className='session-row'>
//         <ul>
//         <li>
//             <div className='delete-button'>
//                 <EditReviewModal id={thisReview?.id} />
//             </div>
//         </li>
//         </ul>
//         </div>
//     )
// }

// For below product_id if i can get it to work again
// {sessionUserCheck?.id===thisReview?.user_id && sessionLinks}

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
                  {sessionUserCheck?.id===user_id ? <div className='modals'> <EditReviewModal id={id} /> </div>: null}
              </div>
            )): <div className='no-review-parent'><h3 className='no-review'>This product has no review, be the first!</h3></div>}

        </div>
    )
}
