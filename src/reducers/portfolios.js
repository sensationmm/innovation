import {
  GET_PORTFOLIO_SUCCESS
} from '../config/constants';

const initialState = {
  activePortfolio: {
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
    case GET_PORTFOLIO_SUCCESS: {
      const { activePortfolio } = action;

      delete activePortfolio.concepts;

      return {
        ...state,
        activePortfolio
      };
    }
    
    default:
      return state;
  }
};
