import React from 'react';
import headerLogo from '../images/logo.svg';
import Navbar from './NavBar';

function Header(props) {
  return (
    <div className="header">
      <img alt="логотип проекта" src={headerLogo} className="header__logo" />
      <Navbar email={props.email} text={props.text} loggedIn={props.loggedIn} onSignOut={props.onSignOut}/>
      {/* <p className='header__link'>Войти</p> */}
    </div>
  );
}

export default Header;
