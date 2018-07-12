import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import App from './containers/App.js';

import jwtDecode from 'jwt-decode';
import { authFromJWT } from './actions/auth';

const storedToken = JSON.parse(localStorage.getItem('inventure-auth'));
const isTokenInDate = storedToken !== null && storedToken.token !== null && (Date.now().valueOf() / 1000) <= jwtDecode(storedToken.token).exp;
if (isTokenInDate) {
  store.dispatch(authFromJWT(true)); // Once authed redux state can be populated.
} else {
  store.dispatch(authFromJWT(false)); // Token not present or out of date.
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
