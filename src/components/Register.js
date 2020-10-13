import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoadingContext } from '../contexts/LoadingContext';

import Authorization from './Authorization';
import * as auth from '../utils/auth';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = React.useContext(LoadingContext);  
  const history = useHistory();  



  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    
    auth.register(email, password).then((response)=> {
      if (response.status !== 400) {
        props.onSuccessfulRegister();        
        history.push('/sign-in/');        
      } else {
        throw new Error ('Something went wrong');        
      }
    })
    .catch((err) => {
      console.log(err);
      props.onFailedRegister();
    });
  };

  return (
    <Authorization 
  name="registration"
  title="Регистрация"
  onSubmit={handleSubmit}>
    <fieldset className="popup__form-item">
       <div className="popup__form-element">
         <input
          id="email-input"
          type="email"
          name="email"
          className="popup__form-item-field popup__form-item-field_invert popup__form-item-field_email"
          placeholder="Email"
          value={email || ''}
          onChange={handleChangeEmail}
          minLength="1"
          maxLength="30"
          autoComplete="off"
          required
        />
        <span id="email-input-error" className="popup__form-item popup__form-item_error"></span>
      </div>

      <div className="popup__form-element">
        <input
          id="password-input"
          type="password"
          name="password"
          className="popup__form-item-field popup__form-item-field_invert popup__form-item-field_password"
          placeholder="Пароль"
          value={password || ''}
          onChange={handleChangePassword}
          autoComplete="on"
          required
        />
        <span id="password-input-error" className="popup__form-item popup__form-item_error"></span>
      </div>
    </fieldset>
    <button type="submit" className="popup__save-button popup__save-button_invert">
        {loading ? `Регистрация...` : `Зарегистрироваться`}
      </button>
      <div className='auth__form_singup'>
        <p className='auth__form-item'>Уже зарегистрированы?</p>
        <Link to='/sign-in' className='auth__form-item auth__form-item_link'>Войти
        </Link>
      </div>

  </Authorization>
  )

}

export default Register;