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
  DELETE_CONCEPT_BEGIN,
  DELETE_CONCEPT_SUCCESS,
  DELETE_CONCEPT_ERROR
} from '../config/constants';

import { Concept } from '../models';
import { push } from 'connected-react-router';

/**
 * @param {string|int} innovationId - id of the innovation which the concept will belong to
 * @param {object} attrsToCreate - object of key / value pairs to create the new concept with
 * @param {string|int} partnerId - id of the partner which the concept will belong to
 * @param {string} redirectTo - where to redirect to once the save is complete
 */
export const createConcept = (innovationId, attrsToCreate, redirectTo) => async (dispatch) => {
  dispatch({ type: CREATE_CONCEPT_BEGIN });
  try {
    const newConcept = new Concept();
    for ( const key of Object.keys(attrsToCreate) ) {
      newConcept[key] = attrsToCreate[key];
    }
    newConcept.innovationId = innovationId;
    await newConcept.save();
    dispatch({ type: CREATE_CONCEPT_SUCCESS, newConcept: { ...newConcept.attributes } });
    dispatch(push(redirectTo));
  }
  catch (err) {
    console.log(err);
    dispatch({ type: CREATE_CONCEPT_ERROR });
  }
}

/**
 * @param {int} conceptId - id of the concept to be updated
 * @param {object} newConceptAttrs - object of key / value pairs to add / overwrite on to the concept
 * @param {bool} saveToDB - if true then write to DB via API, otherwise write to redux store only.
 */
export const editConcept = (conceptId, newConceptAttrs, saveToDB) => async (dispatch) => {
  dispatch({ type: EDIT_CONCEPT_BEGIN });
  if (saveToDB) {
    try {
      const conceptToUpdate = (await Concept.find(conceptId)).data;
      for ( const key of Object.keys(newConceptAttrs) ) {
        conceptToUpdate[key] = newConceptAttrs[key];
      }
      await conceptToUpdate.save();
      dispatch({ type: EDIT_CONCEPT_SUCCESS, conceptId, newConceptAttrs: { ...conceptToUpdate.attributes } });
    }
    catch (err) {
      console.log(err);
      dispatch({ type: EDIT_CONCEPT_ERROR });
    }
  } else {
    dispatch({ type: EDIT_CONCEPT_SUCCESS, conceptId, newConceptAttrs });
  }
}

/**
 * @param {int} conceptId - id of the concept to be deleted
 * @param {string} redirectTo - where to go once the concept is deleted
 */
 export const deleteConcept = (conceptId, redirectTo) => async dispatch => {
   dispatch({ type: DELETE_CONCEPT_BEGIN });
   try {
     const conceptToDelete = (await Concept.find(conceptId)).data;
     await conceptToDelete.destroy()
     // TODO: It may be better to just call the API again here for a fresh list of concepts.
     // Using something like Concept.where(innovationId).all()
     dispatch({ type: DELETE_CONCEPT_SUCCESS, conceptId });
     dispatch(push(redirectTo))
   }
   catch (err) {
     dispatch({ type: DELETE_CONCEPT_ERROR });
   }
 }
