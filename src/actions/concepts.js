import {
  CREATE_CONCEPT_BEGIN,
  // CREATE_CONCEPT_SUCCESS,
  // CREATE_CONCEPT_ERROR,
  // GET_CONCEPT_BEGIN,
  // GET_CONCEPT_SUCCESS,
  // GET_CONCEPT_ERROR,
  GET_CONCEPTS_BEGIN,
  GET_CONCEPTS_SUCCESS,
  GET_CONCEPTS_ERROR,
  // UPDATE_CONCEPT_BEGIN,
  // UPDATE_CONCEPT_SUCCESS,
  // UPDATE_CONCEPT_ERROR,
  // DELETE_CONCEPT_BEGIN,
  // DELETE_CONCEPT_SUCCESS,
  // DELETE_CONCEPT_ERROR
} from '../config/constants';

import axios from 'axios';

export const createConcept = (newConcept) => (dispatch) => {
  dispatch({ type: CREATE_CONCEPT_BEGIN })
  console.log('Creating a concept with: ', newConcept);
}

// Testing.
export const getConcepts = (portfolioId) => (dispatch) => {
  var requestUrl = `/client-${portfolioId}.json`;
  dispatch({ type: GET_CONCEPTS_BEGIN });

  return axios({
    method: 'get',
    url: requestUrl,
  }).then(function(response) {
    if(response.data) {
      dispatch({ type: GET_CONCEPTS_SUCCESS, concepts: response.data.concepts });
    } else {
      return 'Unable to fetch concepts';
    }

  }, function(response) {
    dispatch({ type: GET_CONCEPTS_ERROR });
    throw new Error('Unable to fetch concepts');
  });
}
