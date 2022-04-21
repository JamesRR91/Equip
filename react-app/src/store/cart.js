// const GET_CART = "cart/GET_CART"
const ADD_TO_CART = "cart/ADD_CART"
const REMOVE_FROM_CART='cart/DELETE_CART'

// const getCart = (cart) => ({
//     type: GET_CART,
//     cart
// })
// const addCart = (newCartItem) => ({
//     type: ADD_CART,
//     newCartItem
// })

// const deleteCart=(cartItemId) => ({
//     type: DELETE_CART,
//     cartItemId
// })

// export const getCartItems = (userId) => async (dispatch) => {
//     const response = await fetch(`/api/cart/`);
//     const cartItems= await response.json();
//     dispatch(getCart(cartItems));
//     return cartItems;        
// }

export const addToCart=(item) => {
    return {type: "ADD_TO_CART", payload: item}
}

export const removeFromCart=(item, cart) => {
    let copy=[...cart];
    copy=copy.filter((cartItem) =>cartItem.id !== item.id)
    return {type: "REMOVE_FROM_CART", payload: copy}
}

// export const Checkout = (cartId, price, userId) => async (dispatch) => {
//     const response = await fetch(`/api/cart/${cartId}/checkout/`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             price
//         })
//     })
//     if (response.ok) {
//         const { cart, products } = await response.json();
//         dispatch(putCart(cart, products))
//         return null;
//     }
// }
    const initialState={cart: [], }
const cartReducer = (state = initialState, action) => {
    const {type, payload}=action;
    switch (type) {
        case ADD_TO_CART:
            return { ...state, cart: [...state.cart, payload]}
        case REMOVE_FROM_CART:
            return { ...state, cart: payload, }
        default:
            return {...state};
    }
}

export default cartReducer