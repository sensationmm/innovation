import {
  AUTH_FROM_JWT_SUCCESS
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
