import {
  GET_CONCEPTS_SUCCESS
} from '../config/constants';

const initialState = {
  conceptsById: {},
  conceptIds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONCEPTS_SUCCESS: {
      const conceptsById = {};
      const conceptIds = [];

      action.concepts.forEach(concept => {
        conceptIds.push(concept.id);
        conceptsById[concept.id] = concept;
      });

      return {
        ...state,
        conceptsById,
        conceptIds
      };
    }

    default:
      return state;
  }
};
