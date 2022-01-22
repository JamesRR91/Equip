import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteProduct } from '../../store/products';
import './DeleteProduct.css';

export default function DeleteProduct({ id }){
    const dispatch=useDispatch()
    const history=useHistory()

    const handleSubmit= (e) => {
        e.preventDefault();
        dispatch(deleteProduct(id));
        history.push('/')
    }

    return (
        <button className='delete-button' onClick={handleSubmit}>
        Delete
        </button>
    )
}
