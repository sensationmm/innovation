import {
  UPDATE_CONCEPT_FINANCE_SCORE_SUCCESS,
  SAVE_CONCEPT_FINANCE_SCORE_BEGIN,
  SAVE_CONCEPT_FINANCE_SCORE_SUCCESS,
  SAVE_CONCEPT_FINANCE_SCORE_ERROR
} from '../config/constants';

import { Concept, FinanceScore } from '../models';
import { editConcept } from './concepts'
import { push } from 'connected-react-router';

// UPDATE is to redux only - SAVE is to the Db.
export const updateConceptFinanceScore = (conceptId, key, attrsToUpdate) => async dispatch => {
  dispatch({ type: UPDATE_CONCEPT_FINANCE_SCORE_SUCCESS, conceptId, key, attrsToUpdate });
}

// This is also the action used to create new reports based on the options describes in the conceptOptions config file.
/**
 * @param {int} conceptId - id of the concept owning the finance score
 * @param {array[{}} financeScores - array of finance score objects to be saved { id, key, value, description, comment }
 */
export const saveConceptFinanceScore = (conceptId, financeScores) => async dispatch => {
  dispatch({ type: SAVE_CONCEPT_FINANCE_SCORE_BEGIN });

  try {
    const conceptToUpdate = (await Concept.includes('finance_scores').find(conceptId)).data;
    // TODO: Check if this is correct user procedure re.status changes.
    conceptToUpdate.status = 'analysed';
    await conceptToUpdate.save()

    for ( const financeScore of financeScores ) {
      if (financeScore.fromDb) {
        // Find, update and save
        const financeScoreToUpdate = conceptToUpdate.financeScores.find(score => score.id === financeScore.id);
        financeScoreToUpdate.value = financeScore.value;
        financeScoreToUpdate.description = financeScore.description;
        financeScoreToUpdate.comment = financeScore.comment;
        await financeScoreToUpdate.save();
      } else {
        // Make a new one
        const newFinanceScore = new FinanceScore({
          key: financeScore.key,
          value: financeScore.value,
          description: financeScore.description,
          comment: financeScore.comment,
          conceptId
        })
        await newFinanceScore.save();
      }
    }

    // Get a new fresh list of all the finance scores.
    const updatedConcept = (await Concept.includes('finance_scores').find(conceptId)).data;
    const updatedFinanceScores = updatedConcept.financeScores.map(score => ({ ...score.attributes, fromDb: true }));
    dispatch({ type: SAVE_CONCEPT_FINANCE_SCORE_SUCCESS, conceptId, updatedFinanceScores });
    dispatch(editConcept(conceptId, { status: 'analysed' }))
    dispatch(push(`/innovation-overview/${conceptId}`));

  }
  catch (err) {
    console.log(err);
    dispatch({ type: SAVE_CONCEPT_FINANCE_SCORE_ERROR });
  }
}
