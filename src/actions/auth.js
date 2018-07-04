import {
  AUTH_FROM_JWT_BEGIN,
  AUTH_FROM_JWT_SUCCESS,
  AUTH_FROM_JWT_ERROR
} from '../config/constants';

import { push } from 'connected-react-router'
import { User } from '../models';

import { getActiveInnovationData } from './innovations';

export const authFromJWT = () => async (dispatch) => {
  dispatch({ type: AUTH_FROM_JWT_BEGIN })
  try {
    let user = (await User.find('me')).data;
    dispatch({ type: AUTH_FROM_JWT_SUCCESS, authedUser: { ...user.attributes } });
    dispatch(getActiveInnovationData(29));
  }
  catch (err) {
    console.log(err);
    dispatch({ type: AUTH_FROM_JWT_ERROR });
  }
}
