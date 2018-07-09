import {
  AUTH_FROM_JWT_BEGIN,
  AUTH_FROM_JWT_SUCCESS,
  AUTH_FROM_JWT_ERROR
} from '../config/constants';

import { getAllInnovationsList, getActiveInnovationData}from './innovations';
import { User } from '../models';

export const authFromJWT = () => async (dispatch) => {
  dispatch({ type: AUTH_FROM_JWT_BEGIN })
  try {
    let user = (await User.find('me')).data;
    dispatch({ type: AUTH_FROM_JWT_SUCCESS, authedUser: { ...user.attributes } });
    dispatch(getAllInnovationsList());
    dispatch(getActiveInnovationData()); // TODO: Only do this if the user has saved an active / default innovation
    return true;
  }
  catch (err) {
    console.log(err);
    dispatch({ type: AUTH_FROM_JWT_ERROR });
    // TODO: Redirect the user  to a login screen.
    return false
  }
}
