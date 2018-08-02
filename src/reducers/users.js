import {
  GET_INNOVATION_DATA_SUCCESS,
  REQUEST_ALL_USERS_SUCCESS,
  REQUEST_INNOVATION_USERS_SUCCESS
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
        return role.user ? { ...role.user.attributes, roleId: role.id, roleName: role.name } : null
      } );
      return { ...state, activeInnovationUsers }
    }

    case REQUEST_ALL_USERS_SUCCESS: {
      const { inVentureUsers } = action;
      return { ...state, inVentureUsers };
    }

    case REQUEST_INNOVATION_USERS_SUCCESS: {
      const { activeInnovationUsers } = action;
      return { ...state, activeInnovationUsers };
    }

    default:
      return state;
  }
}
