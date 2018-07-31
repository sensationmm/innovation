import {
  GET_INNOVATION_DATA_SUCCESS,
  CREATE_INNOVATION_SUCCESS
} from '../config/constants';

const initialState = {
  activePartner: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      const { partner } = action;
      const activePartner = { ...partner.attributes, industryId: partner.industry.id, industryName: partner.industry.name };
      return { ...state, activePartner  };
    }

    case CREATE_INNOVATION_SUCCESS: {
      const { newPartner } = action;
      const activePartner = { ...newPartner.attributes };
      return { ...state, activePartner  };
    }

    default:
      return state;
  }
};
