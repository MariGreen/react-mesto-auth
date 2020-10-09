import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoadingContext } from '../contexts/LoadingContext';
import Authorization from './Authorization';
import * as auth from '../utils/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();
  const loading = React.useContext(LoadingContext);

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // if(password !== confirmPassword) {
    //   setMessage('Пароли должны совпадать');
    //   return;
    // }
    auth.register(email, password).then((res)=> {
      if (res.statusCode !== 400) {
        setMessage('');
        history.push('/sign-in/');
      } else{
        setMessage('Что-то пошло не так' || res.message[0].messages[0].message);
      }
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
        <Link to='/sign-in' className='auth__form-item'>Войти
        </Link>
      </div>

  </Authorization>
  )

}

export default Register;