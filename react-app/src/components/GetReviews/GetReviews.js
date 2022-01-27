import { React, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from '../../store/review';
import EditReviewModal from '../EditReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';
import './GetReviews.css';

export default function GetReviews({id}){
    const dispatch= useDispatch();
    const sessionUserCheck=useSelector((state) => state.session.user);
    const reviewsObj = useSelector((state) => state.review.entries);
    const reviews = Object.values(reviewsObj);

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
  }, [dispatch], id);
    return(
        <div className="get-reviews-parent">
            {reviews?.length ? reviews.map(({ id, review_text, user_id, product_id}) => (
              <div className='review' key={id}>
                <div className='review_text'>
                  {review_text}
                </div>
                  {sessionUserCheck?.id===user_id ? <div className='button-row-review'> <EditReviewModal id={id} /> <DeleteReviewModal id={id} /></div>: null}
              </div>
            )): <div className='no-review-parent'><h3 className='no-review'>This product has no review, be the first!</h3></div>}

        </div>
    )
}
