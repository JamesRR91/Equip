import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProducts } from '../../store/products';
import DeleteProductModal from '../DeleteProductModal';
import EditProductModal from '../EditProductModal';
import './SingleProduct.css';
import GetReviews from '../GetReviews/GetReviews';
import PostReviewModal from '../PostReviewModal';
import { NavLink } from 'react-router-dom';

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
  const products = Object.values(thisProductObj);
  const thisProductObjId=thisProductObj[id];
const sessionUserCheck=useSelector((state) => state.session.user);

const userComponents = users.map((user) => {
  return (
    <li key={user.id}>
      {user.id}{user.username}
    </li>
  );
});

const userFind = users.find((user) => user?.id ===thisProductObjId?.user_id);

console.log('PRODUCT', products);

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
}, [dispatch])

const fromSeller=products.filter(product => {
    if(product.user_id === userFind?.id){
        if(product.id !== thisProductObjId.id) return product;
    }
})

return (
    <div className='single-parent'>
    {sessionUserCheck? <PostReviewModal id={id}/>: null}
    <div className='single-product-container'>
        <div className='single-product-content'>
        <h1 className=''>{thisProductObjId?.product_name}</h1>
        <h3>Sold By:{userFind?.username}</h3>
        <p className='single-product-price'>${thisProductObjId?.product_price.toFixed(2)}</p>
        <p className='single-product-desc'>{thisProductObjId?.product_description}</p>
        <p className='single-product-quan'>In Stock: {thisProductObjId?.product_quantity}</p>
        {sessionUserCheck?.id===thisProductObjId?.user_id && sessionLinks}
        </div>
    </div>
    <GetReviews id={id} userFind={userFind}/>
    <h1 className='other-from-seller'>You Might Also Like From {userFind?.username}:</h1>
    <div className='other-from-seller-parent'>
    {fromSeller?.map(product => (
        <div className='product-container'>
        <NavLink className='text-deco' to={`/products/${product.id}`} onClick={function () {document.documentElement.scrollTop = 0}}>
        <h3 className='product-name'>{product.product_name}</h3>
            <ul className='product-list'>
            <li className='product-price'>${product.product_price.toFixed(2)}</li>
            <li> Sold By:{userFind?.username}</li>
            <li className='product-desc'>{product.product_description}</li>
            <li className='product-quantity'>Left in Stock!: {product.product_quantity}</li>
            </ul>
        </NavLink>
        </div>
    ))}
    </div>
    </div>
)
}
