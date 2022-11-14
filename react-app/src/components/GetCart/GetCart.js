import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShoppingCart, removeCartItem, checkoutItems } from '../../store/cart';
import { getProducts } from '../../store/products';
import { useParams, useHistory } from 'react-router-dom';
import CartFunc from '../CartFunc/CartFunc';

export default function GetCart({setShowModal}) {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const productObj = useSelector((state) => state.product.inventory);
    const products = Object.values(productObj);
    const shoppingCart = useSelector(state => state.cartItems.cart);
    const cartProduct = useSelector(state => state.cartItems.cartProducts);


    useEffect(() => {
        dispatch(getProducts());
        dispatch(getShoppingCart(user?.id))
    }, [dispatch, user?.id])



    const clearCart = (cart) => {
        return dispatch(checkoutItems(shoppingCart.id))
    }

    const deleteCartProduct = (product) => {
        return dispatch(removeCartItem(product, shoppingCart?.id));
    }

    return (
            <div className="cart-container">
              <div className="shopping-cart">
                <div className="shopping-cart-title">
                  <h1 id="shopping-cart-title">Shopping Cart</h1>
                </div>
                <div className="items-amount">
                  <h3>ITEMS ({cartProduct?.length})</h3>
                </div>
                {cartProduct?.length === 0 && (
                  <h3 className="no-items">No Items Added Yet!</h3>
                )}
                {cartProduct?.map((item) => {
                  const id = item.productId;
                  const product = productObj[id];
                  return (
                    <CartFunc
                      item={item}
                      shoppingCart={shoppingCart}
                      product={product}
                      deleteCartProduct={deleteCartProduct}
                    />
                  );
                })}
              </div>
              <div className="checkout">
                <div className="cart-total">
                  <h2>{`Total: $${shoppingCart?.total.toFixed(2)}`}</h2>
                </div>
                <div className="checkout-buttons">
                  <button
                    className='modal-button'
                    id="checkout-button"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowModal(false)
                    }}
                  >Continue Shopping</button>
                  <button
                    className='modal-button'
                    id="checkout-button"
                    type="button"
                    onClick={(e) => {
                      alert("Thanks for your purchase!")
                      history.push('/')
                      setShowModal(false)
                      clearCart(shoppingCart)
                    }}
                  >Checkout</button>
                </div>
              </div>
            </div>
          );
        };
        
        