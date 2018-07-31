import {
  GET_INNOVATION_DATA_SUCCESS,
  REQUEST_ALL_USERS_SUCCESS
} from '../config/constants';

const initialState = {
  inVentureUsers: null,
  activeInnovationUsers: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      const { partner } = action;
      const activeInnovationUsers = partner.roles.map(role => {
        return role.user ? { ...role.user.attributes } : null
      } );
      return { ...state, activeInnovationUsers }
    }

    case REQUEST_ALL_USERS_SUCCESS: {
      const { inVentureUsers } = action;
      return { ...state, inVentureUsers };
    }

    default:
      return state;
  }
}
