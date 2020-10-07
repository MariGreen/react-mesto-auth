import React from 'react';

function PopupWithImage(props) {
  return (
    <div className={`popup popup__preview popup_dark-background ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
        <p className="popup__image-caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default PopupWithImage;
