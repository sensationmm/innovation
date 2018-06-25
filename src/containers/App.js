import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import ConceptV2 from './ConceptV2';
import Grouping from './Grouping';
import Header from '../components/Header';
import NotFound from '../components/NotFound';

import '../styles/css/app.css';

const App = () => (
  <div>
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/grouping" component={Grouping} />
        <Route exact path="/concept/:conceptId?" component={ConceptV2} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </div>
);

export default App;
