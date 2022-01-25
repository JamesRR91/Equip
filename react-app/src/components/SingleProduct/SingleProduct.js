import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getProducts } from '../../store/products';
import { getOneProduct } from '../../store/products';
import DeleteProduct from '../DeleteProductModal/DeleteProduct';
import DeleteProductModal from '../DeleteProductModal';
import EditProduct from '../EditProductModal/EditProduct';
import EditProductModal from '../EditProductModal';
import { NavLink } from 'react-router-dom';
import './SingleProduct.css';
import GetReviews from '../GetReviews/GetReviews';
import PostReview from '../PostReviewModal/PostReview';
import PostReviewModal from '../PostReviewModal';

export default function SingleProduct(){
const dispatch = useDispatch()
const history = useHistory()
const { id } = useParams()

const thisProductObj= useSelector((state) => state.product.inventory);
const thisProductObjId=thisProductObj[id];
const thisProduct = Object.values(thisProductObj);
const sessionUserCheck=useSelector((state) => state.session.user);
let sessionLinks;
if(sessionUserCheck?.id===thisProductObjId?.user_id) {
    sessionLinks = (
        <div className='session-row'>
        <ul>
        <li>
            <div className='delete-button'>
                <DeleteProductModal id={id} />
                <EditProductModal id={id} />
            </div>
        </li>
        </ul>
        </div>
    )
}

useEffect(() => {
    dispatch(getOneProduct(id))
}, [dispatch, id])

return (
    <div className='single-parent'>
    {sessionUserCheck? <PostReviewModal id={id}/>: null}
    <div className='single-product-container'>
        <div className='single-product-content'>
        <h1>{thisProductObjId?.product_name}</h1>
        <p className='single-product-price'>{thisProductObjId?.product_price}</p>
        <p className='single-product-desc'>{thisProductObjId?.product_description}</p>
        <p className='single-product-quan'>{thisProductObjId?.product_quantity}</p>
        {sessionUserCheck?.id===thisProductObjId?.user_id && sessionLinks}
        </div>
    </div>
    <GetReviews id={id}/>
    </div>
)
}
