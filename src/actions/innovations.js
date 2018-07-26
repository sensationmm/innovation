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
  EDIT_INNOVATION_BEGIN,
  EDIT_INNOVATION_SUCCESS,
  EDIT_INNOVATION_ERROR,
  EDIT_INNOVATION_KEYDATES_BEGIN,
  EDIT_INNOVATION_KEYDATES_SUCCESS,
  EDIT_INNOVATION_KEYDATES_ERROR,
  // DELETE_INNOVATION_BEGIN,
  // DELETE_INNOVATION_SUCCESS,
  // DELETE_INNOVATION_ERROR
} from '../config/constants';

import { push } from 'connected-react-router';
import moment from 'moment';

// Import JSON API models.
import { Innovation, Partner, KeyDate } from '../models';

export const getAllInnovationsList = () => async dispatch => {
  dispatch({ type: GET_INNOVATIONS_LIST_BEGIN })
  try {
    // Need the following data for the dashboard page: innovation { sprintName, charge code, keyDates, partnerName }.
    const partnersWithInnovations = (await Partner.includes({ innovation: [ 'key_dates' ]})
                                                  .select([ "name", "charge_code" ])
                                                  .all()).data;
    console.log('partnersWithInnovations', partnersWithInnovations);
    dispatch({ type: GET_INNOVATIONS_LIST_SUCCESS, partnersWithInnovations });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATIONS_LIST_ERROR });
  }
}

export const getActiveInnovationData = partnerId => async dispatch => {
  dispatch({ type: GET_INNOVATION_DATA_BEGIN })
  try {
    const partner = (await Partner.includes({
      'innovation': [ 'key_dates', 'concepts' ] // TODO: roles: users should be on the partner.
    }).find(partnerId)).data;
    dispatch({ type: GET_INNOVATION_DATA_SUCCESS, partner });
    // TODO: Store the now active innovation id in the JWT token.
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATION_DATA_ERROR })
  }
}

export const createInnovation = (partnerAttrs, innovationAttrs) => async (dispatch, getState) => {
  dispatch({ type: CREATE_INNOVATION_BEGIN })
  try {
    const newPartner = new Partner();
    for ( const key of Object.keys(partnerAttrs) ) {
      newPartner[key] = partnerAttrs[key];
    }
    await newPartner.save();

    const newInnovation = new Innovation();
    for ( const key of Object.keys(innovationAttrs) ) {
      newInnovation[key] = innovationAttrs[key];
    }
    newInnovation.partnerId = newPartner.id;
    await newInnovation.save();

    dispatch({ type: CREATE_INNOVATION_SUCCESS, newPartner: { ...newPartner.attributes }, newInnovation: { ...newInnovation.attributes } });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: CREATE_INNOVATION_ERROR })
  }
}

export const editInnovation = (innovationId, newInnovationData) => dispatch => {
  console.log('editInnovation', innovationId, newInnovationData);
  dispatch({ type: EDIT_INNOVATION_BEGIN })
  try {
    console.log('editInnovation action');
    dispatch({ type: EDIT_INNOVATION_SUCCESS })
  }
  catch (err) {
    console.log(err);
    dispatch({ type: EDIT_INNOVATION_ERROR })
  }
}

export const editKeyDates = (innovationId, editedKeyDates) => async (dispatch) => {
  console.log('editKeyDates', innovationId, editedKeyDates);
  dispatch({ type: EDIT_INNOVATION_KEYDATES_BEGIN })
  try {
    for ( const keyDate of editedKeyDates ) {
      if (keyDate.fromDB) {
        let updatedKeyDate = (await KeyDate.find(keyDate.id)).data
        updatedKeyDate.name = keyDate.name;
        updatedKeyDate.date = moment(keyDate.date).format('YYYY-MM-DD');
        await updatedKeyDate.save();
      } else {
        let newKeyDate = new KeyDate({
          name: keyDate.name,
          date: moment(keyDate.date).format('YYYY-MM-DD'),
          keyDatableType: 'Innovation',
          keyDatableId: innovationId
        })
        console.log('newKeyDate to save', newKeyDate);
        await newKeyDate.save();
      }
    }
    // Get a new fresh list of all the key dates.
    const updatedInnovationKeyDates = (await KeyDate.where({ key_datable_id: innovationId }).all()).data;
    console.log('updatedInnovationKeyDates', updatedInnovationKeyDates);
    dispatch({ type: EDIT_INNOVATION_KEYDATES_SUCCESS, updatedInnovationKeyDates })
  }
  catch (err) {
    dispatch({ type: EDIT_INNOVATION_KEYDATES_ERROR })
  }
}
