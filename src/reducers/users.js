import {
  GET_INNOVATION_DATA_SUCCESS
} from '../config/constants';

const initialState = {
  inVentureUsers: null,
  activeInnovationUsers: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      const activeInnovationUsers = action.data.roles.map(({ user }) => { return { ...user.attributes } } );
      return { ...state, activeInnovationUsers }
    }

    default:
      return state;
  }
}
