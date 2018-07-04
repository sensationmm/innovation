import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import jwtDecode from 'jwt-decode';
import { authFromJWT } from './actions/auth';

import App from './containers/App.js';

// Check if user is authed.
const storedToken = JSON.parse(localStorage.getItem('inventure-auth'));
let isTokenInDate = storedToken !== null && storedToken.token !== null && (Date.now().valueOf() / 1000) <= jwtDecode(storedToken.token).exp;
if (isTokenInDate) {
  store.dispatch(authFromJWT());
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
