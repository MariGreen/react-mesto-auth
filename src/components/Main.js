import React from 'react';
import Card from './Card';
import Loader from './Loader';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialLoadingContext } from '../contexts/InitialLoadingContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const initialLoading = React.useContext(InitialLoadingContext);

  return (
    <div className="content">
      <section className="profile">
        <div className="profile__avatar-edit" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt="фото пользователя" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            aria-label="редактировать профиль"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__vocation">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="добавить фото"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      {initialLoading && <Loader />}

      <section className="elements" aria-label="секция с фотографиями">
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              onCardClick={props.onCardClick}
              key={card._id}
              onTrashClick={props.onTrashClick}
              onCardLike={props.onCardLike}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Main;
