import React from 'react';

function HoverLikes(props) {
  return (
    <div className="element__bubble">
      <p className="element__bubble-text">
        {props.likesInfo.length > 0
          ? `Понравилось:${props.likesInfo.map((item) => {
              return ' ' + item.name;
            })}`
          : `К сожалению, это фото ещё никто не оценил`}
      </p>
    </div>
  );
}

export default HoverLikes;
