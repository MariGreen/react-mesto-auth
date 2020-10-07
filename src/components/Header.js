import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <div className="header">
      <img alt="логотип проекта" src={headerLogo} className="header__logo" />
    </div>
  );
}

export default Header;
