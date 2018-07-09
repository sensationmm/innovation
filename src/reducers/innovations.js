import {
  GET_INNOVATIONS_LIST_SUCCESS,
  GET_INNOVATION_DATA_SUCCESS
} from '../config/constants';

const initialState = {
  activeInnovation: {
    id: null,
    name: null,
    color: null,
    location: null,
    keyDates: {},
    objectives: {},
    opportunityAreas: []
  },
  allInnovationsList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      const keyDates = action.data.keyDates.map(keyDate => ( { ...keyDate.attributes } ));
      const activeInnovation = { ...action.data.attributes, keyDates };
      return { ...state, activeInnovation };
    }

    case GET_INNOVATIONS_LIST_SUCCESS: {
      let allInnovationsList = action.data.map(innovation => { return { ...innovation.attributes } })
      return { ...state, allInnovationsList }
    }

    default:
      return state;
  }
};
