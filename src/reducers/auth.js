import {
  AUTH_FROM_JWT_SUCCESS,
  AUTH_FROM_JWT_ERROR,
  GET_INNOVATION_DATA_SUCCESS
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

    case GET_INNOVATION_DATA_SUCCESS: {
      const { partner } = action;
      const authedRole = partner.roles.find(role => role.user.email === state.authedUser.email);
      if (authedRole) {
        // Update the authedUser object with the correct role for the active innovation.
        const updatedAuthedUser = {
          roleId: authedRole.id,
          roleName: authedRole.name,
          id: authedRole.user.id,
          name: authedRole.user.name,
          email: authedRole.user.email
        }
        return { ...state, authedUser: { ...updatedAuthedUser } }
      } else {
        return { ...state }
      }
    }

    default:
      return state;
  }
}
