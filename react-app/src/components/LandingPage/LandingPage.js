import React from 'react';
import './index.css';
import GetProducts from '../GetProducts/GetProducts';

export default function LandingPage({cartItem, handleClickPlus}) {

      return (
        <div>
          <div className='parent'>
            <div className='SplashBox1'>
              <h2 className='welcome'>Welcome to Equip</h2>
              <h4 className='quote'>"Restock for the dungeons ahead!"</h4>
            </div>
            <GetProducts cartItem={cartItem} handleClickPlus={handleClickPlus}/>
          </div>
        </div>
      );
  }
