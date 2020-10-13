import React from 'react';
import { Switch, Route } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
import Navbar from './NavBar';
import ProtectedRoute from './ProtectedRoute';

function Header(props) {  
  return (
    <div className="header">
      <img alt="логотип проекта" src={headerLogo} className="header__logo" />
      <Switch>
        <ProtectedRoute exact path='/' component={Navbar} loggedIn={props.loggedIn} buttonText='Выйти' buttonLink='' email={props.email} onSignOut={props.onSignOut}/>

        <Route path='/sign-in' >
          <Navbar loggedIn={props.loggedIn} buttonText='Регистрация' buttonLink='/sign-up' email={props.email} onSignOut={props.onSignOut}/>
        </Route>

        <Route path='/sign-up' >
          <Navbar loggedIn={props.loggedIn} buttonText='Войти' buttonLink='/sign-in' email={props.email} onSignOut={props.onSignOut}/>
        </Route>
      {/* <p className='header__link'>Войти</p> */}
      </Switch>
    </div>
  );
}

export default Header;
