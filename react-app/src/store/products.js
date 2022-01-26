const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const LOAD_ONE_PRODUCT = 'products/LOAD_ONE_PRODUCT';
const ADD_PRODUCT = 'products/ADD_PRODUCT';
const REMOVE_PRODUCT = 'products/REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT';

const loadProducts=(products) => {
    return {type: LOAD_PRODUCTS, products}
}

const loadOneProduct=(product) =>{
    return {type: LOAD_ONE_PRODUCT, product}
}

const addProduct = (newProduct) => {
    return {type: ADD_PRODUCT, newProduct}
}

const removeProduct = (product_id) => {
    return {type: REMOVE_PRODUCT, product_id}
}

const updateProduct = (product) => {
    return {type: UPDATE_PRODUCT, product};
}

export const getProducts = () => async(dispatch) => {
    const response = await fetch('/api/products/');

    if (response.ok) {
        const products = await response.json();
        dispatch(loadProducts(products.all_products));
        return products;
    }
}

export const getOneProduct = (id) => async(dispatch) => {
    const response = await fetch(`/api/products/${id}`);

    if(response.ok) {
        const product = await response.json();
        dispatch(loadOneProduct(product))
        return product;
    }
}

export const makeProduct = (newProduct) => async(dispatch) => {
    const response= await fetch ('/api/products/create_product', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newProduct)
    });
    const product = await response.json();

    if(response.ok) {
        dispatch(addProduct(product));
        return product;
    }
}

export const deleteProduct = (product_id) => async(dispatch) => {
    const response = await fetch (`/api/products/${product_id}`, {
        method:'delete'
    })

    if (response.ok) {
        const product = await response.json();
        dispatch(removeProduct(product.id))
    }
}

export const changeProduct = (data) => async(dispatch) => {
    const response = await fetch(`/api/products/${data.id}/edit`, {
        method: 'put',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(updateProduct(data));
        return data;
    }
}

const initialState = { inventory: {} };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const newState = { ...state, inventory: {} };
      for (let i = 0; i < action.products.length; i++) {
        let product = action.products[i];
        newState.inventory[product.id] = product;
      }
      return newState;
    };
    case ADD_PRODUCT: {
      const newState = { ...state, inventory: { ...state.inventory, [action.newProduct.id]: action.newProduct } };
      return newState;
    };
    case REMOVE_PRODUCT: {
      const newState = { ...state, inventory: { ...state.inventory } };
      delete newState.inventory[action.product_id];
      return newState;
    };
    case UPDATE_PRODUCT: {
      const newState = { ...state, inventory: { ...state.inventory, [action.product.id]: action.product } };
      return newState;
    };
    default:
      return state;
  }
};

export default productReducer;

// const dispatch = useDispatch();
//     const reviewsObj = useSelector((state) => state.review.entries);
//     const reviews = Object.values(reviewsObj);
//     const { id }= useParams();
//     const filteredReviews=reviews.filter(review => review.product_id===id)
//     useEffect(() => {
//         dispatch(GetReviews());
//     }, [dispatch]);


//     return (
//         <div className="get-reviews-parent">
//             {filteredReviews?.length ? filteredReviews?.map(({ id, review_text, user_id, product_id}) => (
//               <div className='review' key={id}>
//                 <div className='review-text'>
//                   {review_text}
//                 </div>
//             )): <div className='no-review-parent'><h3 className='no-review'>This product has no reviews, be the first!</h3></div>}

//         </div>
//     )
//             }
