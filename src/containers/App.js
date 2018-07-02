import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from './Home';
import ConceptV2 from './ConceptV2';
import InnovationCreate from './InnovationCreate';
import ConceptCreate from './ConceptCreate';
import Grouping from './Grouping';
import Tracking from './Tracking';
import Header from '../components/Header';
import NotFound from '../components/NotFound';

import '../styles/css/app.css';

class App extends Component {
  render() {
    let { authedUser } = this.props;
    console.log('authedUser', authedUser);
    authedUser = true;
    return (
          authedUser === null
            ? <Redirect to='/inventure-login-tbc' />
            : (
              <div>
                <Header />
                <main>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/grouping" component={Grouping} />
                    <Route exact path="/tracking" component={Tracking} />
                    <Route exact path="/concept/create" component={ConceptCreate} />
                    <Route exact path="/concept/:conceptId?" component={ConceptV2} />
                    <Route exact path="/innovation/create" component={InnovationCreate} />
                    <Route exact path="/innovation/select" render={() => <h1>Select Innovation Screen</h1>} />
                    <Route component={NotFound} />
                  </Switch>
                </main>
              </div>
            )
    )
  }
}

const mapStateToProps = state => {
  return {
    authedUser: state.auth.authedUser
  }
};

export default connect(mapStateToProps,null)(App);
