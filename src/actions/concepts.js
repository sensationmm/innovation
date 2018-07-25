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
 * @param {int} innovationId - id of the innovation which the concept will belong to
 * @param {object} conceptData - object of key / value pairs to create the new concept with
 */
export const createConcept = (innovationId, attrsToCreate) => async (dispatch) => {
  dispatch({ type: CREATE_CONCEPT_BEGIN });
  console.log('Create concept on', innovationId);
  console.log('With', attrsToCreate);
  try {
    const newConcept = new Concept();
    for ( const key of Object.keys(attrsToCreate) ) {
      newConcept[key] = attrsToCreate[key];
    }
    // await newConcept.save();
    newConcept.status = 'active'; // TODO: remove hard coded value when API is generating IDs.
    newConcept.id = Math.round(Math.random() * 999); // TODO: remove hard coded value when API is generating IDs.
    dispatch({ type: CREATE_CONCEPT_SUCCESS, newConcept });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: CREATE_CONCEPT_ERROR });
  }
}

/**
 * @param {int} conceptId - id of the concept to be updated
 * @param {object} conceptData - object of key / value pairs to add / overwrite on to the concept
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
