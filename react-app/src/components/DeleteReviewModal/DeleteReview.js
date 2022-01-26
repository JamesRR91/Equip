import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteReview } from '../../store/review';

export default function DeleteReview({ id, setShowModal }){
    const dispatch=useDispatch()
    const history=useHistory()

    const handleSubmit= (e) => {
        e.preventDefault();
        dispatch(deleteReview(id));
        setShowModal(false);
    }

    return (
        <div className="edit-product-form-container">
        <h3>Are you sure?</h3>
        <div className='button-row-delete'>
        <button className="modal-button" onClick={handleSubmit}>Yes, Delete My Review</button>
        </div>
    </div>
    )
}
