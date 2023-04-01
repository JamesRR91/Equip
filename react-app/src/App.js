import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import LandingPage from './components/LandingPage/LandingPage';
import { authenticate } from './store/session';
import PostProduct from './components/PostProduct/PostProduct';
import SingleProduct from './components/SingleProduct/SingleProduct';
import EditProduct from './components/EditProductModal/EditProduct';
import CartFunc from './components/CartFunc/CartFunc';
import { getProducts } from './store/products'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const productsObj = useSelector((state) => state.product.inventory);
  const products = Object.values(productsObj);

  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
}, [dispatch]);

  //   const handleClickPlus = (products) => {
  //     const isNewProduct = cartItem.find((item) => item.id === products.id);
  //     if (isNewProduct) {
  //         setCartItem(cartItem.map((item) => item.id === products.id ?
  //             { ...isNewProduct, quantity: isNewProduct.quantity + 1 } : item)
  //         );
  //     } else {
  //         setCartItem([...cartItem, { ...products, quantity: 1 }])
  //     }
  // }

  //   const handleClickMinus = (product) => {
  //     const theProduct=cartItem.find((item) =>item.id === product.id);
  //     if(theProduct.quantity===1) {
  //         setCartItem(cartItem.filter((item) => item.id !== product.id))
  //     } else {
  //         setCartItem(cartItem.map((item) =>item.id===product.id ? {...theProduct, quantity:theProduct.quantity - 1}: item))
  //     }
  // }

  // const cartTotal = cartItem.reduce((price, item) => price + item.quantity * item.price, 0);

  // const clearCart = () => {
  //     setCartItem([]);
  // }

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded} cartItem={cartItem} />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true}>
          <LandingPage />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route exact path="/create_product">
        <PostProduct />
        </Route>
        <Route path='/products/:id' >
        <SingleProduct />
        </Route>
        <Route exact path='/products/:id/edit'>
        <EditProduct />
        </Route>
        <Route path='/cart'>
        <CartFunc/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
