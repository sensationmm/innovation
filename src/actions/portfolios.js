import {
  GET_PORTFOLIO_BEGIN,
  GET_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_ERROR
} from '../config/constants';
import axios from 'axios';

export const getPortfolio = (portfolioId) => (dispatch) => {
  var requestUrl = `/client-${portfolioId}.json`;
  dispatch({ type: GET_PORTFOLIO_BEGIN });
  
  return axios({
    method: 'get',
    url: requestUrl,
  }).then(function(response) {
    if(response.data) {
      dispatch({ type: GET_PORTFOLIO_SUCCESS, activePortfolio: response.data });
    } else {
      return 'Unable to fetch portfolio';
    }

  }, function(response) {
    dispatch({ type: GET_PORTFOLIO_ERROR });
    throw new Error('Unable to fetch portfolio');
  });
}
