import React from 'react';
import PopupWithForm from './PopupWithForm';
import successSign from '../images/popup_success.svg'


function SuccessPopup(props) {
  

  function handleSubmit(evt) {
    evt.preventDefault();
    
  }

  return (
    <PopupWithForm
      name="success"
      title=""
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__success">
      <img alt="успешная регистраця" src={successSign} className="popup__sign" />
      <p className='popup__title'>Вы успешно зарегистрировались!</p>
    </div>
    </PopupWithForm>
  );
}

export default SuccessPopup;