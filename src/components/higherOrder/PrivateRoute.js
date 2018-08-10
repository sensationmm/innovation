import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../Loader';

class PrivateRoute extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // window.scrollTo(0, 0); // Only scroll to top if the user has changes urls / pages.
    }
  }

  render() {
    const { component: Component, isAuthed, isLoading, ...rest } = this.props;
    return (
      <Route {...rest} render={(props) => (
        isAuthed === 'authing' || isLoading
          ? <Loader />
          : isAuthed === true
            ? <Component {...props} />
            : <Redirect to='/login' />
      )} />
    )
  }
}

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func,
  isAuthed: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  isLoading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.isAuthed,
    isLoading: state.loader.isLoading
  }
};

export default connect(mapStateToProps, null)(PrivateRoute);
