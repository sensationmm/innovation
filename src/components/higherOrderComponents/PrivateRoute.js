import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest, isAuthed }) => {
  return (
    <Route {...rest} render={(props) => (
      isAuthed === 'authing'
        ? <div>Logging you in...replace with logging in animation</div>
        : isAuthed === true
          ? <Component {...props} />
          : <Redirect to={`/inventure-login`} />
    )} />
  )
}

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.isAuthed
  }
};

export default connect(mapStateToProps, null)(PrivateRoute);
