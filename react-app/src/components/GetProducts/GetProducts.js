import { React, useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getProducts } from '../../store/products';
import { NavLink } from 'react-router-dom';
import './GetProducts.css';

export default function GetProducts() {
    const dispatch=useDispatch();
    const productsObj = useSelector((state) => state.product.inventory);
    const products = Object.values(productsObj);
    console.log('ALLLL THE OBJECTS', products)
    console.log('JUST ONE PLEASE', products[0]);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const [openId, setOpenId]=useState(null);
    const handleClick= (id) => {
      if (openId===id) {
        setOpenId(null)
      } else {
        setOpenId(id)
      }
    }

    return(
        <div className='get-products-parent'>
            {products?.map(({id, product_name, product_description, product_price, product_quantity, user_id}) => (
                <div className='product-container' key={id}>
                <NavLink className='text-deco' to={`products/${id}`}>
                    <ul className='product-list'>
                        <li className='created-by'>{user_id}</li>
                        <li className='product-name'>{product_name}</li>
                        <li className='product-desc'>Description: {product_description}</li>
                        <li className='product-price'>${product_price}</li>
                        <li className='product-quantity'>Left in Stock!: {product_quantity}</li>
                    </ul>
                </NavLink>
                 </div>
            ))}
        </div>
    )
}
