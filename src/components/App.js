import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ConfirmPopup from './ConfirmPopup';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialLoadingContext } from '../contexts/InitialLoadingContext';
import { LoadingContext } from '../contexts/LoadingContext';

import successSign from '../images/popup_success.svg'
import failedSign from '../images/popup_fail.svg'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState({sign: failedSign, text: ''});
  
  const [selectedCard, setSelectedCard] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const history = useHistory();

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    // const jwt1 = localStorage.token;
    // console.log(jwt + ' ' + typeof(jwt));
    // console.log(jwt1 + ' ' + typeof(jwt1));
     if (jwt) {
      // jwt - str
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            if (res === 401) {
              localStorage.removeItem(jwt);
            } else {
              setLoggedIn(true);
              setUserData({
                email: res.data.email,
              });
              history.push('/');
            }
          }
        })
        .catch(() => console.log({ message: 'Токен не передан или передан не в том формате' }));
    }
  };
 
  useEffect(() => tokenCheck(), []);


  const onAuth = (password, email) => auth.authorize(password, email)
  .then((data) => {
    //data - obj, token - str
    if (!data) {
      throw new Error({ message: 'Токен не передан или передан не в том формате' });
    } else {
      tokenCheck();
    }
  }).catch((err) => console.log(err));

  function onSignOut() {
    setLoggedIn(false);
  }


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

  function handleSucessfulRegister () {
    setMessage( {sign: successSign, text: 'Вы успешно зарегистрировались!'});
    setIsInfoTooltipOpen(true);
  }

  function handleFailedRegister () {
    setMessage( {sign: failedSign, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
    setIsInfoTooltipOpen(true);
  }

  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
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
            <Header onSignOut={onSignOut} email={userData.email} loggedIn={loggedIn} >             
            </Header>

              <Switch>
                <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Main} onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onTrashClick={handleTrashClick}
                  onCardLike={handleCardLike}
                  cards={cards}/>

                <Route path='/sign-in' >
                  <Login onAuth={onAuth}/>
                </Route>

                <Route path='/sign-up' >
                  <Register onSuccessfulRegister = {handleSucessfulRegister} onFailedRegister = {handleFailedRegister}/>
                </Route> 

                <Route>
                  {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
                </Route>

              </Switch>

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

              <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              mess = {message}/>

              <PopupWithImage isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
            </section>
          </CurrentUserContext.Provider>
          
        </LoadingContext.Provider>
      </InitialLoadingContext.Provider>
    </div>
  );
}

export default App;
