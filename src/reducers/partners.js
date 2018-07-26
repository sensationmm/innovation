import {
  GET_INNOVATION_DATA_SUCCESS,
  CREATE_PARTNER_SUCCESS
} from '../config/constants';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      const { partner } = action;
      const activePartner = { ...partner.attributes };
      return { ...state, activePartner  };
    }

    default:
      return state;
  }
};
