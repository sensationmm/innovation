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

export const createConcept = (conceptData, innovationId) => async (dispatch) => {
  dispatch({ type: CREATE_CONCEPT_BEGIN });
  try {
    const newConcept = new Concept({
      name: conceptData.conceptName,
      strapline: conceptData.conceptStrapline,
      description: conceptData.conceptDescription,
      innovationId: innovationId
    })
    await newConcept.save();

    dispatch({ type: CREATE_CONCEPT_SUCCESS, newConcept: { ...newConcept.attributes } });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: CREATE_CONCEPT_ERROR });
  }
}

export const editConcept = (conceptId) => async (dispatch) => {
  dispatch({ type: EDIT_CONCEPT_BEGIN });
  try {
    dispatch({ type: EDIT_CONCEPT_SUCCESS });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: EDIT_CONCEPT_ERROR });
  }
}

// Testing.
// export const getConcepts = (portfolioId) => (dispatch) => {
//   var requestUrl = `/client-${portfolioId}.json`;
//   dispatch({ type: GET_CONCEPTS_BEGIN });
//
//   return axios({
//     method: 'get',
//     url: requestUrl,
//   }).then(function(response) {
//     if(response.data) {
//       dispatch({ type: GET_CONCEPTS_SUCCESS, concepts: response.data.concepts });
//     } else {
//       return 'Unable to fetch concepts';
//     }
//
//   }, function(response) {
//     dispatch({ type: GET_CONCEPTS_ERROR });
//     throw new Error('Unable to fetch concepts');
//   });
// }
