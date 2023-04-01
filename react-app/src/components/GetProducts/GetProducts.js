import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../store/products';
import {getShoppingCart } from '../../store/cart'
import { NavLink, useParams } from 'react-router-dom';
import { addToCart } from '../../store/cart';
import './GetProducts.css';

export default function GetProducts() {
    const dispatch = useDispatch();
    const productsObj = useSelector((state) => state.product.inventory);
    const user = useSelector(state => state.session.user)
    const products = Object.values(productsObj);
    const shoppingCart = useSelector(state => state.cartItems.cart);
    const cartProduct = useSelector(state => state.cartItems.cartProducts);
    // const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    // const product = products[id];
    
    
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getShoppingCart(user?.id))
    }, [dispatch, user?.id]);

    const addItem=(e, id) => {
        e.preventDefault();
        // if(!quantity || quantity <1) {
        //     setQuantity(1)
        // } else {
        //     setQuantity(quantity+1)
        // }
        // const newCartProduct={
            //     userId: user.id,
            //     productId: productsObj[id],
            //     quantity: quantity
            // }
            // console.log('NEW PRODUCT', newCartProduct);
            dispatch(addToCart(id, user.id))
        // setQuantity(1);
    }


    // console.log('THE PRODUCT', product);
    return (
        <div className='get-products-parent'>
            {products?.map(({ id, product_name, product_description, product_price, product_quantity, user_id }) => (
                <div className='product-container' key={id}>
                    <NavLink className='text-deco' to={`products/${id}`}>
                        <h3 className='product-name'>{product_name}</h3>
                        <ul className='product-list'>
                            <li className='product-price'>${product_price.toFixed(2)}</li>
                            <li className='product-desc'>{product_description}</li>
                            <li className='product-quantity'>Left in Stock!: {product_quantity}</li>
                        </ul>
                    </NavLink>
                    {user?.id &&
                        <>
                            <button
                                className="add-cart"
                                type="button"
                                onClick={(e) =>addItem(e, id) }
                            >
                                Add to Cart
                            </button>
                            {/* <label className="product-quantity">
                                Quantity
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </label> */}
                        </>
}
                 </div>
            ))}
        </div>
    )
}
