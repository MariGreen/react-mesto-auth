import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form
        name={props.name}
        action="#"
        method="POST"
        className={props.className}
        noValidate
        onSubmit={props.onSubmit}
      >
        {props.isCloseButtonVisible && <button type="button" className="popup__close-button" onClick={props.onClose}></button>}
        <h2 className="popup__title ">{props.title}</h2>
        {props.children}
      </form>
    </div>
  );
}

export default PopupWithForm;
