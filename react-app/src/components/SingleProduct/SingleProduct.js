import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProducts } from '../../store/products';
import DeleteProductModal from '../DeleteProductModal';
import EditProductModal from '../EditProductModal';
import './SingleProduct.css';
import GetReviews from '../GetReviews/GetReviews';
import PostReviewModal from '../PostReviewModal';

export default function SingleProduct(){
const dispatch = useDispatch()
const { id } = useParams()


const thisProductObj= useSelector((state) => state.product.inventory);
const products = Object.values(thisProductObj);
const thisProductObjId=thisProductObj[id];
const sessionUserCheck=useSelector((state) => state.session.user);
const [users, setUsers]= useState([]);
const seller=users?.find(user => user.id === thisProductObjId.user_id);
console.log('SESSION', sessionUserCheck)
console.log('USER', users);
console.log('SELLER', seller);
const otherProducts = products.filter(otherProduct => {
    if(otherProduct.user_id === seller?.id){
        if(otherProduct.id !== thisProductObjId.id) return otherProduct;
    }
})

let sessionLinks;
if(sessionUserCheck?.id===thisProductObjId?.user_id) {
    sessionLinks = (
        <div className='session-row'>
        <ul className='session-row-list'>
        <li className='session-row-item'>
                <DeleteProductModal id={id} />
                <EditProductModal id={id} />
        </li>
        </ul>
        </div>
    )
}

useEffect(() => {
    dispatch(getProducts())
    async function fetchData() {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data.users);
    }
    fetchData();
}, [dispatch])

return (
    <div className='single-parent'>
    {sessionUserCheck? <PostReviewModal id={id}/>: null}
    <div className='single-product-container'>
        <div className='single-product-content'>
        <h3>{seller?.username}</h3>
        <h1>{thisProductObjId?.product_name}</h1>
        <p className='single-product-price'>${thisProductObjId?.product_price.toFixed(2)}</p>
        <p className='single-product-desc'>{thisProductObjId?.product_description}</p>
        <p className='single-product-quan'>In Stock: {thisProductObjId?.product_quantity}</p>
        {sessionUserCheck?.id===thisProductObjId?.user_id && sessionLinks}
        </div>
    </div>
    <GetReviews id={id}/>
    </div>
)
}
