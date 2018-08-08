import {
  GET_INNOVATION_DATA_SUCCESS,
  CREATE_CONCEPT_SUCCESS,
  EDIT_CONCEPT_SUCCESS,
  DELETE_CONCEPT_SUCCESS,
  ADD_CONCEPT_CANVAS_SUCCESS
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
      const partnerId = partner.id;

      partner.innovation.concepts.forEach(concept => {
        const formattedConcept = {};

        Object.keys(concept.attributes).forEach(key => {
          formattedConcept[key] = concept.attributes[key] === null ? '' : concept.attributes[key]; // Setting null attributes to '' so not to have an issue passing them to text inputs.
        })
        formattedConcept.targetIndustryId = concept.targetIndustry.id;
        const canvases = concept.canvasesAttachments.map(canvas => canvas.url);
        conceptsById[concept.id] = { ...formattedConcept, innovationId, partnerId, canvases };
      })

      return { ...state, conceptsById }
    }

    case CREATE_CONCEPT_SUCCESS: {
      const { newConcept } = action;
      console.log('newConcept', newConcept);
      const formattedNewConcept = {};
      Object.keys(newConcept).forEach(key => {
        formattedNewConcept[key] = newConcept[key] === null ? '' : newConcept[key];
      })

      const conceptsById = { ...state.conceptsById, [newConcept.id]: formattedNewConcept }
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

    case ADD_CONCEPT_CANVAS_SUCCESS: {
      const { addPreviews, conceptId } = action;

      const updatedConcept = { ...state.conceptsById[conceptId] };

      if(updatedConcept.canvases) {
        for(const preview of addPreviews) {
          updatedConcept.canvases.push(preview);
        }
      }

      return {
        ...state,
        conceptsById: { ...state.conceptsById, [conceptId]: updatedConcept }
      }
    }

    default:
      return state;
  }
};
