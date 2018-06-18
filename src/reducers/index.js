import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loader } from './loader';
import portfolios from './portfolios';
import concepts from './concepts';

export default combineReducers({
  router: routerReducer,
  loader,
  portfolios,
  concepts
});
