import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import jwtDecode from 'jwt-decode';

import App from './containers/App.js';

import { authFromJWT } from './actions/auth';
import { checkBreakPoint } from './actions/ui';

store.dispatch(authFromJWT());

//Detect resize
window.addEventListener('resize', () => store.dispatch(checkBreakPoint()) );

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
