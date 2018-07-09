import {
  CREATE_CONCEPT_SUCCESS,
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
      let conceptsById = {};
      let conceptIds = [];
      action.data.concepts.forEach(concept => {
        conceptsById[concept.id] = { ...concept.attributes };
        conceptIds.push(concept.id)
      })
      return { ...state, conceptsById, conceptIds }
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

    case CREATE_CONCEPT_SUCCESS: {
      const { newConcept } = action;
      const conceptsById = { ...state.conceptsById, [newConcept.id]: newConcept }
      const conceptIds = [ ...state.conceptIds, newConcept.id ]
      return { ...state, conceptsById, conceptIds }
    }

    default:
      return state;
  }
};
