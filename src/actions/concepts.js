import {
  CREATE_CONCEPT_BEGIN,
  CREATE_CONCEPT_SUCCESS,
  CREATE_CONCEPT_ERROR,
  // GET_CONCEPT_BEGIN,
  // GET_CONCEPT_SUCCESS,
  // GET_CONCEPT_ERROR,
  // GET_CONCEPTS_BEGIN,
  // GET_CONCEPTS_SUCCESS,
  // GET_CONCEPTS_ERROR,
  EDIT_CONCEPT_BEGIN,
  EDIT_CONCEPT_SUCCESS,
  EDIT_CONCEPT_ERROR,
  // DELETE_CONCEPT_BEGIN,
  // DELETE_CONCEPT_SUCCESS,
  // DELETE_CONCEPT_ERROR
} from '../config/constants';

import { Concept } from '../models';

/**
 * @param {string|int} innovationId - id of the innovation which the concept will belong to
 * @param {object} attrsToCreate - object of key / value pairs to create the new concept with
 * @param {string|int} partnerId - id of the partner which the concept will belong to
 * @param {string} redirectTo - where to redirect to once the save is complete
 */
export const createConcept = (innovationId, attrsToCreate, partnerId, redirectTo) => async (dispatch) => {
  dispatch({ type: CREATE_CONCEPT_BEGIN });
  console.log('Create concept on', innovationId);
  console.log('With', attrsToCreate);
  try {
    const newConcept = new Concept();
    console.log('fresh new concept', newConcept);
    for ( const key of Object.keys(attrsToCreate) ) {
      console.log('key', key);
      console.log('value', attrsToCreate[key]);
      newConcept[key] = attrsToCreate[key];
    }
    newConcept.innovationId = innovationId;
    console.log('newConcept to save', newConcept);
    await newConcept.save();
    console.log('saved newConcept', newConcept);
    dispatch({ type: CREATE_CONCEPT_SUCCESS, newConcept: { ...newConcept.attributes } });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: CREATE_CONCEPT_ERROR });
  }
}

/**
 * @param {int} conceptId - id of the concept to be updated
 * @param {object} newConceptAttrs - object of key / value pairs to add / overwrite on to the concept
 */
export const editConcept = (conceptId, newConceptAttrs) => async (dispatch) => {
  dispatch({ type: EDIT_CONCEPT_BEGIN });
  console.log('Edit concept', conceptId);
  console.log('With', newConceptAttrs);
  try {
    dispatch({ type: EDIT_CONCEPT_SUCCESS, conceptId, newConceptAttrs });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: EDIT_CONCEPT_ERROR });
  }
}
