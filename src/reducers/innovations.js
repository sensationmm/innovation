import {
  GET_INNOVATIONS_LIST_SUCCESS,
  GET_INNOVATION_DATA_SUCCESS,
  CREATE_INNOVATION_SUCCESS,
  EDIT_INNOVATION_SUCCESS,
  EDIT_INNOVATION_KEYDATES_SUCCESS
} from '../config/constants';

const initialState = {
  activeInnovation: {
    keyDates: []
  },
  allInnovationsList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATIONS_LIST_SUCCESS: {
      const { partnersWithInnovations } = action;
      // Format the innovation and partner details into the shape above.
      const allInnovationsList = partnersWithInnovations.map(partnerWithInnovation => {
        return {
          partnerId: partnerWithInnovation.id,
          innovationId: partnerWithInnovation.innovation && partnerWithInnovation.innovation.id,
          sprintName: partnerWithInnovation.innovation && partnerWithInnovation.innovation.sprintName,
          partnerName: partnerWithInnovation.innovation && partnerWithInnovation.name,
          chargeCode: partnerWithInnovation.innovation.chargeCode,
          openDate: partnerWithInnovation.innovation.openDate,
          keyDates: partnerWithInnovation.innovation && partnerWithInnovation.innovation.keyDates.map(keyDate => ({ ...keyDate.attributes }))
        }
      })
      return { ...state, allInnovationsList }
    }

    case GET_INNOVATION_DATA_SUCCESS: {
      const { partner } = action;
      const keyDates = partner.innovation.keyDates.map(keyDate => keyDate.attributes);
      const partnerId = partner.id;
      const activeInnovation = { ...partner.innovation.attributes, keyDates, partnerId };
      return { ...state, activeInnovation };
    }

    case CREATE_INNOVATION_SUCCESS: {
      const { newInnovation } = action;
      const activeInnovation = { ...newInnovation };
      return { ...state, activeInnovation }
    }

    case EDIT_INNOVATION_SUCCESS: {
      const { newInnovationAttrs } = action;
      const activeInnovation = { ...state.activeInnovation, ...newInnovationAttrs };
      return { ...state, activeInnovation }
    }

    case EDIT_INNOVATION_KEYDATES_SUCCESS: {
      const { updatedInnovationKeyDates } = action;
      const activeInnovation = { ...state.activeInnovation, keyDates: updatedInnovationKeyDates };
      return { ...state, activeInnovation }
    }


    default:
      return state;
  }
};
