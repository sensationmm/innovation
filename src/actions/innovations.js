import {
  CREATE_INNOVATION_BEGIN,
  CREATE_INNOVATION_SUCCESS,
  CREATE_INNOVATION_ERROR,
  GET_INNOVATION_DATA_BEGIN,
  GET_INNOVATION_DATA_SUCCESS,
  GET_INNOVATION_DATA_ERROR,
  GET_INNOVATIONS_LIST_BEGIN,
  GET_INNOVATIONS_LIST_SUCCESS,
  GET_INNOVATIONS_LIST_ERROR,
  UPDATE_INNOVATION_BEGIN,
  UPDATE_INNOVATION_SUCCESS,
  UPDATE_INNOVATION_ERROR,
  // DELETE_INNOVATION_BEGIN,
  // DELETE_INNOVATION_SUCCESS,
  // DELETE_INNOVATION_ERROR
} from '../config/constants';

import { push } from 'connected-react-router';

// Import JSON API models.
import { Innovation, Partner } from '../models';
// import { Role, KeyDate } from '../models';

export const getAllInnovationsList = () => async dispatch => {
  dispatch({ type: GET_INNOVATIONS_LIST_BEGIN })
  try {
    // Need the following data for the dashboard page: innovation { name, charge code, keyDates, partnerName }.
    // TODO: with keyDates.
    let { data } = await Partner.select([ "name", "description"]).all();
    // const allInnovations = (await Par.select([ 'id', 'name', 'chargeCode' ]).all()).data;
    console.log('allInnovations action', data);
    dispatch({ type: GET_INNOVATIONS_LIST_SUCCESS, allInnovations: [ ...data ] });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATIONS_LIST_ERROR });
  }
}

export const getActiveInnovationData = innovationId => async dispatch => {
  dispatch({ type: GET_INNOVATION_DATA_BEGIN })
  try {
    const { data } = await Innovation.includes([
      'key_dates', { roles: 'user' }, 'concepts'
    ]).find(innovationId); // TODO: auth action is not calling this at the momemnt so as not to overwrite dummy data in redux store.
    dispatch({ type: GET_INNOVATION_DATA_SUCCESS, data });
    // TODO: Store the now active innovation id in the JWT token.
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATION_DATA_ERROR })
  }
}

export const createInnovation = (partnerAttrs, innovationAttrs) => async (dispatch, getState) => {
  console.log('new innovation with', innovationAttrs);
  dispatch({ type: CREATE_INNOVATION_BEGIN })
  try {
    const newPartner = new Partner();
    for ( const key of Object.keys(partnerAttrs) ) {
      newPartner[key] = partnerAttrs[key];
    }
    await newPartner.save();


    const newInnovation = new Innovation();
    for ( const key of Object.keys(innovationAttrs) ) {
      console.log('key', key);
      console.log('innovationAttrs[key]', innovationAttrs[key]);
      newInnovation[key] = innovationAttrs[key];
    }

    newInnovation.partnerId = newPartner.id;
    console.log('newInnovation about to save', newInnovation);
    await newInnovation.save();
    console.log('newInnovation', newInnovation);

    dispatch({ type: CREATE_INNOVATION_SUCCESS, newPartner: { ...newPartner.attributes }, newInnovation: { ...newInnovation.attributes } });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: CREATE_INNOVATION_ERROR })
  }
}

export const editInnovation = (innovationId, newInnovationData) => dispatch => {
  dispatch({ type: UPDATE_INNOVATION_BEGIN })
  try {
    console.log('editInnovation action');
    dispatch({ type: UPDATE_INNOVATION_SUCCESS })
  }
  catch (err) {
    console.log(err);
    dispatch({ type: UPDATE_INNOVATION_ERROR })
  }
}
