import React, { useState, useEffect } from 'react';

export default function CartItems({ user_id, product_id, quantity }) {
    const [cartItem, setCartItem] = useState([]);

    const handleClickPlus = (product) => {
        const isNewProduct = cartItem.find((item) => item.id === product.id);
        if (isNewProduct) {
            setCartItem(cartItem.map((item) => item.id === product.id ?
                { ...isNewProduct, quantity: isNewProduct.quantity + 1 } : item)
            );
        } else {
            setCartItem([...cartItem, { ...product, quantity: 1 }])
        }
    }

    const handleClickMinus = (product) => {
        const theProduct=cartItem.find((item) =>item.id === product.id);
        if(theProduct.quantity===1) {
            setCartItem(cartItem.filter((item) => item.id !== product.id))
        } else {
            setCartItem(cartItem.map((item) =>item.id===product.id ? {...theProduct, quantity:theProduct.quantity - 1}: item))
        }
    }

    const cartTotal = cartItem.reduce((price, item) => price + item.quantity * item.price, 0);

    const clearCart = () => {
        setCartItem([]);
    }

    return (
        <div className="cart-items-container">
            <div className="cart-items-list">Cart Items</div>

            {cartItem.length === 0 && (
                <div className="cart-empty">Cart is empty.</div>
            )}

            <div>
                {cartItem.map((item) => (
                    <div key={item.id} className="cart-item-single">
                        <div className="cart-item-clear">{cartItem.length >= 1 && (<button className="cart-clear-button" onClick={clearCart}>Clear Cart</button>)}
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-buttons">
                                <button className="add-item" onClick={() => handleClickPlus(item)}>+</button>
                                <button className="remove-item" onClick={() => handleClickMinus(item)}>-</button>
                            </div>
                            <div className="cart-item-price">{item.price} * ${item.quantity}</div>
                            <div className="cart-item-total">${cartTotal}</div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}