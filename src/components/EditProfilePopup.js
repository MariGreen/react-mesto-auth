import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoadingContext } from '../contexts/LoadingContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const loading = React.useContext(LoadingContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-item">
        <div className="popup__form-element">
          <input
            id="name-input"
            type="text"
            name="name"
            className="popup__form-item-field popup__form-item-field_name"
            placeholder="Имя"
            value={name || ''}
            onChange={handleChangeName}
            minLength="2"
            maxLength="40"
            autoComplete="off"
            required
          />
          <span id="name-input-error" className="popup__form-item popup__form-item_error"></span>
        </div>

        <div className="popup__form-element">
          <input
            id="vocation-input"
            type="text"
            name="vocation"
            className="popup__form-item-field popup__form-item-field_vocation"
            placeholder="О себе"
            value={description || ''}
            onChange={handleChangeDescription}
            minLength="2"
            maxLength="200"
            autoComplete="off"
            required
          />
          <span id="vocation-input-error" className="popup__form-item popup__form-item_error"></span>
        </div>
      </fieldset>
      <button type="submit" className="popup__save-button">
        {loading ? `Сохранение...` : `Сохранить`}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
