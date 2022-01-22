import { React, useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getProducts } from '../../store/products';
import { NavLink } from 'react-router-dom';
import './GetProducts.css';

export default function GetProducts() {
    const dispatch=useDispatch();
    const sessionUser= useSelector((state) => state.session.user)
    const productsObj = useSelector((state) => state.product.inventory);
    const products = Object.values(productsObj);

    console.log('THIS IS PRODUCTS', products)
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
                <h3 className='product-name'>{product_name}</h3>
                    <ul className='product-list'>
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
