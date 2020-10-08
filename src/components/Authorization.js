import React from 'react';

function Authorization(props) {
  return (
    <div className={`auth auth_${props.name}`}>
      <form
        name={props.name}
        action="#"
        method="POST"
        className="auth__container"
        noValidate
        onSubmit={props.onSubmit}
      >
        <h2 className="auth__title">{props.title}</h2>      
        {props.children}
      </form>
    </div>
  );
}

export default Authorization;