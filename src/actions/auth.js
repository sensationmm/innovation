import {
  AUTH_FROM_JWT_BEGIN,
  AUTH_FROM_JWT_SUCCESS,
  AUTH_FROM_JWT_ERROR,
  USER_LOGOUT_SUCCESS
} from '../config/constants';

import { getAllInnovationsList }from './innovations';
import { User } from '../models';

export const authFromJWT = (tokenPresentAndInDate) => async (dispatch) => {
  if (tokenPresentAndInDate) {
    dispatch({ type: AUTH_FROM_JWT_BEGIN })
    try {
      const user = (await User.find('me')).data;
      dispatch({ type: AUTH_FROM_JWT_SUCCESS, authedUser: { ...user.attributes } });
      dispatch(getAllInnovationsList());
      // TODO: Only do this if the user has saved an active / default innovation
      // TODO: Otherwise route to innovation select.
      // dispatch(getActiveInnovationData());  TODO: Removed to allow use of dummy data in client-1.json - via initial state of reducer.
    }
    catch (err) {
      console.log(err);
      dispatch({ type: AUTH_FROM_JWT_ERROR });
      // TODO: Redirect the user  to a login screen.
    }
  } else {
    dispatch({ type: AUTH_FROM_JWT_ERROR });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem('inventure-auth');
  dispatch({ type: USER_LOGOUT_SUCCESS });
};
