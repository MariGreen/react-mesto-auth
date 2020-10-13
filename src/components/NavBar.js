import React from 'react';
import { Link, useHistory } from 'react-router-dom';


const NavBar = (props) => {  
  const history = useHistory(); 

  function signOut() {
    if (props.loggedIn) {
      props.onSignOut();
      localStorage.removeItem('jwt');
      history.push('/sign-in');
    }
  }
   
 
  return (
    <nav className='header__navbar'>
      <ul className='header__nav header__link' >
      {props.loggedIn? <li>{props.email}</li> : null}
        <li> <Link to ={props.buttonLink}><button onClick={signOut} className='header__link'>{props.buttonText}</button></Link></li>
  
      </ul>
  
    </nav>
  )
}



export default NavBar