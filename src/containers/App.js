import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import InnovationOverview from '../components/innovation/InnovationOverview';
import ConceptOverviewV2 from './ConceptOverviewV2';
import InnovationCreate from './InnovationCreate';
import ConceptFinanceReport from './ConceptFinanceReport';
import InnovationDashboard from './InnovationDashboard';
import ConceptCreate from './ConceptCreate';
import Grouping from './Grouping';
import Tracking from './Tracking';
import Canvas from './Canvas';
import CanvasV2 from './CanvasV2';
import InnovationCalendar from './InnovationCalendar';
import AlertPopup from '../components/layout/AlertPopup';
import CommentConfirmUpdate from '../components/layout/CommentConfirmUpdate';
import Header from '../components/Header';
import NotMobile from '../components/NotMobile';
import NotFound from '../components/NotFound';

import PrivateRoute from '../components/higherOrder/PrivateRoute';

import '../styles/css/app.css';

const App = () => (
  <div>
    <Header />
    <main>
      <Switch>
        <Redirect exact from='/' to='/dashboard' />

        <PrivateRoute exact path="/dashboard" component={InnovationDashboard} />
        <PrivateRoute exact path="/innovation-overview/:partnerId?" component={InnovationOverview} />
        <PrivateRoute exact path="/create-innovation" component={InnovationCreate} />
        <PrivateRoute exact path="/create-concept/:innovationId" component={ConceptCreate} />
        <PrivateRoute exact path="/vft-concept-report/:conceptId" component={ConceptFinanceReport} />
        <PrivateRoute exact path="/grouping" component={Grouping} />
        <PrivateRoute exact path="/tracking" component={Tracking} />
        <PrivateRoute exact path="/innovation-calendar" component={InnovationCalendar} />
        <PrivateRoute exact path="/canvas" component={Canvas} />
        <PrivateRoute exact path="/canvas2" component={CanvasV2} />
        <PrivateRoute exact path="/concept/:conceptId" component={ConceptOverviewV2} />
        <PrivateRoute exact path="/no-mobile" component={NotMobile} />
        <Route path='/login' component={() => window.location = '/'}/>

        <PrivateRoute component={NotFound} />
      </Switch>
    </main>
    <AlertPopup />
  </div>
);

export default App
