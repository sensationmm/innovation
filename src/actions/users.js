import {
  INVITE_NEW_USER_BEGIN,
  INVITE_NEW_USER_SUCCESS,
  INVITE_NEW_USER_ERROR
} from '../config/constants';

export const inviteNewInnovationUser = (newUser) => async (dispatch) => {
  dispatch({ type: INVITE_NEW_USER_BEGIN })
  try {
    dispatch({ type: INVITE_NEW_USER_SUCCESS })
  }
  catch (err) {
    console.log(err);
    dispatch({ type: INVITE_NEW_USER_ERROR })
  }
}
