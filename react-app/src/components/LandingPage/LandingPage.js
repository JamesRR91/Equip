import React from 'react';
import './index.css';
import { useSelector } from 'react-redux';

export default function LandingPage() {
    const sessionUser = useSelector((state) => state.session.user);

      return (
        <div>
          <div className='parent'>
            <div className='SplashBox1'>
              <h2 className='welcome'>Welcome to Equip</h2>
              <h4 className='quote'>"Restock for the dungeons ahead!"</h4>
            </div>
            
            <div className='SplashBox2'>
            </div>
          </div>
        </div>
      );
  }
