import {
  CREATE_CONCEPT_SUCCESS,
  GET_CONCEPTS_SUCCESS, // TODO: Remove if no longer required when all concept data is coming from GET_INNOVATION_DATA_SUCCESS.
  GET_INNOVATION_DATA_SUCCESS
} from '../config/constants';

const initialState = {
  conceptsById: {
    1: {
      "id": 1,
      "name": "Venture View",
      "ident": "VV",
      "strapline": "Your venture's progress at a glance",
      "description": "A web app to support the creation and lifecycle of concepts for a possible venture. Ideation can easily create 100 concepts. This application takes those concepts and gives clarity into the voting process, the progression of ideas, and ultimately the conversion of a concept into a venture or its demise.",
      "logo": "/favicon.ico",
      "image": "",
      "color": "#33FF66",
      "archetype": "marketplace",
      "opportunityArea": 1,
      "matrix": "digitalattacker",
      "technology": "ml",
      "confidence": "72",
      "createdAt": "2018-07-21",
      "killedAt": null
    },
    2: {
      "id": 2,
      "name": "Venture View Vote",
      "ident": "VO",
      "strapline": "Voting on a concept",
      "description": "A tool to help promote or eliminate venture concepts. Concepts up for voting are displayed in a useful window that details key elements of the idea. People involved in the voting process submit their vote which is registered in the tool. These results then decide the outcome of that particular concept.",
      "logo": "",
      "image": "",
      "color": "#5588dd",
      "archetype": "social",
      "opportunityArea": 2,
      "matrix": "digitalattacker",
      "technology": "iot",
      "confidence": "36",
      "createdAt": "2018-05-14",
      "killedAt": null,
      "pivotedAt": "2018-07-21"
    },
    3: {
      "id": 3,
      "name": "HAUQs & DUVs",
      "ident": "HD",
      "strapline": "Validating and reducing risk",
      "description": "A tool to help incubate and progress ventures while minimising risk. Risk bubbles are created by adding HAUQs which are then subsequently reduced through the work defined by DUVs. As risk is reduced the bubble gets smaller until no risk remains.",
      "logo": "",
      "image": "",
      "color": "#123987",
      "archetype": "cloud",
      "opportunityArea": 3,
      "matrix": "reengineer",
      "technology": "ai",
      "confidence": "89",
      "createdAt": "2018-05-14",
      "mergedAt": "2018-06-18"
    },
    4: {
      "id": 4,
      "name": "InField",
      "ident": "IF",
      "strapline": "Verify a concept idea with a live consultant",
      "description": "Speak with a live consultant via a 2-way video chat. Consultants are hand selected to have specific knowledge of your market space.",
      "logo": "",
      "image": "",
      "color": "#0693cf",
      "archetype": "marketplace",
      "opportunityArea": 2,
      "matrix": "reimagine",
      "technology": "blockchain",
      "confidence": "18",
      "createdAt": "2018-05-14",
      "killedAt": "2018-08-12"
    },
    5: {
      "id": 5,
      "name": "ConsultMe",
      "ident": "CM",
      "strapline": "Data collection tool",
      "description": "This allows the team to research and define the validity of concepts.",
      "logo": "/images/cm.png",
      "image": "",
      "color": "#343434",
      "archetype": "consulting",
      "opportunityArea": 3,
      "matrix": "reimagine",
      "technology": "ml",
      "confidence": "52",
      "createdAt": "2018-05-14",
      "killedAt": null,
      "mergedAt": "2018-06-18"
    },
    6: {
      "id": 6,
      "name": "Idea Generator",
      "ident": "IG",
      "strapline": "Automatically generates new ideas",
      "description": "Let the Idea Generator do all of the heavy lifting for you. No need to come up with your own concepts, just enter a market space and a number and click generate!",
      "logo": "",
      "image": "",
      "color": "#787878",
      "archetype": "saas",
      "opportunityArea": 3,
      "matrix": "reimagine",
      "technology": "ml",
      "confidence": "27",
      "createdAt": "2018-05-14",
      "mergedAt": "2018-07-24"
    },
    7: {
      "id": 7,
      "name": "Koncept Killer",
      "ident": "KK",
      "strapline": "A way to quickly validate a concept",
      "description": "An quick and easy way to kill bad concepts.",
      "logo": "/images/kk.png",
      "image": "",
      "color": "#E1E1E1",
      "archetype": "saas",
      "opportunityArea": 2,
      "matrix": "digitalattacker",
      "technology": "ai",
      "confidence": "76",
      "createdAt": "2018-06-18",
      "killedAt": null
    },
    8: {
      "id": 8,
      "name": "Innovation Visual",
      "ident": "IV",
      "strapline": "Represent a concept as an image",
      "description": "Sort of like a collage this tool takes a concept and retrieves images from Google Image and creates a mood board.",
      "logo": "",
      "image": "",
      "color": "#8F451A",
      "archetype": "saas",
      "opportunityArea": 2,
      "matrix": "reengineer",
      "technology": "iot",
      "confidence": "34",
      "createdAt": "2018-05-14",
      "killedAt": null,
      "splitAt": "2018-06-18"
    },
    9: {
      "id": 9,
      "name": "QuickLogo",
      "ident": "QL",
      "strapline": "Quickly generate a logo for your concept",
      "description": "Using interpretive machine learning this app takes the description and strapline of your idea and creates a colourful logo.",
      "logo": "/images/ql.png",
      "image": "",
      "color": "#6F9999",
      "archetype": "cloud",
      "opportunityArea": 2,
      "matrix": "newbusinesses",
      "technology": "iot",
      "confidence": "65",
      "createdAt": "2018-06-18",
      "killedAt": null
    }
  },
  conceptIds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      let conceptsById = {};
      let conceptIds = [];
      action.data.concepts.forEach(concept => {
        conceptsById[concept.id] = { ...concept.attributes };
        conceptIds.push(concept.id)
      })
      return { ...state, conceptsById, conceptIds }
    }
    case GET_CONCEPTS_SUCCESS: { // TODO: Remove if no longer required when all concept data is coming from GET_INNOVATION_DATA_SUCCESS.
      const conceptsById = {};
      const conceptIds = [];

      action.concepts.forEach(concept => {
        conceptIds.push(concept.id);
        conceptsById[concept.id] = concept;
      });

      return {
        ...state,
        conceptsById,
        conceptIds
      };
    }

    case CREATE_CONCEPT_SUCCESS: {
      const { newConcept } = action;
      const conceptsById = { ...state.conceptsById, [newConcept.id]: newConcept }
      const conceptIds = [ ...state.conceptIds, newConcept.id ]
      return { ...state, conceptsById, conceptIds }
    }

    default:
      return state;
  }
};
