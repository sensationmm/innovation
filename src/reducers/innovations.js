import {
  GET_INNOVATIONS_LIST_SUCCESS,
  GET_INNOVATION_DATA_SUCCESS
} from '../config/constants';

const initialState = {
  activeInnovation: {
    id: 1,
    createdAt: '2018-03-23',
    innovationType: 'Portfolio Sprint',
    sprintName: 'Fake Innovation 1',
    dvPartner1: 'Steven Kentishly-Warren',
    dvPartner2: 'Bez',
    mandate: 'To smear the president at every opportunity',
    openDate: '2018-04-14',
    kickedOffAt: '2018-05-14',
    dvOffice: 'London',
    keyDates: {
      'KO': '2018-05-14',
      'IS1': '2018-06-18',
      'IS2': '2018-07-22',
      'IS3': '2018-09-01'
    }
    // objectives: {
    //   'KO': [
    //     'Objective 1',
    //     'Objective 2'
    //   ],
    //   'IS1': [
    //     'Objective 3'
    //   ],
    //   'IS2': [],
    //   'IS3': []
    // },
    // opportunityAreas: [
    //   { 'id': 1, 'name': 'Field Research' },
    //   { 'id': 2, 'name': 'Concept Tracking & Prioritising' },
    //   { 'id': 3, 'name': 'Concept Voting' },
    //   { 'id': 4, 'name': 'Venture Development' }
    // ]
  },
  allInnovationsList: [
    {
      id: 1,
      sprintName: 'Sprint 1',
      partner: 'Big Company 1',
      chargeCode: 'GF65F56',
      keyDates: [ { name: 'KO', date: 'YYY-MM-DD' }, { name: 'IS1', date: 'YYY-MM-DD' }, { name: 'IS2', date: 'YYY-MM-DD' }, { name: 'IS3', date: 'YYY-MM-DD' } ]
    },
    {
      id: 2,
      sprintName: 'Sprint 2',
      partner: 'Big Company 2',
      chargeCode: 'GF65D43',
      keyDates: [ { name: 'KO', date: 'YYY-MM-DD' }, { name: 'IS1', date: 'YYY-MM-DD' }, { name: 'IS2', date: 'YYY-MM-DD' }, { name: 'IS3', date: 'YYY-MM-DD' } ]
    },
    {
      id: 3,
      sprintName: 'Sprint 3',
      partner: 'Big Company 3',
      chargeCode: 'GB35F50',
      keyDates: [ { name: 'KO', date: 'YYY-MM-DD' }, { name: 'IS1', date: 'YYY-MM-DD' }, { name: 'IS2', date: 'YYY-MM-DD' }, { name: 'IS3', date: 'YYY-MM-DD' } ]
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      // const keyDates = action.data.keyDates.map(keyDate => ( { ...keyDate.attributes } ));
      // const activeInnovation = { ...action.data.attributes, keyDates };
      // return { ...state, activeInnovation };
      return state; // TODO: Uncomment above once api to filling redux state.
    }

    case GET_INNOVATIONS_LIST_SUCCESS: {
      // const allInnovationsList = action.data.map(innovation => { return { ...innovation.attributes } })
      // return { ...state, allInnovationsList }
      return state; // TODO: Uncomment above once api to filling redux state.
    }

    default:
      return state;
  }
};
