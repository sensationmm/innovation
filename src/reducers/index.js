import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loader } from './loader';
import { ui } from './ui';
import portfolios from './portfolios';
import concepts from './concepts';

export default combineReducers({
  router: routerReducer,
  loader,
  ui,
  portfolios,
  concepts
});
