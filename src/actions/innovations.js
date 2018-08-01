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
                                                  .select([ 'name', 'charge_code' ])
                                                  .all()).data;
    dispatch({ type: GET_INNOVATIONS_LIST_SUCCESS, partnersWithInnovations });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATIONS_LIST_ERROR });
  }
}

export const getActiveInnovationData = (partnerId) => async dispatch => {
  dispatch({ type: GET_INNOVATION_DATA_BEGIN })
  try {
    const partner = (await Partner.includes([
      { innovation: [ 'key_dates', { concepts: [ 'finance_scores', 'target_industry' ] } ] },
      { roles: 'user' },
      'industry'
    ]).find(partnerId)).data;

    dispatch({ type: GET_INNOVATION_DATA_SUCCESS, partner });

    // TODO: You may need to clear this attribute on the token (and the activeInnovationData) when the user returns to the dashboard?
    const storedToken = JSON.parse(localStorage.getItem('inventure-auth'));
    storedToken.activePartnerId = partnerId;
    const newToken = JSON.stringify(storedToken);
    localStorage.setItem('inventure-auth', newToken);
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
    dispatch(getActiveInnovationData(newPartner.id));
    // Redirect to the newly created active innovation overview
    dispatch(push(`/innovation-overview/${newInnovation.partnerId}`));
    dispatch(getAllInnovationsList());
  }
  catch (err) {
    console.log(err);
    dispatch({ type: CREATE_INNOVATION_ERROR })
  }
}

export const editInnovation = (innovationId, newInnovationAttrs, saveToDB) => async dispatch => {
  dispatch({ type: EDIT_INNOVATION_BEGIN })
  if (saveToDB) {
    try {
      const innovationToUpdate = (await Innovation.find(innovationId)).data;
      for ( const key of Object.keys(newInnovationAttrs) ) {
        innovationToUpdate[key] = newInnovationAttrs[key];
      }
      await innovationToUpdate.save();
      dispatch({ type: EDIT_INNOVATION_SUCCESS }) // TODO: Do we need to pass anything here? This branch of action only runs on submit, and changes have already been saved into redux by the other branch of the conditional.
    }
    catch (err) {
      console.log(err);
      dispatch({ type: EDIT_INNOVATION_ERROR })
    }
  } else {
    dispatch({ type: EDIT_INNOVATION_SUCCESS, innovationId, newInnovationAttrs });
  }

}

export const editKeyDates = (innovationId, editedKeyDates) => async (dispatch) => {
  dispatch({ type: EDIT_INNOVATION_KEYDATES_BEGIN })
  try {
    for ( const keyDate of editedKeyDates ) {
      if (keyDate.fromDB) {
        if (keyDate.hasChanged) {
          const updatedKeyDate = (await KeyDate.find(keyDate.id)).data
          updatedKeyDate.name = keyDate.name;
          updatedKeyDate.date = moment(keyDate.date).format('YYYY-MM-DD');
          await updatedKeyDate.save();
        }

        if (keyDate.forDeletion) {
          const dateToDelete = (await KeyDate.find(keyDate.id)).data
          await dateToDelete.destroy();
        }

      } else {
        const newKeyDate = new KeyDate({
          name: keyDate.name,
          date: moment(keyDate.date).format('YYYY-MM-DD'),
          keyDatableType: 'Innovation',
          keyDatableId: innovationId
        })
        await newKeyDate.save();
      }

    }
    // Get a new fresh list of all the key dates.
    const updatedInnovation = (await Innovation.includes('key_dates').find(innovationId)).data;
    const updatedInnovationKeyDates = updatedInnovation.keyDates.map(keyDate => ({ ...keyDate.attributes }));
    dispatch({ type: EDIT_INNOVATION_KEYDATES_SUCCESS, updatedInnovationKeyDates })
  }
  catch (err) {
    dispatch({ type: EDIT_INNOVATION_KEYDATES_ERROR })
  }
}
