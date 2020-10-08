import React from 'react';
import PopupWithForm from './PopupWithForm';
import { LoadingContext } from '../contexts/LoadingContext';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const loading = React.useContext(LoadingContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link,
    });
  }
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      className="popup__form-container"
      isCloseButtonVisible={true}
    >
      <fieldset className="popup__form-item">
        <div className="popup__form-element">
          <input
            id="place-input"
            type="text"
            name="name"
            className="popup__form-item-field popup__form-item-field_place"
            placeholder="Название"
            value={name || ''}
            onChange={handleChangeName}
            minLength="1"
            maxLength="30"
            autoComplete="off"
            required
          />
          <span id="place-input-error" className="popup__form-item popup__form-item_error"></span>
        </div>

        <div className="popup__form-element">
          <input
            id="link-input"
            type="url"
            name="link"
            className="popup__form-item-field popup__form-item-field_link"
            placeholder="Ссылка"
            value={link || ''}
            onChange={handleChangeLink}
            autoComplete="on"
            required
          />
          <span id="link-input-error" className="popup__form-item popup__form-item_error"></span>
        </div>
      </fieldset>

      <button type="submit" className="popup__save-button">
        {loading ? `Сохранение...` : `Создать`}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
