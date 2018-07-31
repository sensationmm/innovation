import {
  GET_INNOVATIONS_LIST_SUCCESS,
  GET_INNOVATION_DATA_SUCCESS,
  CREATE_INNOVATION_SUCCESS
} from '../config/constants';

const initialState = {
  activeInnovation: {
    id: 1,
    createdAt: '2018-03-23',
    innovationType: 'Portfolio Sprint',
    sprintName: 'Fake Innovation 1',
    dvPartner1: 'Steven Kentishly-Warren',
    dvPartner2: 'Bez',
    mandate: 'Tweet a lot of tweets',
    openDate: '2018-04-14',
    kickedOffAt: '2018-05-14',
    dvOffice: 'London',
    keyDates: {
      'KO': '2018-05-14',
      'IS1': '2018-06-18',
      'IS2': '2018-07-22',
      'IS3': '2018-09-01'
    },
    partner: {

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
      region: 'Europe',
      createdAt: '2018-03-23',
      innovationType: 'Portfolio Sprint',
      chargeCode: 'GF65F56',
      sprintName: 'Fake Innovation 1',
      dvPartner1: 'Steven Kentishly-Warren',
      dvPartner2: 'Bez',
      mandate: 'Tweet a lot of tweets',
      startDate: '2018-04-14',
      kickedOffAt: '2018-06-24',
      dvOffice: 'London',
      partner: 'Big Company 1',
      gm: 'Kevin Reynolds',
      keyDates: [ { name: 'KO', date: '2018-06-24' }, { name: 'IS1', date: '2018-07-30' }, { name: 'IS2', date: '2018-08-24' }, { name: 'IS3', date: '2018-09-18' } ]
    },
    {
      id: 2,
      region: 'North America',
      sprintName: 'Sprint 2',
      partner: 'Big Company 2',
      chargeCode: 'GF65D43',
      startDate: '2018-06-01',
      keyDates: [ { name: 'KO', date: '2018-08-26' }, { name: 'IS1', date: '2018-10-12' }, { name: 'IS2', date: '2018-11-01' }, { name: 'IS3', date: '2018-12-12' } ]
    },
    {
      id: 3,
      region: 'Europe',
      sprintName: 'Sprint 4',
      partner: 'Big Company 4',
      chargeCode: 'GB35F50',
      startDate: '2018-06-01',
      keyDates: []
    },
    {
      id: 3,
      region: 'APAC',
      sprintName: 'Sprint 3',
      partner: 'Big Company 3',
      chargeCode: 'GB35F50',
      startDate: '2018-06-01',
      keyDates: [ { name: 'KO', date: '2018-07-20' }, { name: 'IS1', date: '2018-08-13' }, { name: 'IS2', date: '2018-09-06' }, { name: 'IS3', date: '2018-09-30' } ]
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

    case CREATE_INNOVATION_SUCCESS: {
      const { newPartner, newInnovation } = action;
      const activeInnovation = { ...newInnovation, partner: { ...newPartner }};
      const newInnovationSummary = {
        id: 1,
        sprintName: newInnovation.sprintName,
        partner: newPartner.name,
        chargeCode: newPartner.chargeCode,
        keyDates: [ { name: 'KO', date: '2018-MM-DD' }, { name: 'IS1', date: '2018-MM-DD' }, { name: 'IS2', date: '2018-MM-DD' }, { name: 'IS3', date: '2018-MM-DD' } ]
      }
      const newInnovationsList = [ ...state.allInnovationsList, newInnovationSummary ]

      return { ...state, activeInnovation, allInnovationsList: newInnovationsList }
    }

    default:
      return state;
  }
};
