import {
  AUTH_FROM_JWT_SUCCESS,
  AUTH_FROM_JWT_ERROR
} from '../config/constants';

const initialState = {
  authedUser: null,
  isAuthed: 'authing'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FROM_JWT_SUCCESS: {
      return { ...state, authedUser: { ...action.authedUser }, isAuthed: true }
    }

    case AUTH_FROM_JWT_ERROR: {
      return { ...state, isAuthed: false }
    }

    default:
      return state;
  }
}
