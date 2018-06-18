import {
  GET_PORTFOLIO_BEGIN,
  GET_CONCEPTS_BEGIN,
  GET_CONCEPTS_SUCCESS,
  GET_CONCEPTS_ERROR
} from '../config/constants';

const initialState = {
  isLoading: false
};

export const loader = (state = initialState, action) => {
  switch (action.type) {
    case GET_PORTFOLIO_BEGIN:
    case GET_CONCEPTS_BEGIN:
      return {
        ...initialState,
        isLoading: true,
      };

    case GET_CONCEPTS_SUCCESS:
    case GET_CONCEPTS_ERROR:
      return initialState;

    default:
      return state;
  }
};
