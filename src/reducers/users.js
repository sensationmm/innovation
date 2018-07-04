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
      console.log('GET_INNOVATION_DATA_SUCCESS users', action.data);
      let activeInnovationUsers = [];
      return { ...state, activeInnovationUsers }
    }

    default:
      return state;
  }
}
