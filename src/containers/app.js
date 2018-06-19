import React from 'react';
import { Route } from 'react-router-dom';

import Home from './home';
import Grouping from './grouping';
import Header from '../components/Header';
import NotFound from '../components/NotFound';

import '../styles/css/app.css';

const App = () => (
  <div>
    <Header />
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/grouping" component={Grouping} />
      <Route component={NotFound} />
    </main>
  </div>
);

export default App;
