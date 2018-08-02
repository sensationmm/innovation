import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loader } from './loader';
import { ui } from './ui';
import partners from './partners';
import innovations from './innovations';
import concepts from './concepts';
import financeScores from './financeScores';
import users from './users';
import auth from './auth';
import resources from './resources';

export default combineReducers({
  router: routerReducer,
  loader,
  ui,
  resources,
  partners,
  innovations,
  concepts,
  financeScores,
  users,
  auth
});
