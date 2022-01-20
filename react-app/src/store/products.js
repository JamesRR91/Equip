const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const ADD_PRODUCT = 'products/ADD_PRODUCT';
const REMOVE_PRODUCT = 'products/REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT';

const loadProducts=(products) => {
    return {type: LOAD_PRODUCTS, products}
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

export const makeProduct = (newProduct) => async(dispatch) => {
    const response= await fetch ('/api/products/create', {
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

export const changeProduct = (product) => async(dispatch) => {
    const response = await fetch(`/api/products/${product.id}`, {
        method: 'put',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(product)
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(updateProduct(data));
        return data;
    }
}
