import {
  EDIT_PARTNER_BEGIN,
  EDIT_PARTNER_SUCCESS,
  EDIT_PARTNER_ERROR
} from '../config/constants';

// Import JSON API models.
import { Partner } from '../models';

export const editPartner = (partnerId, newPartnerAttrs, saveToDB) => async dispatch => {
  dispatch({ type: EDIT_PARTNER_BEGIN })
  if (saveToDB) {
    try {
      const partnerToUpdate = (await Partner.find(partnerId)).data;
      for ( const key of Object.keys(newPartnerAttrs) ) {
        partnerToUpdate[key] = newPartnerAttrs[key];
      }
      await partnerToUpdate.save();
      dispatch({ type: EDIT_PARTNER_SUCCESS }) // TODO: Do we need to pass anything here? This branch of action only runs on submit, and changes have already been saved into redux by the other branch of the conditional.
    }
    catch (err) {
      console.log(err);
      dispatch({ type: EDIT_PARTNER_ERROR })
    }
  } else {
    dispatch({ type: EDIT_PARTNER_SUCCESS, partnerId, newPartnerAttrs });
  }

}
