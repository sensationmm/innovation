import {
  GET_CONCEPTS_SUCCESS, // TODO: Remove if no longer required when all concept data is coming from GET_INNOVATION_DATA_SUCCESS.
  GET_INNOVATION_DATA_SUCCESS,
  CREATE_CONCEPT_SUCCESS,
  EDIT_CONCEPT_SUCCESS
} from '../config/constants';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      const { partner } = action;
      const conceptsById = {};
      partner.innovation.concepts.forEach(concept => {
        conceptsById[concept.id] = { ...concept.attributes }
      })
      return { ...state, conceptsById }
    }

    case CREATE_CONCEPT_SUCCESS: {
      const { newConcept } = action;
      const conceptsById = { ...state.conceptsById, [newConcept.id]: newConcept }
      return { ...state, conceptsById }
    }

    case EDIT_CONCEPT_SUCCESS: {
      const { conceptId, newConceptAttrs } = action;
      const updatedConcept = { ...state.conceptsById[conceptId], ...newConceptAttrs };
      return {
        ...state,
        conceptsById: { ...state.conceptsById, [conceptId]: updatedConcept }
      }
    }

    default:
      return state;
  }
};
