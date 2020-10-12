import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const NavBar = (props) => {  
  const history = useHistory();
 

  let Nadpis = ''
  props.loggedIn ? Nadpis = 'Выйти' : Nadpis = 'Вход';
  
  function signOut () {
    
    props.onSignOut();
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    
  }
  return (
    <nav className='header__navbar'>
      <ul className='header__nav'>
      {props.loggedIn? <li>{props.email}</li> : <li></li>}
        <li> <button onClick={signOut} className='header__link'>{Nadpis}</button></li>
  
      </ul>
  
    </nav>
  )
}



export default NavBar