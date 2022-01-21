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
const thisProductId= thisProduct[id-1];
const thisProductIdArray=Object.assign([], thisProductId)
console.log ('THIS IS THE ID', id)
console.log('You are wrong are you not?', thisProductObj);
console.log('Maybe this?', thisProduct)
console.log('OR THIS', thisProductId)

useEffect(() => {
    dispatch(getOneProduct(id))
}, [dispatch, id])

return (
    <div className='single-product-container'>
        <div className='content'>
        <h1>{thisProductId.product_name}</h1>
        <p className='single-product-price'>{thisProductId.product_price}</p>
        <p className='single-product-desc'>{thisProductId.product_description}</p>
        <p className='single-product-quan'>{thisProductId.product_quantity}</p>
        </div>
    </div>
)
}
