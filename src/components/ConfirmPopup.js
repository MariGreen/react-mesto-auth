import React from 'react';
import PopupWithForm from './PopupWithForm';
import { LoadingContext } from '../contexts/LoadingContext';

function ConfirmPopup(props) {
  const loading = React.useContext(LoadingContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onConfirm(props.card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <button type="submit" className="popup__delete-button">
        {loading ? `Удаление...` : `Да`}
      </button>
    </PopupWithForm>
  );
}

export default ConfirmPopup;
