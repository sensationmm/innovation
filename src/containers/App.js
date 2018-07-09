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

import { getActiveInnovationData, getAllInnovationsList } from '../actions/innovations';

import '../styles/css/app.css';

class App extends Component {
  render() {
    const { isAuthorised, getActiveInnovationData, getAllInnovationsList } = this.props;
    if (isAuthorised) {
      getAllInnovationsList();
      /*
      TODO
        if authedUser.activeInnovationId => get data for this innovation and re-direct
        else re-direct to innovation select screen
      */
      getActiveInnovationData();
    }
    return (
      isAuthorised
        ? (
          <div>
            <Header />
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/concept/create" component={ConceptCreate} />
                <Route exact path="/innovation/create" component={InnovationCreate} />
                <Route exact path="/innovation/select" render={() => <h1>Select Innovation Screen</h1>} />
                <Route exact path="/grouping" component={Grouping} />
                <Route exact path="/tracking" component={Tracking} />
                <Route exact path="/concept/:conceptId?" component={ConceptV2} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </div>
        )
        : (
          <div>
            <Header />
            <main>
              You are not logged in - this needs to be a redirect or replication of the login process
            </main>
          </div>
        )
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthorised: state.auth.isAuthorised
  }
};

const mapDispatchToProps = dispatch => ({
  getAllInnovationsList: bindActionCreators(getAllInnovationsList, dispatch),
  getActiveInnovationData: bindActionCreators(getActiveInnovationData, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
