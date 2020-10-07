import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ConfirmPopup from './ConfirmPopup';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialLoadingContext } from '../contexts/InitialLoadingContext';
import { LoadingContext } from '../contexts/LoadingContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleTrashClick(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }

  function handleConfirmSubmit(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== card._id;
          })
        );
      })
      .finally(() => {
        closeAllPopups();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    setLoading(true);
    api
      .editUser(user)
      .then((data) => {
        setCurrentUser(data);
      })
      .finally(() => {
        closeAllPopups();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api
      .updateAvatar(avatar.avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .finally(() => {
        closeAllPopups();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .createCard(data)
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .finally(() => {
        closeAllPopups();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {
    Promise.all([api.getDefaultUserInfo(), api.getInitialCards()])
      .then((data) => {
        setCurrentUser(data[0]);
        setCards(data[1]);
      })
      .finally(() => {
        setInitialLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    setLoading(true);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function closeByOverlayClick(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', closeByOverlayClick);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeByOverlayClick);
    };
  });

  return (
    <div className="page">
      <InitialLoadingContext.Provider value={initialLoading}>
        <LoadingContext.Provider value={loading}>
          <CurrentUserContext.Provider value={currentUser}>
            <Header />

            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onTrashClick={handleTrashClick}
              onCardLike={handleCardLike}
              cards={cards}
            />

            <Footer />

            <section className="popups">
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />

              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

              <ConfirmPopup
                isOpen={isConfirmPopupOpen}
                onClose={closeAllPopups}
                card={selectedCard}
                onConfirm={handleConfirmSubmit}
              />

              <PopupWithImage isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
            </section>
          </CurrentUserContext.Provider>
        </LoadingContext.Provider>
      </InitialLoadingContext.Provider>
    </div>
  );
}

export default App;
