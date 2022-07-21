import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './index.css';
import GetProducts from '../GetProducts/GetProducts';
import {getShoppingCart } from '../../store/cart'

export default function LandingPage() {
  const user = useSelector(state => state.session.user)
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getShoppingCart(user?.id))
}, [dispatch, user?.id])

      return (
        <div>
          <div className='parent'>
            <div className='SplashBox1'>
              <h2 className='welcome'>Welcome to Equip</h2>
              <h4 className='quote'>"Restock for the dungeons ahead!"</h4>
            </div>
            <GetProducts />
          </div>
        </div>
      );
  }
