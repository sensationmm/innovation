import {
  AUTH_FROM_JWT_BEGIN,
  AUTH_FROM_JWT_SUCCESS,
  AUTH_FROM_JWT_ERROR,
  USER_LOGOUT_SUCCESS
} from '../config/constants';

import jwtDecode from 'jwt-decode';

import { getAppResourceData } from './resources';
import { getAllInnovationsList } from './innovations';
import { getAllUsers } from './users';

import { User } from '../models';

export const authFromJWT = () => async (dispatch) => {
  const storedToken = JSON.parse(localStorage.getItem('inventure-auth'));
  const isTokenInDate = storedToken !== null &&
                        storedToken.token !== null &&
                        (Date.now().valueOf() / 1000) <= jwtDecode(storedToken.token).exp;

  if (isTokenInDate) {
    dispatch({ type: AUTH_FROM_JWT_BEGIN })
    try {
      const user = (await User.find('me')).data;
      dispatch({ type: AUTH_FROM_JWT_SUCCESS, authedUser: { ...user.attributes } });
      dispatch(getAppResourceData());
      dispatch(getAllInnovationsList());
      dispatch(getAllUsers());
    }
    catch (err) {
      console.log(err);
      dispatch({ type: AUTH_FROM_JWT_ERROR });
    }
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem('inventure-auth');
  dispatch({ type: USER_LOGOUT_SUCCESS });
};
