import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoadingContext } from '../contexts/LoadingContext';
import PopupWithForm from './PopupWithForm';

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
  evt.preventDeault()

  if(!email|| !password) {
    return;
  }

  onAuth(email, password)
  .then(()=> resetForm)
  .then(() => history.push('/'))
  .catch((err) => setMessage(err || 'Неудачно'));
};

return (
  <PopupWithForm
      name="login"
      title="Вход"
      isOpen={true}
      isCloseButtonVisible={false}
      className="popup__form-container popup__form-container_ivvert"
      // onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-item">
        <div className="popup__form-element">
          <input
            id="email-input"
            type="email"
            name="email"
            className="popup__form-item-field popup__form-item-field_place"
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
            className="popup__form-item-field popup__form-item-field_link"
            placeholder="Пароль"
            value={password || ''}
            onChange={handleChangePassword}
            autoComplete="on"
            required
          />
          <span id="password-input-error" className="popup__form-item popup__form-item_error"></span>
        </div>
      </fieldset>

      <button type="submit" className="popup__save-button">
        {loading ? `Заходим...` : `Войти`}
      </button>
      <div className='popup__form_singup'>
        <p className='popup__form-item'>Ещё не зарегистрированы?</p>
        {/* <Link to='/sing_up' className='popup__form-item'>Регистрация
        </Link> */}

      </div>

    </PopupWithForm>
)

}

export default Login;