import {
  AUTH_FROM_JWT_BEGIN,
  AUTH_FROM_JWT_SUCCESS,
  AUTH_FROM_JWT_ERROR
} from '../config/constants';

const initialState = {
  authedUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FROM_JWT_SUCCESS: {
      return { authedUser: { ...action.authedUser } }
    }

    default:
      return state;
  }
}
