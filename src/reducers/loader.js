import {
  GET_CONCEPTS_BEGIN,
  GET_CONCEPTS_SUCCESS,
  GET_CONCEPTS_ERROR,
  GET_INNOVATION_DATA_BEGIN,
  GET_INNOVATION_DATA_SUCCESS,
  GET_INNOVATION_DATA_ERROR
} from '../config/constants';

const initialState = {
  isLoading: false
};

export const loader = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONCEPTS_BEGIN:
    case GET_INNOVATION_DATA_BEGIN:
      return {
        ...initialState,
        isLoading: true,
      };

    case GET_CONCEPTS_SUCCESS:
    case GET_CONCEPTS_ERROR:
    case GET_INNOVATION_DATA_SUCCESS:
    case GET_INNOVATION_DATA_ERROR:
      return initialState;

    default:
      return state;
  }
};
