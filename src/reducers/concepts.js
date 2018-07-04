import {
  GET_CONCEPTS_SUCCESS, // TODO: Remove if no longer required when all concept data is coming from GET_INNOVATION_DATA_SUCCESS.
  GET_INNOVATION_DATA_SUCCESS
} from '../config/constants';

const initialState = {
  conceptsById: {},
  conceptIds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      console.log('GET_INNOVATION_DATA_SUCCESS concepts', action.data);
      let conceptsById = { 23: { name: "dummy" } };
      return { ...state, conceptsById }
    }
    case GET_CONCEPTS_SUCCESS: { // TODO: Remove if no longer required when all concept data is coming from GET_INNOVATION_DATA_SUCCESS.
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
