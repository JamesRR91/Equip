
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton.js';
import GetCartModal from '../GetCart';
import "./NavBar.css"

const NavBar = ({loaded}) => {
  const sessionUser= useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='session-row'>
        <ul className='bar-list'>
        <li className='nav-element'>
        <NavLink className="home-nav" to='/create_product' exact={true} activeClassName='active'>
        Add A Product
        </NavLink>
        </li>
        <li className='nav-element'>
          <GetCartModal />
        </li>
        <li className='nav-element'>
            <div id="dropdown">
                <ProfileButton user={sessionUser}/>
            </div>
            </li>
        </ul>
            </div>
    );

  } else {
    sessionLinks = (
      <>
        <div className='login-button'>
          <NavLink className="login" to='/login' exact={true} activeClassName='active'>
              Login
          </NavLink>
        </div>
        <div className='login-button'>
            <NavLink className="signup" to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
        </div>
      </>
    );
  }
  return (
    <div className="nav-container">
      <nav>
      <ul className='nav-list'>
      <a href="https://linkedin.com/in/james-roberts-10a3ba111">
      <i className='fab fa-linkedin-in'></i>
      </a>
      <a href="https://github.com/JamesRR91">
      <i className='fab fa-github'></i>
      </a>
          <li className='nav-element'>
            <NavLink className="home-nav" to='/' exact={true} activeClassName='active'>
              Equip
            </NavLink>
          </li>
          {loaded && sessionLinks}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
