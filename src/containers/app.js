import React from 'react';
import { Route } from 'react-router-dom';

import Home from './home';
import Grouping from './grouping';
import Header from '../components/Header';

import '../styles/css/app.css';

const App = () => (
  <div>
    <Header />
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/grouping" component={Grouping} />
    </main>
  </div>
);

export default App;
