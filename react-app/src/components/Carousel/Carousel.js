import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../store/products';
import { addToCart } from '../../store/cart';

export default function Carousel() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const productsObj = useSelector((state) => state.product.inventory);
    const products= Object.values(productsObj);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, user?.id]);
}


export default Carousel;
