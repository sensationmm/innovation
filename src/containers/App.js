import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import ConceptV2 from './ConceptV2';
import InnovationCreate from './InnovationCreate';
// import InnovationDashboard from './InnovationDashboard';
import ConceptCreate from './ConceptCreate';
import Grouping from './Grouping';
import Tracking from './Tracking';
import Header from '../components/Header';
import NotFound from '../components/NotFound';

import PrivateRoute from '../components/higherOrderComponents/PrivateRoute';

import '../styles/css/app.css';

const App = () => (
  <div>
    <Header />
    <main>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/concept/create" component={ConceptCreate} />
        {/* <PrivateRoute exact path="/innovation/dashboard" component={InnovationDashboard} /> */}
        <PrivateRoute exact path="/innovation/create" component={InnovationCreate} />
        <PrivateRoute exact path="/grouping" component={Grouping} />
        <PrivateRoute exact path="/tracking" component={Tracking} />
        <PrivateRoute exact path="/concept/:conceptId" component={ConceptV2} />
        <Route exact path="/inventure-login" render={() => <h1>You are not logged in (Redirect to InVenture login)</h1>} />
        <PrivateRoute component={NotFound} />
      </Switch>
    </main>
  </div>
);

export default App
