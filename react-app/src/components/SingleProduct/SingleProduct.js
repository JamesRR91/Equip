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

const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  
  
  const thisProductObj= useSelector((state) => state.product.inventory);
  const thisProductObjId=thisProductObj[id];
  const sessionUserCheck=useSelector((state) => state.session.user);
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
console.log('ARE YOU THE FUCKING USERS', users);
console.log('THE FUCK AM I PULLING DOWN', thisProductObjId);
const findUser=users.find(user => user.id ===thisProductObjId.user_id)

console.log('IS THIS THE RIGHT GODDAMN USER', findUser);
useEffect(() => {
    dispatch(getProducts())
}, [dispatch])

return (
    <div className='single-parent'>
    {sessionUserCheck? <PostReviewModal id={id}/>: null}
    <div className='single-product-container'>
        <div className='single-product-content'>
        <h1>{thisProductObjId?.product_name}</h1>
        <p className='product-owner'>Owned By:{findUser.username}</p>
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
