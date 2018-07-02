import {
  GET_INNOVATION_DATA_SUCCESS
} from '../config/constants';

const initialState = {
  activeInnovation: {
    id: null,
    name: null,
    color: null,
    location: null,
    dates: {},
    objectives: {},
    opportunityAreas: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      console.log(action.data); // TODO. This API call will also be caught on the concepts and users reducers.
      const { activePortfolio } = action.data;
      return { ...state, activePortfolio };
    }

    default:
      return state;
  }
};
