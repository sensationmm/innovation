import React from 'react';

import NavMain from './NavMain';

import Logo from '../images/logo-inventure.svg';
import '../styles/css/header.css';

/**
 * Header
 *
 * Site header
 */

const Header = props => (
  <header className="header">
    <div className="header-logo"><img src={Logo} alt="InVenture logo" /></div>
    <NavMain />
  </header>
);

export default Header;
