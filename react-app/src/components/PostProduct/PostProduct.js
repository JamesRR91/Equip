import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeProduct } from '../../store/products';
import { useHistory } from 'react-router-dom';
import './PostProduct.css';

export default function PostProduct(){
    const dispatch=useDispatch();
    const history=useHistory();
    const [product_name, setName]= useState("");
    const [product_description, setDescription]= useState("");
    const [product_price, setPrice]= useState(null);
    const [product_quantity, setQuantity]= useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            product_name,
            product_description,
            product_price,
            product_quantity
        };
        dispatch(makeProduct(newProduct));
        history.push('/');
    }



    return (
        <div className='post-product-parent'>
        <div className='post-product'>
            <form className='product-data' onSubmit={handleSubmit}>
                <label>Product Name: </label>
                <input className='product-data'
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={product_name}
                placeholder='Product Name'
                required
                />
                <label>Product Description: </label>
                <textarea className='product-data'
                onChange={(e) => setDescription(e.target.value)}
                value={product_description}
                placeholder='Tell us more about it'
                required
                />
                <label>Price: </label>
                <input className='product-data'
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={product_price}
                placeholder='What do you want to set the price at?'
                required
                />
                <label>In Stock: </label>
                <input className='product-data'
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={product_quantity}
                placeholder='How many do you have available for sale?'
                required
                />
                <button className='modal-button' type='submit'>
                    Create
                    <i class="fas fa-plus-circle"></i>
                    </button>
            </form>
        </div>
        </div>
    )




}
