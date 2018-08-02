import {
  GET_INNOVATION_DATA_SUCCESS,
  UPDATE_CONCEPT_FINANCE_SCORE_SUCCESS,
  SAVE_CONCEPT_FINANCE_SCORE_SUCCESS
} from '../config/constants';

// Use this to setup a standard scoresByConceptId attr on each concept. Changes to the options can happen in the config file only and be reflexted throughout.
import { financeScoreOptions } from '../config/conceptOptions';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_INNOVATION_DATA_SUCCESS: {
      const { partner } = action;

      const scoresByConceptId = {};
      partner.innovation.concepts.forEach(concept => {
        scoresByConceptId[concept.id] = {};
        // Only include finance scores from the Db that are found in the financeScoreOptions config.
        // The fromDb attribute will tell you if you need to update or create this record when form is used.
        Object.keys(financeScoreOptions).forEach(requiredOptionKey => {
          scoresByConceptId[concept.id][requiredOptionKey] = {
            id: null,
            key: requiredOptionKey,
            value: null,
            description: '',
            comment: '',
            fromDb: false
          }
        });

        // Fill default objects created above with data from the database.
        concept.financeScores.forEach(financeScore => {
          const key = financeScore.key;
          const dataFromDb = {
            id: financeScore.id,
            value: financeScore.value,
            description: financeScore.description,
            comment: financeScore.comment,
            fromDb: true
          }
          scoresByConceptId[concept.id][key] = { ...scoresByConceptId[concept.id][key], ...dataFromDb }
        })

      })
      return { ...state, scoresByConceptId }
    }

    case UPDATE_CONCEPT_FINANCE_SCORE_SUCCESS: {
      const { conceptId, key, attrsToUpdate } = action;
      const updatedScoresObject = { ...state.scoresByConceptId[conceptId][key], ...attrsToUpdate };
      const updatedScoresByConceptId = { ...state.scoresByConceptId[conceptId], [key]: updatedScoresObject }
      return {
        ...state,
        scoresByConceptId: { ...state.scoresByConceptId, [conceptId]: updatedScoresByConceptId }
      }
    }

    case SAVE_CONCEPT_FINANCE_SCORE_SUCCESS: {
      const { conceptId, updatedFinanceScores } = action;

      const updatedScoresObject = {}
      updatedFinanceScores.forEach(updatedScore => {
        updatedScoresObject[updatedScore.key] = updatedScore;
      })

      return {
        ...state,
        scoresByConceptId: { ...state.scoresByConceptId, [conceptId]: updatedScoresObject }
      }
    }

    default:
      return state;
  }
};
