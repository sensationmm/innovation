import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest, isAuthed }) => {
  return (
    <Route {...rest} render={(props) => (
      isAuthed === 'authing'
        ? <div>Logging you in...replace with logging in animation</div>
        : isAuthed === true
          ? <Component {...props} />
          : <Redirect to='/login' />
    )} />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  isAuthed: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ])

};

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.isAuthed
  }
};

export default connect(mapStateToProps, null)(PrivateRoute);
