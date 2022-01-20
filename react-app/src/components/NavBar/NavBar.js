
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton.js';
import PostProduct from '../PostProduct/PostProduct';
import "./NavBar.css"

const NavBar = ({loaded}) => {
  const sessionUser= useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
            <div id="profileButton">
                <ProfileButton user={sessionUser}/>
            </div>
            <div className='post-product-button'>
            </div>
          </li>
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
        <ul>
          <li>
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
