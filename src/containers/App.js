import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import ConceptV2 from './ConceptV2';
import Grouping from './Grouping';
import Tracking from './Tracking';
import Canvas from './Canvas';
import CanvasV2 from './CanvasV2';
import Schedule from './Schedule';
import Header from '../components/Header';
import NotMobile from '../components/NotMobile';
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

        <Route exact path="/tracking" component={Tracking} />
        <Route exact path="/schedule" component={Schedule} />
        <Route exact path="/canvas" component={Canvas} />
        <Route exact path="/canvas2" component={CanvasV2} />

        <Route component={NotMobile} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </div>
);

export default App;
