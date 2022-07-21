import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateShoppingCart } from '../../store/cart'

const CartFunc = ({ item, shoppingCart, product, deleteCartProduct }) => {
  const [quantity, setQuantity] = useState(item?.quantity)
  const dispatch = useDispatch()

  console.log('FUNC ITEM', item);
  console.log('TEST FUNC ITEM', item?.id);
  console.log('FUNC CART', shoppingCart);
  console.log('TEST FUNC CART', shoppingCart?.id)
  console.log('FUNC PRODUCT', product);
  console.log('DELETE FUNC', deleteCartProduct);
  console.log('FUNC QUANTITY', quantity);
  console.log('TEST FUNC QUAN', item?.quantity)

  useEffect(() => {
    dispatch(updateShoppingCart(item?.id, quantity, shoppingCart?.id))
  }, [dispatch, quantity, item?.id, shoppingCart?.id])

  return (
    <div className="item-span" key={item?.productId}>
      <div className="item-content">
        <div className="item-details">
          <h2 className="product-name">{product?.product_name}</h2>
          <p className="item-p" id="item-franchise">{product?.product_description}</p>
        </div>
        <div className="item-changes">
          <div className="item-price">
            <div className="price-element">
              <p className="item-p">$ {product?.product_price}</p>
            </div>
            <div className="price-element">
              <p className="item-p">x</p>
            </div>
            <div className="price-element">
              <p className="item-p">Quantity:</p>
            </div>
            <div className="quantity-modifier">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setQuantity(quantity + 1);
                }}
              >
                <i className="fas fa-angle-up"></i>
              </button>
              <p className="item-p">{item?.quantity}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setQuantity(quantity - 1);
                  if (quantity <= 1) setQuantity(1);
                }}
              >
                <i className="fas fa-angle-down"></i>
              </button>
            </div>
            <div className="price-element">
              <p className="item-p">$ {product?.product_price * item?.quantity}</p>
            </div>
          <div className="remove-btn-div">
            <button
              className="remove-button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const confirmed = window.confirm(`remove ${product.product_name} from your cart?`)
                if(confirmed) deleteCartProduct(product);
              }}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartFunc;