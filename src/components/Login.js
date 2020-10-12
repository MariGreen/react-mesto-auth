import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoadingContext } from '../contexts/LoadingContext';
import Authorization from './Authorization';

// import { register, authorize, getContent } from '../utils/auth';

const Login = ({onAuth}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

const history = useHistory();
const loading = React.useContext(LoadingContext);

function handleChangeEmail(evt) {
  setEmail(evt.target.value);

}

function handleChangePassword(evt) {
  setPassword(evt.target.value);
}

const resetForm = () => {
  setEmail('');
  setPassword('');
  setMessage('');
};

const handleSubmit = (evt) => {
  evt.preventDefault();  
  if(!email|| !password) {    
    return;
  }

  onAuth(password, email )//email and password est
  .then(()=> resetForm)
  .then(() => history.push('/'))
  .catch((err) => setMessage(err || 'Неудачно'));
};

return (

  <Authorization 
  name="login"
  title="Вход"
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
        {loading ? `Заходим...` : `Войти`}
      </button>
      <div className='auth__form_singup'>
        <p className='auth__form-item'>Ещё не зарегистрированы?</p>
        <Link to='/sing-up' className='auth__form-item'>Регистрация
        </Link>
      </div>

  </Authorization>
  
)

}

export default Login;