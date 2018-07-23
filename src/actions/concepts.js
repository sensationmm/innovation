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
export const createConcept = (innovationId, conceptData) => async (dispatch) => {
  dispatch({ type: CREATE_CONCEPT_BEGIN });
  console.log('Create concept on', innovationId);
  console.log('With', conceptData);
  try {
    // const newConcept = new Concept({
    //   name: conceptData.conceptName,
    //   strapline: conceptData.conceptStrapline,
    //   description: conceptData.conceptDescription,
    //   innovationId: innovationId
    // })
    // await newConcept.save();

    dispatch({ type: CREATE_CONCEPT_SUCCESS });
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
export const editConcept = (conceptId, conceptData) => async (dispatch) => {
  dispatch({ type: EDIT_CONCEPT_BEGIN });
  console.log('Edit concept', conceptId);
  console.log('With', conceptData);
  try {
    dispatch({ type: EDIT_CONCEPT_SUCCESS });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: EDIT_CONCEPT_ERROR });
  }
}
