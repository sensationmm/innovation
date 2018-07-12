import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store, { history } from '../store';

import Home from './Home';
import ConceptV2 from './ConceptV2';
import InnovationCreate from './InnovationCreate';
import ConceptCreate from './ConceptCreate';
import Grouping from './Grouping';
import Tracking from './Tracking';
import Header from '../components/Header';
import NotFound from '../components/NotFound';

import PrivateRoute from './PrivateRoute';

import '../styles/css/app.css';

class App extends Component {
  componentDidMount = () => {
    // Check if a valid token is stored.
    const storedToken = JSON.parse(localStorage.getItem('inventure-auth'));
    let isTokenInDate = storedToken !== null && storedToken.token !== null && (Date.now().valueOf() / 1000) <= jwtDecode(storedToken.token).exp;
    if (isTokenInDate) {
      store.dispatch(authFromJWT()); // Once authed redux state can be populated.
    }
  }

  render() {
    console.log('this.props app', this.props);
    const { isAuthed } = this.props;
    return (
      <div>
        <Header />
        <main>
          {
            isAuthed === "authing"
              ? <div>Logging you in...replace with 'logging in animation'</div>
              : (
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/concept/create" component={ConceptCreate} />
                  <PrivateRoute exact path="/innovation/create" component={InnovationCreate} />
                  <PrivateRoute exact path="/innovation/select" render={() => <h1>Select Innovation Screen</h1>} />
                  <PrivateRoute exact path="/grouping" component={Grouping} />
                  <PrivateRoute exact path="/tracking" component={Tracking} />
                  <PrivateRoute exact path="/concept/:conceptId" component={ConceptV2} />
                  <Route exact path="/inventure-login" render={() => <h1>You are not logged in (Redirect to InVenture login)</h1>} />
                  <PrivateRoute component={NotFound} />
                </Switch>
              )
          }
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.isAuthed
  }
};

export default connect(mapStateToProps, null)(App);
