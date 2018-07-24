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

export const createInnovation = (partnerAttrs, innovationAttrs) => async dispatch => {
  dispatch({ type: CREATE_INNOVATION_BEGIN })
  try {
    // 1. Find the industry model selected by the user.
    console.log(partnerAttrs.industry);
    // 2. Create the new Partner instance from the data, connect it to the industry and then save to API.
    const newPartner = new Partner();
    for ( const key of Object.keys(partnerAttrs) ) {
      newPartner[key] = partnerAttrs[key];
    }
    newPartner.id = Math.round(Math.random() * 999); // TODO: remove hard coded value once API generates id
    
    // await partner.save();
    console.log('newPartner', newPartner);

    // TODO: Create a new innovation, attach the new innovation to the partner instance by its id, then save.
    const newInnovation = new Innovation();
    for ( const key of Object.keys(innovationAttrs) ) {
      newInnovation[key] = innovationAttrs[key]
    }
    newInnovation.id = Math.round(Math.random() * 999); // TODO: remove hard coded value once API generates id.
    console.log('newInnovation', newInnovation);
    // newInnovation.partnerId = newPartner.id;
    // await innovation.save();

    dispatch({ type: CREATE_INNOVATION_SUCCESS, newPartner: { ...newPartner.attributes }, newInnovation: { ...newInnovation } });
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
