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
      console.log('partner roles', partner);
      const activeInnovationUsers = partner.roles.map(({ user }) => { return { ...user.attributes } } );
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
