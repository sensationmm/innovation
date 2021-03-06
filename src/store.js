import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Config from './config/index';

export const history = createBrowserHistory({ basename: '/innovation' });

const connectedRouterReducer = connectRouter(history)(rootReducer)

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

if (Config.env !== 'production') {
  if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
  }
}


const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(connectedRouterReducer, initialState, composedEnhancers);
