import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


const NavBar = (props) => {  
  const history = useHistory();
  const [buttonClassName, setButtonClassName] = React.useState('');

  useEffect(() => props.loggedIn ? setButtonClassName('header__link header__link_loggedIn') : setButtonClassName('header__link'), [props.loggedIn])
  

  function signOut() {
    if (props.loggedIn) {
      props.onSignOut();
      localStorage.removeItem('jwt');
      history.push('/sign-in');
    }
  }
     
 
  return (
    <nav className='header__navbar'>
      <ul className='header__nav' >
      {props.loggedIn? <li className='header__item'>{props.email}</li> : null}
        <li className='header__item'> <Link to ={props.buttonLink}>
          <button onClick={signOut} className={buttonClassName}>{props.buttonText}</button></Link></li>
  
      </ul>
  
    </nav>
  )
}



export default NavBar