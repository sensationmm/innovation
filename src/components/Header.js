import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { userLogout } from '../actions/auth';

// import NavMain from './NavMain';

import Logo from '../images/logo-inventure.svg';
import '../styles/css/header.css';

/**
 * Header
 *
 * Site header
 */

class Header extends Component {
  constructor() {
    super();
    this.state = {
      navActive: false, //mobile toggle,
      didSignOut: false
    };
  }

  userLogout = () => {
    this.props.userLogout();
    this.setState({
      didSignOut: true
    });
  }

  toggleNav = () => {
    this.setState({
      ...this.state,
      navActive: !this.state.navActive
    });
  }

  render() {
    const { navActive, didSignOut } = this.state;

    if (didSignOut) {
      window.location = '/';
    }

    return (
      <header className="header">
        <div className="header-logo"><img src={Logo} alt="InVenture logo" /></div>

        <div className={classnames('header-nav', { active: navActive })}>
          <nav className="navbar flex-center">
            <div className="content-links">
              <div className="app-switcher" onClick={() => window.location = '/incubation'}>
                Switch to Incubation
              </div>
              <ul>
                <li>
                  <button className="button-nostyle" onClick={this.userLogout}>Sign out</button>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="header-nav-toggle" onClick={this.toggleNav}><i className="fas fa-bars"></i></div>

        {/*<NavMain />*/}
      </header>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userLogout: bindActionCreators(userLogout, dispatch)
});

Header.propTypes = {
  userLogout: PropTypes.func
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
