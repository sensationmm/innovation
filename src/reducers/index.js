import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loader } from './loader';
import { ui } from './ui';
import innovations from './innovations';
import concepts from './concepts';
import users from './users';
import auth from './auth';
import resources from './resources';

export default combineReducers({
  router: routerReducer,
  loader,
  ui,
  resources,
  concepts,
  innovations,
  users,
  auth
});
