import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Concept from './Concept';
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
        <Route exact path="/concept/:conceptId?" component={Concept} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </div>
);

export default App;
