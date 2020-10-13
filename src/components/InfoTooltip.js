import React from 'react';
import PopupWithForm from './PopupWithForm';



function InfoTooltip(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    
  }

  return (
    <PopupWithForm
      name="infoTooltip"
      title=""
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__info">
      <img alt={props.mess.text} src={props.mess.sign} className="popup__sign" />
      <p className='popup__title popup__title_message'>{props.mess.text}</p>
    </div>
    </PopupWithForm>
  );
}

export default InfoTooltip;