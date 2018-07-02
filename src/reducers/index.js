import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loader } from './loader';
import innovations from './innovations';
import portfolios from './portfolios';
import concepts from './concepts';
import auth from './auth';

export default combineReducers({
  router: routerReducer,
  loader,
  portfolios,
  innovations,
  concepts,
  auth
});
