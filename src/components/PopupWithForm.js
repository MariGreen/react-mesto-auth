import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form
        name={props.name}
        action="#"
        method="POST"
        className="popup__form-container"
        noValidate
        onSubmit={props.onSubmit}
      >
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
      </form>
    </div>
  );
}

export default PopupWithForm;
