
const ADD_CART_PRODUCT='carts/ADD_CART_PRODUCT'
const REMOVE_CART_PRODUCT = 'carts/REMOVE_CART_PRODUCT';
const ADD_QUANTITY = 'carts/ADD_QUANTITY';
const SUB_QUANTITY = 'carts/SUB_QUANTITY';
const EMPTY_CART = 'carts/EMPTY_CART';

 const addToCart = id => {
    return {
      type: ADD_TO_CART,
      id
    };
  };
  const removeFromCart = id => {
    return {
      type: REMOVE_FROM_CART,
      id,
    };
  };
  const subtractQuantity = id => {
    return {
      type: SUB_QUANTITY,
      id,
    };
  };
   const addQuantity = id => {
    return {
      type: ADD_QUANTITY,
      id,
    };
  };
   const emptyCart = () => {
    return {
      type: EMPTY_CART,
    };
  };



export const getShoppingCart = (userId) => async (dispatch) => {
  const response = await fetch(`/api/carts/${userId}`);
  const cartData = await response.json();
  dispatch(updateCart(cartData));
};

export const addToCart = (productId, userId, quantity) => async (dispatch) => {
  const response = await fetch(`/api/carts/${userId}/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId,
      productId,
      quantity
    }),
  });

  const data = await response.json()
  dispatch(updateCart(data))
};

export const updateShoppingCart = (itemId, quantity, cartId) => async (dispatch) => {
  const response = await fetch(`/api/carts/update`, {
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
  const response = await fetch(`/api/carts/purchase/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })
  const data = response.json()

  dispatch(updateCart(data))
}

export const removeCartItem = (product, cartId) => async (dispatch) => {
  const response = await fetch(`/api/carts/${product.id}/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })
  
  const newCartData = await response.json()
  dispatch(updateCart(newCartData))
}

const initialState = {
    products: [],
  };
  const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.id ? {...product, selected: true} : product,
          ),
        };
      case REMOVE_FROM_CART:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.id
              ? {...product, selected: false, quantity: 1}
              : product,
          ),
        };
      case ADD_QUANTITY:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.id
              ? {...product, quantity: product.quantity + 1}
              : product,
          ),
        };
      case SUB_QUANTITY:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.id
              ? {
                  ...product,
                  quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
                }
              : product,
          ),
        };
      case EMPTY_CART:
        return {
          ...state,
          products: state.products.map(product =>
            product.selected
              ? {...product, selected: false, quantity: 1}
              : product,
          ),
        };
      default:
        return state;
    }
  };

export default shoppingCartReducer;