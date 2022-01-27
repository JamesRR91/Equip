import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeProduct } from '../../store/products';


export default function EditProduct({id}) {
    const dispatch=useDispatch();

    const product=useSelector((state) => state.product.inventory[id])

    const [product_name, setName]=useState(product?.product_name)
    const [product_description, setDescription]=useState(product?.product_description)
    const [product_price, setPrice]=useState(product?.product_price)
    const [product_quantity, setQuantity]=useState(product?.product_quantity)

    const handleSubmit=(e) => {
        e.preventDefault();
        const data={
            ...product,
            product_name,
            product_description,
            product_price,
            product_quantity
        }

        dispatch(changeProduct(data))
    }

    return (
        <div className='edit-product-form-container'>
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
                <button className='submit-button' type='submit'>Edit Product</button>
            </form>
        </div>
    )
}
