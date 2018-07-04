import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loader } from './loader';
import innovations from './innovations';
import portfolios from './portfolios';
import concepts from './concepts';
import users from './users';
import auth from './auth';

export default combineReducers({
  router: routerReducer,
  loader,
  portfolios, // TODO: Combine into innovations.
  innovations,
  concepts,
  users,
  auth
});
