const UPDATE_CART = "carts/GET_CART";

const updateCart = (cartData) => ({
  type: UPDATE_CART,
  cartData,
});




export const getShoppingCart = (userId) => async (dispatch) => {
  const response = await fetch(`/api/cart/${userId}`);
  const cartData = await response.json();
  dispatch(updateCart(cartData));
};

export const addToCart = (productId, userId) => async (dispatch) => {
  const response = await fetch(`/api/cart/${userId}/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId,
      productId
    }),
  });

  const data = await response.json()
  return dispatch(updateCart(data))
};

export const updateShoppingCart = (itemId, quantity, cartId) => async (dispatch) => {
  const response = await fetch(`/api/cart/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      itemId,
      quantity,
      cartId
    })
  })

  const data = await response.json()
  dispatch(updateCart(data))
}

export const checkoutItems = (cartId) => async (dispatch) => {
  const response = await fetch(`/api/cart/purchase/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })
  const data = response.json()

  dispatch(updateCart(data))
}

export const removeCartItem = (product, cartId) => async (dispatch) => {
  const response = await fetch(`/api/cart/${product.id}/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })
  
  const newCartData = await response.json()
  dispatch(updateCart(newCartData))
}

const shoppingCartReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_CART:
      newState = { ...state };
      newState["cart"] = action.cartData.cart;
      newState['cartProducts'] = action.cartData.cartProducts;
      return newState;
    
    default:
      return state;
  }
};

export default shoppingCartReducer;