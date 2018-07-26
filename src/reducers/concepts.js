import {
  GET_CONCEPTS_SUCCESS, // TODO: Remove if no longer required when all concept data is coming from GET_INNOVATION_DATA_SUCCESS.
  GET_INNOVATION_DATA_SUCCESS,
  CREATE_CONCEPT_SUCCESS,
  EDIT_CONCEPT_SUCCESS
} from '../config/constants';

const initialState = {
  conceptsById: {
    1: {
      'id': 1,
      'name': 'Venture View',
      'status': 'reviewed',
      'ident': 'VV',
      'strapline': `Your venture's progress at a glance`,
      'description': 'A web app to support the creation and lifecycle of concepts for a possible venture. Ideation can easily create 100 concepts. This application takes those concepts and gives clarity into the voting process, the progression of ideas, and ultimately the conversion of a concept into a venture or its demise.',
      'logo': { 'preview': '/favicon.ico' },
      'image': '',
      'color': '#33FF66',
      'marketSegment': 'Large corporates',
      'marketFriction': 'Analysing a venture is complicated and hard',
      'marketSize': '65 billion',
      'targetCustomers': 'Large corporates that want start up like adaptability',
      'targetIndustry': 'Venture Capital',
      'targetGeography': 'Worldwide',
      'solutionDescription': 'A web app to support the creation and lifecycle of concepts for a possible venture. Ideation can easily create 100 concepts. This application takes those concepts and gives clarity into the voting process, the progression of ideas, and ultimately the conversion of a concept into a venture or its demise.',
      'primaryTechnology': 'Web application',
      'successFactors': 'It should be good',
      'keyRisks': 'No one is interested',
      'businessType': 'platform',
      'salesChannel': 'b2b',
      'revenueModel': 'client fees',
      'unitEconomics': 'Development vs utility',
      'corporateAdvantage': 'Access to data and resources',
      'leveragedAssets': 'Experienced tech teams',
      'incubationCost': '6 million',
      'breakEvenCost': '8 million',
      'breakEvenYear': '2020',
      'willGMLeave': 'yes',
      'gmConviction': 4,
      'gmComments': 'I am certain that this will work',
      'partnerPreferences': 'Internal partners like regular updates',
      'VFTConceptScore': 2,
      'VFTComments': 'comment about the concept',
      'VFTSolutionScore': 0,
      'VFTModelScore': 2,
      'VFTMarketScore': 1,
      'VFTAdvantageScore': 0,
      'createdAt': '2018-07-21',
      'killedAt': null
    },
    2: {
      'id': 2,
      'name': 'Venture View Vote',
      'status': 'active',
      'ident': 'VO',
      'strapline': 'Voting on a concept',
      'description': 'A tool to help promote or eliminate venture concepts. Concepts up for voting are displayed in a useful window that details key elements of the idea. People involved in the voting process submit their vote which is registered in the tool. These results then decide the outcome of that particular concept.',
      'logo': '',
      'image': '',
      'color': '#5588dd',
      'archetype': 'social',
      'opportunityArea': 2,
      'matrix': 'digitalattacker',
      'technology': 'iot',
      'confidence': '36',
      'createdAt': '2018-05-14',
      'killedAt': null,
      'pivotedAt': '2018-07-21'
    },
    3: {
      'id': 3,
      'name': 'HAUQs & DUVs',
      'status': 'killed',
      'ident': 'HD',
      'strapline': 'Validating and reducing risk',
      'description': 'A tool to help incubate and progress ventures while minimising risk. Risk bubbles are created by adding HAUQs which are then subsequently reduced through the work defined by DUVs. As risk is reduced the bubble gets smaller until no risk remains.',
      'logo': '',
      'image': '',
      'color': '#123987',
      'archetype': 'cloud',
      'opportunityArea': 3,
      'matrix': 'reengineer',
      'technology': 'ai',
      'confidence': '89',
      'createdAt': '2018-05-14',
      'mergedAt': '2018-06-18'
    },
    4: {
      'id': 4,
      'name': 'InField',
      'status': 'active',
      'ident': 'IF',
      'strapline': 'Verify a concept idea with a live consultant',
      'description': 'Speak with a live consultant via a 2-way video chat. Consultants are hand selected to have specific knowledge of your market space.',
      'logo': '',
      'image': '',
      'color': '#0693cf',
      'archetype': 'marketplace',
      'opportunityArea': 2,
      'matrix': 'reimagine',
      'technology': 'blockchain',
      'confidence': '18',
      'createdAt': '2018-05-14',
      'killedAt': '2018-08-12'
    },
    5: {
      'id': 5,
      'name': 'ConsultMe',
      'status': 'complete',
      'ident': 'CM',
      'strapline': 'Data collection tool',
      'description': 'This allows the team to research and define the validity of concepts.',
      'logo': '/images/cm.png',
      'image': '',
      'color': '#343434',
      'archetype': 'consulting',
      'opportunityArea': 3,
      'matrix': 'reimagine',
      'technology': 'ml',
      'confidence': '52',
      'createdAt': '2018-05-14',
      'killedAt': null,
      'mergedAt': '2018-06-18'
    },
    6: {
      'id': 6,
      'name': 'Idea Generator',
      'status': 'active',
      'ident': 'IG',
      'strapline': 'Automatically generates new ideas',
      'description': 'Let the Idea Generator do all of the heavy lifting for you. No need to come up with your own concepts, just enter a market space and a number and click generate!',
      'logo': '',
      'image': '',
      'color': '#787878',
      'archetype': 'saas',
      'opportunityArea': 3,
      'matrix': 'reimagine',
      'technology': 'ml',
      'confidence': '27',
      'createdAt': '2018-05-14',
      'mergedAt': '2018-07-24'
    },
    7: {
      'id': 7,
      'name': 'Koncept Killer',
      'status': 'killed',
      'ident': 'KK',
      'strapline': 'A way to quickly validate a concept',
      'description': 'An quick and easy way to kill bad concepts.',
      'logo': '/images/kk.png',
      'image': '',
      'color': '#E1E1E1',
      'archetype': 'saas',
      'opportunityArea': 2,
      'matrix': 'digitalattacker',
      'technology': 'ai',
      'confidence': '76',
      'createdAt': '2018-06-18',
      'killedAt': null
    },
    8: {
      'id': 8,
      'name': 'Innovation Visual',
      'status': 'killed',
      'ident': 'IV',
      'strapline': 'Represent a concept as an image',
      'description': 'Sort of like a collage this tool takes a concept and retrieves images from Google Image and creates a mood board.',
      'logo': '',
      'image': '',
      'color': '#8F451A',
      'archetype': 'saas',
      'opportunityArea': 2,
      'matrix': 'reengineer',
      'technology': 'iot',
      'confidence': '34',
      'createdAt': '2018-05-14',
      'killedAt': null,
      'splitAt': '2018-06-18'
    },
    9: {
      'id': 9,
      'name': 'QuickLogo',
      'status': 'complete',
      'ident': 'QL',
      'strapline': 'Quickly generate a logo for your concept',
      'description': 'Using interpretive machine learning this app takes the description and strapline of your idea and creates a colourful logo.',
      'logo': '/images/ql.png',
      'image': '',
      'color': '#6F9999',
      'archetype': 'cloud',
      'opportunityArea': 2,
      'matrix': 'newbusinesses',
      'technology': 'iot',
      'confidence': '65',
      'createdAt': '2018-06-18',
      'killedAt': null
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      const { partner } = action;
      const conceptsById = {};
      partner.innovation.concepts.forEach(concept => {
        conceptsById[concept.id] = { ...concept.attributes }
      })
      return { ...state, conceptsById }
    }
    // case GET_CONCEPTS_SUCCESS: { // TODO: Remove if no longer required when all concept data is coming from GET_INNOVATION_DATA_SUCCESS.
    //   const conceptsById = {};
    //
    //   action.concepts.forEach(concept => {
    //     conceptsById[concept.id] = concept;
    //   });
    //
    //   return { ...state, conceptsById };
    // }

    case CREATE_CONCEPT_SUCCESS: {
      const { newConcept } = action;
      const conceptsById = { ...state.conceptsById, [newConcept.id]: newConcept }
      return { ...state, conceptsById }
    }

    case EDIT_CONCEPT_SUCCESS: {
      const { conceptId, newConceptAttrs } = action;
      const updatedConcept = { ...state.conceptsById[conceptId], ...newConceptAttrs };
      return {
        ...state,
        conceptsById: { ...state.conceptsById, [conceptId]: updatedConcept }
      }
    }

    default:
      return state;
  }
};
