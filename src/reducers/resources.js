import {
  GET_RESOURCE_DATA_SUCCESS
} from '../config/constants';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_RESOURCE_DATA_SUCCESS: {
      const { industries, dvOffices, targetIndustries } = action;
      return { ...state, industries, dvOffices, targetIndustries };
    }

    default:
      return state;
  }
};
