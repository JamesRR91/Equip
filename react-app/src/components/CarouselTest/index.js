import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getProducts } from '../../store/products';
import { NavLink, useParams } from 'react-router-dom';
import { addToCart } from '../../store/cart';



function CarouselTest() {
  const [currIndex, setCurrIndex] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  const productsObj = useSelector((state) => state.product.inventory);
  const products = Object.values(productsObj);
  const addItem=(e, id) => {
    e.preventDefault();
    // if(!quantity || quantity <1) {
    //     setQuantity(1)
    // } else {
    //     setQuantity(quantity+1)
    // }
    // const newCartProduct={
        //     userId: user.id,
        //     productId: productsObj[id],
        //     quantity: quantity
        // }
        // console.log('NEW PRODUCT', newCartProduct);
        dispatch(addToCart(id, user.id))
    // setQuantity(1);
}

  useEffect(() => {
    dispatch(getProducts());
}, [dispatch]);

const nextProduct= () => {
    setCurrIndex(currIndex===products.length-1 ? 0 : currIndex+1);

}

const prevProduct= () => {
    setCurrIndex(currIndex===0 ? products.length-1 : currIndex - 1);
}

console.log('CURRINDEX', currIndex);

  return (
    <div className="carousel-container">
        <button className='sel-button-prev' onClick={prevProduct}>Previous</button>
        <button className='sel-button-next' onClick={nextProduct}>Next</button>

      <div className="carousel">
      {products?.map(({ id, product_name, product_description, product_price, product_quantity, index}) => (
                <div className='carousel-card-active' key={index}>
                    <div
                    className={index === currIndex ? 'carousel-card-active' : 'carousel-card'}
                    key={index}
                    >
        {index === currIndex && (
            <section>
              <NavLink className='text-deco' to={`products/${id}`}>
             <h3 className='product-name'>{product_name}</h3>
             <ul className='product-list'>
                 <li className='product-price'>${product_price.toFixed(2)}</li>
                 <li className='product-desc'>{product_description}</li>
                 <li className='product-quantity'>Left in Stock!: {product_quantity}</li>
             </ul>
             </NavLink>
             {user?.id &&
                        <>
                            <button
                                className="modal-button"
                                type="button"
                                onClick={(e) =>addItem(e, id) }
                            >
                                Add to Cart
                                <i class="fa-regular fa-basket-shopping-simple"></i>
                            </button>
                            </>
}
            </section>
            )}
        </div>
                 </div>
            ))}
          ); */}
        })}
      </div>
    </div>
  );
}

export default CarouselTest;