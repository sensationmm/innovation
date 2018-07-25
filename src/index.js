import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import jwtDecode from 'jwt-decode';

import App from './containers/App.js';

import { authFromJWT } from './actions/auth';
import { checkBreakPoint } from './actions/ui';

const storedToken = JSON.parse(localStorage.getItem('inventure-auth'));
const isTokenInDate = storedToken !== null && storedToken.token !== null && (Date.now().valueOf() / 1000) <= jwtDecode(storedToken.token).exp;
if (isTokenInDate) {
  store.dispatch(authFromJWT(true, storedToken.activeInnovationId)); // Once authed redux state can be populated.
} else {
  store.dispatch(authFromJWT(false)); // Token not present or out of date.
}

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
