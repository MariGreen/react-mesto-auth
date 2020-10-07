import React from 'react';
import HoverLikes from './HoverLikes';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoadingContext } from '../contexts/LoadingContext';

function Card(props) {
  const [isHoverLikesVisible, setIsHoverLikesVisible] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const loading = React.useContext(LoadingContext);

  const { card } = props;
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? '' : 'element__like_black'}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleTrashClick() {
    props.onTrashClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleMouseToggle() {
    setIsHoverLikesVisible(!isHoverLikesVisible);
  }

  return (
    <div className="element">
      {isOwn && <button type="submit" className="element__trash" onClick={handleTrashClick}></button>}
      <img alt={card.name} className="element__picture" src={card.link} onClick={handleClick} />
      <div className="element__data">
        {isHoverLikesVisible && <HoverLikes likesInfo={card.likes} />}
        <h3 className="element__place">{card.name}</h3>

        <div className="element__info">
          <button
            type="submit"
            className={cardLikeButtonClassName}
            onMouseEnter={handleMouseToggle}
            onMouseLeave={handleMouseToggle}
            onClick={handleLike}
            disabled={loading}
          ></button>
          <p className="element__likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
