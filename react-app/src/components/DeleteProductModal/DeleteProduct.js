import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteProduct } from '../../store/products';

export default function DeleteProduct({ id, setShowModal }){
    const dispatch=useDispatch()
    const history=useHistory()

    const handleSubmit= (e) => {
        e.preventDefault();
        dispatch(deleteProduct(id));
        history.push('/')
    }

    return (
        <div className="edit-product-form-container">
        <h3>Are you sure?</h3>
        <div className='button-row-delete'>
        <button className="modal-button" onClick={handleSubmit}>Yes, Delete My Product</button>
        </div>
    </div>
    )
}
