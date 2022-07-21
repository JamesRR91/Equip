const handleClickMinus = (product) => {
    const theProduct=cartItem.find((item) =>item.id === product.id);
    if(theProduct.quantity===1) {
        setCartItem(cartItem.filter((item) => item.id !== product.id))
    } else {
        setCartItem(cartItem.map((item) =>item.id===product.id ? {...theProduct, quantity:theProduct.quantity - 1}: item))
    }
}