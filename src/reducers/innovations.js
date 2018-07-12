import {
  GET_INNOVATIONS_LIST_SUCCESS,
  GET_INNOVATION_DATA_SUCCESS
} from '../config/constants';


const initialState = {
  activeInnovation: {
    id: 1,
    name: "InVenture",
    color: "#ff0000",
    location: "London",
    keyDates: {
      "KO": "2018-05-14",
      "IS1": "2018-06-18",
      "IS2": "2018-08-12",
      "IS3": "2018-09-01"
    },
    objectives: {
      "KO": [
        "Objective 1",
        "Objective 2"
      ],
      "IS1": [
        "Objective 3"
      ],
      "IS2": [],
      "IS3": []
    },
    opportunityAreas: [
      { "id": 1, "name": "Field Research" },
      { "id": 2, "name": "Concept Tracking & Prioritising" },
      { "id": 3, "name": "Concept Voting" },
      { "id": 4, "name": "Venture Development" }
    ]
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
