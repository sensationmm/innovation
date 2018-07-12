import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loader } from './loader';
import innovations from './innovations';
import concepts from './concepts';
import users from './users';
import auth from './auth';

export default combineReducers({
  router: routerReducer,
  loader,
  innovations,
  concepts,
  users,
  auth
});
