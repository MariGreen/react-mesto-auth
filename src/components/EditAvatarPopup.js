import React from 'react';
import PopupWithForm from './PopupWithForm';
import { LoadingContext } from '../contexts/LoadingContext';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const loading = React.useContext(LoadingContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      className="popup__form-container"
      isCloseButtonVisible={true}
    >
      <fieldset className="popup__form-item">
        <div className="popup__form-element">
          <input
            id="avatar-input"
            type="url"
            name="avatar"
            className="popup__form-item-field popup__form-item-field_avatar"
            placeholder="Новая ссылка"
            ref={avatarRef}
            autoComplete="on"
            required
          />
          <span id="avatar-input-error" className="popup__form-item popup__form-item_error"></span>
        </div>
      </fieldset>
      <button type="submit" className="popup__save-button">
        {loading ? `Сохранение...` : `Сохранить`}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
