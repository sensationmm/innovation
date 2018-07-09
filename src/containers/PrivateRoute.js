import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { component: Component } = this.props;
    const { isAuthed, ...rest } = this.props;
    return (
      <Route
        render={props => (isAuthed
            ? <Component { ...props } />
            : <Redirect to={`/inventure-login`} />
        )}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.isAuthed
  }
};

export default connect(mapStateToProps, null)(PrivateRoute);
