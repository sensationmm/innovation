import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import App from './containers/App.js';

import { getPortfolio } from './actions/portfolios';
import { getConcepts } from './actions/concepts';
import { checkBreakPoint } from './actions/ui';

store.dispatch(getPortfolio(1));
store.dispatch(getConcepts(1));

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
