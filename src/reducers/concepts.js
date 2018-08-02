import {
  GET_INNOVATION_DATA_SUCCESS,
  CREATE_CONCEPT_SUCCESS,
  EDIT_CONCEPT_SUCCESS,
  DELETE_CONCEPT_SUCCESS
} from '../config/constants';

import { removeItemByKey } from '../utils/functions';

const initialState = {
  conceptsById: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      const { partner } = action;
      const conceptsById = {};
        const innovationId = partner.innovation.id;
      partner.innovation.concepts.forEach(concept => {
        const formattedConceptAttrs = {};

        Object.keys(concept.attributes).forEach(key => {
          formattedConceptAttrs[key] = concept.attributes[key] === null ? '' : concept.attributes[key];
        })
        formattedConceptAttrs.targetIndustryId = concept.targetIndustry.id;
        conceptsById[concept.id] = { ...formattedConceptAttrs, innovationId };
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
      // Convert 'null' values which come from the API into empty strings for acceptance by controlled text input fields.
      const formattedUpdatedConcept = {};
      Object.keys(updatedConcept).forEach(key => {
        formattedUpdatedConcept[key] = updatedConcept[key] === null ? '' : updatedConcept[key];
      })
      return {
        ...state,
        conceptsById: { ...state.conceptsById, [conceptId]: formattedUpdatedConcept }
      }
    }

    case DELETE_CONCEPT_SUCCESS: {
      const { conceptId } = action;
      const conceptsById = removeItemByKey(state.conceptsById, conceptId);
      return {
        ...state,
        conceptsById
      }
    }

    default:
      return state;
  }
};
