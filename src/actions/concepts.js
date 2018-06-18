import {
  GET_CONCEPTS_BEGIN,
  GET_CONCEPTS_SUCCESS,
  GET_CONCEPTS_ERROR
} from '../config/constants';
import axios from 'axios';

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
