import { React, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getProducts } from '../../store/products';
import { NavLink } from 'react-router-dom';
import './GetProducts.css';

export default function GetProducts() {
    const dispatch=useDispatch();
    const productsObj = useSelector((state) => state.product.inventory);
    const products = Object.values(productsObj);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return(
        <div className='get-products-parent'>
            {products?.map(({id, product_name, product_description, product_price, product_quantity, user_id}) => (
                <div className='product-container' key={id}>
                <NavLink className='text-deco' to={`products/${id}`}>
                <h3 className='product-name'>{product_name}</h3>
                    <ul className='product-list'>
                    <li className='product-price'>${product_price.toFixed(2)}</li>
                        <li className='product-desc'>{product_description}</li>
                        <li className='product-quantity'>Left in Stock!: {product_quantity}</li>
                    </ul>
                </NavLink>
                 </div>
            ))}
        </div>
    )
}
