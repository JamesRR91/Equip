import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getProducts } from '../../store/products';
import { getOneProduct } from '../../store/products';

export default function SingleProduct(){
const dispatch = useDispatch()
const history = useHistory()
const { id } = useParams()

const thisProductObj= useSelector((state) => state.product.inventory);
const thisProduct = Object.values(thisProductObj);
const thisProductId= thisProduct[id]

useEffect(() => {
    dispatch(getOneProduct(id))
}, [dispatch, id])

return (
    <div className='single-product-container'>
        <h1>{thisProductId.product_name}</h1>
        <p className='single-product-price'>{thisProductId.product_price}</p>
        <p className='single-product-desc'>{thisProductId.product_description}</p>
        <p className='single-product-quan'>{thisProductId.product_quantity}</p>
    </div>
)
}
