import {
  CREATE_INNOVATION_BEGIN,
  CREATE_INNOVATION_SUCCESS,
  CREATE_INNOVATION_ERROR,
  CREATE_PARTNER_SUCCESS,
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

// Import JSON API models.
import { Innovation, Partner } from '../models';
// import { Role, KeyDate } from '../models';

import { removeNullValueAttrs } from '../utils/functions';

export const getAllInnovationsList = () => async dispatch => {
  dispatch({ type: GET_INNOVATIONS_LIST_BEGIN })
  try {
    const { data } = await Innovation.select([ 'id', 'name', 'logo' ]).all()
    dispatch({ type: GET_INNOVATIONS_LIST_SUCCESS, data });
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATIONS_LIST_ERROR });
  }
}

export const getActiveInnovationData = ventureId => async dispatch => {
  dispatch({ type: GET_INNOVATION_DATA_BEGIN })
  try {
    const { data } = await Innovation.includes([
      'key_dates', { roles: 'user' }, 'concepts'
    ]).find(ventureId); // TODO: auth action is not calling this at the momemnt so as not to overwrite dummy data in redux store.
    dispatch({ type: GET_INNOVATION_DATA_SUCCESS, data });
    return data;
  }
  catch (err) {
    console.log(err);
    dispatch({ type: GET_INNOVATION_DATA_ERROR })
  }
}

export const createInnovation = (newPartner, newInnovation) => async dispatch => {
  dispatch({ type: CREATE_INNOVATION_BEGIN })
  // Remove all null attributes.
  const partnerData = removeNullValueAttrs(newPartner);
  const innovationData = removeNullValueAttrs(newInnovation);
  try {
    // 1. Create the new Partner instance from the data and then save to API.
    const partner = new Partner();
    for ( const key of Object.keys(partnerData) ) {
      partner[key] = partnerData[key];
    }
    await partner.save();

    // TODO: Create a new innovation, attach the new innovation to the partner instance by its id, then save.
    const innovation = new Innovation();
    for ( const key of Object.keys(innovationData) ) {
      innovation[key] = innovationData[key]
    }
    innovation.partnerId = partner.id;
    await innovation.save();

    dispatch({ type: CREATE_INNOVATION_SUCCESS, innovation });
    dispatch({ type: CREATE_PARTNER_SUCCESS, partner });
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
